const stripTrailingLeadingSlashes = function (input) {
  input = input[input.length-1] === '/' ? input.substring(0, input.length-1) : input
  return input[0] === '/' ? input.substring(1) : input
}

const pipelineApplyActions = function ({ pipeline, style, styleName, errors }) {
  if (!style.actions || !Array.isArray(style.actions)) {
    return
  }

  style.actions.forEach((actionArguments, index) => {
    const actionIndex = index + 1
    if (!actionArguments) {
      errors.push(new Error(`Image style: ${styleName} - action ${actionIndex} must not be empty`))
      return
    }
    actionArguments = actionArguments.split('|')
    if (actionArguments.length < 1) {
      errors.push(new Error(`Image style: ${styleName} - action ${actionIndex} must provide at least one argument`))
      return
    }
    const action = actionArguments.shift()
    if (typeof pipeline[action] === 'undefined') {
      errors.push(new Error(`Image style: ${styleName} - ${action} is not a valid action`))
      return
    }
    try {
      pipeline[action].apply(pipeline, actionArguments)
    }
    catch (error) {
      errors.push(error)
    }
  })
}

const pipelineApplyMacros = function ({ pipeline, style, styleName, errors }) {
  if (!style.macros || !Array.isArray(style.macros)) {
    return
  }
  style.macros.forEach((macroArguments, index) => {
    const macroIndex = index + 1
    if (!macroArguments) {
      errors.push(new Error(`Image style: ${styleName} - macro ${macroIndex} must not be empty`))
      return
    }
    macroArguments = macroArguments.split('|')
    if (macroArguments.length < 1) {
      errors.push(new Error(`Image style: ${styleName} - macro ${macroIndex} must provide at least one argument`))
      return
    }
    const macro = macroArguments.shift()

    const macros = require('./macros')

    if (typeof macros[macro] === 'undefined') {
      errors.push(new Error(`Image style: ${styleName} - ${action} is not a valid macro`))
      return
    }

    style.actions = macros[macro].apply(null, macroArguments).concat(style.actions || [])

    // Prevent macros from reapplying on later processing calls.
    delete style.macros[index]
  })
}

const respondWithError = (res, error) => {
  console.error(error)
  res.writeHead(500)
  return res.end(error.message)
}

const respondWithFile = (res, imagePath, mimeType) => {
  const fs = require('fs')
  const fileContent = fs.readFileSync(imagePath)
  res.writeHead(200, { 'Content-Type': mimeType });
  return res.end(fileContent)
}

const fileTypeMetadata = function() {
  // See: https://github.com/broofa/node-mime/blob/master/types/standard.json
  return {
    '.png': { mime: 'image/png' },
    '.jpg': { mime: 'image/jpeg' },
    '.jpe': { mime: 'image/jpeg' },
    '.jpeg': { mime: 'image/jpeg' },
    '.gif': { mime: 'image/gif' },
    '.webp': { mime: 'image/webp' },
    '.svg': { mime: 'image/svg+xml' },
    '.svgz': { mime: 'image/svg+xml' }
  }
}

const imageLoaderFactory = (options) => function (req, res, next) {
  const path = require('path')

  const queryString = req._parsedOriginalUrl.query
  const url = req.url.replace(req._parsedOriginalUrl.search, '')
  const requestExtension = path.extname(url)

  const metadata = fileTypeMetadata()

  if (!Object.keys(metadata).includes(requestExtension)) {
    return next()
  }

  const fs = require('fs')
  const mimeType = metadata[requestExtension].mime

  // options.imagesBaseDir allows overriding default 'content' directory.
  const imagesBaseDir = options.imagesBaseDir ? stripTrailingLeadingSlashes(options.imagesBaseDir) : 'content'

  // Lookup image file in the base images directory.
  const filePath = `./${imagesBaseDir}${url}`
  const fileExists = fs.existsSync(filePath)

  if (fileExists) {
    const query = !queryString ? {} : queryString.split('&').reduce((acc, query) => {
      const [key, value] = query.split('=')
      acc[key] = value
      return acc
    }, {})

    const imageStyles = options.imageStyles || {}

    if (query.style && Object.keys(imageStyles).includes(query.style)) {

      const mkdirp = require('mkdirp')
      const subDir = path.dirname(url)
      const styleDir = path.join('static', 'image-styles', subDir)

      const sourceBasename = path.basename(url, requestExtension)
      const targetFile = `${sourceBasename}--${query.style}${requestExtension}`
      const targetPath = path.join(styleDir, targetFile)

      if (fs.existsSync(targetPath)) {
        // Respond with existing (already processed) file.
        return respondWithFile(res, targetPath, mimeType)
      }

      const gm = require('gm')
      const styleName = query.style
      const style = imageStyles[styleName]

      // Prepare target directory.
      if (!fs.existsSync(styleDir)) {
        mkdirp.sync(styleDir)
      }

      const pipeline = gm(filePath)

      const errors = []
      pipelineApplyMacros({ pipeline, style, styleName, errors })
      pipelineApplyActions({ pipeline, style, styleName, errors })

      if (errors.length > 0) {
        // Only respond with the first error encountered but log all.
        errors.forEach(error => console.error(error))
        return respondWithError(res, errors[0])
      }

      // Respond with new processed file.
      return pipeline.write(targetPath, function (error) {
        if (!error) {
          return respondWithFile(res, targetPath, mimeType)
        }
        return respondWithError(res, error)
      });
    }

    // Respond with source file.
    return respondWithFile(res, filePath, mimeType)
  }

  // Fall through to nuxt's own 404 page.
  next()
}

module.exports = function imageLoader (moduleOptions) {
  const imageLoaderHandler = imageLoaderFactory(moduleOptions)
  this.addServerMiddleware({ path: '', handler: imageLoaderHandler })
}


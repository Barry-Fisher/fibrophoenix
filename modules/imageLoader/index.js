const stripTrailingLeadingSlashes = function (input) {
  input = input[input.length-1] === '/' ? input.substring(0, input.length-1) : input
  return input[0] === '/' ? input.substring(1) : input
}

const imageLoaderFactory = (options) => function (req, res, next) {
  const path = require('path')

  const queryString = req._parsedOriginalUrl.query
  const url = req.url.replace(req._parsedOriginalUrl.search, '')
  const requestExtension = path.extname(url)

  // See: https://github.com/broofa/node-mime/blob/master/types/standard.json
  const imageExtensions = {
    '.png': { mime: 'image/png' },
    '.jpg': { mime: 'image/jpeg' },
    '.jpe': { mime: 'image/jpeg' },
    '.jpeg': { mime: 'image/jpeg' },
    '.gif': { mime: 'image/gif' },
    '.webp': { mime: 'image/webp' },
    '.svg': { mime: 'image/svg+xml' },
    '.svgz': { mime: 'image/svg+xml' }
  }

  if (!Object.keys(imageExtensions).includes(requestExtension)) {
    return next()
  }

  const fs = require('fs')

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

    const respondWithFile = (imagePath) => {
      const fileContent = fs.readFileSync(imagePath)
      res.writeHead(200, { 'Content-Type': imageExtensions[requestExtension].mime });
      return res.end(fileContent)
    }

    const respondWithError = (error) => {
      console.error(error)
      res.writeHead(500)
      return res.end(error.message)
    }

    const imageStyles = options.imageStyles || {}

    if (query.style && Object.keys(imageStyles).includes(query.style)) {

      const mkdirp = require('mkdirp')
      const subDir = path.dirname(url)
      const styleDir = path.join('static', 'image-styles', subDir)

      // Prepare target directory.
      if (!fs.existsSync(styleDir)) {
        mkdirp.sync(styleDir)
      }

      const sourceBasename = path.basename(url, requestExtension)
      const targetFile = `${sourceBasename}--${query.style}${requestExtension}`
      const targetPath = path.join(styleDir, targetFile)

      if (fs.existsSync(targetPath)) {
        // Respond with existing (already processed) file.
        return respondWithFile(targetPath)
      }

      const gm = require('gm')
      const style = imageStyles[query.style]

      if (!style.actions || !Array.isArray(style.actions)) {
        return respondWithError(new Error(`Image style actions should be an array`))
      }

      const process = gm(filePath)

      style.actions.forEach(actionArguments => {
        actionArguments = actionArguments.split('|')
        const action = actionArguments.shift()
        process[action].apply(process, actionArguments)
      })

      return process.write(targetPath, function (error) {
        if (!error) {
          return respondWithFile(targetPath)
        }
        return respondWithError(error)
      });

      // Respond with new file.
    }

    // Respond with source file.
    return respondWithFile(filePath)
  }

  // Fall through to nuxt's own 404 page.
  next()
}

module.exports = function imageLoader (moduleOptions) {
  const imageLoaderHandler = imageLoaderFactory(moduleOptions)
  this.addServerMiddleware({ path: '', handler: imageLoaderHandler })
}


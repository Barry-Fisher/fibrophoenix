const contentLoader = require('./contentLoader')

const collectionDataHandler = function (req, res, next) {
  const collectionData = contentLoader.getCollectionData(req.url.substring(1))
  return res.end(JSON.stringify(collectionData, null, 4))
}

const contentLoaderHandler = function (req, res, next) {
  const path = require('path')
  const requestExtension = path.extname(req.url)

  if (requestExtension !== '.md') {
    return next()
  }

  const content = contentLoader.getMarkdown(req.url)
  if (content) {
    return res.end(JSON.stringify(content, null, 4))
  }

  // Fall through to nuxt's own 404 page.
  next()
}

module.exports = function contentLoader (moduleOptions) {
  const path = require('path')

  this.addServerMiddleware({ path: '/api/content', handler: contentLoaderHandler })
  this.addServerMiddleware({ path: '/api/collection-data', handler: collectionDataHandler })
  this.addPlugin({
    src: path.resolve(__dirname, 'pluginTemplate.js'),
    options: {
      contentLoaderPath: path.resolve(__dirname, 'contentLoader.js')
    }
  })
}

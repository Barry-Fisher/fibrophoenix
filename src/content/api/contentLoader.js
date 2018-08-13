module.exports = function (req, res, next) {
  const path = require('path')
  const requestExtension = path.extname(req.url)

  if (requestExtension !== '.md') {
    return next()
  }

  const Content = require('../index.js')
  const content = Content.getMarkdown(req.url)
  if (content) {
    return res.end(JSON.stringify(content, null, 4))
  }

  // Fall through to nuxt's own 404 page.
  next()
}
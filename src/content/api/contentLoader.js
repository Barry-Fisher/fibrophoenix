module.exports = function (req, res, next) {
  const requestExtension = req.url.substring(req.url.length-2, req.url.length)

  if (requestExtension !== 'md') {
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
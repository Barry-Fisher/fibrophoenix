module.exports = function (req, res, next) {
  const requestExtension = req.url.substring(req.url.length-2, req.url.length)

  if (requestExtension !== 'md') {
    return next()
  }

  const fs = require('fs')
  const path = require('path')
  const markdownIt = require('markdown-it')
  const matter = require('gray-matter')
  const md = new markdownIt()

  const contentFilePath = path.resolve(__dirname, '..', `content${req.url}`)

  if (fs.existsSync(contentFilePath)) {
    const rawContent = fs.readFileSync(contentFilePath, 'utf8')

    const data = matter(rawContent)

    const output = {
      content: md.render(data.content),
      data: data.data
    }
    return res.end(JSON.stringify(output))
  }

  // Fall through to nuxt's own 404 page.
  next()
}
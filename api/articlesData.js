module.exports = function (req, res, next) {
  const fs = require('fs')
  const path = require('path')
  const matter = require('gray-matter')
  const glob = require('glob')

  const articleFiles = glob.sync(path.resolve('content/articles') + '/**/*md').reduce((acc, file) => {
    const slug = path.basename(file, '.md')
    const rawContent = fs.readFileSync(file, 'utf8')
    acc[slug] = {
      file,
      data: matter(rawContent).data
    }
    return acc
  }, {})

  return res.end(JSON.stringify(articleFiles))
}
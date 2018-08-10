export default ({ app }) => {
  app.$getMarkdown = function (contentPath) {
    if (process.server) {
      const fs = require('fs')
      const path = require('path')
      const md = require('markdown-it')
      const mdInstance = new md()
      const matter = require('gray-matter')
      const file = path.resolve(`content/${contentPath}`)
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8')
        const data = matter(content)

        return {
          content: mdInstance.render(data.content),
          data: data.data
        }
      }
    }
    if (process.client) {
      return window.$nuxt.$axios.$get(`/api/content/${contentPath}`).then(data => {
        return data
      }).catch(error => console.error(error))
    }
  }
  app.$getArticles = function () {
    if (process.server) {
      if (!app.$articles) {
        const glob = require('glob')
        const path = require('path')
        const fs = require('fs')
        const matter = require('gray-matter')

        const articleFiles = glob.sync(path.resolve('content/articles') + '/**/*md').reduce((acc, file) => {
          const slug = path.basename(file, '.md')
          const rawContent = fs.readFileSync(file, 'utf8')

          acc[slug] = {
            file,
            data: matter(rawContent).data
          }
          return acc
        }, {})
        app.$articles = articleFiles
      }
      return app.$articles
    }
    if (process.client) {
      if (!app.$articles) {
        return window.$nuxt.$axios.$get(`/api/articles-data`).then(data => {
          app.$articles = data
          return data
        }).catch(error => console.error(error))
      }
      return app.$articles
    }
  }
}


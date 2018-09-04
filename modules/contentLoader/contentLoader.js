const ContentLoader = function () {
  const NodeCache = require('node-cache')
  this.getMarkdownCache = new NodeCache({ stdTTL: 60, checkperiod: 65 })
  this.getCollectionDataCache = new NodeCache({ stdTTL: 60, checkperiod: 65 })
  this.showDebug = false
}

const stripLeadingSlashes = function (input) {
  return input[0] === '/' ? input.substring(1) : input
}

ContentLoader.prototype.getMarkdown = function (contentPath) {
  contentPath = stripLeadingSlashes(contentPath)

  if (typeof process.server === 'undefined' || process.server) {
    const cacheData = this.getMarkdownCache.get(contentPath)

    if (!cacheData) {
      this.showDebug && console.log('getMarkdownCache MISS')

      const fs = require('fs')
      const path = require('path')
      const md = require('markdown-it')
      const mdInstance = new md({
        html: true,
        typographer: true
      })
      const matter = require('gray-matter')
      const file = path.resolve(`content/${contentPath}`)
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8')
        const data = matter(content)

        const result = {
          content: mdInstance.render(data.content),
          data: data.data
        }

        this.getMarkdownCache.set(contentPath, result)
        return result
      }
    }
    this.showDebug && console.log('getMarkdownCache HIT')

    return cacheData
  }
  if (process.client) {
    return window.$nuxt.$axios.$get(`/api/content/${contentPath}`).then(data => {
      return data
    }).catch(error => console.error(error))
  }
}

ContentLoader.prototype.getCollectionData = function (collectionName) {
  collectionName = stripLeadingSlashes(collectionName)

  if (typeof process.server === 'undefined' || process.server) {
    const cacheData = this.getCollectionDataCache.get(collectionName)

    if (!cacheData) {
      this.showDebug && console.log('getCollectionDataCache MISS')

      const glob = require('glob')
      const path = require('path')
      const fs = require('fs')
      const matter = require('gray-matter')

      const collectionFiles = glob.sync(path.resolve('content', collectionName) + '/**/*md').reduce((acc, file) => {
        const contentDir = path.resolve('content')
        const rawContent = fs.readFileSync(file, 'utf8')
        const fileStats = fs.statSync(file)
        const updated = new Date(fileStats.mtimeMs)

        const getMonth = month => {
          month++
          return month < 10 ? `0${month}` : month
        }
        var updatedYMD = updated.getFullYear() + "-" + getMonth(updated.getMonth()) + "-" + updated.getDate()

        acc.push({
          file,
          path: file.replace(contentDir, '').replace('.md', ''),
          data: matter(rawContent).data,
          updated: updatedYMD
        })
        return acc
      }, [])
      this.getCollectionDataCache.set(collectionName, collectionFiles)
      return collectionFiles
    }

    this.showDebug && console.log('getCollectionDataCache HIT')

    return cacheData
  }
  if (process.client) {
    return window.$nuxt.$axios.$get(`/api/collection-data/${collectionName}`).then(data => {
      return data
    }).catch(error => console.error(error))
  }
}

ContentLoader.prototype.extractCollectionDataProperties = function (collection, dataKeys) {
  if (!Array.isArray(collection)) {
    return new TypeError('collection must be an array')
  }
  if (!Array.isArray(dataKeys)) {
    return new TypeError('dataKeys must be an array')
  }

  const result = {}

  dataKeys.forEach(dataKey => {
    result[dataKey] = collection.reduce((acc, item) => {
      // Array of properties.
      if (Array.isArray(item.data[dataKey])) {
        item.data[dataKey].forEach(property => {
          if (!acc.includes(property)) {
            acc.push(property)
          }
        })
        return acc
      }
      // Single property string.
      const property = item.data[dataKey]
      if (typeof property === 'string') {
        if (!acc.includes(property)) {
          acc.push(property)
        }
        return acc
      }

      return acc

    }, [])
  })

  return result
}

const contentLoader = new ContentLoader()

module.exports = contentLoader

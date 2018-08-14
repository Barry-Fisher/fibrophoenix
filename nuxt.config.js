const Content = require('./src/content')
const ImageLoader = require('./src/content/api/imageLoader.js')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Fibro Phoenix - Fibromyalgia information and resources',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Fibromyalgia information and resources' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Courgette|Lora:400,700' },
    ]
  },
  plugins: [
    '@/plugins/content'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    ['./modules/globalComponents', { prefix: 'fp-' }],
    // @todo define api content as a module (with options) which also provide validPaths plugin automatically.
    // @todo define imageLoader as a module (with options - e.g. imageStyles definitions)
  ],
  router: {
    middleware: [
      'validPaths'
    ]
  },
  serverMiddleware: [
    { path: '/api/content', handler: '@/src/content/api/contentLoader.js' },
    { path: '/api/collection-data', handler: '@/src/content/api/collectionData.js' },
    ImageLoader({
      imageStyles: {
        small: {
          options: {}
        }
      }
    })
  ],
  imageStyles: {
    small: {
      options: {}
    }
  },
  sitemap: {
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false, // Enable me when using nuxt generate
    exclude: [
      '/patterns',
      '/api/**'
    ],
    routes () {
      const dynamicRoutes = []
      const articles = Content.getCollectionData('articles')
      const paths = articles.forEach(article => {
        dynamicRoutes.push({
          url: article.path,
          lastmodISO: article.updated
        })
      })
      return dynamicRoutes
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#f54c00' },
  /*
  ** Build configuration
  */
  build: {
    styleResources: {
      scss: './assets/styles/fp.scss'
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}


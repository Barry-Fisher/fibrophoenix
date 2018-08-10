module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'fibro-phoenix',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Fibro Phoenix website' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Courgette|Lora:400,700' },
    ]
  },
  plugins: [
    '@/plugins/fp-components',
    '@/plugins/articles'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  router: {
    middleware: [
      'validPath'
    ]
  },
  serverMiddleware: [
    { path: '/api/content', handler: '@/api/contentLoader.js' },
    { path: '/api/articles-data', handler: '@/api/articlesData.js' },
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    styleResources: {
      scss: './assets/variables.scss'
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


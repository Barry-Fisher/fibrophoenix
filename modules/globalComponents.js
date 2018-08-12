const path = require('path')
const glob = require('glob')
const consola = require('consola')

module.exports = function globalComponents (moduleOptions) {
  moduleOptions.prefix = moduleOptions.prefix || ''

  const components = glob.sync(`./components/**/${moduleOptions.prefix}*.vue`).reduce((acc, componentPath) => {
    acc[path.basename(componentPath, '.vue')] = '@' + componentPath.substring(1)
    return acc
  }, {})

  if (Object.keys(components).length > 0) {
    this.addPlugin({
      src: path.resolve(__dirname, 'globalComponentsPlugin.js'),
      options: {
        components
      }
    })
    if (moduleOptions.prefix) {
      consola.info(`Loaded ${Object.keys(components).length} component(s) globally using the ${moduleOptions.prefix} prefix`)
      return
    }
    consola.info(`Loaded ${Object.keys(components).length} component(s) globally`)
    return
  }
  consola.info(`Could not find any modules in the components directory to load globally using the ${moduleOptions.prefix} prefix`)
}
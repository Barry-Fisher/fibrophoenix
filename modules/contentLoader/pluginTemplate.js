export default (ctx, inject) => {
  const contentLoader = require('<%- options.contentLoaderPath %>')
  inject('content', contentLoader)
}
import Vue from 'vue'

const load = (type, names) => {
  names.forEach(name => {
    const component = require(`@/components/${type}/${name}.vue`).default
    Vue.component(name, component)
  })
}

load('atoms', [
  'fp-cta',
  'fp-logo',
  'fp-content-loader'
])

load('organisms', [
  'fp-footer',
])
import Vue from 'vue'
import fpCta from '@/components/fp-cta.vue'

const components = {
  'fp-cta': fpCta
}

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})
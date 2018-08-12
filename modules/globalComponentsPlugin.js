import Vue from 'vue'
<% Object.keys(options.components).forEach(componentName => { %>
Vue.component('<%- componentName %>', require('<%- options.components[componentName] %>').default)
<% }) %>

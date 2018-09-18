// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import masking from './directive/masking/index.js'

Vue.use(ElementUI)
Vue.use(masking)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

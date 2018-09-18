import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout'
// import EditMain from '../views/Editor/EditMain'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout
      // redirect: {name: 'preview'},
      // children: [
      //   {
      //     path: '/preview',
      //     name: 'preview',
      //     component: EditMain
      //   }
      // ]
    }
  ]
})

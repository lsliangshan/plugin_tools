import Vue from 'vue'

import Router from 'vue-router'
import ContentRoutes from './content-routes.js'
Vue.use(Router)

export const popupRouter = {
  path: '/popup',
  name: 'Popup',
  meta: {},
  components: {
    HomeRouter: () => import('../components/Popup.vue')
  }
}

// export const contentRouter = ContentRoutes

// export const contentRouter = {
//   path: '/',
//   name: 'Home',
//   meta: {
//     title: 'Robot'
//   },
//   components: {
//     HomeRouter: () => import('../components/Home.vue')
//   },
//   children: [
//     {
//       path: '/json',
//       name: 'ToolJson',
//       meta: {
//         title: 'JSON格式化'
//       },
//       components: {
//         ContentRouter: () => import('../components/tool/Json.vue')
//       }
//     },
//     {
//       path: '/url',
//       name: 'ToolUrl',
//       meta: {
//         title: 'URL参数格式化'
//       },
//       components: {
//         ContentRouter: () => import('../components/tool/Url.vue')
//       }
//     },
//     {
//       path: '/qrcode',
//       name: 'ToolQRCode',
//       meta: {
//         title: '二维码生成'
//       },
//       components: {
//         ContentRouter: () => import('../components/tool/Qrcode.vue')
//       }
//     }
//   ]
// }

export default new Router({
  routes: [
    popupRouter,
    ContentRoutes
  ]
})

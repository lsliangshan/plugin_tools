import Vue from 'vue'

import Router from 'vue-router'
// import ContentRoutes from './content-routes.js'
// 代码处理工具
import CodeRoutes from './code-routes.js'
// 便民工具
import ConvenienceRoutes from './convenience-routes.js'
// 多媒体工具
import MultiMediaRoutes from './multi-media-routes.js'
// 站长工具
import StationMasterRoutes from './station-master-routes.js'
import PageRoutes from './page-routes.js'
Vue.use(Router)

// export const scriptsRouter = [
//   {
//     path: '/scripts',
//     name: 'scripts',
//     meta: {
//       title: 'User Scripts'
//     },
//     components: {
//       ContentRouter: () => import('../components/tool/Scripts.vue')
//     }
//   }
// ]

// const ProfileRouter = {
//   path: '/profile',
//   name: 'profile',
//   meta: {
//     title: '个人中心'
//   },
//   components: {
//     ContentRouter: () => import('../components/pages/Profile.vue')
//   }
// }

export const MainRouter = {
  path: '/',
  name: 'home',
  meta: {
    title: 'Enkel loves you'
  },
  components: {
    HomeRouter: () => import('../components/Home.vue')
  },
  children: [
    ...PageRoutes.children,
    ...MultiMediaRoutes.children,
    ...CodeRoutes.children,
    ...ConvenienceRoutes.children,
    ...StationMasterRoutes.children,
    {
      path: '/profile',
      name: 'profile',
      meta: {
        title: '个人中心'
      },
      components: {
        ContentRouter: () => import('../components/pages/Profile.vue')
      }
    }
  ]
}
export const popupRouter = {
  path: '/popup',
  name: 'Popup',
  meta: {},
  components: {
    HomeRouter: () =>
      import('../components/Popup.vue')
  }
}

export const blankRouter = {
  path: '/blank',
  name: 'blank',
  meta: {},
  components: {
    HomeRouter: () =>
      import('../components/pages/Blank.vue')
  }
}

export const greetingRouter = {
  path: '/greeting',
  name: 'greeting',
  meta: {
    title: 'Enkel loves you'
  },
  components: {
    HomeRouter: () => import('../components/Greeting.vue')
  }
}

export const LoginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录 - Enkel loves you'
  },
  components: {
    HomeRouter: () => import('../components/pages/Login.vue')
  }
}

export const RegisterRouter = {
  path: '/register',
  name: 'register',
  meta: {
    title: '注册 - Enkel loves you'
  },
  components: {
    HomeRouter: () => import('../components/pages/Register.vue')
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
  // mode: 'history',
  routes: [
    MainRouter,
    LoginRouter,
    RegisterRouter,
    popupRouter,
    blankRouter,
    // ContentRoutes,
    // scriptsRouter,
    // CodeRoutes,
    // ConvenienceRoutes,
    // MultiMediaRoutes,
    // StationMasterRoutes,
    // PageRoutes,
    greetingRouter
    // ,
    // ProfileRouter
  ]
})

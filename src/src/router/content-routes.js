export default {
  path: '/',
  name: 'home',
  meta: {
    title: 'Robot'
  },
  components: {
    HomeRouter: () => import('../components/Home.vue')
  },
  children: [
    {
      path: '/json',
      name: 'json',
      meta: {
        title: 'JSON格式化'
      },
      components: {
        ContentRouter: () => import('../components/tool/Json.vue')
      }
    },
    {
      path: '/url',
      name: 'url',
      meta: {
        title: 'URL参数格式化'
      },
      components: {
        ContentRouter: () => import('../components/tool/Url.vue')
      }
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      meta: {
        title: '二维码生成'
      },
      components: {
        ContentRouter: () => import('../components/tool/Qrcode.vue')
      }
    }
  ]
}

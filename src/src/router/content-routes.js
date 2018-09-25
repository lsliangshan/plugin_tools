export default {
  path: '/',
  name: 'home',
  meta: {
    label: 'Home',
    title: 'Dei2 Tools'
  },
  components: {
    HomeRouter: () =>
      import ('../components/Home.vue')
  },
  children: [{
    path: '/json',
    name: 'json',
    meta: {
      label: 'JSON',
      title: 'JSON格式化'
    },
    components: {
      ContentRouter: () =>
        import ('../components/tool/Json.vue')
    }
  }, {
    path: '/url',
    name: 'url',
    meta: {
      label: 'URL',
      title: 'URL参数格式化'
    },
    components: {
      ContentRouter: () =>
        import ('../components/tool/Url.vue')
    }
  }, {
    path: '/base64',
    name: 'base64',
    meta: {
      label: 'BASE64',
      title: 'base64转换'
    },
    components: {
      ContentRouter: () =>
        import ('../components/tool/Base64.vue')
    }
  }, {
    path: '/time',
    name: 'time',
    meta: {
      label: '时间戳',
      title: '时间戳转换'
    },
    components: {
      ContentRouter: () =>
        import ('../components/tool/Time.vue')
    }
  }, {
    path: '/qrcode',
    name: 'qrcode',
    meta: {
      label: '二维码',
      title: '二维码生成'
    },
    components: {
      ContentRouter: () =>
        import ('../components/tool/Qrcode.vue')
    }
  }, {
    path: '/img',
    name: 'img',
    meta: {
      label: '传图识色',
      title: '传图识色'
    },
    components: {
      ContentRouter: () =>
        import ('../components/tool/Image.vue')
    }
  }, {
    path: '/code',
    name: 'code',
    meta: {
      label: 'CHAR',
      title: 'html实体代码'
    },
    components: {
      ContentRouter: () =>
        import ('../components/tool/Code.vue')
    }
  }]
}
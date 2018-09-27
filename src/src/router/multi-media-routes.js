export default {
  path: '/',
  name: 'home',
  meta: {
    label: 'Home',
    title: 'Enkel Tools',
    name: '多媒体工具'
  },
  components: {
    HomeRouter: () =>
      import ('../components/Home.vue')
  },
  children: [{
    path: '/qrcode',
    name: 'qrcode',
    meta: {
      label: '二维码',
      title: '二维码生成',
      icon: '#route-qrcode',
      name: '二维码生成',
      desc: '将字符生成二维码，可下载生成的二维码'
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
      title: '传图识色',
      icon: '#route-img',
      name: '传图识色',
      desc: '可识别图片的主色调及辅色'
    },
    components: {
      ContentRouter: () =>
        import ('../components/tool/Image.vue')
    }
  }]
}
export default {
  path: '/',
  name: 'home',
  meta: {
    label: 'Home',
    title: 'Enkel Tools',
    name: '站长工具'
  },
  components: {
    HomeRouter: () =>
      import ('../components/Home.vue')
  },
  children: [{
    path: '/base64',
    name: 'base64',
    meta: {
      label: 'BASE64',
      title: 'base64转换',
      icon: '#route-base64',
      name: 'base64编码解码',
      desc: '字符与base64互转，图片与base64互转'
    },
    components: {
      ContentRouter: () =>
        import ('../components/tool/Base64.vue')
    }
  }, {
    path: '/ip',
    name: 'ip',
    meta: {
      label: 'IP',
      title: 'ip地址查询',
      icon: '#route-ip',
      name: 'ip地址查询',
      desc: '查询IP或域名的地理位置、宽带供应商；查看我的IP'
    },
    components: {
      ContentRouter: () => import('../components/tool/Ip.vue')
    }
  }]
}
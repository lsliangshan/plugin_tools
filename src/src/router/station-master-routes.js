export default {
  meta: {
    label: 'Home',
    title: 'Enkel Tools',
    name: '站长工具'
  },
  children: [{
    path: '/base64',
    name: 'base64',
    meta: {
      label: 'BASE64',
      title: 'base64转换',
      icon: '#route-base64',
      name: 'base64编码解码',
      desc: '字符与base64互转，图片与base64互转',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Base64.vue')
    }
  }, {
    path: '/ip',
    name: 'ip',
    meta: {
      label: 'IP',
      title: 'ip地址查询',
      icon: '#route-ip',
      name: 'ip地址查询',
      desc: '查询IP或域名的地理位置、宽带供应商；查看我的IP',
      createTime: '1555234941000',
      hot: false
    },
    components: {
      ContentRouter: () => import('../components/tool/Ip.vue')
    }
  }, {
    path: '/crypto',
    name: 'crypto',
    meta: {
      label: '文字加密解密',
      title: '文字加密解密',
      icon: '#route-crypto',
      name: '文字加密解密',
      desc: '支持MD5、AES、DES、RC4、Rabbit等多种加密算法',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () => import('../components/tool/Crypto.vue')
    }
  }]
}

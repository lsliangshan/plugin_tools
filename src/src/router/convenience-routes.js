export default {
  meta: {
    label: 'Home',
    title: 'Enkel Tools',
    name: '其它工具'
  },
  children: [
    {
      path: '/augury',
      name: 'augury',
      meta: {
        label: '程序员求签',
        title: '程序员求签',
        icon: '#route-augury',
        name: '程序员求签',
        desc: '不求生老病死，只求程序无BUG，产品无需求，UI无变更',
        createTime: '545440088000',
        hot: false
      },
      components: {
        ContentRouter: () => import('../components/tool/Augury.vue')
      }
    },
    {
      path: '/pinyin',
      name: 'pinyin',
      meta: {
        label: '汉字转拼音、五笔',
        title: '汉字转拼音、五笔',
        icon: '#route-pinyin',
        name: '汉字转拼音、五笔',
        desc: '将汉字转成五笔或拼音（拼音可带音调）',
        createTime: '545440088000',
        hot: false
      },
      components: {
        ContentRouter: () =>
          import('../components/tool/Pinyin.vue')
      }
    },
    {
      path: '/morse',
      name: 'morse',
      meta: {
        label: '摩斯电码',
        title: '摩斯电码',
        icon: '#route-morse',
        name: '摩斯电码',
        desc: '摩斯电码编码解码',
        createTime: '545440088000',
        hot: false
      },
      components: {
        ContentRouter: () => import('../components/tool/Morse.vue')
      }
    },
    {
      path: '/id-photo',
      name: 'id',
      meta: {
        label: '证件照',
        title: '证件照',
        icon: '#route-id',
        name: '证件照',
        desc: '免费获取各种尺寸、背景色证件照',
        createTime: '1555234941000',
        hot: true
      },
      components: {
        ContentRouter: () => import('../components/tool/Id.vue')
      }
    },
    {
      path: '/img',
      name: 'img',
      meta: {
        label: '传图识色',
        title: '传图识色',
        icon: '#route-img',
        name: '传图识色',
        desc: '可识别图片的主色调及辅色',
        createTime: '545440088000',
        hot: false
      },
      components: {
        ContentRouter: () =>
          import('../components/tool/Image.vue')
      }
    }, {
      path: '/steganography',
      name: 'steganography',
      meta: {
        label: '图片隐写术',
        title: '图片隐写术',
        icon: '#route-steganography',
        name: '图片隐写术',
        desc: '图片隐写术，内向同学的告白神器',
        createTime: '545440088000',
        hot: false
      },
      components: {
        ContentRouter: () => import('../components/tool/Steganography.vue')
      }
    },
    {
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
    }
    // ,
    // {
    //   path: '/conference',
    //   name: 'conference',
    //   meta: {
    //     label: '视频通话',
    //     title: '视频通话',
    //     icon: '#route-conference',
    //     name: '视频通话',
    //     desc: '免费视频通话',
    //     createTime: '1555234941000',
    //     hot: true
    //   },
    //   components: {
    //     ContentRouter: () => import('../components/tool/Conference.vue')
    //   }
    // }
  ]
}

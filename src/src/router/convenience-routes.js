export default {
  meta: {
    label: 'Home',
    title: 'Enkel Tools',
    name: '便民工具'
  },
  children: [
    {
      path: '/scripts',
      name: 'scripts',
      meta: {
        label: '网页脚本注入',
        title: '网页脚本注入',
        icon: '#route-scripts',
        name: '网页脚本注入',
        desc: '允许用户向目标网页注入脚本',
        createTime: '1555234941000',
        hot: true
      },
      components: {
        ContentRouter: () => import('../components/tool/Scripts.vue')
      }
    },
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
      path: '/conference',
      name: 'conference',
      meta: {
        label: '视频通话',
        title: '视频通话',
        icon: '#route-conference',
        name: '视频通话',
        desc: '免费视频通话',
        createTime: '1555234941000',
        hot: true
      },
      components: {
        ContentRouter: () => import('../components/tool/Conference.vue')
      }
    }
  ]
}

export default {
  path: '/',
  name: 'home',
  meta: {
    label: 'Home',
    title: 'Enkel Tools',
    name: '便民工具'
  },
  components: {
    HomeRouter: () =>
      import('../components/Home.vue')
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
        desc: '不求生老病死，只求程序无BUG，产品无需求，UI无变更'
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
        desc: '将汉字转成五笔或拼音（拼音可带音调）'
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
        desc: '摩斯电码编码解码'
      },
      components: {
        ContentRouter: () => import('../components/tool/Morse.vue')
      }
    }
  ]
}

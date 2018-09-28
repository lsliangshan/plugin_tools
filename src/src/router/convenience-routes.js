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
      import ('../components/Home.vue')
  },
  children: [
    {
      path: '/pinyin',
      name: 'pinyin',
      meta: {
        label: '汉字转拼音',
        title: '汉字转拼音',
        icon: '#route-pinyin',
        name: '汉字转拼音',
        desc: '将汉字转成拼音，可带音调'
      },
      components: {
        ContentRouter: () =>
          import ('../components/tool/Pinyin.vue')
      }
    }
  ]
}
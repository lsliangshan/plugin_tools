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
  children: []
}
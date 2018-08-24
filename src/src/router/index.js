import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const contentRouter = {
  path: '/',
  name: 'Home',
  meta: {
    title: 'Robot'
  },
  components: {
    HomeRouter: () => import('../components/Home.vue')
  }
}

export default new Router({
  routes: [
    contentRouter
  ]
})

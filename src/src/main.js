// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router/index'
import store from './store'
import * as filters from './filters'
import mixins from './mixins'
import iView from 'iview'
import '../static/css/font-awesome/css/font-awesome.min.css'
import 'iview/dist/styles/iview.css'

sync(store, router)

require('./directives/index')

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)

Vue.use(iView)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }  
  next()
})

router.afterEach(to => {
  iView.LoadingBar.finish()
})

Vue.prototype.errorHandler = (err, vm) => {
  console.log(err.message)
}

Vue.prototype.$eventHub = (Vue.prototype.$eventHub || new Vue())

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  // template: '<App/>',
  // components: { App }
})

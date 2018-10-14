// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import {
  sync
} from 'vuex-router-sync'
import router from './router/index'
import store from './store'
import * as filters from './filters'
import mixins from './mixins'
import iView from 'iview'
import '../static/css/font-awesome/css/font-awesome.min.css'
import 'iview/dist/styles/iview.css'
import "codemirror/lib/codemirror.css"
import "codemirror/addon/fold/foldgutter.css"
import "codemirror/theme/zenburn.css"
import "codemirror/theme/dracula.css"

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
document.cookie = 'enkel=9d935f95a1630e1282ae9861f16fcf0b'
Vue.prototype.$axios = axios.create({
  headers: {
    'cookies': document.cookie
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  // template: '<App/>',
  // components: { App }
})
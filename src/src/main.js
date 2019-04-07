// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import qs from 'qs'
import {
  sync
} from 'vuex-router-sync'
import router from './router/index'
import store from './store'
import * as filters from './filters'
import mixins from './mixins'
import iView from 'iview'
import {
  StorageUtil, KitUtil
} from './utils/index'
import * as types from './store/mutation-types'
import '../static/css/font-awesome/css/font-awesome.min.css'
import 'iview/dist/styles/iview.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/theme/zenburn.css'
import 'codemirror/theme/dracula.css'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

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
const CryptoJS = require('crypto-js')
router.beforeEach(async (to, from, next) => {
  let _localNemLoginInfo = await StorageUtil.getItem(store.state.localStorageKeys.nemMusic.loginInfo)
  store.state.nemLoginInfo = _localNemLoginInfo || {}
  iView.LoadingBar.start()
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta && to.meta.needAudio) {
    store.state.showAudio = true
  }
  let _localUserInfo = await StorageUtil.getItem(store.state.localStorageKeys.userInfo)
  if (_localUserInfo) {
    let decodeInfo
    try {
      decodeInfo = CryptoJS[store.state.cryptoType].decrypt(_localUserInfo, store.state.privateKey).toString(CryptoJS.enc.Utf8)
    } catch (err) {
    }
    if (decodeInfo) {
      _localUserInfo = JSON.parse(decodeInfo)
    } else {
      StorageUtil.clear()
      _localUserInfo = {}
    }
  } else {
    _localUserInfo = {}
  }
  store.commit(types.CACHE_LOGIN_INFO, _localUserInfo)
  if (to.name === 'login') {
    // let _loginInfo = StorageUtil.getItem(store.state.localStorageKeys.userInfo)
    if (_localUserInfo && !KitUtil.isEmptyObject(_localUserInfo)) {
      // store.state.loginInfo = _localUserInfo
      if (!from.name || from.name === 'login') {
        next({
          replace: true,
          name: 'index'
        })
      } else {
        setTimeout(() => {
          next({
            replace: true,
            name: 'index'
          })
        }, 100)
      }
    } else {
      next()
    }
  } else {
    next()
  }

  if (to.meta && to.meta.needLogin) {
    if (to.meta.needLogin === 'nem' && _localNemLoginInfo.userPoint && _localNemLoginInfo.userPoint.userId) {
      next()
    } else {
      next({
        name: 'index'
      })
    }
  } else {
    next()
  }
  // next()
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

Vue.prototype.$axios.interceptors.request.use(config => {
  if (config.data.data) {
    config.data.data = qs.stringify(config.data.data)
  }
  if (config.data.headers) {
    config.data.headers = qs.stringify(config.data.headers)
  }
  config.data = qs.stringify(config.data)
  console.log('interceptors: ', config)
  return config
}, error => {
  return Promise.reject(error)
})

/* eslint-disable no-new */
global.vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  // template: '<App/>',
  // components: { App }
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', { scope: '/' })
  })
}

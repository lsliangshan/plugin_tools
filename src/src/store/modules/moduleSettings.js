import {
  StorageUtil
} from '../../utils/index'
import * as types from '../mutation-types'
const moduleSettings = {
  namespaced: true,
  state: {

  },
  getters: {
    settings: (state, getters, rootState) => {
      let settings = {}
      if (rootState.isLogin) {
        /**
         * 如果登录，则优先取登录用户的配置
         */
        settings = rootState.loginInfo.settings
      } else {
        /**
         * 未登录，则取缓存的配置
         */
        settings = rootState.settings
      }
      if (settings) {
        if (!settings.blankHomePage) {
          settings.blankHomePage = 'default'
        }
        if (!settings.customThemeImage) {
          settings.customThemeImage = ''
        }
        if (!settings.activeThemeIndex) {
          settings.activeThemeIndex = [0, 0]
        }
      }
      return settings || {}
    },
    themeImage: (state, getters, rootState) => {
      let settings = getters.settings
      if (settings.customThemeImage) {
        return settings.customThemeImage
      } else if (settings.activeThemeIndex) {
        let first = Math.min(settings.activeThemeIndex[0], rootState.themeImages.length - 1)
        let second = Math.min(settings.activeThemeIndex[1], rootState.themeImages[first] ? rootState.themeImages[first].sublist.length - 1 : -1)
        return settings.activeThemeIndex.join(';').indexOf('-1') < 0 ? rootState.themeImages[first].sublist[second].img : ''
      } else {
        return ''
      }
    },
    blankHomePage: (state, getters, rootState) => {
      let settings = getters.settings
      return settings.blankHomePage || 'default'
    },
    activeThemeIndex: (state, getters, rootState) => {
      let settings = getters.settings
      return settings.activeThemeIndex || [-1, -1]
    }
  },
  actions: {
    saveSettingsRemote ({ state, commit, dispatch, rootState }, data) {
      return new Promise(resolve => {
        dispatch(types.AJAX, {
          url: rootState.requestInfo.updateSettings,
          data: {
            phonenum: rootState.loginInfo.phonenum,
            token: rootState.loginInfo.token,
            settings: JSON.stringify(data)
          }
        }, {
          root: true
        }).catch(() => {
          // this.$Message.error(err.message || '请求失败，请稍后再试')
          resolve(true)
        }).then(responseData => {
          if (responseData && responseData.status === 200) {
            commit(types.UPDATE_LOGIN_INFO, {
              settings: responseData.data.settings || {}
            }, {
              root: true
            })
          }
          resolve(true)
        })
      })
    },
    updateSettings ({ state, commit, dispatch, rootState }, data) {
      let settings = Object.assign({}, rootState.settings, data)
      if (!rootState.isLogin) {
        commit(types.CACHE_USER_SETTINGS, settings, {
          root: true
        })
      } else {
        commit(types.UPDATE_LOGIN_INFO, {
          settings: settings
        }, {
          root: true
        })
      }
    },
    async updateSettingsRemote ({ state, commit, dispatch, rootState }, data) {
      let settings = Object.assign({}, rootState.settings, data)
      if (!rootState.isLogin) {
        commit(types.CACHE_USER_SETTINGS, settings, {
          root: true
        })
      } else {
        commit(types.UPDATE_LOGIN_INFO, {
          settings: settings
        }, {
          root: true
        })
        await dispatch('saveSettingsRemote', settings)
      }
    }
  }
}

export default moduleSettings

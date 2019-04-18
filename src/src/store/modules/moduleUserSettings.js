import {
  StorageUtil
} from '../../utils/index'
import * as types from '../mutation-types'
const moduleUserSettings = {
  namespaced: true,
  state: {

  },
  getters: {
    userSettings: (state, getters, rootState) => {
      if (rootState.isLogin) {
        /**
         * 如果登录，则优先取登录用户的配置
         */
        console.log('login user settings: ', rootState.loginInfo.settings)
        return rootState.loginInfo.settings
      } else {
        /**
         * 未登录，则取缓存的配置
         */
        console.log('user settings: ', JSON.stringify(rootState.userSettings, null, 2))
        return rootState.userSettings
      }
    },
    themeImage: (state, getters, rootState) => {
      let userSettings = getters.userSettings
      console.log('theme image: ', JSON.stringify(userSettings, null, 2))
      if (userSettings.customThemeImage) {
        return userSettings.customThemeImage
      } else if (userSettings.activeThemeIndex) {
        let first = Math.min(userSettings.activeThemeIndex[0], rootState.themeImages.length - 1)
        let second = Math.min(userSettings.activeThemeIndex[1], rootState.themeImages[first] ? rootState.themeImages[first].sublist.length - 1 : -1)
        return userSettings.activeThemeIndex.join(';').indexOf('-1') < 0 ? rootState.themeImages[first].sublist[second].img : ''
      } else {
        return ''
      }
    },
    blankHomePage: (state, getters, rootState) => {
      let userSettings = getters.userSettings
      return userSettings.blankHomePage || 'blank'
    },
    activeThemeIndex: (state, getters, rootState) => {
      let userSettings = getters.userSettings
      return userSettings.activeThemeIndex || [-1, -1]
    }
  },
  actions: {
    updateUserSettings ({ state, commit, rootState }, data) {
      let userSettings = Object.assign({}, rootState.userSettings, data)
      console.log('....update user settings: ', userSettings)
      commit(types.CACHE_USER_SETTINGS, {
        userSettings: userSettings
      }, {
          root: true
        })
    }
  }
}

export default moduleUserSettings
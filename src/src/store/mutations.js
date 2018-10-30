/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88" . "88
 **                                                         (| -_- |)
 **                                                          O\ = /O
 **                                                      ____/`---'\____
 **                                                    .   ' \\| |// `.
 **                                                     / \\||| : |||// \
 **                                                   / _||||| -:- |||||- \
 **                                                     | | \\\ - /// | |
 **                                                   | \_| ''\---/'' | |
 **                                                    \ .-\__ `-` ___/-. /
 **                                                 ___`. .' /--.--\ `. . __
 **                                              ."" '< `.___\_<|>_/___.' >'"".
 **                                             | | : `- \`.;`\ _ /`;.`/ - ` : | |
 **                                               \ \ `-. \_ __\ /__ _/ .-` / /
 **                                       ======`-.____`-.___\_____/___.-`____.-'======
 **                                                          `=---='
 **
 **                                       .............................................
 **                                              佛祖保佑             永无BUG
 **                                      佛曰:
 **                                              写字楼里写字间，写字间里程序员；
 **                                              程序人员写程序，又拿程序换酒钱。
 **                                              酒醒只在网上坐，酒醉还来网下眠；
 **                                              酒醉酒醒日复日，网上网下年复年。
 **                                              但愿老死电脑间，不愿鞠躬老板前；
 **                                              奔驰宝马贵者趣，公交自行程序员。
 **                                              别人笑我忒疯癫，我笑自己命太贱；
 **                                              不见满街漂亮妹，哪个归得程序员？
 */
/**
 * Created by liangshan on 2017/7/13.
 */

import * as types from './mutation-types'
import {
  StorageUtil
} from '../utils/index'

const findTemplateByUUID = function (uuid, arr, deep, sub) {
  let _deep = deep // deep为1或2
  let _sub = sub || 0
  let outIndex = [-1, -1]
  if (--_deep > -1) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].uuid === uuid) {
        outIndex[_deep + _sub] = i
        i = arr.length
      } else {
        let _tempIndex = findTemplateByUUID(uuid, arr[i].children, _deep, deep - _deep)[1]
        if (_tempIndex > -1) {
          outIndex[0] = i
          outIndex[1] = _tempIndex
        }
      }
    }
  }
  return outIndex
}

export const mutations = {
  [types.SET_AUDIO_SHOWN] (state, data) {
    state.showAudio = data.show
  },
  async [types.CACHE_RECENTLY_PLAY_LIST] (state, data) {
    state.recentlyPlayList = data.recentlyPlayList
    await StorageUtil.setItem(state.localStorageKeys.nemRecentlyPlayList, state.recentlyPlayList)
  },
  [types.CACHE_NEM_LOGIN_INFO] (state, data) {
    state.nemLoginInfo = data.loginInfo
  },
  [types.SET_AUDIO_ELE](state, data) {
    state.audio.ele = data.ele
  },
  [types.PLAY_AUDIO](state, data) {
    state.audio.current = Number(data.current)
    state.audio.playing = true
  },
  [types.PAUSE_AUDIO](state) {
    state.audio.playing = false
  },
  [types.RESET_AUDIO](state) {
    state.audio = Object.assign({}, state.audio, {
      current: 0,
      playing: false,
      volume: 1
    })
  },
  [types.SET_AUDIO_VOLUME](state, data) {
    state.audio.volume = ((parseFloat(data.volume) / 100).toFixed(2) > 1 ? 1 : (parseFloat(data.volume) / 100).toFixed(2))
  },
  [types.SET_AUDIO_MODE](state, data) {
    state.audio.mode = data.mode
  },
  [types.SET_AUDIO_LIST](state, data) {
    state.audio.list = data.list
  },
  [types.SET_AUDIO_DURATION](state, data) {
    state.audio.duration = data.duration
  },
  [types.INIT_TOOLS](state, data) {
    state.tools = data.tools
  },
  [types.SET_ACTIVE_TOOLS](state, data) {
    state.activeTools = data.tools
  },
  [types.SET_INACTIVE_TOOLS](state, data) {
    state.inactiveTools = data.tools
  },
  async [types.SET_MAX_TOOL_COUNT](state, data) {
    state.maxToolCount = Number(data.count)
    await StorageUtil.setItem(state.localStorageKeys.maxToolCount, Number(data.count))
  },
  async [types.SET_ACTIVE_THEME_INDEX](state, data) {
    state.activeThemeIndex = data.activeThemeIndex
    await StorageUtil.setItem(state.localStorageKeys.activeThemeIndex, data.activeThemeIndex)
  },
  async [types.SET_BLANK_HOME_PAGE](state, data) {
    if (!data.blankHomePage || data.blankHomePage.trim() === 'default') {
      state.blankHomePage = 'default'
    } else if (data.blankHomePage.match(/^\/\//)) {
      state.blankHomePage = 'http://' + data.blankHomePage.replace(/^\/\//, '')
    } else if (!data.blankHomePage.match(/^http(s?):/)) {
      state.blankHomePage = 'http://' + data.blankHomePage
    } else {
      state.blankHomePage = data.blankHomePage
    }
    await StorageUtil.setItem(state.localStorageKeys.blankHomePage, state.blankHomePage)
  },
  [types.SHOW_POPUP](state, data) {
    state.popup = Object.assign({}, state.popup, data, {
      shown: true
    })
  },
  [types.SET_ALL_PLUGINS](state, data) {
    state.allPlugins = data.allPlugins
  },
  [types.SET_LOADER](state, data) {
    state.loaders[data.name] = data.value.vm
  },
  [types.DEL_LOADER](state, data) {
    if (state.loaders[data.name]) {
      delete state.loaders[data.name]
    }
  },
  [types.SET_SOCKET](state, data) {
    state.socket.client = data.socket
  },
  [types.UPDATE_LOGIN_INFO](state, data) {
    state.loginInfo = data
  },
  [types.DISCONNECT_SOCKETIO](state) {
    state.socket.client.disconnect()
    state.socket.client = {}
  },
  [types.UPDATE_AVATAR](state, data) {
    state.loginInfo.headIcon = data.avatar
  },
  [types.TOGGLE_MENU](state, data) {
    state.spanLeft = (state.spanLeft === state.minSpanLeft ? state.maxSpanLeft : state.minSpanLeft)
    state.spanRight = (state.spanRight === state.maxSpanRight ? state.minSpanRight : state.maxSpanRight)
    state.menuFold = (state.spanLeft === state.minSpanLeft)
  },
  [types.FOLD_SIDE_MENU](state, data) {
    state.spanLeft = data.fold ? state.minSpanLeft : state.maxSpanLeft
    state.spanRight = data.fold ? state.maxSpanRight : state.minSpanRight
    state.menuFold = data.fold
  },
  [types.TOGGLE_FULL_SCREEN](state, data) {
    state.isFullScreen = data.isFullScreen
  },
  [types.SET_SIMULATOR](state, data) {
    Object.assign(state.simulator, data)
  },
  [types.ACTIVE_COMPONENT](state, data) {
    Object.assign(state.activeComponent, data)
  },
  [types.ADD_COMPONENT](state, data) {
    let thisPage = state.activityInfo.data.pages[state.currentPageIndex].children
    thisPage.push(data)
  },
  [types.INIT_LOCAL_TEMPLATE](state, data) {
    state.activityInfo = data.template
  },
  [types.PREV_PAGE](state) {
    // 上一页
    if (state.currentPageIndex > 0) {
      state.currentPageIndex -= 1
    }
  },
  [types.NEXT_PAGE](state) {
    // 下一页
    if (state.currentPageIndex < state.activityInfo.data.pages.length - 1) {
      state.currentPageIndex += 1
    }
  },
  [types.SET_CURRENT_PAGE_INDEX](state, data) {
    if (Number(data.index) >= 0 && Number(data.index) <= state.activityInfo.data.pages.length - 1) {
      state.currentPageIndex = Number(data.index)
    }
  },
  [types.UPDATE_ACTIVITY_PROPERTY](state, data) {
    Object.assign(state.activityInfo.data, data)
  },
  [types.SAVE_LOCAL_TEMPLATE](state, data) {
    /**
     * type: zpm-page
     * uuid: xxxxxxx
     * template: {}
     */
    let _pageData = state.activityInfo.data.pages
    // let _pageData = state.pageData
    let _pageIndex = -1
    let _componentIndex = -1
    if (data.type === state.simulatorPageType) {
      // 是页面
      _pageIndex = findTemplateByUUID(data.uuid, _pageData, 1)[0]
      if (_pageIndex === -1) {
        // 不存在，是新页面
        _pageData.push(data.template)
      } else {
        // 存在，替换原有页面模板
        _pageData.splice(_pageIndex, 1, data.template)
      }
    } else {
      // 是页面中的组件
      let _index = findTemplateByUUID(data.uuid, _pageData, 2)
      _pageIndex = _index[0]
      _componentIndex = _index[1]
      if (_pageIndex !== -1) {
        // 页面必须存在
        if (_componentIndex === -1) {
          // 是新组件，添加新组件
          _pageData[_pageIndex].children.push(data.template)
        } else {
          // 不是新组件，替换
          _pageData[_pageIndex].children.splice(_componentIndex, 1, data.template)
        }
      }
    }
  },
  [types.SHOW_FULL_SCREEN_POPUP](state, data) {
    Object.assign(state.fullScreenPopup, data, {
      shown: true
    })
  },
  [types.HIDE_FULL_SCREEN_POPUP](state) {
    state.fullScreenPopup = {
      shown: false,
      subCom: ''
    }
  },
  [types.ACTIVITY_INFO_CHANGED](state) {
    state.activityInfoChanged = true
  },
  [types.ACTIVITY_INFO_UNCHANGED](state) {
    state.activityInfoChanged = false
  },
  [types.SET_APP_HEAER](state, data) {
    state.appHeaderOperationArea = data
  },
  [types.SHOW_SIMULATOR_GRID](state) {
    state.grid.shown = true
  },
  [types.HIDE_SIMULATOR_GRID](state) {
    state.grid.shown = false
  },
  [types.UPDATE_ACTIVE_POSITION](state, data) {
    state.activePosition = data.position
  },
  [types.SET_COMMENTS](state, data) {
    state.article.comments = Object.assign({}, state.article.comments, data)
  },
  [types.CACHE_ALL_ARTICLE_TAGS](state, data) {
    state.allArticleTags = data.tags
  },
  [types.SET_BODY_STYLES](state, data) {
    state.bodyStyles = data.styles
  }
}
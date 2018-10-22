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
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import moduleNem from './modules/moduleNem'

Vue.use(Vuex)

// const PROTOCOL = location.protocol
// let allPath = ['/register', '/login']
// let allPath = ['Register', 'Login']
const store = new Vuex.Store({
  actions: actions.actions,
  mutations: mutations.mutations,
  getters: getters.getters,
  modules: {
    moduleNem
  },
  state: {
    theme: 'dark',
    logo: '/html/static/images/new_logo.png',
    themeColor: 'rgb(79, 192, 141)',
    themeImages2: ['/html/static/images/themes/bg.jpg'],
    mainColor: '',
    themeImages: [{
      label: '风景',
      sublist: [{
        label: '风景1',
        img: 'http://static.dei2.com/extensions/img/scenery/scenery01.jpg'
      }, {
        label: '风景2',
        img: 'http://static.dei2.com/extensions/img/scenery/scenery02.jpeg'
      }, {
        label: '风景3',
        img: 'http://static.dei2.com/extensions/img/scenery/scenery03.jpeg'
      }, {
        label: '风景4',
        img: 'http://static.dei2.com/extensions/img/scenery/scenery04.jpeg'
      }, {
        label: '风景5',
        img: 'http://static.dei2.com/extensions/img/scenery/scenery05.jpeg'
      }, {
        label: '风景6',
        img: 'http://static.dei2.com/extensions/img/scenery/scenery06.jpeg'
      }, {
        label: '风景7',
        img: 'http://static.dei2.com/extensions/img/scenery/scenery07.jpeg'
      }, {
        label: '风景8',
        img: 'http://static.dei2.com/extensions/img/scenery/scenery08.jpeg'
      }, {
        label: '风景9',
        img: 'http://static.dei2.com/extensions/img/scenery/scenery09.jpeg'
      }, {
        label: '风景10',
        img: 'http://static.dei2.com/extensions/img/scenery/scenery10.jpeg'
      }]
    }, {
      label: '卡通',
      sublist: [{
        label: '人物1',
        img: 'http://static.dei2.com/extensions/img/cartoon/cartoon01.jpg'
      }, {
        label: '人物2',
        img: 'http://static.dei2.com/extensions/img/cartoon/cartoon02.jpeg'
      }, {
        label: '人物3',
        img: 'http://static.dei2.com/extensions/img/cartoon/cartoon03.jpeg'
      }, {
        label: '人物4',
        img: 'http://static.dei2.com/extensions/img/cartoon/cartoon04.jpeg'
      }, {
        label: '人物5',
        img: 'http://static.dei2.com/extensions/img/cartoon/cartoon05.jpeg'
      }]
    }],
    audio: {
      ele: null, // audio对象
      playing: false,
      list: ['http://111.202.85.152/amobile.music.tc.qq.com/C400003X1czK36p18l.m4a?guid=4679788780&vkey=981DA8A6FACF9BEB25B1C8D2CD45B1AE22E54A9F589DF86E59CFEDF8B81C4BE5630285614DE116EBA673958DCC0F680349F3AD2C6377C23A&uin=0&fromtag=66'], // 音频列表
      current: -1, // 当前音频索引
      duration: 0, // 音频总时长
      mode: 'loop', // 播放模式, loop: 单曲重复；list: 列表重复；random: 随机播放
      volume: 1 // 音量
    },
    activeThemeIndex: [0, 1],
    bodyStyles: {},
    events: {
      bodyClick: 'body-click',
      windowResize: 'window-resize'
    },
    localStorageKeys: {
      nemMusic: {
        loginInfo: 'local-nem-music-login-info'
      },
      activeTools: 'local-active-tools',
      inactiveTools: 'local-inactive-tools',
      maxToolCount: 'local-max-tool-count',
      activeThemeIndex: 'local-active-theme-index',
      blankHomePage: 'local-blank-home-page',
      userScripts: 'local-user-scripts'
    },
    blankHomePage: 'default',
    tools: [],
    activeTools: [],
    inactiveTools: [],
    maxToolCount: 4,
    assets: {},
    requestInfo: {},
    loginInfo: {},
    allRoles: [{
      value: 1,
      name: '超级管理员'
    }, {
      value: 2,
      name: '管理员'
    }, {
      value: 3,
      name: '开发者'
    }, {
      value: 4,
      name: '普通用户'
    }],
    needlessLogin: ['Login', 'Register', 'Forget', 'ActivityPreview', 'ArticleList', 'ArticleView'] // 不需要登录的页面
  }
})

export default store

global.store = store
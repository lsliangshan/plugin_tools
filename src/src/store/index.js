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

Vue.use(Vuex)

// const PROTOCOL = location.protocol
// let allPath = ['/register', '/login']
// let allPath = ['Register', 'Login']
const store = new Vuex.Store({
  actions: actions.actions,
  mutations: mutations.mutations,
  getters: getters.getters,
  state: {
    theme: 'dark',
    logo: '/html/static/images/new_logo.png',
    themeColor: 'rgb(79, 192, 141)',
    bodyStyles: {},
    events: {
      bodyClick: 'body-click',
      windowResize: 'window-resize'
    },
    tools: [],
    maxToolCount: 3,
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
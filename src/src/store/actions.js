/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88' . '88
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
 **                                              .'' '< `.___\_<|>_/___.' >'''.
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
import axios from 'axios'
const querystring = require('querystring')
const instance = axios.create({
  timeout: 3000
})
const noop = function () {}
export const actions = {
  [types.LOGIN] ({commit, state}, data) {
    return new Promise(async (resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, 3000)
      // let loginData = await instance({
      //   method: 'post',
      //   baseURL: state.requestInfo.baseUrl,
      //   url: state.requestInfo.login,
      //   data: querystring.stringify(data)
      // }).catch(err => {
      //   reject(new Error(err.message))
      // })
      // resolve(loginData)
    })
  },
  [types.REGISTER] ({commit, state}, data) {
    return new Promise(async (resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, 3000)
      // let registerData = await instance({
      //   method: 'post',
      //   baseURL: state.requestInfo.baseUrl,
      //   url: state.requestInfo.register,
      //   data: querystring.stringify(data)
      // }).catch(err => {
      //   reject(new Error(err.message))
      // })
      // resolve(registerData)
    })
  },
  [types.AJAX] ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      let params = JSON.parse(JSON.stringify(data))
      if (params.url === '') {
        reject(new Error('url不能为空'))
      }
      let requestData = {
        method: params.method || 'post',
        baseURL: params.baseUrl || state.requestInfo.baseUrl,
        url: params.url
        // ,
        // data: querystring.stringify(params.data)
      }
      if (params.method && params.method.toLowerCase() === 'get') {
        requestData.params = params.data
      } else {
        requestData.data = params.data
      }
      instance(requestData).then(({data}) => {
        resolve(data)
      }).catch(err => {
        if (err.message.indexOf('timeout') > -1) {
          reject(new Error('接口超时，请稍后重试'))
        } else {
          reject(new Error(err.message))
        }
      })
    })
  },
  [types.AJAX2] ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      let params = JSON.parse(JSON.stringify(data))
      if (params.url === '') {
        reject(new Error('url不能为空'))
      }
      instance({
        method: params.method || 'post',
        baseURL: params.baseUrl || state.requestInfo.baseUrl,
        url: params.url,
        data: querystring.stringify(params.data)
      }).then((res) => {
        if (res.config) {
          delete res.config
        }
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取用户信息
  async [types.GET_USER_INFO] ({commit, state}, data) {
    let callback = noop
    let error = noop
    if (data.callback) {
      callback = data.callback
      delete data.callback
    }
    if (data.error) {
      error = data.error
      delete data.error
    }
    let userData = await instance({
      method: 'post',
      baseURL: state.requestInfo.baseUrl,
      url: state.requestInfo.getUserInfo,
      data: querystring.stringify(data)
    })
    if (userData.config) {
      delete userData.config
    }
    if (userData.status === 200) {
      callback(userData.data)
    } else {
      error(userData)
    }
  },
  // 更新用户信息
  async [types.UPDATE_USER_INFO] ({commit, state}, data) {
    let callback = noop
    let error = noop
    if (data.callback) {
      callback = data.callback
      delete data.callback
    }
    if (data.error) {
      error = data.error
      delete data.error
    }
    let userData = await instance({
      method: 'post',
      baseURL: state.requestInfo.baseUrl,
      url: state.requestInfo.updateUserInfo,
      data: querystring.stringify(data)
    })
    if (userData.config) {
      delete userData.config
    }
    if (userData.status === 200) {
      callback(userData.data)
    } else {
      error(userData)
    }
  },
  // 修改密码
  async [types.MODIFY_PASSWORD] ({commit, state}, data) {
    let callback = noop
    let error = noop
    if (data.callback) {
      callback = data.callback
      delete data.callback
    }
    if (data.error) {
      error = data.error
      delete data.error
    }
    let userData = await instance({
      method: 'post',
      baseURL: state.requestInfo.baseUrl,
      url: state.requestInfo.modifyPassword,
      data: querystring.stringify(data)
    })
    if (userData.config) {
      delete userData.config
    }
    if (userData.status === 200) {
      callback(userData.data)
    } else {
      error(userData)
    }
  }
}

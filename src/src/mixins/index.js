// import * as types from '../store/mutation-types'
// import {RouterUtil} from '../utils/index'
// import jsonp from 'jsonp'

export default {
  methods: {
    isPc () {
      let sUserAgent = navigator.userAgent.toLowerCase()
      let bIsIpad = sUserAgent.match(/ipad/i)
      let bIsIphoneOs = sUserAgent.match(/iphone os/i)
      let bIsMidp = sUserAgent.match(/midp/i)
      let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i)
      let bIsUc = sUserAgent.match(/ucweb/i)
      let bIsAndroid = sUserAgent.match(/android/i)
      let bIsCE = sUserAgent.match(/windows ce/i)
      let bIsWM = sUserAgent.match(/windows mobile/i)
      return !(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)
    }
  }
}
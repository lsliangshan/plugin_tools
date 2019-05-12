<template>
  <div class="pinyin_container"
       :style="pinyinContainerStyles">
    <div class="pinyin_inner">
      <Split v-model="split"
             min="100"
             mode="vertical">
        <div slot="top"
             class="demo-split-pane">
          <Input type="textarea"
                 autofocus
                 class="unformat_wrapper no_bg"
                 :value="urlStr"
                 placeholder="请输入url或JSON格式参数"
                 @on-keydown="input"
                 @on-change="change" />
        </div>
        <div slot="trigger"
             class="trigger_container">
          <div class="trigger_wrapper">
            <Icon type="ios-code"
                  size="14" />
          </div>
          <transition name="tips-right-transition"
                      enter-active-class="animated fadeIn"
                      leave-active-class="animated fadeOut">
            <div class="tips_right"
                 v-if="ajaxAvailable">
              <Select v-model="requestMethod"
                      size="small"
                      style="width: 100px; margin-right: 10px;">
                <Option v-for="item in allRequestMethods"
                        :value="item.value"
                        :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="primary"
                      size="small"
                      @click="ajax">发送</Button>
            </div>
          </transition>
          <Button type="primary"
                  size="small"
                  style="position: absolute; right: 15px;"
                  @click="openHistoryDrawer">历史记录
            <Icon type="ios-arrow-forward" /></Button>
        </div>
        <div slot="bottom"
             class="demo-split-pane-2">
          <!-- <span class="result_placeholder"
                v-if="!formattedStr">URL参数解析</span> -->
          <div class="converted_container fs16"
               v-if="ajaxAvailable">
            <Split v-model="convertedSplit">
              <div slot="left"
                   class="params_container">
                <div class="params_item params_item_sticky"
                     style="height: 30px; font-size: 12px;">
                  <div class="params_item_status"></div>
                  <div class="params_item_label"
                       style="height: 30px;">
                    <span>键</span>
                  </div>
                  <div class="params_item_value"
                       style="height: 30px;">
                    <span>值</span>
                  </div>
                </div>
                <div class="params_item"
                     @mouseenter="hoverInItem"
                     @mouseleave="hoverOutItem"
                     v-for="(item, index) in jsonParams"
                     :key="index">
                  <div class="params_item_status">
                    <Checkbox v-model="item.status"
                              @on-change="changeJsonParams"></Checkbox>
                  </div>
                  <div class="params_item_label">
                    <Input class="w100p"
                           v-model="item.key"
                           @on-change="changeJsonParams" />
                  </div>
                  <div class="params_item_value">
                    <Input class="w100p"
                           v-model="item.value"
                           @on-change="changeJsonParams" />
                  </div>
                  <div class="params_item_delete"
                       @click="deleteItem(index)">
                    <Icon type="md-close"
                          size="20"
                          color="#ed4014" />
                  </div>
                </div>
                <div class="params_item add_params">
                  <Button type="primary"
                          shape="circle"
                          size="small"
                          icon="md-add"
                          :disabled="!addAvailable"
                          @click="addItem"></Button>
                </div>
              </div>
              <div slot="trigger"
                   class="trigger_container"
                   style="cursor: ew-resize; pointer-events: none;">
                <div class="trigger_wrapper"
                     style="transform: rotate(0deg); pointer-events: auto;">
                  <Icon type="ios-code"
                        size="14" />
                </div>
              </div>
              <div slot="right"
                   class="response_container">
                <transition name="ajax-loading-transition"
                            enter-active-class="animated fadeIn"
                            leave-active-class="animated fadeOut">
                  <div class="ajax_loading_container"
                       v-if="ajaxLoading">
                    <Spin></Spin>
                  </div>
                </transition>
                <transition name="response-transition"
                            enter-active-class="animated fadeIn"
                            leave-active-class="animated fadeOut">
                  <div class="formatted_response"
                       v-if="!ajaxLoading && (responseType === 'json')"
                       v-html="formattedResponse"></div>
                </transition>
                <transition name="response-transition"
                            enter-active-class="animated fadeIn"
                            leave-active-class="animated fadeOut">
                  <div class="formatted_response formatted_response_image"
                       v-if="!ajaxLoading && (responseType === 'image')">
                    <img :src="originResponse"
                         @load="hideAjaxLoading"
                         alt="">
                  </div>
                </transition>
              </div>
            </Split>
          </div>
          <div v-html="formattedStr"
               v-else
               class="fs16"></div>
        </div>
      </Split>
    </div>

    <Drawer title="历史请求"
            :closable="false"
            width="400"
            v-model="historyOpened">
      <div class="history_item"
           v-for="(item, index) in ajaxHistory"
           :key="index"
           @click="setActiveAjax(item)"
           @mouseenter="hoverInItem"
           @mouseleave="hoverOutItem">
        <div class="history_item_tag"
             style="pointer-events: none;">
          <Tag color="primary">{{item.method}}</Tag>
        </div>
        <tooltip max-width="308"
                 placement="left"
                 :transfer="true"
                 :content="item.url">
          <div class="history_item_value">
            <p>{{item.url}}</p>
          </div>
        </tooltip>
        <div class="history_item_delete"
             @click="deleteHistoryItem($event, index)">
          <Icon type="md-close"
                size="20"
                color="#ed4014" />
        </div>
      </div>
    </Drawer>
  </div>
</template>
<style scoped>
.w100p {
  width: 100%;
}
.pinyin_container {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pinyin_inner {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
}
.demo-split-pane {
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.unformat_wrapper {
  width: 100%;
  height: 100%;
  outline: none;
}
.trigger_container {
  width: 100%;
  height: 20px;
  cursor: ns-resize;
  margin-top: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tips_left {
  width: calc(50% - 10px);
  height: 20px;
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.tips_right {
  position: absolute;
  right: 0;
  width: calc(50% - 10px);
  height: 20px;
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.tips_right .tone {
  margin-left: 8px;
}
.trigger_wrapper {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid #aaaaaa;
  color: #aaaaaa;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  transform: scale(1) rotate(90deg);
}
.trigger_wrapper:hover,
.trigger_wrapper:active {
  transform: scale(1.2) rotate(90deg);
}
.converted_container {
  height: 100%;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  overflow-y: auto;
  font-size: 16px;
  padding: 0;
  /* padding: 8px; */
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.demo-split-pane-2 {
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.params_container {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 20px 10px 10px;
  box-sizing: border-box;
}
.params_item {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.add_params {
  padding-right: 32px;
  box-sizing: border-box;
  justify-content: flex-end;
}
.params_item_sticky {
  position: sticky;
  left: 0;
  top: 0;
  z-index: 98888;
  background-color: #fff;
}
.params_item_status {
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.params_item_label {
  width: 150px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.params_item_value {
  flex: 1;
  margin-left: 20px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.params_item_delete {
  width: 32px;
  height: 32px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.params_item.active .params_item_delete {
  opacity: 1;
}
.response_container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  overflow: auto;
  padding: 10px 20px 10px 10px;
  box-sizing: border-box;
}
.ajax_loading_container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
}
.formatted_response {
  word-break: break-all;
}
.formatted_response_image {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.formatted_response_image img {
  max-width: 100%;
  max-height: 100%;
}

.history_item {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.history_item_delete {
  width: 32px;
  height: 32px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.history_item.active .history_item_delete {
  opacity: 1;
}
.history_item:hover {
  background-color: #f8f8f8;
  cursor: pointer;
}
.history_item_tag {
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.history_item_value {
  width: 276px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.history_item_value p {
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  line-height: 40px;
}
</style>
<script>
import * as types from '../../store/mutation-types'
import { StorageUtil } from '../../utils/index'
import qs from 'qs'
import axios from 'axios'
import '../../../static/js/jquery.json'
import '../../../static/js/json2'
import '../../../static/js/jsonlint'
export default {
  name: 'url',
  data () {
    return {
      split: 0.2,
      convertedSplit: 0.5,
      hostStr: '',
      urlStr: '',
      urlStrInput: false,
      jsonParams: [
        {
          key: '',
          value: '',
          status: true
        }
      ],
      formattedStr: '',
      formattedResponse: '',
      originalText: '',
      targetText: '',
      needTone: false, // 是否需要标注音调
      ajaxAvailable: false,
      requestMethod: 'GET',
      allRequestMethods: [
        {
          label: 'POST',
          value: 'POST'
        },
        {
          label: 'GET',
          value: 'GET'
        }
      ],
      ajaxLoading: false,
      historyOpened: false,
      originResponse: '',
      responseType: 'json' // json/image
    }
  },
  computed: {
    localStorageKeys () {
      return this.$store.state.localStorageKeys
    },
    bodyStyles () {
      return this.$store.state.bodyStyles
    },
    ajaxHistory () {
      return this.$store.state.ajaxHistory
    },
    pinyinContainerStyles () {
      return {
        height: this.bodyStyles.height - 65 + 'px'
      }
    },
    addAvailable () {
      let params = this.jsonParams
      let emptyCount = 0
      let i = 0
      for (i; i < params.length; i++) {
        if (params[i].hasOwnProperty('key') && params[i].hasOwnProperty('value') && (params[i].key.trim() === '') && (params[i].value.trim() === '')) {
          emptyCount += 1
        }
      }
      return (emptyCount < 1)
    }
  },
  created () {
    if (this.$route.name === 'url') {
      this.getQueryStr()
      this.getLocalAjaxHistory()
    }
  },
  methods: {
    getQueryStr () {
      if (this.$route.query.q) {
        this.urlStr = decodeURIComponent(this.$route.query.q.trim())
        this.change({
          target: {
            value: this.urlStr
          }
        })
      }
    },
    setActiveAjax (data) {
      this.change({
        target: {
          value: data.url
        }
      })
      this.formattedResponse = ''
      this.responseType = 'json'
      this.hostStr = data.host
      this.requestMethod = data.method
      this.closeHistoryDrawer()
    },
    async getLocalAjaxHistory () {
      await this.$store.commit(types.GET_AJAX_HISTORY)
    },
    findHistoryIndex (history) {
      let ajaxHistory = JSON.parse(JSON.stringify(this.ajaxHistory))
      let outIndex = -1
      let i = 0
      for (i; i < ajaxHistory.length; i++) {
        if (ajaxHistory[i].url === history.url) {
          outIndex = i
          i = ajaxHistory.length
        }
      }
      return outIndex
    },
    insertAjaxHistory (history) {
      let ajaxHistory = JSON.parse(JSON.stringify(this.ajaxHistory))
      let historyIndex = this.findHistoryIndex(history)
      if (historyIndex > -1) {
        ajaxHistory.splice(historyIndex, 1)
      }
      ajaxHistory.push(history)
      this.$store.commit(types.CACHE_AJAX_HISTORY, ajaxHistory)
    },
    cacheLocalAjaxHistory () {
      if (!this.hostStr || this.hostStr.trim() === '') {
        return
      }
      let localData = {
        method: this.requestMethod,
        url: this.urlStr,
        host: this.hostStr
      }
      this.insertAjaxHistory(localData)
    },
    hoverInItem (e) {
      if (!e.target.classList.contains('active')) {
        e.target.classList.add('active')
      }
    },
    hoverOutItem (e) {
      if (e.target.classList.contains('active')) {
        e.target.classList.remove('active')
      }
    },
    changeJsonParams (e) {
      this.setUrlStr(this.jsonParams)
    },
    deleteItem (index) {
      this.urlStrInput = false
      this.jsonParams.splice(Number(index), 1)
      this.setUrlStr(this.jsonParams)
    },
    deleteHistoryItem (evt, index) {
      evt.preventDefault()
      evt.stopPropagation()
      let ajaxHistory = JSON.parse(JSON.stringify(this.ajaxHistory))
      ajaxHistory.splice(index, 1)
      this.$store.commit(types.CACHE_AJAX_HISTORY, ajaxHistory)
    },
    addItem () {
      this.urlStrInput = true
      this.jsonParams.push({
        key: '',
        value: '',
        status: true
      })
    },
    input (e) {
      let keycode = e.charCode || e.keyCode
      if (keycode === 13) {
        if (window.event) {
          window.event.returnValue = false;
        } else {
          e.preventDefault(); //for firefox
        }
      }
    },
    change (e) {
      let value = e.target.value.trim()
      this.urlStr = value
      if (!value || value.trim() === '') {
        this.ajaxAvailable = false
        this.setHostStr('')
        this.responseType = 'json'
        this.originResponse = ''
        this.jsonParams = []
        return
      }
      if (!value.match(/['"]/g)) {
        this.ajaxAvailable = true
        this.setJsonParams(value)
        this.setHostStr(value)
      } else {
        this.ajaxAvailable = false
        this.setHostStr('')
        this.jsonParams = []
        let v = value.replace(/'/g, '\"').replace(/(\{[a-z0-9])/ig, item => item.substring(0, 1) + '\"' + item.substring(1, 2))
          // .replace(/([a-z0-9]\})/ig, item => item.substring(0,1) + '\"' + item.substring(1,2))
          .replace(/([a-z0-9]:(?!\/))/ig, item => item.substring(0, 1) + '\"' + item.substring(1, 2))
          // .replace(/(,[a-z0-9])/ig, item => item.substring(0,1) + '\"' + item.substring(1,2))
          // .replace(/([a-z0-9],)/ig, item => item.substring(0,1) + '\"' + item.substring(1,2))
          .replace(/(:\/)/g, item => '%3A' + item.substring(1, 2))
          .replace(/\//g, '%2F')
        let objV = {}
        try {
          this.currentJson = jsonlint.parse(v)
          this.currentJsonStr = JSON.stringify(this.currentJson)
          objV = JSON.parse(v)
          this.formattedStr = this.getFormatParamsStr(objV)
        } catch (err) {
          this.formattedStr = '<span style="color: #f1592a; font-weight: bold;">' + err + '</span>'
        }
      }
    },
    setUrlStr (data) {
      let params = JSON.parse(JSON.stringify(data))
      let i = 0
      let outArr = []
      for (i; i < params.length; i++) {
        if (params[i].status) {
          outArr.push(params[i].key + '=' + params[i].value)
        }
      }
      this.urlStr = this.hostStr + (outArr.length > 0 ? ('?' + outArr.join('&')) : outArr.join('&'))
    },
    setHostStr (str) {
      this.hostStr = str.replace(/^(.*)\?.*/, '$1')
    },
    setJsonParams (str) {
      let outObj = []
      let s = str.replace(/^(.*\?)/, '')
      if (s.indexOf('?') < 0 && s.indexOf('&') < 0 && s.indexOf('=') < 0) {
        this.jsonParams = []
        return
      }
      let urlArr = s.split('&')
      for (let i = 0; i < urlArr.length; i++) {
        if (!outObj.hasOwnProperty(urlArr[i].split('=')[0])) {
          outObj.push({
            key: urlArr[i].split('=')[0] || '',
            value: urlArr[i].split('=')[1] || '',
            status: true
          })
        }
      }
      this.jsonParams = outObj
    },
    getFormatParamsStr (obj) {
      let outStr = []
      for (let o in obj) {
        if (obj.hasOwnProperty(o)) {
          outStr.push(o + '=' + obj[o])
        }
      }
      return outStr.join('&')
    },
    formatUrlParams (s) {
      let outObj = {}
      let urlArr = s.split('&')
      for (let i = 0; i < urlArr.length; i++) {
        if (!outObj.hasOwnProperty(urlArr[i].split('=')[0])) {
          outObj[urlArr[i].split('=')[0]] = urlArr[i].split('=')[1]
        }
      }
      return outObj
    },
    getFormatParamsObj (str) {
      let _s = ''
      if (str.indexOf('?') < 0) {
        if (str.indexOf('&') < 0) {
          if (str.indexOf('=') > 0) {
            let _o = {}
            _o[str.split('=')[0]] = str.split('=')[1]
            return new JSONFormat(JSON.stringify(_o), 4).toString()
          }
          return new JSONFormat('{}', 4).toString()
        } else {
          _s = str
        }
      } else {
        _s = str.split('?')[1]
      }
      return new JSONFormat(JSON.stringify(this.formatUrlParams(_s)), 4).toString()
    },
    findIndexByKeyInArr (key, arr) {
      let outIndex = -1
      let i = 0
      for (i; i < arr.length; i++) {
        if (arr[i].key === key) {
          outIndex = i
          i = arr.length
        }
      }
      return outIndex
    },
    getObj (str) {
      let outObj = JSON.parse(JSON.stringify(this.jsonParams))
      let s = str.replace(/^(.*\?)/, '')
      let a = s.split('&')
      let i = 0
      for (i; i < a.length; i++) {
        let k = a[i].split('=')[0]
        let v = a[i].split('=')[1] || ''
        let _index = this.findIndexByKeyInArr(k, outObj)
        if (_index < 0) {
          outObj.push({
            key: k,
            value: v,
            id: this.getUUID(),
            status: true
          })
        } else {
          outObj.splice(_index, 1, {
            key: k,
            value: v,
            status: true
          })
        }
      }
      return outObj
    },
    getRequestData () {
      let outData = {}
      let params = JSON.parse(JSON.stringify(this.jsonParams))
      let i = 0
      for (i; i < params.length; i++) {
        if (params[i].key && !outData.hasOwnProperty(params[i].key)) {
          outData[params[i].key] = params[i].value
        }
      }
      return outData
    },
    hideAjaxLoading (ts) {
      setTimeout(() => {
        this.ajaxLoading = false
      }, ts || 800)
    },
    setFormattedResponse (data) {
      try {
        this.formattedResponse = new JSONFormat(JSON.stringify(data), 4).toString()
      } catch (err) {
        this.formattedResponse = '<span style="color: #f1592a; font-weight: bold;">' + err + '</span>'
      }
    },
    getContentType (header) {
      if (header.hasOwnProperty('content-type')) {
        return header['content-type']
      } else if (header.hasOwnProperty('Content-Type')) {
        return header['Content-Type']
      } else if (header.hasOwnProperty('content-Type')) {
        return header['content-Type']
      } else if (header.hasOwnProperty('Content-type')) {
        return header['Content-type']
      } else {
        return ''
      }
    },
    async ajax () {
      return new Promise((resolve, reject) => {
        this.ajaxLoading = true
        let args = {
          url: this.hostStr,
          method: this.requestMethod,
          data: this.getRequestData()
        }
        if (!args.url || args.url.trim() === '') {
          reject(new Error('url不能为空'))
        }
        if (args.url.match(/^\/\//)) {
          args.url = 'http://' + args.url.replace(/^\/\//, '')
        } else if (args.url.match(/^http(s?):\/\//)) {
        } else {
          args.url = 'http://' + args.url
        }
        if (args.method.toLowerCase() === 'get') {
          if (args.url.indexOf('?') > 0) {
            args.url += '&' + qs.stringify(args.data)
          } else {
            args.url += '?' + qs.stringify(args.data)
          }
          delete args.data
        } else {
          if (args.data && Object.keys(args.data).length > 0) {
            args.data = qs.stringify(args.data)
          }
        }
        if (args.headers && Object.keys(args.headers).length > 0) {
          args.headers = qs.stringify(args.headers)
        }
        let requestParams = {
          // url: 'http://127.0.0.1:3000/Zpm/cli/a',
          url: 'https://talkapi.dei2.com/Zpm/cli/a',
          method: 'POST',
          data: qs.stringify(args)
        }
        axios(requestParams).then(({ data, headers }) => {
          if ((data.status === 200) && data.data && (Object.keys(data.data).length > 0)) {
            this.hideAjaxLoading()
            let contentType = this.getContentType(data.data.headers)
            if (data.data.headers && contentType.indexOf('image/') > -1) {
              // 返回图片
              this.responseType = 'image'
              this.originResponse = this.urlStr
            } else {
              this.responseType = 'json'
              this.setFormattedResponse(data.data.data)
              this.$Notice.success({
                title: '请求成功'
              })
              this.cacheLocalAjaxHistory()
            }
            resolve(true)
          } else {
            let errMsg = data.message || '请求失败，请稍后再试'
            this.formattedResponse = '<span style="color: #f1592a; font-weight: bold;">' + errMsg + '</span>'
            this.$Notice.error({
              title: errMsg
            })
            resolve(true)
          }
        }).catch(error => {
          console.log('error: ', error.message)
          this.hideAjaxLoading()
          this.formattedResponse = '<span style="color: #f1592a; font-weight: bold;">' + error.message + '</span>'
          this.$Notice.error({
            title: error.message
          })
          resolve(true)
        })
      })
    },
    openHistoryDrawer () {
      this.historyOpened = true
    },
    closeHistoryDrawer () {
      this.historyOpened = false
    }
  },
  watch: {
    urlStr: {
      immediate: true,
      handler (val) {
        // if (val.trim() === '') {
        //   this.formattedStr = ''
        // } else {
        //   if (!val.match(/['"]/g)) {
        //     this.formattedStr = this.getFormatParamsObj(val)
        //     if (!this.disableItemWithoutDelete) {
        //       this.jsonParams = this.getObj(val)
        //     }
        //   } else {
        //     this.jsonParams = []
        //     let v = val.replace(/'/g, '\"').replace(/(\{[a-z0-9])/ig, item => item.substring(0, 1) + '\"' + item.substring(1, 2))
        //       // .replace(/([a-z0-9]\})/ig, item => item.substring(0,1) + '\"' + item.substring(1,2))
        //       .replace(/([a-z0-9]:(?!\/))/ig, item => item.substring(0, 1) + '\"' + item.substring(1, 2))
        //       // .replace(/(,[a-z0-9])/ig, item => item.substring(0,1) + '\"' + item.substring(1,2))
        //       // .replace(/([a-z0-9],)/ig, item => item.substring(0,1) + '\"' + item.substring(1,2))
        //       .replace(/(:\/)/g, item => '%3A' + item.substring(1, 2))
        //       .replace(/\//g, '%2F')
        //     let objV = {}
        //     try {
        //       this.currentJson = jsonlint.parse(v)
        //       this.currentJsonStr = JSON.stringify(this.currentJson)
        //       objV = JSON.parse(v)
        //       this.formattedStr = this.getFormatParamsStr(objV)
        //     } catch (err) {
        //       this.formattedStr = '<span style="color: #f1592a; font-weight: bold;">' + err + '</span>'
        //     }
        //   }
        // }
      }
    },
    jsonParams: {
      deep: true,
      handler (val) {
        // if (!this.urlStrInput) {
        //   let outStr = []
        //   let i = 0
        //   for (i; i < val.length; i++) {
        //     if (val[i].status) {
        //       outStr.push(val[i].key + '=' + val[i].value)
        //     }
        //   }
        //   if (this.urlStr.indexOf('?') > -1) {
        //     this.urlStr = this.urlStr.replace(/(.*\?)(.*)$/, '$1' + outStr.join('&'))
        //   } else {
        //     this.urlStr = outStr.join('&')
        //   }
        // }
      }
    }
  }
}
</script>
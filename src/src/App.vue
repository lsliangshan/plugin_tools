<template>
  <div id="app">
    <router-view name="HomeRouter" />
    <all-svg></all-svg>
    <transition name="audio-box-transition"
                enter-active-class="animated slideInUp faster"
                leave-active-class="animated slideOutDown faster">
      <audio-box v-if="showAudio"></audio-box>
    </transition>
  </div>
</template>

<script>
// https://developers.google.com/web/updates/2017/06/play-request-was-interrupted !!!!!!
import * as types from './store/mutation-types'
import router from './router/content-routes.js'
import CodeRoutes from './router/code-routes.js'
import ConvenienceRoutes from './router/convenience-routes.js'
import MultiMediaRoutes from './router/multi-media-routes.js'
import StationMasterRoutes from './router/station-master-routes.js'
import { StorageUtil } from './utils/index.js'
export default {
  name: 'App',
  components: {
    AllSvg: () => import('./components/common/svgs.vue'),
    AudioBox: () => import('./components/pages/audio/components/AudioBox.vue')
  },
  data () {
    return {
      audioEle: null,
      sseUrl: 'http://127.0.0.1:3000/enkel/index/sse'
    }
  },
  computed: {
    tools () {
      return this.$store.state.tools
    },
    maxToolCount () {
      return this.$store.state.maxToolCount
    },
    localStorageKeys () {
      return this.$store.state.localStorageKeys
    },
    activeThemeIndex () {
      return this.$store.state.activeThemeIndex
    },
    blankHomePage () {
      return this.$store.state.blankHomePage
    },
    events () {
      return this.$store.state.events
    },
    showAudio () {
      return this.$store.state.showAudio
    }
  },
  created () {
    document.onclick = e => {
      this.$eventHub.$emit(this.events.bodyClick, e)
    }
    window.onresize = this.windowResize
    this.$nextTick(() => {
      this.cacheBodyStyles()
      this.$Message.config({
        top: 50,
        duration: 5
      })
    })
  },
  async mounted () {
    this.$store.commit(types.INIT_TOOLS, {
      tools: this.getAllTools()
    })
    this.$store.commit(types.SET_ACTIVE_TOOLS, {
      tools: await this.getActiveTools()
    })
    this.$store.commit(types.SET_INACTIVE_TOOLS, {
      tools: await this.getInactiveTools()
    })
    this.$store.commit(types.SET_MAX_TOOL_COUNT, {
      count: await this.getMaxToolCount()
    })
    this.$store.commit(types.SET_ACTIVE_THEME_INDEX, {
      activeThemeIndex: await this.getActiveThemeIndex()
    })
    this.$store.commit(types.SET_BLANK_HOME_PAGE, {
      blankHomePage: await this.getBlankHomePage()
    })
    // this.connect()
  },
  methods: {
    connect (args) {
      const sse = new EventSource(`${this.sseUrl}?id=all&mt=notification`)
      sse.addEventListener('notification', this.notify)
    },
    notify (data) {
      var title = 'PWA即学即用';
      var options = {
        body: '邀请你一起学习' + JSON.stringify(data.data),
        icon: '/static/images/120.png',
        // actions: [{
        //   action: 'show-book',
        //   title: '去看看'
        // }, {
        //   action: 'contact-me',
        //   title: '联系我'
        // }],
        tag: 'pwa-starter',
        renotify: true
      }
      let notification = new Notification(title, options)
      console.log('.....notification....', data.data)
    },
    windowResize (e) {
      this.cacheBodyStyles()
      this.$eventHub.$emit(this.events.windowResize, e)
    },
    cacheBodyStyles () {
      this.$store.commit(types.SET_BODY_STYLES, {
        styles: {
          width:
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth,
          height:
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight
        }
      })
    },
    getAllTools_bak () {
      let outPath = []
      // let homeObj = {}
      // if (router.hasOwnProperty('name')) {
      //   homeObj.name = router.name
      // }
      // if (router.hasOwnProperty('meta') && router.meta.label) {
      //   homeObj.label = router.meta.label
      // } else {
      //   homeObj.label = router.name
      // }
      for (let i = 0; i < router.children.length; i++) {
        let tempObj = {}
        if (router.children[i].hasOwnProperty('name')) {
          tempObj.name = router.children[i].name
        }
        if (
          router.children[i].hasOwnProperty('meta') &&
          router.children[i].meta.label
        ) {
          tempObj.label = router.children[i].meta.label
        } else {
          tempObj.label = router.children[i].name
        }
        outPath.push(tempObj)
      }
      return outPath
    },
    getTools (routes) {
      let outObj = {}
      if (routes.hasOwnProperty('meta') && routes.meta.name) {
        outObj.name = routes.meta.name
      } else {
        outObj.name = routes.name || '工具集'
      }
      outObj.sublist = []
      for (let i = 0; i < routes.children.length; i++) {
        let tempObj = {}
        if (routes.children[i].hasOwnProperty('name')) {
          tempObj.pathName = routes.children[i].name
        }
        tempObj = Object.assign({}, tempObj, routes.children[i].meta)
        outObj.sublist.push(tempObj)
      }
      return outObj
    },
    getAllTools () {
      let outPath = []
      outPath.push(this.getTools(CodeRoutes))
      outPath.push(this.getTools(StationMasterRoutes))
      outPath.push(this.getTools(MultiMediaRoutes))
      outPath.push(this.getTools(ConvenienceRoutes))
      return outPath
    },
    getActiveTools () {
      return new Promise(async resolve => {
        let activeTools = await StorageUtil.getItem(
          this.localStorageKeys.activeTools
        )
        resolve(activeTools || JSON.parse(JSON.stringify(this.tools)))
      })
    },
    getInactiveTools () {
      return new Promise(async resolve => {
        let inactiveTools = await StorageUtil.getItem(
          this.localStorageKeys.inactiveTools
        )
        resolve(inactiveTools || [])
      })
    },
    getMaxToolCount () {
      return new Promise(async resolve => {
        let maxToolCount = await StorageUtil.getItem(
          this.localStorageKeys.maxToolCount
        )
        resolve(maxToolCount || this.maxToolCount)
      })
    },
    getActiveThemeIndex () {
      return new Promise(async resolve => {
        let activeThemeIndex = await StorageUtil.getItem(
          this.localStorageKeys.activeThemeIndex
        )
        resolve(activeThemeIndex || this.activeThemeIndex)
      })
    },
    getBlankHomePage () {
      return new Promise(async resolve => {
        let blankHomePage = await StorageUtil.getItem(
          this.localStorageKeys.blankHomePage
        )
        resolve(blankHomePage || this.blankHomePage)
      })
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  /*-webkit-user-select: none;*/
  /*font-family: Menlo,Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,serif;*/
  /*font: 12px/16px Menlo,Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,serif;*/
}
#app {
  /*background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537032993978&di=921b9815b1aabefc0b60ba1de79fc70c&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201605%2F31%2F234941i5wc5mii0juw3iat.jpg);
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-color: red;*/
}
.unformat_wrapper textarea {
  outline: none;
  width: 100%;
  height: 100% !important;
  resize: none;
  background-color: rgba(255, 255, 255, 0.9);
}
.unformat_wrapper .ivu-input:hover,
.unformat_wrapper .ivu-input:focus {
  border-color: #dcdee2;
  box-shadow: none;
}
.no-resize textarea {
  resize: none;
}
.textarea100p textarea {
  height: 100%;
}
.window_cmd_input input {
  height: 40px;
  color: #ccc;
  font-size: 12px;
  border: none;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  background-color: transparent;
}
.window_cmd_input .ivu-input:hover {
  border: none;
  border-radius: 0;
}
.window_cmd_input .ivu-input:focus {
  border: none;
  box-shadow: none;
}
.base64_container .ivu-tabs-content {
  /*background: rgba(255, 255, 255, .9);*/
  height: calc(100% - 33px) !important;
}
.base64_container .ivu-tabs-bar {
  border-color: transparent !important;
  -webkit-user-select: none;
}
.base64_container > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
  background-color: rgba(255, 255, 255, 0.9);
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  /*padding: 16px;*/
  /*box-sizing: border-box;*/
}
.base64_container > .ivu-tabs-card > .ivu-tabs-content {
  height: 120px;
  margin-top: -16px;
  font-weight: bolder;
}
.base64_container > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  border-color: transparent !important;
  background-color: rgba(255, 255, 255, 0.9);
  color: rgb(79, 192, 141) !important;
}
.base64_container .ivu-tabs-nav .ivu-tabs-tab:hover {
  color: rgb(79, 192, 141) !important;
}
.no_bg textarea {
  background-color: transparent !important;
}
.error_input textarea {
  color: #ed4014 !important;
}
.base64_container .ivu-upload {
  height: 100%;
}
.base64_container .ivu-upload-drag {
  background-color: transparent;
}

.tool_url_container textarea {
  background-color: rgba(255, 255, 255, 0.9);
}

.ajax_container .ivu-tabs-card > .ivu-tabs-bar {
  border-color: transparent !important;
  -webkit-user-select: none;
}
.ajax_container .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
  background-color: transparent;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 15px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
}
.ajax_container .ivu-tabs-card > .ivu-tabs-content {
  /*height: 120px;*/
  height: calc(100% - 33px) !important;
  margin-top: -16px;
  font-weight: bolder;
}
.ajax_container .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  border-color: transparent !important;
  background-color: rgba(255, 255, 255, 0.9);
  color: rgb(79, 192, 141) !important;
}
.ajax_container .ivu-tabs-card > .ivu-tabs-nav .ivu-tabs-tab {
  font-size: 12px;
  display: inline-flex;
  align-items: center;
}
.ajax_container .ivu-tabs-card > .ivu-tabs-nav .ivu-tabs-tab:last-child {
  width: 50px;
  justify-content: center;
  overflow: hidden;
  font-size: 18px;
}
.ajax_container .ivu-tabs-card > .ivu-tabs-nav .ivu-tabs-tab:last-child i {
  display: none;
}
.ajax_container .ivu-tabs-card > .ivu-tabs-nav .ivu-tabs-tab:hover {
  color: rgb(79, 192, 141) !important;
}
.ajax_container .error_input textarea {
  color: #ed4014 !important;
}
.ajax_container .ivu-tabs-card > .ivu-tabs-nav {
  /*max-width: 200px;*/
}
.ajax_container .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border: none;
}
.ajax_container .ivu-tabs-card > .ivu-tabs-nav-scroll {
  overflow-x: auto !important;
}
.ajax_container .ivu-tabs-card > .ivu-tabs-nav-scroll::-webkit-scrollbar {
  display: block;
}
.ajax_container .ivu-tabs-card > .ivu-tabs-nav {
  display: flex;
  /*align-items: center;*/
  transition: none !important;
  transform: none !important;
}

.ajax_container .ivu-tabs-mini .ivu-tabs-content {
  height: calc(100% - 33px) !important;
  margin-top: -16px;
  font-weight: bolder;
}

.no_border_input .ivu-input {
  border: none;
}
.no_border_input .ivu-input:focus,
.no_border_input .ivu-input:hover,
.no_border_input .ivu-input:active {
  border: none;
  box-shadow: none;
}
.select_in_label .ivu-select-selection {
  border: none;
}
.select_in_label
  .ivu-select-single
  .ivu-select-selection
  .ivu-select-placeholder,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  padding-right: 8px !important;
}
.select_in_label .ivu-select-placeholder {
  padding-right: 8px !important;
}
.select_in_label .ivu-select-selection {
  box-shadow: none;
}

.request_inner_textarea textarea {
  resize: none;
  width: 100%;
  height: 100%;
  border: none;
}

.color_container .ivu-upload {
  height: 100%;
}
.color_container .ivu-upload-drag {
  background-color: transparent;
}

.diff_container .diff_input input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}
.diff_container .diff_input input:hover,
.diff_container .diff_input input:focus {
  box-shadow: none;
  border-color: #dcdee2;
}
.diff_container .diff_upload button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.diff_container .diff_upload button:hover {
  border: 1px solid #dcdee2;
}
.diff_container .diff_upload button:focus {
  box-shadow: none;
}

.qrcode_input_wrapper textarea {
  background-color: rgba(255, 255, 255, 0.9);
}

.CodeMirror {
  height: 100% !important;
}

.nem_login_form .ivu-modal-body {
  padding-bottom: 0;
}

.duration_slider .ivu-slider-wrap {
  background-color: rgb(25, 25, 25);
}
.duration_slider .ivu-slider-bar {
  background: linear-gradient(
    to right,
    rgba(79, 192, 141, 0.8),
    rgb(79, 192, 141)
  );
}
.duration_slider .ivu-slider-button {
  border: 3px solid rgb(79, 192, 141);
  /*background-color: #c8c8c8;*/
}

.m-search .ivu-input-search {
  background: rgb(79, 192, 141) !important;
  border-color: rgb(79, 192, 141) !important;
}
.m-search .ivu-input:hover,
.m-search .ivu-input:focus {
  border-color: rgb(79, 192, 141) !important;
}
.m-search .ivu-input:focus {
  box-shadow: none;
}
.m-search .ivu-input::placeholder {
  font-size: 12px;
}

.music_search_page .ivu-select-selected-value {
  margin-right: 20px;
}

.steganography_uploader .ivu-upload {
  height: 100%;
  background-color: transparent;
}
.steganography_uploader .ivu-upload-drag {
  border: none;
}
.steganography_uploader .ivu-upload-drag:hover {
  border: none;
}
</style>

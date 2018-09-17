<template>
  <div id="app">
    <router-view name="HomeRouter"/>
  </div>
</template>

<script>
import * as types from './store/mutation-types'
import router from './router/content-routes.js'
import { StorageUtil } from './utils/index.js'
export default {
  name: 'App',
  data () {
    return {
      events: this.$store.state.events
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
    }
  },
  created () {
    document.onclick = (e) => {
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
  },
  methods: {
    windowResize (e) {
      this.cacheBodyStyles()
      this.$eventHub.$emit(this.events.windowResize, e)
    },
    cacheBodyStyles () {
      this.$store.commit(types.SET_BODY_STYLES, {
        styles: {
          width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
          height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
      })
    },
    getAllTools () {
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
        if (router.children[i].hasOwnProperty('meta') && router.children[i].meta.label) {
          tempObj.label = router.children[i].meta.label
        } else {
          tempObj.label = router.children[i].name
        }
        outPath.push(tempObj)
      }
      return outPath
    },
    getActiveTools () {
      return new Promise(async (resolve) => {
        let activeTools = await StorageUtil.getItem(this.localStorageKeys.activeTools)
        resolve(activeTools || JSON.parse(JSON.stringify(this.tools)))
      })
    },
    getInactiveTools () {
      return new Promise(async (resolve) => {
        let inactiveTools = await StorageUtil.getItem(this.localStorageKeys.inactiveTools)
        resolve(inactiveTools || [])
      })
    },
    getMaxToolCount () {
      return new Promise(async (resolve) => {
        let maxToolCount = await StorageUtil.getItem(this.localStorageKeys.maxToolCount)
        resolve(maxToolCount || this.maxToolCount)
      })
    },
    getActiveThemeIndex () {
      return new Promise(async (resolve) => {
        let activeThemeIndex = await StorageUtil.getItem(this.localStorageKeys.activeThemeIndex)
        resolve(activeThemeIndex || this.activeThemeIndex)
      })
    },
    getBlankHomePage () {
      return new Promise(async (resolve) => {
        let blankHomePage = await StorageUtil.getItem(this.localStorageKeys.blankHomePage)
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
    font-family: Menlo,Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,serif;
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
    height: 100%!important;
    resize: none;
  }
  .unformat_wrapper .ivu-input:hover, .unformat_wrapper .ivu-input:focus {
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
</style>

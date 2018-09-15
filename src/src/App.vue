<template>
  <div id="app">
    <router-view name="HomeRouter"/>
  </div>
</template>

<script>
import * as types from './store/mutation-types'
import router from './router/content-routes.js'
export default {
  name: 'App',
  data () {
    return {
      events: this.$store.state.events
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
  mounted () {
    this.$store.commit(types.INIT_TOOLS, {
      tools: this.getAllTools()
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
    /*font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;*/
    font: 12px/16px Menlo,Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,serif;
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

<template>
  <div class="lyric_container">
    <div class="lyric_wrapper">
      <transition name="lyric-loading-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
        <div class="lyric_loading_container" v-if="!lyricLoaded">
          <Spin size="small"></Spin>
        </div>
      </transition>
      <transition name="no-lyric-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">          
        <div class="no_lyric_inner" v-if="lyricLoaded && (lyricType === 'absolute')">
          纯音乐
        </div>
      </transition>
      <transition name="lyric-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
        <div class="lyric_inner" ref="scrollerRef" v-if="lyricLoaded && (lyricType === 'lyric')">
          <div class="lyric_inner_scroller">
            <div class="lyric_item" v-for="(item, index) in formatLyric" :key="index" :class="{active: (index === currentIndex)}" :ref="'lyricItemRef-' + index">
              {{item | getLyricText}}
            </div>
          </div>          
        </div>
      </transition>
    </div>
  </div>
</template>
<style scoped>
  .lyric_container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .lyric_wrapper {
    position: relative;
    width: 100%;
    height: 100%;    
    overflow: hidden;
  }
  .lyric_loading_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .lyric_inner {
    width: 100%;
    height: 100%;
  }
  .lyric_inner_scroller {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
  }
  .lyric_item {
    width: 100%;
    line-height: 32px;
    color: #989898;
    word-wrap: break-word;
    text-align: center;
    transition: all .3s linear;
    font-size: 12px;
  }
  .lyric_item.active {
    color: rgb(79, 192, 141);
    font-size: 15px;
  }
  .no_lyric_inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 13px;
  }
</style>
<script>
  import IScroll from 'iscroll'
  import { KitUtil } from '../../../../utils/index'
  export default {
    name: 'Lyric',
    props: {
      current: {
        type: [String, Number],
        default: 0
      },
      id: {
        type: [String, Number],
        default: ''
      }
    },
    data () {
      return {
        lyricScroller: null,
        formatLyric: [],
        formatLyricTs: [],
        lyric: {},
        lyricType: '', // 'lyric': 有歌曲并已下载歌词；'nolyric': 有歌词未能下载歌词；'absolute': 纯音乐
        lyricLoaded: false, // 歌词是否加载完毕
      }
    },
    computed: {
      currentIndex () {
        let _index = this.formatLyricTs.findIndex(item => (parseInt(item) >= parseInt(this.current)))
        if (_index < 0) {
          _index = this.formatLyricTs.length - 1
        } else if (_index === 0) {
          _index = 0
        } else {
          _index -= 1
        }
        return _index
      }
    },
    created () {
      
    },
    mounted () {
      // this.lyricScroller = new IScroll(this.$refs.scrollerRef, {
      //   mouseWheel: true,
      //   scrollbars: true
      // })
      this.init()
    },
    methods: {
      async init () {
        this.lyricLoaded = false
        this.lyric = await this.getLyric(this.id)
        this.initLyric()
        this.lyricLoaded = true
        setTimeout(() => {
          this.initScroller()
        }, 300)
      },
      initScroller () {
        if (this.lyricType === 'lyric') {
          this.lyricScroller = new IScroll(this.$refs.scrollerRef, {
            mouseWheel: true,
            scrollbars: true,
            fadeScrollbars: true
          })
        } else {
        }
      },
      initLyric () {
        if (this.lyric && this.lyric.lrc && this.lyric.lrc.lyric) {
          let _lrc = this.lyric.lrc.lyric
          _lrc = _lrc.substring(_lrc.indexOf('[00:00.00]'))
          this.formatLyric = _lrc.split('\n')
          for (let j = 0; j < this.formatLyric.length; j++) {
            if (this.formatLyric[j].replace(/^(\[[^\]]*\])(.*)/, '$2').replace(/[\r\n]/g, '').trim() === '') {
              this.formatLyric.splice(j, 1)
              j--
            }
          }
          let i = 0
          let _ts = []
          for (i; i < this.formatLyric.length; i++) {
            _ts.push(this.formatTs(this.formatLyric[i].replace(/^(\[)([^\]]*)(\])(.*)/, '$2')))
          }
          this.formatLyricTs = _ts
        } else {
          this.formatLyric = []
          this.formatLyricTs = []
        }
      },
      getLyric (id) {
        return new Promise(async (resolve) => {
          let lyricData = await this.$store.dispatch('moduleNem/getLyric', {
            id: this.id
          })
          if (lyricData.lrc && !KitUtil.isEmptyObject(lyricData.lrc) && lyricData.lrc.lyric) {
            this.lyricType = 'lyric'
          } else if (lyricData.nolyric) {
            this.lyricType = 'absolute'
          }
          resolve(lyricData)
        })
      },
      formatTs (ts) {
        let _ms = Number(ts.replace(/.*\.(\d*)$/, '$1'))
        let _s = ts.substring(0, ts.indexOf('.')).split(':')
        if (_s.length === 3) {
          return (_s[0] * 60 * 60 * 1000 + _s[1] * 60 * 1000 + _s[2] * 1000 + _ms)
        } else if (_s.length === 2) {
          return (_s[0] * 60 * 1000 + _s[1] * 1000 + _ms)
        } else if (_s.length === 1) {
          return (_s[0] * 1000 + _ms)
        } else {
          return _ms
        }
      }
    },
    filters: {
      getLyricText (text) {
        return text.replace(/^(\[[^\]]*\])(.*)/, '$2')
      },
      getLyricTime (text) {
        return text.replace(/^(\[)([^\]]*)(\])(.*)/, '$2')
      }
    },
    watch: {
      currentIndex: {
        handler (val) {
          if (val > -1 && this.$refs['lyricItemRef-' + val] && this.$refs['lyricItemRef-' + val][0]) {
            // if (this.lyricScroller) {
            //   this.lyricScroller.refresh()
            // }
            this.lyricScroller.scrollToElement(this.$refs['lyricItemRef-' + val][0], 800, 0, 130)
          }
        }
      },
      id: {
        // immediate: true,
        async handler (val) {
          this.lyricLoaded = false
          this.lyric = await this.getLyric(val)
          this.initLyric()
          this.lyricLoaded = true
          setTimeout(() => {
            this.initScroller()
          }, 300)
        }
      }
    }
  }
</script>
<template>
  <div class="lyric_container">
    <div ref="scrollerRef" class="lyric_wrapper">
      <div class="lyric_inner">
        <div class="lyric_item" v-for="(item, index) in formatLyric" :key="index" :class="{active: (index === currentIndex)}" :ref="'lyricItemRef-' + index">
          {{item | getLyricText}}
        </div>
      </div>
    </div>
    <div style="position: absolute; cursor: pointer; left: 100px; top: 300px; padding: 5px 10px; background-color: darkcyan; color: #fff; font-size: 18px;" @click="testPlay">play</div>
  </div>
</template>
<style scoped>
  .lyric_container {
    position: relative;
    width: 430px;
    height: 260px;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .lyric_wrapper {
    position: relative;
    width: 100%;
    height: 100%;    
    overflow: hidden;
  }
  .lyric_inner {
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
    transition: all .7s linear;
    font-size: 14px;
  }
  .lyric_item.active {
    color: #fff;
    font-size: 16px;
  }
</style>
<script>
  import IScroll from 'iscroll'
  export default {
    name: 'Lyric',
    data () {
      return {
        lyricScroller: null,
        formatLyric: [],
        formatLyricTs: [],
        current: '00:00.00',
        currentIndex: -1,
        lyric: `[00:00.00] 作曲 : whziM/Kaarl
[00:00.63] 作词 : whziM/Kaarl
[00:00.191]这一天终于来了
[00:02.293]我好害怕我真的不骗你我好害怕
[00:09.795]这份姻缘是上天安排的
[00:12.158]阿 你说上天安排就上天安排
[00:16.368]就算他是妖怪我也会一生一世的跟着他
[00:19.354]如果不能跟我喜欢的人在一起的话
[00:22.191]就算让我做玉皇大帝我也不会开心
[00:28.108]你的良心告诉我你最爱的不是我
[00:33.742]我们不会有结果你走让我走吧
[00:35.878]只怪相逢恨晚造物弄人
[00:38.685]好 我让你走
[00:40.807]不过临走前你要亲我一下
[00:42.801]你叫我亲我就亲那我的形象不是全毁了
[00:48.149]哎
[00:48.946]我现在郑重宣布这个山头所有的东西都属于我的
[00:52.813]包括你在内
[00:54.028]我？
[00:55.045]是阿
[00:56.734]你现在是我的人了
[00:58.033]如果有人欺负你呢
[00:59.368]你就报我的名字
[01:00.682]从今天起我叫盘丝大仙
[01:16.478]有一天当你发觉你爱上一个你讨厌的人
[01:18.871]这段感情才是最要命
[01:21.818]哼 我怎么会爱上我讨厌的人呢
[01:52.805]All I hear is a constant radio
[01:59.763]Stars can shine so loud
[02:04.068]But of what, I'll never know
[02:08.873]The city sleeps and slumbers
[02:14.078]While summer settles under
[02:19.612]A blue sky till dark starry night
`
      }
    },
    computed: {
    },
    created () {
      this.formatLyric = this.lyric.split('\n')
      let i = 0
      let _ts = []
      for (i; i < this.formatLyric.length; i++) {
        _ts.push(this.formatLyric[i].replace(/^(\[)([^\]]*)(\])(.*)/, '$2'))
      }
      this.formatLyricTs = _ts
    },
    mounted () {
      this.lyricScroller = new IScroll(this.$refs.scrollerRef, {
        mouseWheel: true,
        scrollbars: true
      })
    },
    methods: {
      testPlay () {
        this.current = this.formatLyricTs[(this.currentIndex + 1) % this.formatLyricTs.length]
        console.log('..', this.current)
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
      current: {
        immediate: true,
        handler (val) {
          this.currentIndex = this.formatLyricTs.findIndex(item => item >= this.current)
        }
      },
      currentIndex: {
        // immediate: true,
        handler (val) {
          this.lyricScroller.scrollToElement(this.$refs['lyricItemRef-' + val][0], 300, 0, -114)
        }
      }
    }
  }
</script>
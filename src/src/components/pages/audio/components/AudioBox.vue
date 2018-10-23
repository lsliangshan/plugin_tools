<template>
  <div class="audio_box_container" :style="{bottom: (shown ? '0' : '-46px')}" @mouseenter="showBox" @mouseleave="hideBox">
    <div class="updn">
      <div class="left f-fl" :style="btnStyles">
        <a href="javascript:;" @click="toggleLock" class="btn" :class="'lock-' + lock" :style="btnStyles"></a>
      </div>
      <div class="right f-fl" :style="btnStyles"></div>
    </div>
    <div class="bg" :style="btnStyles"></div>
    <div class="hand"></div>
    <div class="wrap">
      <div class="btns">
        <a href="javascript:;" :style="btnStyles" class="prv" title="上一首(ctrl+←)">上一首</a>
        <a href="javascript:;" :style="btnStyles" class="ply j-flag" :class="'ply-' + isPlaying" title="播放/暂停(p)" @click="togglePlay">播放/暂停</a>
        <a href="javascript:;" :style="btnStyles" class="nxt" title="下一首(ctrl+→)">下一首</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .audio_box_container {
    position: fixed;
    left: 0;    
    width: 100%;
    transition: all .3s ease-in-out;
    /*height: 60px;*/
    /*background-color: #333333;*/
  }
  .bg {
    height: 53px;
    zoom: 1;
    margin-right: 67px;
    background-position: 0 0;
    background-repeat: repeat-x;
  }
  .audio_box_container .updn {
    position: relative;
    z-index: 11;
  }
  .audio_box_container .updn .left {
    position: absolute;
    top: -14px;
    right: 15px;
    width: 52px;
    height: 67px;
    background-position: 0 -380px;
  }
  .audio_box_container .updn .left .btn {
    display: block;
    width: 18px;
    height: 18px;
    margin: 6px 0 0 17px;
  }
  .audio_box_container .updn .left .lock-true {
    background-position: -100px -380px;
  }
  .audio_box_container .updn .left .lock-true:hover {
    background-position: -100px -400px;
  }
  .audio_box_container .updn .left .lock-false {
    background-position: -80px -380px;
  }
  .audio_box_container .updn .left .lock-false:hover {
    background-position: -80px -400px;
  }
  .audio_box_container .updn .right {
    position: absolute;
    top: -1px;
    right: 0;
    width: 15px;
    height: 54px;
    background-position: -52px -393px;
    pointer-events: none;
  }
  .audio_box_container .hand {
    position: absolute;
    top: -10px;
    width: 100%;
    height: 20px;
    cursor: pointer;
  }

  .audio_box_container .wrap {
    position: absolute;
    z-index: 999;
    width: 980px;
    height: 47px;
    left: 50%;
    bottom: 0;
    margin: 0 auto;
    margin-left: -490px;
  }
  .audio_box_container .wrap .btns {
    width: 137px;
    height: 42px;
    padding: 6px 0 0 0;
  }
  .audio_box_container .wrap .btns a {
    display: block;
    float: left;
    width: 28px;
    height: 28px;
    margin-right: 8px;
    margin-top: 5px;
    text-indent: -9999px;
  }
  .audio_box_container .wrap .btns .prv {
    background-position: 0 -130px;
  }
  .audio_box_container .wrap .btns .prv:hover {
    background-position: -30px -130px;
  }
  .audio_box_container .wrap .btns .j-flag {
    width: 36px;
    height: 36px;
    margin-top: 0;
  }
  .audio_box_container .wrap .btns .ply-true {
    background-position: 0 -204px;
  }
  .audio_box_container .wrap .btns .ply-true:hover {
    background-position: -40px -204px;
  }
  .audio_box_container .wrap .btns .ply-false {
    background-position: 0 -165px;
  }
  .audio_box_container .wrap .btns .ply-false:hover {
    background-position: -40px -165px;
  }
  .audio_box_container .wrap .btns .nxt {
    background-position: -80px -130px;
  }
  .audio_box_container .wrap .btns .nxt:hover {
    background-position: -110px -130px;
  }
</style>
<script>
	export default {
		name: 'AudioBox',
		data () {
			return {
        shown: true,
        lock: true,
        isPlaying: false
      }
		},
    computed: {
      assets () {
        return this.$store.state.assets
      },
      btnStyles () {
        return {
          backgroundImage: 'url(' + this.assets.nemMusic.playBar + ')'
        }
      }
    },
    methods: {
      toggleLock () {
        this.lock = !this.lock
      },
      showBox () {
        if (!this.lock) {
          this.shown = true
        }        
      },
      hideBox () {
        if (!this.lock) {
          this.shown = false
        }
      },
      togglePlay () {
        this.isPlaying = !this.isPlaying
      }
    }
	}
</script>
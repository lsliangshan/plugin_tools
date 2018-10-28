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
      <div class="head">
        <img :src="(playingInfo.currentIndex > -1) && playingList[playingInfo.currentIndex].album && playingList[playingInfo.currentIndex].album.picUrl">
        <div class="mask"></div>
      </div>
      <div class="play">
        <div class="words">
          <div class="name">{{(playingInfo.currentIndex > -1) ? playingList[playingInfo.currentIndex].name : '暂未播放音乐'}}</div>
          <div class="by" v-if="(playingInfo.currentIndex > -1) && playingList[playingInfo.currentIndex].artists">{{playingList[playingInfo.currentIndex].artists[0].name}}</div>
          <Spin size="small" v-if="playingInfo.isLoading" style="margin-left: 8px;"></Spin>
        </div>
        <div class="m-pbar">
          <vue-slider class="duration_slider" :min="0" :max="Math.floor((playingInfo.currentIndex > -1) ? playingList[playingInfo.currentIndex].duration / 1000 : 0)" :value="(playingInfo.currentIndex > -1) ? playingInfo.seek / 1000 : 0" :clickable="true" :tooltip="false" :bg-style="sliderStyles.bgStyle" :process-style="sliderStyles.processStyle" @drag-end="seekMusic"></vue-slider>
          <div class="time">{{playingInfo.seek | formatDuration}} / {{(playingInfo.currentIndex > -1 && playingList[playingInfo.currentIndex].duration || 0) | formatDuration}}</div>
        </div>
      </div>
      <div class="oper">
        <a href="javascript:;" :style="btnStyles" class="icn icn-add j-flag" title="收藏">收藏</a>
      </div>
      <div class="ctrl f-fl f-pr j-flag">
        <div class="sep" :style="btnStyles"></div>
        <transition name="volume-container-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
          <div class="barbg" v-if="playingCtrl.volumeShown">
            <vue-slider class="vol_slider" :dot-size="12" :width="4" direction="vertical" :height="100" :min="0" :max="100" :value="playingInfo.volume" :clickable="true" :bg-style="volumeSlierStyles.bgStyle" :process-style="volumeSlierStyles.processStyle" :tooltip-style="volumeSlierStyles.tooltipStyle" @input="setValume">
              <template slot="tooltip" slot-scope="{ value }">
                <div class="diy-tooltip">
                  {{ value }}
                  <div class="diy-tooltip-angle"></div>
                </div>
              </template>
            </vue-slider>
          </div>
        </transition>        
        <a href="javascript:;" :style="btnStyles" class="icn icn-vol" @click="toggleVolumeContainer"></a>
        <a href="javascript:;" :style="btnStyles" class="icn icn-loop" :class="'mode-' + playingInfo.mode" title="循环" @click="changeMode"></a>
        <span class="add f-pr">
          <span class="tip" style="display:none;">已添加到播放列表</span>
          <transition name="list-container-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div class="playing_list_container" v-if="playingCtrl.listShown">
              <div class="hd">
                <div class="left">
                  <div>
                    播放列表 ( <span style="color: rgb(79, 192, 141);">{{playingList.length}}</span> )
                  </div>
                </div>
                <div class="right">
                  <div class="close" @click="closeListContainer">
                    <Icon type="ios-close" size="30" />
                  </div>
                </div>
              </div>
              <div class="bd">
                <div class="left">
                  <div class="list_item" v-for="(item, index) in playingList" :key="item.id" :class="{active: index == playingInfo.currentIndex}" :data-index="index" @click="playByIndex">
                    <div class="ply">
                      <Icon type="ios-play" size="18" color="rgb(79, 192, 141)" v-if="index == playingInfo.currentIndex" />
                    </div>
                    <div class="name">{{item.name}}</div>
                    <div class="opr"></div>
                    <div class="by">{{item.artists[0].name}}</div>
                    <div class="duration">{{item.duration | formatDuration}}</div>
                  </div>
                </div>
                <div class="right">
                  <lyric :current="playingInfo.seek" :id="playingInfo.currentIndex > -1 ? playingList[playingInfo.currentIndex].id : ''"></lyric>
                </div>
              </div>
            </div>
          </transition>
          <a href="javascript:;" :style="btnStyles" title="播放列表" class="icn icn-list s-fc3" @click="toggleListContainer">{{playingList.length}}</a>
        </span>
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
    z-index: 9999;
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
    padding: 6px 0 0 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .audio_box_container .wrap .btns {
    width: 137px;
    height: 42px;    
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
  .audio_box_container .wrap .btns .ply-false {
    background-position: 0 -204px;
  }
  .audio_box_container .wrap .btns .ply-false:hover {
    background-position: -40px -204px;
  }
  .audio_box_container .wrap .btns .ply-true {
    background-position: 0 -165px;
  }
  .audio_box_container .wrap .btns .ply-true:hover {
    background-position: -40px -165px;
  }
  .audio_box_container .wrap .btns .nxt {
    background-position: -80px -130px;
  }
  .audio_box_container .wrap .btns .nxt:hover {
    background-position: -110px -130px;
  }
  .audio_box_container .wrap .head {
    position: relative;
    margin: 0 15px 0 0;
    width: 34px;
    height: 34px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;    
  }
  .audio_box_container .wrap .head img {
    width: 34px;
    height: 34px;    
  }
  .audio_box_container .wrap .head .mask {
    position: absolute;
    top: 0px;
    left: 0px;
    display: block;
    width: 34px;
    height: 35px;
    background-position: 0 -80px;
  }
  .audio_box_container .wrap .play {
    width: 604px;
    height: 34px;
    /*display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;*/
  }
  .audio_box_container .wrap .play .words {
    height: 20px;
    overflow: hidden;
    color: #e8e8e8;
    text-shadow: 0 1px 0 #171717;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .audio_box_container .wrap .play .words .name {
    color: #e8e8e8;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }
  .audio_box_container .wrap .play .words .by {
    color: #9b9b9b;
    max-width: 220px;
    margin-left: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }
  .audio_box_container .wrap .play .m-pbar {
    width: 100%;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .audio_box_container .wrap .play .m-pbar .duration_slider {
    width: calc(100% - 90px)!important;
  }
  .audio_box_container .wrap .play .m-pbar .time {
    width: 90px;
    color: #797979;
    text-shadow: 0 1px 0 #121212;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .audio_box_container .wrap .oper {
    width: 60px;
    height: 36px;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  .audio_box_container .wrap .oper .icn-add {
    width: 25px;
    height: 25px;
    /*margin: 11px 2px 0 0;*/
    text-indent: -9999px;
    background-position: -88px -163px;
  }
  .audio_box_container .wrap .oper .icn-add:hover {
    background-position: -88px -189px;
  }
  .audio_box_container .wrap .ctrl {
    position: relative;
    z-index: 10;
    width: 120px;
    margin-left: 4px;
    margin-top: -5px;
    display: flex;
    flex-direction: row;
  }
  .audio_box_container .wrap .ctrl .sep {
    width: 10px;
    height: 36px;
    background-position: -147px -238px;
  }
  .audio_box_container .wrap .ctrl .icn {
    width: 25px;
    height: 25px;
    margin: 11px 5px 0 0;
    text-indent: -9999px;
    /*display: flex;*/
  }
  .audio_box_container .wrap .ctrl .icn-vol {
    background-position: -2px -248px;
  }
  .audio_box_container .wrap .ctrl .icn-vol:hover {
    background-position: -31px -248px;
  }
  .audio_box_container .wrap .ctrl .icn-loop.mode-list {
    background-position: -3px -344px;
  }
  .audio_box_container .wrap .ctrl .icn-loop.mode-list:hover {
    background-position: -33px -344px;
  }
  .audio_box_container .wrap .ctrl .icn-loop.mode-random {
    background-position: -66px -248px;
  }
  .audio_box_container .wrap .ctrl .icn-loop.mode-random:hover {
    background-position: -93px -248px;
  }
  .audio_box_container .wrap .ctrl .icn-loop.mode-loop {
    background-position: -66px -344px;
  }
  .audio_box_container .wrap .ctrl .icn-loop.mode-loop:hover {
    background-position: -93px -344px; 
  }
  .audio_box_container .wrap .ctrl .add {
    position: relative;
    width: 59px;
    height: 36px;
  }
  .audio_box_container .wrap .ctrl .add .icn-list {
    display: block;
    float: none;
    width: 38px;
    padding-left: 21px;
    background-position: -42px -68px;
    line-height: 27px;
    text-align: center;
    color: #666;
    text-shadow: 0 1px 0 #080707;
    text-indent: 0;
    text-decoration: none;
    box-sizing: content-box;
  }
  .audio_box_container .wrap .ctrl .add .icn-list:hover {
    background-position: -42px -98px;
    text-decoration: none;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container {
    position: absolute;
    left: -925px;
    top: -301px;
    width: 980px;
    height: 300px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: rgba(0, 0, 0, 0.8);
    overflow: hidden;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .hd {
    width: 100%;
    height: 40px;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    box-sizing: border-box;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .hd .left {
    width: 550px;
    height: 40px;
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 14px;
    color: #e2e2e2;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .hd .right {
    position: relative;
    width: 430px;
    height: 40px;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .hd .right .close {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #c8c8c8;
    font-weight: bolder;
    transition: all .3s ease-in-out;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .hd .right .close:hover {
    color: #fff;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .bd {
    width: 100%;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .bd .left {
    width: 550px;
    height: 260px;
    border-right: 1px solid rgba(0, 0, 0, 0.8);
    box-sizing: border-box;
    overflow-y: auto;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .bd .right {
    width: 430px;
    height: 260px;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .bd .left .list_item {
    width: 550px;
    height: 30px;
    cursor: pointer;
    color: #ccc;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .bd .left .list_item.active, .audio_box_container .wrap .ctrl .add .playing_list_container .bd .left .list_item:hover, .audio_box_container .wrap .ctrl .add .playing_list_container .bd .left .list_item:active {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .bd .left .list_item .ply {
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .bd .left .list_item .name {
    width: 256px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    pointer-events: none;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .bd .left .list_item .opr {
    width: 90px;
    height: 30px;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    pointer-events: none;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .bd .left .list_item .by {
    width: 80px;
    height: 30px;
    margin-left: 10px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    pointer-events: none;
  }
  .audio_box_container .wrap .ctrl .add .playing_list_container .bd .left .list_item .duration {
    width: 50px;
    height: 30px;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    pointer-events: none;
  }
  .audio_box_container .wrap .ctrl .barbg {
    position: absolute;
    bottom: 37px;
    left: 3px;
    width: 32px;
    height: 113px;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .audio_box_container .wrap .ctrl .barbg .diy-tooltip {
    position: relative;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    border-radius: 4px;
    margin-right: 6px;
    width: 30px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .audio_box_container .wrap .ctrl .barbg .diy-tooltip .diy-tooltip-angle {
    position: absolute;
    width: 0;
    height: 0;
    right: -6px;
    top: 6px;
    border-left: 6px solid rgba(0, 0, 0, 0.8);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent
  }
</style>
<script>
  import * as types from '../../../../store/mutation-types.js'
  import vueSlider from 'vue-slider-component'
  import Lyric from './Lyric.vue'
	export default {
		name: 'AudioBox',
    components: {
      vueSlider,
      Lyric
    },
		data () {
			return {
        shown: true,
        lock: true,
        isPlaying: false, // 音乐是否正在播放中
        playingMusic: {},
        playingList: [], // 正在使用中的播放列表
        audioEle: null,
        playingInfo: {
          seek: 0, // 播放进度
          interval: 0,
          isLoading: false,
          volume: 7, // 音量
          mode: 'list', // 循环模式 list:列表循环; loop:单曲重复; random:随机播放
          currentIndex: -1 // 正在播放的音乐的索引值
        },
        playingCtrl: {
          volumeShown: false, // 是否显示音乐控制条
          listShown: false, // 是否显示播放列表
        },
        sliderStyles: {
          bgStyle: {
            backgroundColor: 'rgba(22, 22, 22, 1)',
            boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
          },
          processStyle: {
            backgroundImage: '-webkit-linear-gradient(left, rgba(79, 192, 141, 1), rgba(79, 192, 141, .4))'
          }
        },
        volumeSlierStyles: {
          tooltipStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(0, 0, 0, 0.8)',
            left: '-15px'
          },
          bgStyle: {
            backgroundColor: 'rgba(22, 22, 22, 1)',
            boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
          },
          processStyle: {
            backgroundImage: '-webkit-linear-gradient(left, rgba(79, 192, 141, 1), rgba(79, 192, 141, .4))'
          }
        }
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
      },
      events () {
        return this.$store.state.events
      }
    },
    mounted () {
      this.$eventHub.$on(this.events.nemMusic.play, this.playHandle)

      this.audioEle = document.createElement('audio')
      this.audioEle.setAttribute('autoplay', 'autoplay')
      this.audioEle.volume = (this.playingInfo.volume / 100).toFixed(2)
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
      seekingMusic () {
        // this.playingInfo.interval = setInterval(() => {
        //   if (this.playingInfo.seek >= this.playingMusic.duration) {
        //     clearInterval(this.playingInfo.interval)
        //     this.playingInfo.seek = 0
        //   } else {
        //     this.playingInfo.seek += 100
        //   }
        // }, 100)
        this.audioEle.ontimeupdate = () => {
          this.playingInfo.seek = Math.floor(this.audioEle.currentTime * 1000)
        }
      },
      getLyric (id) {
        return new Promise(async (resolve) => {
          let lyricData = await this.$store.dispatch('moduleNem/getLyric', {
            id: id
          })
          resolve(lyricData)
        })
      },
      playMusic (index) {
        this.audioEle.src = this.playingList[Number(this.playingInfo.currentIndex)].musicInfo.url
        this.playingInfo.seek = 0
        this.audioEle.oncanplay = async () => {
          // if (this.playingInfo.interval) {
          //   clearInterval(this.playingInfo.interval)
          // }
          this.seekingMusic()
          setTimeout(() => {
            this.playingInfo.isLoading = false
          }, 300)
          // this.playingInfo.volume = (this.audioEle.volume * 100)
          this.isPlaying = true
          this.audioEle.play()
          // if (!this.playingList[Number(this.playingInfo.currentIndex)].hasOwnProperty('customLyric')) {
          //   this.playingList[Number(this.playingInfo.currentIndex)].customLyric = await this.getLyric(this.playingList[Number(this.playingInfo.currentIndex)].id)
          // } else {}
        }
        this.audioEle.onended = () => {
          switch (this.playingInfo.mode) {
            case 'list':
              this.playingInfo.currentIndex = (this.playingInfo.currentIndex + 1) % this.playingList.length
              break
            case 'loop':
              break
            case 'random':
              this.playingInfo.currentIndex = Math.floor(Math.random() * this.playingList.length)
              break
            default:
              break
          }
          this.playMusic(this.playingInfo.currentIndex)
        }
      },
      togglePlay () {        
        if (this.isPlaying) {
          if (!this.audioEle.paused && !this.audioEle.ended) {
            this.audioEle.pause()
            this.isPlaying = false
            clearInterval(this.playingInfo.interval)
          }
        } else {
          if (this.audioEle.paused || this.audioEle.ended) {
            this.audioEle.play()
            this.isPlaying = true
            this.seekingMusic()
          }
        }
      },
      concatList (nl) {
        let _ids = this.playingList.map(item => item.id)
        let i = 0
        for (i; i < nl.length; i++) {
          if (_ids.indexOf(nl[i].id) < 0) {
            this.playingList.push(nl[i])
          }
        }
      },
      getIndexById (id) {
        let i = 0
        let outIndex = -1
        for (i; i < this.playingList.length; i++) {
          if (String(id) === String(this.playingList[i].id)) {
            outIndex = i
            i = this.playingList[i].length
          }
        }
        return outIndex
      },
      async playHandle (data) {
        let _oldLen = this.playingList.length
        // this.playingList = this.playingList.concat(data.music)
        this.concatList(data.music)
        if (_oldLen !== this.playingList.length) {
          this.playingInfo.isLoading = true
          this.playingInfo.currentIndex = _oldLen
          let audioListData = await this.$store.dispatch('moduleNem/getMusicDetail', {
            id: this.playingList[this.playingInfo.currentIndex].id
          })
          if (audioListData.length > 0) {
            this.playingList[this.playingInfo.currentIndex].musicInfo = audioListData[0]
            this.playMusic(this.playingInfo.currentIndex)
          } else {
            this.playingList[this.playingInfo.currentIndex].musicInfo = {}
          }
        } else {
          this.playingInfo.currentIndex = this.getIndexById(data.music[0].id)
          this.playMusic(this.playingInfo.currentIndex)
        }
      },
      seekMusic (e) {
        this.playingInfo.seek = Math.min(e.getValue() * 1000, this.playingList[this.playingInfo.currentIndex].duration)
        this.audioEle.currentTime = e.getValue()
      },
      setValume (e) {
        this.playingInfo.volume = e
        this.audioEle.volume = (this.playingInfo.volume / 100).toFixed(2)
      },
      toggleVolumeContainer () {
        this.playingCtrl.volumeShown = !this.playingCtrl.volumeShown
      },
      toggleListContainer () {
        this.playingCtrl.listShown = !this.playingCtrl.listShown
      },
      closeListContainer () {
        this.playingCtrl.listShown = false
      },
      changeMode () {
        let allModes = ['list', 'loop', 'random']
        this.playingInfo.mode = allModes[(allModes.indexOf(this.playingInfo.mode) + 1) % allModes.length]
      },
      playByIndex (e) {
        let _index = Number(e.target.dataset.index)
        if (_index !== this.playingInfo.currentIndex) {
          this.playingInfo.currentIndex = Number(e.target.dataset.index)
          this.playMusic(this.playingInfo.currentIndex)
        }
        this.$eventHub.$emit(this.events.nemMusic.play, {
          music: [this.playingList[this.playingInfo.currentIndex]]
        })
      }
    },
    filters: {
      formatDuration (text) {
        let _d = Number(text)
        let _h = Math.floor(_d / (60 * 60 * 1000))
        if (_h < 10) {
          _h = '0' + _h
        }
        let _m = Math.floor(_d % (60 * 60 * 1000) / (60 * 1000))
        if (_m < 10) {
          _m = '0' + _m
        }
        let _s = Math.floor((_d % (60 * 1000)) / 1000)
        if (_s < 10) {
          _s = '0' + _s
        }
        return (_h === '00' ? '' : (_h + ':')) + _m + ':' + _s
      }
    },
    watch: {
      'audio.playing' (val) {
        if (val) {
          // this.audioEle.load()
          console.log('......', this.audioEle.ended)
          if (this.audioEle.paused) {
            this.audioEle.play()
          } else {
            // this.audioEle.addEventListener('canplay', () => {
            //   this.audioEle.play()
            // }, false)
          }
        } else {
          console.log('pause: ', this.audioEle.currentTime.toFixed(1))
          this.audioEle.pause()
        }
      },
      'audio.current' (val) {
        if (val !== -1) {
          this.audioEle.oncanplay = () => {
            console.log(this.audioEle.duration)
            this.$store.commit(types.SET_AUDIO_DURATION, {
              duration: this.audioEle.duration
            })
          }
        }
      }
    }
	}
</script>
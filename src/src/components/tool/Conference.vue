<template>
  <div class="conference_container"
       :style="containerStyles">
    <draggable class="video_card"
               :parent="true"
               :y="30"
               :x="(bodyStyles.width - videoBox.width) / 2"
               :w="videoBox.width"
               :h="videoBox.height"
               :resizable="false"
               :active="false"
               :style="videoCardStyles">
      <transition name="without-login-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut faster">
        <div class="without_login"
             v-if="!isLogin">
          登录后可免费视频通话，
          <a href="javascript:void(0)"
             @click="goLogin">去登录</a>
        </div>
      </transition>
      <transition name="without-login-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut faster">
        <div class="with_login"
             v-if="isLogin">
          <div class="video_card_header no_border_input">
            <Input placeholder="请输入房间ID"
                   v-model="cacheRoomId"></Input>
            <Button type="primary"
                    size="small"
                    @click="setRoomId">进入房间</Button>
          </div>
          <div class="video_card_content"
               ref="videoSelfContainerRef">
          </div>
          <div class="video_card_footer"></div>
        </div>
      </transition>
    </draggable>

    <draggable class="video_card_other"
               :parent="true"
               :y="Math.floor(Math.random() * 300)"
               :x="Math.floor(Math.random() * bodyStyles.width)"
               :w="videoBox.width"
               :h="videoBox.height"
               :resizable="false"
               :active="false"
               v-for="(item, index) in videos.other"
               :key="item.userid">
      <transition name="without-login-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut faster">
        <div class="without_login"
             v-if="!isLogin">
          登录后可免费视频通话，
          <a href="javascript:void(0)"
             @click="goLogin">去登录</a>
        </div>
      </transition>
      <transition name="without-login-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut faster">
        <div class="with_login"
             v-if="isLogin">
          <div class="video_card_header no_border_input">
            <!-- <Input placeholder="请输入房间ID"
                   v-model="cacheRoomId"></Input>
            <Button type="primary"
                    size="small"
                    @click="setRoomId">进入房间</Button> -->
          </div>
          <div class="video_card_content"
               ref="videoOtherContainerRef">
          </div>
          <div class="video_card_footer"></div>
        </div>
      </transition>
    </draggable>
  </div>
</template>
<style scoped>
.conference_container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.video_card {
  position: relative;
  width: 320px;
  /* height: 400px; */
  border: none;
  cursor: move;
  border-radius: 4px;
  overflow: hidden;
  background-color: #ffffff;
  transition: height 0.15s ease-in-out;
}
.video_card_other {
  position: relative;
  width: 320px;
  height: 400px;
  border: none;
  cursor: move;
  border-radius: 4px;
  overflow: hidden;
  background-color: #ffffff;
  transition: height 0.15s ease-in-out;
}
.without_login {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.with_login {
}
.video_card_header {
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
}
.video_card_content {
  width: 100%;
  height: calc(100% - 80px);
  background-color: #f8f8f8;
}
.video_card_content video {
  width: 320px !important;
  height: 320px !important;
}
.video_card_footer {
  width: 100%;
  height: 40px;
  border-top: 1px solid #eee;
}
</style>
<script>
/**
 * 视频
 */
export default {
  name: 'Conference',
  data () {
    return {
      videoBox: {
        width: 320,
        height: 400
      },
      videos: {
        self: [],
        other: []
      },
      videoMute: false,
      roomId: '',
      cacheRoomId: '',
      connection: null
    }
  },
  computed: {
    store () {
      return this.$store
    },
    bodyStyles () {
      return this.store.state.bodyStyles
    },
    containerStyles () {
      return {
        height: this.bodyStyles.height + 'px'
      }
    },
    loginInfo () {
      return this.store.state.loginInfo
    },
    isLogin () {
      return this.store.state.isLogin
    },
    videoCardStyles () {
      return {
        height: this.isLogin && this.roomId ? '400px' : '40px'
      }
    }
  },
  async created () {
    if (navigator.connection &&
      navigator.connection.type === 'cellular' &&
      navigator.connection.downlinkMax <= 0.115) {
      alert('2G is not supported. Please use a better internet service.');
    }
  },
  mounted () {
    this.$nextTick(async () => {
      if (this.$route.name === 'conference') {
        await this.loadScript('https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js')
        await this.loadScript('https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js')
        this.isLogin && this.init()
      }
    })
  },
  methods: {
    init () {
      let connection = new RTCMultiConnection()
      connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/'
      connection.autoCloseEntireSession = true
      connection.session = {
        audio: true,
        video: true
      }
      connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
      }
      connection.onstream = (event) => {
        let video = event.mediaElement
        video.setAttribute('width', this.videoBox.width)
        video.setAttribute('height', this.videoBox.width)
        video.muted = this.videoMute
        video.volume = 1
        if (event.type === 'local') {
          this.$refs.videoSelfContainerRef.innerHTML = ''
          this.$refs.videoSelfContainerRef.appendChild(video)
        } else if (event.type === 'remote') {
          console.log('..........', event)
          this.videos.other.push(
            {
              userid: event.userid,
              streamid: event.streamid
            }
          )
          this.$nextTick(() => {
            !!this.$refs.videoOtherContainerRef[0] && this.$refs.videoOtherContainerRef[0].appendChild(video)
          })
        }
      }
      this.connection = connection
      // let predefineRoomId = 'jhjpyydjy59' || connection.token()
      // connection.openOrJoin(predefineRoomId)
    },
    goLogin () {
      this.$router.replace({
        name: 'login'
      })
    },
    setRoomId () {
      this.roomId = this.cacheRoomId
      if (this.roomId) {
        this.connection.openOrJoin(this.roomId)
      }
    }
  },
  watch: {
    isLogin (val) {
      if (val) {
        if (this.$route.name === 'conference') {
          this.init()
        }
      }
    }
  }
}
</script>

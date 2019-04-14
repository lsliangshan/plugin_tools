<template>
  <div class="id_photo_container"
       :style="containerStyles">
    <draggable class="id_photo_inner"
               :parent="true"
               :y="30"
               :x="(bodyStyles.width - videoBox.width) / 2"
               :style="idInnerStyles">
      <div class="camera_wrapper"
           :style="idInnerStyles">
        <div class="video_file_name">
          <div class="video_file_name_text">{{fileNameForm.filename}}.{{imgSuffix}}</div>
          <div class="video_mute"
               @click="toggleVolume">
            <Tooltip placement="bottom"
                     :content="videoMute ? '开启声音' : '关闭声音'"
                     :transfer="true">
              <Icon :type="videoMute ? 'md-volume-off' : 'md-volume-up'"
                    size="16" />
            </Tooltip>
          </div>
        </div>
        <video ref="videoRef"
               id="video"
               :width="videoBox.width"
               :height="videoBox.height"
               :muted="videoMute"
               autoplay></video>
        <canvas ref="captureRef"
                class="capture_canvas"
                :width="videoBox.width"
                :height="videoBox.height"></canvas>
        <div class="bottom_container">
          <Tooltip placement="top"
                   content="拍照并保存"
                   :transfer="true">
            <Button type="primary"
                    class="capture_btn"
                    icon="md-camera"
                    @click="doCapture">拍照</Button>
          </Tooltip>
          <Tooltip placement="top"
                   :transfer="true">
            <div slot="content">
              <div v-if="!isLogin">
                登录后可免费生成证件照，
                <a href="javascript:void(0)"
                   @click="goLogin">去登录</a>
              </div>
              <div v-else>生成证件照</div>
            </div>
            <Button type="primary"
                    class="capture_btn"
                    icon="md-camera"
                    :disabled="!isLogin"
                    @click="getIdImage">生成证件照</Button>
          </Tooltip>
          <Button type="text"
                  class="video_settings_btn"
                  icon="md-settings"
                  @click="openFileNameModal">设置</Button>
        </div>
      </div>
      <transition name="camera-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut">
        <div class="bg_loading"
             :style="idInnerStyles"
             v-if="!cameraLoaded">
          <Spin></Spin>
        </div>
      </transition>
    </draggable>

    <Modal v-model="fileNameForm.shown"
           title="设置图片属性"
           :width="300"
           :mask-closable="true"
           :draggable="true">
      <Form :label-width="80">
        <FormItem label="文件名">
          <Input v-model="fileNameForm.filename"
                 placeholder="请输入文件名">
          <Select v-model="imgSuffix"
                  style="width: 80px;"
                  slot="append">
            <Option v-for="(item, index) in imgSuffixs"
                    :key="index"
                    :value="item.value">{{item.label}}</Option>
          </Select>
          </Input>
        </FormItem>
        <FormItem label="宽">
          <Input :value="videoBox.width"
                 @on-change="changeWidth">
          <div slot="append"
               style="width: 65px;">像素</div>
          </Input>
        </FormItem>
        <FormItem label="高">
          <Input :value="videoBox.height"
                 @on-change="changeHeight">
          <div slot="append"
               style="width: 65px;">像素</div>
          </Input>
        </FormItem>
        <transition name="id-photo-transition"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut faster">
          <FormItem label="证件照背景"
                    v-if="isLogin">
            <ColorPicker v-model="fileNameForm.bgColor" />
          </FormItem>
        </transition>
      </Form>
      <div slot="footer">
        <Button type="warning"
                @click="resetFileNameForm">重置</Button>
        <Button @click="closeFileNameModal">关闭</Button>
      </div>
    </Modal>

    <Drawer title="证件照"
            :width="(videoBox.width + 60) > 500 ? 500 : (videoBox.width + 60)"
            :styles="{padding: '0', backgroundColor: '#eeeeee', overflowX: 'auto'}"
            :mask-closable="false"
            class="id_image_container"
            v-model="idImageForm.shown">
      <div class="id_image_wrapper">
        <canvas ref="idImageCanvasRef"
                :width="videoBox.width"
                :height="videoBox.height"></canvas>
      </div>
      <transition name="id-image-loading-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut">
        <div class="id_image_loading_container"
             v-if="!idImageForm.imageData || idImageForm.isFetch">
          <Spin size="large"></Spin>
        </div>
      </transition>
      <div class="id_drawer_footer">
        <Button style="margin-right: 8px"
                @click="closeIdImageForm">关闭</Button>
        <Button type="primary"
                @click="downloadIdImage">下载</Button>
      </div>
    </Drawer>
  </div>
</template>
<style scoped>
.id_photo_container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.id_photo_inner {
  border-radius: 4px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 1);
  cursor: move;
}
.bg_loading {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}
.camera_wrapper {
  position: relative;
}
.video_file_name {
  position: relative;
  width: 100%;
  height: 32px;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.video_mute {
  position: absolute;
  right: 10px;
  top: 0;
  height: 32px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.bottom_container {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.capture_btn {
  margin-left: 15px;
}
.video_settings_btn {
  position: absolute;
  right: 0;
}

.capture_canvas {
  position: absolute;
  left: -10000px;
  top: 0;
}

.id_image_container {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}
.id_image_wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding: 15px 30px;
  overflow-x: auto;
}
.id_image_loading_container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.id_drawer_footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
<script>
/**
 * 证件照
 */
import * as types from '../../store/mutation-types'
export default {
  name: 'Id',
  components: {
    // Draggable: () => import('vue-draggable-resizable')
  },
  data () {
    return {
      videoBox: {
        width: 295,
        height: 413
      },
      videoMute: true, // 视频禁音
      fileNameForm: {
        filename: 'img-' + Math.random().toString(36).substr(6).toUpperCase(),
        bgColor: '#fff',
        shown: false
      },
      idImageForm: {
        imageData: '',
        shown: false,
        isFetch: false
      },
      cameraLoaded: false,
      imgSuffix: 'png',
      imgSuffixs: [
        {
          label: '.png',
          value: 'png'
        },
        {
          label: '.jpeg',
          value: 'jpeg'
        },
        {
          label: '.jpg',
          value: 'jpg'
        },
        {
          label: '.bmp',
          value: 'bmp'
        },
        {
          label: '.gif',
          value: 'gif'
        }
      ],
      videoStream: null
    }
  },
  computed: {
    store () {
      return this.$store
    },
    bodyStyles () {
      return this.store.state.bodyStyles
    },
    facepp () {
      return this.store.state.facepp
    },
    containerStyles () {
      return {
        height: (Number(this.bodyStyles.height) - 65) + 'px'
      }
    },
    idInnerStyles () {
      return {
        width: this.videoBox.width + 'px',
        height: (Number(this.videoBox.height) + 60 + 32) + 'px'
      }
    },
    loginInfo () {
      return this.store.state.loginInfo
    },
    isLogin () {
      return this.store.state.isLogin
    },
    requestInfo () {
      return this.store.state.requestInfo
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$route.name === 'id') {
        // setTimeout(() => {
        this.initVideo()
        // }, 50)
      }
    })
  },
  methods: {
    getIdPhoto (data) {
      return new Promise(async (resolve, reject) => {
        await this.store.dispatch(types.AJAX, {
          baseUrl: this.requestInfo.baseUrl,
          url: this.requestInfo.getIdImage,
          timeout: 3 * 60 * 1000,
          data: {
            phonenum: this.loginInfo.phonenum,
            token: this.loginInfo.token,
            // api_key: this.facepp.key,
            // api_secret: this.facepp.secret,
            image_base64: data
          }
        }).catch(err => {
          console.log('error: ', err.message)
          reject(new Error(err.message || '失败'))
        }).then(responseData => {
          resolve(responseData)
        })
      })
    },
    getCaptureData () {
      let canvas = this.$refs.captureRef
      let ctx = canvas.getContext('2d')
      let video = this.$refs.videoRef
      ctx.drawImage(video, 0, 0, this.videoBox.width, this.videoBox.height)
      let imageData = canvas.toDataURL(this.imgSuffix)
      imageData = imageData.replace(this.fixMimeType(this.imgSuffix), 'image/octet-stream')
      return imageData
    },
    async getIdImage () {
      /**
       * 生成证件照
       */
      this.idImageForm.isFetch = true
      this.idImageForm.shown = true
      let imageData = this.getCaptureData()
      await this.getIdPhoto(imageData).then(response => {
        if (response.status === 200 && response.data) {
          // 抠图成功
          this.idImageForm.imageData = 'data:image/octet-stream;base64,' + response.data.body_image
        } else {
          this.$Message.error(response.message)
          this.idImageForm.imageData = ''
        }
        this.idImageForm.isFetch = false
      }).catch(err => {
        this.$Message.error(err.message)
        this.idImageForm.imageData = ''
        this.idImageForm.isFetch = false
      })
    },
    closeIdImageForm () {
      this.idImageForm.shown = false
    },
    downloadIdImage () {
      let canvas = this.$refs.idImageCanvasRef
      if (canvas) {
        let imageData = canvas.toDataURL(this.imgSuffix)
        imageData = imageData.replace(this.fixMimeType(this.imgSuffix), 'image/octet-stream')
        this.$saveImage(imageData, 'id-' + this.fileNameForm.filename + '.' + this.imgSuffix)
      }
    },
    initVideo (widthAudio = true) {
      navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia
      navigator.getUserMedia({ video: { width: this.videoBox.width, height: this.videoBox.height, facingMode: 'user' }, audio: widthAudio }, this.gotStream, this.noStream)
    },
    gotStream (stream) {
      let video = this.$refs.videoRef
      if (!video) {
        return
      }
      let url = window.URL || window.webkitURL
      video.srcObject = stream
      video.onerror = function () {
        stream.stop()
      }
      // this.videoStream = typeof stream.stop === 'function' ? stream : stream.getTracks()[0]
      stream.onended = this.noStream
      video.onloadedmetadata = () => {
        setTimeout(() => {
          this.cameraLoaded = true
        }, 800)
      }
    },
    noStream (err) {
      console.log('error: ', err)
    },
    fixMimeType (t) {
      let type = t.toLowerCase().replace(/jpg/i, 'jpeg')
      return 'image/' + type.match(/png|jpeg|bmp|gif/)[0]
    },
    doCapture () {
      let canvas = this.$refs.captureRef
      let ctx = canvas.getContext('2d')
      let video = this.$refs.videoRef
      ctx.drawImage(video, 0, 0, this.videoBox.width, this.videoBox.height)
      let imageData = canvas.toDataURL(this.imgSuffix)
      imageData = imageData.replace(this.fixMimeType(this.imgSuffix), 'image/octet-stream')
      this.$saveImage(imageData, this.fileNameForm.filename + '.' + this.imgSuffix)
    },
    openFileNameModal () {
      this.fileNameForm.filename = 'img-' + Math.random().toString(36).substr(6).toUpperCase()
      this.fileNameForm.shown = true
    },
    closeFileNameModal () {
      this.fileNameForm.shown = false
    },
    resetFileNameForm () {
      this.videoBox = {
        width: 295,
        height: 413
      }
      this.fileNameForm.bgColor = '#ffffff'
    },
    changeWidth (e) {
      this.videoBox.width = Number(e.target.value)
    },
    changeHeight (e) {
      this.videoBox.height = Number(e.target.value)
    },
    toggleVolume () {
      this.videoMute = !this.videoMute
    },
    goLogin () {
      this.$router.replace({
        name: 'login'
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'id') {
      /**
         * 关闭摄像头
         */
      let video = this.$refs.videoRef
      let tracks = video.srcObject.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
      video.srcObject = null
    }
    next()
  },
  watch: {
    'videoBox.width' (val) {
      this.initVideo()
    },
    'videoBox.height' (val) {
      this.initVideo()
    },
    'idImageForm.imageData' (val) {
      if (!!val) {
        let canvas = this.$refs.idImageCanvasRef
        let bgColor = this.fileNameForm.bgColor ? this.fileNameForm.bgColor : ''
        if (canvas) {
          let image = new Image()
          image.onload = () => {
            let ctx = canvas.getContext('2d')
            ctx.clearRect(0, 0, this.videoBox.width, this.videoBox.height)
            if (bgColor) {
              ctx.fillStyle = bgColor
              ctx.fillRect(0, 0, this.videoBox.width, this.videoBox.height)
            }
            ctx.drawImage(image, 0, 0)
          }
          image.src = this.idImageForm.imageData
        }
      }
    }
  }
}
</script>

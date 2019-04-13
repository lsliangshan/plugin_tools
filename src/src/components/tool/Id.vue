<template>
  <div class="id_photo_container"
       :style="containerStyles">
    <draggable class="id_photo_inner"
               :parent="true"
               :y="30"
               :x="(bodyStyles.width - videoBox.width) / 2"
               :enable-native-drag="true"
               :style="idInnerStyles">
      <div class="camera_wrapper"
           :style="idInnerStyles">
        <div class="video_file_name">{{fileNameForm.filename}}.{{imgSuffix}}</div>
        <video ref="videoRef"
               id="video"
               :width="videoBox.width"
               :height="videoBox.height"
               autoplay></video>
        <canvas ref="captureRef"
                class="capture_canvas"
                :width="videoBox.width"
                :height="videoBox.height"></canvas>
        <div class="bottom_container">
          <Button type="primary"
                  class="capture_btn"
                  icon="md-camera"
                  @click="doCapture">拍照</Button>
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
           :footer-hide="true"
           :draggable="true">
      <Form :label-width="50">
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
      </Form>
    </Modal>
  </div>
</template>
<style scoped>
.id_photo_container {
  position: relative;
  width: 100%;
  height: 100%;
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
  width: 100%;
  height: 32px;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
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
  justify-content: center;
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
</style>
<script>
/**
 * 证件照
 */
export default {
  name: 'Id',
  components: {
    Draggable: () => import('vue-draggable-resizable')
  },
  data () {
    return {
      videoBox: {
        width: 295,
        height: 413
      },
      fileNameForm: {
        filename: 'img-' + Math.random().toString(36).substr(6).toUpperCase(),
        shown: false
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
      ]
    }
  },
  computed: {
    bodyStyles () {
      return this.$store.state.bodyStyles
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
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$route.name === 'id') {
        this.initVideo()
      }
    })
  },
  methods: {
    initVideo (withAudio = true) {
      navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia
      navigator.getUserMedia({ video: { width: this.videoBox.width, height: this.videoBox.height, facingMode: 'user' }, audio: withAudio }, this.gotStream, this.noStream)
    },
    gotStream (stream) {
      let video = this.$refs.videoRef
      let url = window.URL || window.webkitURL

      video.srcObject = stream
      video.play()
      video.onerror = function () {
        stream.stop()
      }
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
    changeWidth (e) {
      this.videoBox.width = Number(e.target.value)
    },
    changeHeight (e) {
      this.videoBox.height = Number(e.target.value)
    }
  },
  watch: {
    'videoBox.width' (val) {
      this.initVideo()
    },
    'videoBox.height' (val) {
      this.initVideo()
    }
  }
}
</script>

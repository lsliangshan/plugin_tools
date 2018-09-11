<template>
  <div class="tool_container" :style="containerstyles">
    <div class="tool_container_wrapper">
      <div class="qrcode_wrapper">
        <div class="qrcode_input_wrapper">
          <Input class="no-resize textarea100p" v-model="qrcodeStr" type="textarea" placeholder="请输入文字内容" @on-keydown="input" @on-change="change"/>
        </div>
        <div class="qrcode_result_wrapper">
          <div class="popup_no_qrcode" key="noqrcode" v-if="!qrcodeStr">
            <div class="popup_no_qrcode_inner">此处生成二维码</div>
          </div>
          <div class="qrocde_canvas_container" key="qrcode" v-else>
            <canvas id="qrcodeWrapperRef"></canvas>
          </div>
          <div class="qrcode_download_btn_container">
            <div class="qrcode_download_btn">
              <Button type="primary" size="large" :disabled="!qrcodeStr" long @click="downloadFile">下载</Button>
            </div>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .tool_container {
    width: 100%;  
  }
  .tool_container_wrapper {
    min-width: 1030px;
    height: 410px;
    padding: 30px 15px;
    box-sizing: border-box;
    background-color: #F5F5F5;
  }
  .qrcode_wrapper {
    width: 1000px;
    height: 350px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .qrcode_input_wrapper {
    width: 670px;
    height: 350px;
    background-color: #FFFFFF;
  }
  .textarea100p {
    height: 100%;
  }
  .qrcode_result_wrapper {
    position: relative;
    width: 300px;
    height: 350px;  
  }
  .popup_no_qrcode {
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 300px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #bbbbbb;
  }
  .qrocde_canvas_container {
    width: 300px;
    height: 300px;
    background-color: #FFFFFF;
  }
  .qrcode_download_btn_container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 300px;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
  .qrcode_download_btn {
    width: 300px;
  }
</style>
<script>
import QRCode from 'qrcode'
export default {
  name: 'ToolQRCode',
  data () {
    return {
      qrcodeStr: '',
      qrcodeHtml: ''
    }
  },
  computed: {
    bodyStyles () {
      return this.$store.state.bodyStyles
    },
    containerstyles () {
      return {
        height: (this.bodyStyles.height - 65) + 'px'
      }
    }
  },
  methods: {
    initQrcode () {
      const that = this      
      if (this.qrcodeStr) {
        console.log('>>>>', this.qrcodeStr)
        QRCode.toCanvas(document.getElementById('qrcodeWrapperRef'), this.qrcodeStr, {
          errorCorrectionLevel: 'H',
          width: 300,
          heihgt: 300,
          margin: 3
        }, function (err) {
          if (err) {
            throw err
          }
        })
      }     
    },
    input (e) {
      let keycode = e.charCode || e.keyCode
      if (keycode === 13) {        
          if (window.event) {
            window.event.returnValue = false;
          } else {
            e.preventDefault(); //for firefox
          }
      }
    },
    change (e) {
      e.target.value = e.target.value.replace(/\r/ig, '').replace(/\n|\s/ig, '')
      this.qrcodeStr = e.target.value
    },
    downloadFile(){
        let content = document.getElementById('qrcodeWrapperRef').toDataURL('image/png')
        let aLink = document.createElement('a');
        
        aLink.download = 'qrcode.png';
        aLink.href = content;

        console.log(aLink.href)
  
        aLink.click()
    }
  },
  watch: {
    'qrcodeStr' (val) {
      setTimeout(() => {
        this.initQrcode()
      }, 1)
    }
  },
  components: {}
}
</script>

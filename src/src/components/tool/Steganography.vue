<template>
  <div class="container" :style="containerStyles">
    <div class="inner">
      <Split v-model="split" min="200" mode="vertical">
          <div slot="top" class="demo-split-pane">
              <div class="img_container">
                <div class="img_previewer">
                  <img :src="imageSrc" class="img" />
                  <canvas id="canvas" :width="canvasSize.width" :height="canvasSize.height"></canvas>
                </div>
                <div class="img_uploader steganography_uploader">
                  <Upload
						        type="drag"
						        accept="image/*"
						        :before-upload="beforeUploadImage"
						        action="/">
                      <div class="upload_inner" v-if="!imageSrc">
                          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                          <p>点击选择或拖动上传图片</p>
                      </div>
                  </Upload>
                </div>
              </div>
          </div>
          <div slot="trigger" class="trigger_container">
            <div class="tips_left">
              <Button type="primary" @click="encode">加密</Button>
            </div>
              <div class="trigger_wrapper">
                <Icon type="ios-code" size="14" />
              </div>
              <div class="tips_right">
                <Button type="primary" ghost @click="decode">解密</Button>
              </div>
          </div>
          <div slot="bottom" class="demo-split-pane">
              <div class="converted_container" v-if="outImage">
                <img :src="outImage" class="out_image">                
                <!-- <canvas id="output" :width="canvasSize.width" :height="canvasSize.height"></canvas> -->
              </div>
              <div class="decoded_message" v-if="outMessage">
                <p v-html="outMessage"></p>
              </div>
          </div>
      </Split>
    </div>
    <Modal
        v-model="encodeModal.shown"
        title="加密内容"
        :loading="encodeModalLoading"
        @on-ok="confirmEncode">
        <Form :label-width="80">
          <FormItem>
            <div slot="label" class="form_item_label">
              <Tooltip content="请设置查看密码，不填则不设置密码" placement="top" style="cursor: pointer;">
                  <Icon type="md-help-circle" size="16"/>
              </Tooltip>              
              密码
            </div>
            <Input type="password" placeholder="请输入查看密码" v-model="encodeModal.password"/>
          </FormItem>
          <FormItem label="加密内容">
            <Input v-model="encodeModal.message" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入加密的内容"/>
          </FormItem>
        </Form>
    </Modal>

    <Modal
        v-model="decodeModal.shown"
        title="解密内容"
        :loading="decodeModalLoading"
        @on-ok="decode">
        <Form :label-width="80">
          <FormItem>
            <div slot="label" class="form_item_label">
              <Tooltip content="请输入查看密码" placement="top" style="cursor: pointer;">
                  <Icon type="md-help-circle" size="16"/>
              </Tooltip>              
              密码
            </div>
            <Input type="password" placeholder="请输入查看密码" v-model="decodeModal.password"/>
          </FormItem>          
        </Form>
    </Modal>
  </div>
</template>
<style scoped>
  .container {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .inner {
    width: 800px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
  }
  .demo-split-pane {
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
  }
  .unformat_wrapper {
    width: 100%;
    height: 100%;
    outline: none;
  }
  .img_container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #dcdee2;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .img_previewer {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 600px;
    max-height: 600px;
    padding: 10px;
    box-sizing: border-box;
    /* border: 1px solid #dadada; */
    background-color: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .img_previewer > .img {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    opacity: 0;
  }
  .img_previewer > #canvas {
    max-width: 100%;
    max-height: 100%;
  }
  .img_uploader {
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 600px;
    max-height: 600px;
  }
  .img_uploader .upload_inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .trigger_container {
    width: 100%;
    height: 20px;
    cursor: ns-resize;
    margin-top: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tips_left {
    width: calc(50% - 10px);
    height: 20px;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .tips_right {
    width: calc(50% - 10px);
    height: 20px;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .tips_right .tone {
    margin-left: 8px;
  }
  .trigger_wrapper {
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid #aaaaaa;
    color: #aaaaaa;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: scale(1) rotate(90deg);
  }
  .trigger_wrapper:hover,
  .trigger_wrapper:active {
    transform: scale(1.2) rotate(90deg);
  }
  .converted_container {
    height: 100%;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    overflow-y: auto;
    font-size: 16px;
    padding: 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .converted_container #output {
    max-width: 100%;
    max-height: 100%;
    background-color: #fff;
  }
  .converted_container .out_image {
    max-width: 100%;
    max-height: 100%;
  }
  .decoded_message {
    height: 100%;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    overflow-y: auto;
    font-size: 16px;
    padding: 8px;
    box-sizing: border-box;
  }

  .form_item_label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  .form_item_label i {
    color: #2db7f5;
  }
</style>
<script>
  /**
   * More Imformation: https://github.com/oakes/PixelJihad
   */
  const sjcl = require('../../../static/js/sjcl.js')
  export default {
    name: 'steganography',
    data() {
      return {
        split: 0.5,
        reader: null,
        imageSrc: '',
        outImage: '',
        outMessage: '',
        decodeModalLoading: true,
        encodeModalLoading: true,
        encodeModal: {
          shown: false,
          message: '',
          password: ''
        },
        decodeModal: {
          shown: false,
          password: ''
        },
        canvasSize: {
          width: 250,
          height: 250
        },
        maxMessageSize: 1000
      }
    },
    computed: {
      bodyStyles() {
        return this.$store.state.bodyStyles
      },
      containerStyles() {
        return {
          height: this.bodyStyles.height - 65 + 'px'
        }
      },
      canvasStyles() {
        return {
          width: this.canvasSize.width + 'px',
          height: this.canvasSize.height + 'px'
        }
      }
    },
    created() {
      const that = this
      this.$nextTick(() => {
        this.reader = new FileReader()
      })
    },
    methods: {
      decode() {
        this.decodeModalLoading = false
        var password = this.decodeModal.password
        var passwordFail = '密码不正确或该图片无加密内容'

        // decode the message with the supplied password
        var ctx = document.getElementById('canvas').getContext('2d')
        var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
        var message = this.decodeMessage(
          imgData.data,
          sjcl.hash.sha256.hash(password)
        )

        // try to parse the JSON
        var obj = null
        try {
          obj = JSON.parse(message)
        } catch (e) {
          // display the "choose" view
          this.$nextTick(() => {
            this.decodeModalLoading = true
          })
          this.decodeModal.shown = true

          if (password.length > 0) {
            this.$Message.error(passwordFail)
            // this.resetModalData()
          }
        }
        // display the "reveal" view
        if (obj) {
          // decrypt if necessary
          if (obj.ct) {
            try {
              obj.text = sjcl.decrypt(password, message)
            } catch (e) {
              this.$nextTick(() => {
                this.decodeModalLoading = true
              })
              // this.resetModalData()
              this.$Message.error(passwordFail)
            }
          }

          // escape special characters
          var escChars = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '\n': '<br/>'
          }
          var escHtml = function(string) {
            return String(string).replace(/[&<>"'\/\n]/g, function(c) {
              return escChars[c]
            })
          }
          this.outMessage = escHtml(obj.text)
          this.resetModalData()
        }
      },
      encode() {
        this.encodeModal.shown = true
      },
      getBit(number, location) {
        return (number >> location) & 1
      },
      setBit(number, location, bit) {
        return (number & ~(1 << location)) | (bit << location)
      },
      getNextLocation(history, hash, total) {
        var pos = history.length
        var loc = Math.abs(hash[pos % hash.length] * (pos + 1)) % total
        while (true) {
          if (loc >= total) {
            loc = 0
          } else if (history.indexOf(loc) >= 0) {
            loc++
          } else if ((loc + 1) % 4 === 0) {
            loc++
          } else {
            history.push(loc)
            return loc
          }
        }
      },
      getMessageBits(message) {
        var messageBits = []
        for (var i = 0; i < message.length; i++) {
          var code = message.charCodeAt(i)
          messageBits = messageBits.concat(this.getBitsFromNumber(code))
        }
        return messageBits
      },
      getBitsFromNumber(number) {
        var bits = []
        for (var i = 0; i < 16; i++) {
          bits.push(this.getBit(number, i))
        }
        return bits
      },
      encodeMessage(colors, hash, message) {
        // make an array of bits from the message
        var messageBits = this.getBitsFromNumber(message.length)
        messageBits = messageBits.concat(this.getMessageBits(message))

        // this will store the color values we've already modified
        var history = []

        // encode the bits into the pixels
        var pos = 0
        while (pos < messageBits.length) {
          // set the next color value to the next bit
          var loc = this.getNextLocation(history, hash, colors.length)
          colors[loc] = this.setBit(colors[loc], 0, messageBits[pos])

          // set the alpha value in this pixel to 255
          // we have to do this because browsers do premultiplied alpha
          // see for example: http://stackoverflow.com/q/4309364
          while ((loc + 1) % 4 !== 0) {
            loc++
          }
          colors[loc] = 255

          pos++
        }
      },
      decodeMessage(colors, hash) {
        // this will store the color values we've already read from
        var history = []

        // get the message size
        var messageSize = this.getNumberFromBits(colors, history, hash)

        // exit early if the message is too big for the image
        if ((messageSize + 1) * 16 > colors.length * 0.75) {
          this.resetModalData()
          return ''
        }

        // exit early if the message is above an artificial limit
        if (messageSize === 0 || messageSize > this.maxMessageSize) {
          this.resetModalData()
          return ''
        }

        // put each character into an array
        var message = []
        for (var i = 0; i < messageSize; i++) {
          var code = this.getNumberFromBits(colors, history, hash)
          message.push(String.fromCharCode(code))
        }
        this.resetModalData()
        // the characters should parse into valid JSON
        return message.join('')
      },
      getNumberFromBits(bytes, history, hash) {
        var number = 0,
          pos = 0
        while (pos < 16) {
          var loc = this.getNextLocation(history, hash, bytes.length)
          var bit = this.getBit(bytes[loc], 0)
          number = this.setBit(number, pos, bit)
          pos++
        }
        return number
      },
      confirmEncode() {
        this.encodeModalLoading = false
        var message = this.encodeModal.message
        var password = this.encodeModal.password
        // var output = document.getElementById('output')
        var canvas = document.getElementById('canvas')
        var ctx = canvas.getContext('2d')

        // encrypt the message with supplied password if necessary
        if (password.length > 0) {
          message = sjcl.encrypt(password, message)
        } else {
          message = JSON.stringify({ text: message })
        }

        // exit early if the message is too big for the image
        var pixelCount = ctx.canvas.width * ctx.canvas.height
        if ((message.length + 1) * 16 > pixelCount * 4 * 0.75) {
          this.$Message.info('加密内容太复杂')
          // this.resetModalData()
          this.$nextTick(() => {
            this.encodeModalLoading = true
          })
          return
        }

        // exit early if the message is above an artificial limit
        if (message.length > this.maxMessageSize) {
          this.$Message.info('加密内容字数大多')
          // this.resetModalData()
          this.$nextTick(() => {
            this.encodeModalLoading = true
          })
          return
        }

        // encode the encrypted message with the supplied password
        var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
        this.encodeMessage(imgData.data, sjcl.hash.sha256.hash(password), message)
        ctx.putImageData(imgData, 0, 0)

        // view the new image
        this.$Message.success('加密完成，右键可存储图片')
        this.outImage = canvas.toDataURL()
        this.resetModalData()
      },
      initImage(data) {
        if (data.width / 600 >= data.height / 250) {
          this.canvasSize.width = 600
          this.canvasSize.height = (data.height * 600) / data.width
        } else {
          this.canvasSize.height = 250
          this.canvasSize.width = (data.width * 250) / data.height
        }
        setTimeout(() => {
          let _canvas = document.getElementById('canvas')
          let _ctx = _canvas.getContext('2d')
          _ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
          _ctx.drawImage(
            data.img,
            0,
            0,
            data.width,
            data.height,
            0,
            0,
            this.canvasSize.width,
            this.canvasSize.height
          )
        }, 100)
      },
      resetModalData() {
        this.encodeModal = {
          shown: false,
          message: '',
          password: ''
        }
        this.decodeModal = {
          shown: false,
          password: ''
        }
      },
      beforeUploadImage(f) {
        const that = this
        this.reader.readAsDataURL(f)
        this.reader.onload = function(e) {
          that.imageSrc = this.result
          let img = new Image()
          img.src = this.result
          img.onload = function() {
            that.initImage({
              img: this,
              width: this.width,
              height: this.height
            })
          }
        }
        this.outImage = ''
        this.outMessage = ''
        this.resetModalData()
        return false
      }
    }
  }
</script>


<template>
  <div class="tool_container" :style="containerstyles">
    <Input v-model="urlStr" type="textarea" :rows="4" autofocus class="no-resize tool_url_container" placeholder="请输入url或JSON格式参数" @on-keydown="input" @on-change="change"/>
    <div class="result_container" :style="resultContainerStyles">
      <span class="result_placeholder" v-if="!formattedStr">URL参数解析</span>
      <div v-html="formattedStr" v-else class="fs16"></div>
    </div>
  </div>
</template>
<style scoped>
  .fs16 {
    font-size: 40px/40px;
  }
  .tool_container {
    width: 100%;
    max-width: 1000px;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    margin: 0 auto;
    /*background-color: #f8f8f8;*/
  }
  .result_container {
    width: 100%;
    margin-top: 20px;
    overflow-y: auto;
    padding: 8px;
    box-sizing: border-box;
    font-size: 16px;
    border: 1px solid #dcdee2;
    background-color: rgba(255, 255, 255, .9);
    border-radius: 4px;
  }
  .result_placeholder {
    color: #c5c5c5;
    font-size: 14px;
    pointer-events: none;
  }
</style>
<script>
import '../../../static/js/jquery.json'
import '../../../static/js/json2'
import '../../../static/js/jsonlint'
export default {
  name: 'url',
  data () {
    return {
      urlStr: '',
      formattedStr: '',
      currentJson: '',
      currentJsonStr: ''
    }
  },
  computed: {
    // toolContainerStyles () {
    //   let bodyStyles = this.$store.state.bodyStyles
    //   return {
    //   }
    // }
    bodyStyles () {
      return this.$store.state.bodyStyles
    },
    containerstyles () {
      return {
        height: (this.bodyStyles.height - 65) + 'px'
      }
    },
    resultContainerStyles () {
      return {
        height: (this.bodyStyles.height - 94 - 20 - 65 - 30) + 'px'
      }
    }
  },
  methods: {
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
      this.urlStr = e.target.value
    },
    getFormatParamsStr (obj) {
      let outStr = []
      for (let o in obj) {
        if (obj.hasOwnProperty(o)) {
          outStr.push(o + '=' + obj[o])
        }
      }
      return outStr.join('&')
    },
    formatUrlParams (s) {
      let outObj = {}
      let urlArr = s.split('&')
      for (let i = 0; i < urlArr.length; i++) {
        if (!outObj.hasOwnProperty(urlArr[i].split('=')[0])) {
          outObj[urlArr[i].split('=')[0]] = urlArr[i].split('=')[1]
        }
      }
      return outObj
    },
    getFormatParamsObj (str) {
      let _s = ''
      if (str.indexOf('?') < 0) {
        if (str.indexOf('&') < 0) {
          if (str.indexOf('=') > 0) {
            let _o = {}
            _o[str.split('=')[0]] = str.split('=')[1]
            return new JSONFormat(JSON.stringify(_o), 4).toString()
          }
          return new JSONFormat('{}', 4).toString()
        } else {
          _s = str
        }
      } else {
        _s = str.split('?')[1]
      }
      return new JSONFormat(JSON.stringify(this.formatUrlParams(_s)), 4).toString()
    }
  },
  components: {},
  watch: {
    urlStr (val) {
      if (val.trim() === '') {
        this.formattedStr = ''
      } else {
        if (!val.match(/['"]/g)) {
          this.formattedStr = this.getFormatParamsObj(val)
        } else {
          let v = val.replace(/'/g, '\"').replace(/(\{[a-z0-9])/ig, item => item.substring(0,1) + '\"' + item.substring(1,2))
            // .replace(/([a-z0-9]\})/ig, item => item.substring(0,1) + '\"' + item.substring(1,2))
            .replace(/([a-z0-9]:(?!\/))/ig, item => item.substring(0,1) + '\"' + item.substring(1,2))
            // .replace(/(,[a-z0-9])/ig, item => item.substring(0,1) + '\"' + item.substring(1,2))
            // .replace(/([a-z0-9],)/ig, item => item.substring(0,1) + '\"' + item.substring(1,2))
            .replace(/(:\/)/g, item => '%3A' + item.substring(1,2))
            .replace(/\//g, '%2F')
          let objV = {}
          try {
            this.currentJson = jsonlint.parse(v)
            this.currentJsonStr = JSON.stringify(this.currentJson)
            objV = JSON.parse(v)
            this.formattedStr = this.getFormatParamsStr(objV)
          } catch (err) {
            this.formattedStr = '<span style="color: #f1592a; font-weight: bold;">' + err + '</span>'
          }
        }    
      }  
    }
  }
}
</script>

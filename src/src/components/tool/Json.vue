<template>
  <div class="tool_container" :style="toolContainerStyles">
    <Split v-model="split" min="100">
        <div slot="left" class="demo-split-pane">
            <Input v-model="jsonStr" type="textarea" autofocus class="unformat_wrapper" placeholder="请输入JSON字符串" />
        </div>
        <div slot="trigger" class="trigger_container">
          <div class="trigger_wrapper">
            <Icon type="ios-code" size="14" />
          </div>
        </div>
        <div slot="right" class="demo-split-pane">          
            <div class="json_target" v-html="formatJsonStr">              
            </div>
        </div>
    </Split>
  </div>
</template>
<style scoped>
  .tool_container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }
  .demo-split{
    height: 200px;
    border: 1px solid #dcdee2;
  }
  .demo-split-pane{
    height: 100%;
    padding: 15px;
  }
  .unformat_wrapper {
    width: 100%;
    height: 100%;
    outline: none;
  }
  .trigger_container {
    width: 20px;
    height: 100%;
    cursor: ew-resize;
    margin-left: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .trigger_wrapper {
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid #aaaaaa;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: scale(1);
  }
  .trigger_wrapper:hover, .trigger_wrapper:active {
    transform: scale(1.2);
  }
  .json_target {
    height: 100%;
    font-size: 15px;
    overflow-y: auto;
  }
</style>
<script>
import '../../../static/js/jquery.json'
import '../../../static/js/json2'
import '../../../static/js/jsonlint'
export default {
  name: 'json',
  data () {
    return {
      split: 0.5,
      jsonStr: '',
      currentJson: '',
      currentJsonStr: ''
    }
  },
  computed: {    
    bodyStyles () {
      return this.$store.state.bodyStyles
    },
    toolContainerStyles () {    
      return {
        height: (this.bodyStyles.height - 65) + 'px'
      }
    },
    formatJsonStr () {
      let result = ''    
      if (this.jsonStr !== '') {
        let jsonStr = this.jsonStr
        try {
          this.currentJson = jsonlint.parse(jsonStr)
          this.currentJsonStr = JSON.stringify(this.currentJson)
          result = new JSONFormat(jsonStr, 4).toString()
        } catch (e) {
          result = '<span style="color: #f1592a; font-weight: bold;">' + e + '</span>'
          this.currentJsonStr = result
        }
        return result
      } else {
        return ''
      }
    }
  },
  components: {}
}
</script>

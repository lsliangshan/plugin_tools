<template>
	<div class="pinyin_container" :style="pinyinContainerStyles">
		<div class="pinyin_inner">
			<Split v-model="split" min="100" mode="vertical">
		        <div slot="top" class="demo-split-pane">
		            <Input type="textarea" autofocus class="unformat_wrapper no_bg" v-model="originalText" placeholder="汉字" />
		        </div>
		        <div slot="trigger" class="trigger_container">
		        	<div class="tips_left">
		        		<Button type="primary" ghost @click="get5B">转成五笔</Button>
		        	</div>
		          	<div class="trigger_wrapper">
		            	<Icon type="ios-code" size="14" />
		          	</div>
		          	<div class="tips_right">
		          		<Button type="primary" @click="getPinYin">转成拼音</Button>
						<Checkbox class="tone" v-model="needTone">标注音调</Checkbox>
		          	</div>
		        </div>
		        <div slot="bottom" class="demo-split-pane">
		            <div class="converted_container" v-html="targetText" placeholder="拼音"></div>
		        </div>
		    </Split>
		</div>
	</div>
</template>
<style scoped>
  .pinyin_container {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pinyin_inner {
    width: 100%;
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
  }
</style>
<script>
  import { resolve } from 'url'
  export default {
    name: 'pinyin',
    data() {
      return {
        split: 0.5,
        originalText: '',
        targetText: '',
        needTone: false // 是否需要标注音调
      }
    },
    computed: {
      bodyStyles() {
        return this.$store.state.bodyStyles
      },
      pinyinContainerStyles() {
        return {
          height: this.bodyStyles.height - 65 + 'px'
        }
      }
    },
    methods: {
      convert(args) {
        return new Promise(resolve => {
          this.$axios({
            url: 'http://127.0.0.1:3000/enkel/index/delegate',
            method: 'post',
            data: {
              baseURL: 'https://tool.lu',
              url: '/py5bconvert/ajax.html',
              method: 'post',
              data: {
                code: this.originalText || '',
                tone: args.type === '5b' ? '0' : this.needTone ? '1' : '0',
                operate: args.type
              }
            }
          }).then(({ data }) => {
            if (data.status === 200) {
              resolve(data.data)
            } else {
              resolve({})
            }
          })
        })
      },
      async getPinYin() {
        let convertData = await this.convert({
          type: 'py'
        })
        if (convertData.status) {
          this.targetText = convertData.text
        } else {
          this.targetText = '转换失败'
        }
      },
      async get5B() {
        let convertData = await this.convert({
          type: '5b'
        })
        if (convertData.status) {
          this.targetText = convertData.text
        } else {
          this.targetText = '转换失败'
        }
      }
    }
  }
</script>
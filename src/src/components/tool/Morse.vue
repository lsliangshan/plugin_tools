<template>
  <div class="container" :style="containerStyles">
    <div class="inner">
      <Split v-model="split" min="100" mode="vertical">
		        <div slot="top" class="demo-split-pane">
		            <Input type="textarea" autofocus class="unformat_wrapper no_bg" v-model="originalText" placeholder="正常文本" />
		        </div>
		        <div slot="trigger" class="trigger_container">
		        	<div class="tips_left">
		        		<Button type="primary" @click="encode">编码</Button>
		        	</div>
		          	<div class="trigger_wrapper">
		            	<Icon type="ios-code" size="14" />
		          	</div>
		          	<div class="tips_right">
		          		<Button type="primary" ghost @click="decode">解码</Button>
                  <span class="lb">长</span>
                  <Input type="text" v-model="config.long" class="ipt"/>
                  <span class="lb">短</span>
                  <Input type="text" v-model="config.short" class="ipt"/>
                  <span class="lb">间隔</span>
                  <Input type="text" v-model="config.space" class="ipt"/>
		          	</div>
		        </div>
		        <div slot="bottom" class="demo-split-pane">
                <Input type="textarea" autofocus class="unformat_wrapper no_bg" v-model="targetText" placeholder="摩斯电码" />
		        </div>
		    </Split>
    </div>
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
  .tips_right .lb {
    margin: 0 5px;
  }
  .tips_right .ipt {
    width: 50px;
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
  import xmorse from 'xmorse'
  export default {
    name: 'morse',
    data() {
      return {
        split: 0.5,
        originalText: '',
        targetText: '',
        defaultConfig: {
          long: '-',
          short: '*',
          space: '/'
        },
        config: {
          long: '-',
          short: '*',
          space: '/'
        }
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
      }
    },
    methods: {
      encode() {
        this.targetText = xmorse.encode(this.originalText, {
          long: this.config.long || this.defaultConfig.long,
          short: this.config.short || this.defaultConfig.short,
          space: this.config.space || this.defaultConfig.space
        })
      },
      decode() {
        this.originalText = xmorse.decode(this.targetText, {
          long: this.config.long || this.defaultConfig.long,
          short: this.config.short || this.defaultConfig.short,
          space: this.config.space || this.defaultConfig.space
        })
      }
    }
  }
</script>



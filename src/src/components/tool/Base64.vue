<template>
  <div class="tool_container base64_container" :style="toolContainerStyles">
  	<Tabs type="card" style="height: 100%;">
        <TabPane label="字符编码">
			<Split v-model="split" min="100" mode="vertical">
		        <div slot="top" class="demo-split-pane">
		            <Input type="textarea" autofocus class="unformat_wrapper no_bg" :value="unencodedText || decodedText" placeholder="解码结果或待编码的字符（正常字符）" @on-change="changeUnencodedText" :class="{'error_input': decodedText === defaultErrorText}" />
		        </div>
		        <div slot="trigger" class="trigger_container">
		        	<p class="tips_left"><Icon type="md-arrow-up" size="18" />正常字符</p>
		          	<div class="trigger_wrapper">		          	
		            	<Icon type="ios-code" size="14" />		            
		          	</div>
		          	<p class="tips_right">Base64格式的字符<Icon type="md-arrow-down" size="18" /></p>
		        </div>
		        <div slot="bottom" class="demo-split-pane">
		            <!-- <div class="format_wrapper">
		            	
		            </div> -->
		            <Input type="textarea" autofocus class="unformat_wrapper no_bg" :value="undecodedText || encodedText" placeholder="编码结果或待解码的字符（Base64格式的字符）" @on-change="changeUndecodedText" />
		        </div>
		    </Split>
        </TabPane>
        <TabPane label="文件编码">
        	<Split v-model="split2" min="100" mode="vertical">
		        <div slot="top" class="demo-split-pane">
		        	<div class="decode_image_wrapper">
		        		<div class="decode_image_preview">
		        			<img :src="decodedImage" alt="文件预览" v-if="imageTypes.indexOf(fileType) > -1">
		        			<p v-else class="preview_other_type"><Icon type="md-document" size="18" />{{fileType}}</p>
		        		</div>
		        		<div class="decode_image_chooser">
		        			<Upload
						        type="drag"
						        :before-upload="beforeUploadImage"
						        action="/">
						        <div class="upload_inner">
						            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
						            <p>点击或拖动文件上传</p>
						        </div>
						    </Upload>
		        		</div>		        		
		        	</div>
		        </div>
		        <div slot="trigger" class="trigger_container">
		          <div class="trigger_wrapper">
		            <Icon type="ios-code" size="14" />
		          </div>
		        </div>
		        <div slot="bottom" class="demo-split-pane">
		            <Input type="textarea" autofocus class="unformat_wrapper no_bg" :value="decodedImage" placeholder="编码结果或待解码的字符" @on-change="changeImageBase64" />
		        </div>
		    </Split>
        </TabPane>
    </Tabs>    
  </div>
</template>
<style scoped>
  .tool_container {
    width: 100%;
    /*max-width: 1000px;*/
    margin: 0 auto;
    padding: 15px;
    box-sizing: border-box;
  }
  .demo-split{
    height: 200px;
    border: 1px solid #dcdee2;
  }
  .demo-split-pane{
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
  }
  .operation_container {
    position: absolute;
    top: 23px;
    right: 23px;
    height: 32px;
  }
  .operation_item {
    width: 32px;
    height: 32px;
    cursor: pointer;
    margin-left: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .operation_item:hover {
    background-color: #f2f2f2;
  }
  .operation_item i {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
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
  	margin-right: 15px;
  	display: inline-flex;
  	align-items: center;
  }
  .tips_right {
  	margin-left: 15px;
  	display: inline-flex;
  	align-items: center;
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
    transition: all .2s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: scale(1) rotate(90deg);
  }
  .trigger_wrapper:hover, .trigger_wrapper:active {
    transform: scale(1.2) rotate(90deg);
  }
  .format_wrapper {
  	width: 100%;
  	height: 100%;
  	overflow-x: hidden;
  	overflow-y: auto;
  	font-size: 15px;
  	background-color: transparent;
  	border-radius: 4px;
  	/*padding: 8px;*/
  	box-sizing: border-box;
  	/*border: 1px solid #dcdee2;*/
  }

	.decode_image_wrapper {
		display: flex;
		flex-direction: row; 
		align-items: center; 
		justify-content: 
		space-between; 
		width: 100%; 
		height: 100%; 
	}
	.decode_image_preview {
		width: 50%;
		height: 100%;
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border: 1px solid #dcdee2;
	}
	.decode_image_preview img {
		max-width: 100%;
		max-height: 100%;
	}
	.preview_other_type {
		font-size: 16px;
		display: flex;
		align-items: center;
	}
	.preview_other_type i {
		margin-right: 8px;
	}
	.decode_image_chooser {
		width: 50%;
		height: 100%;
	}
  .upload_inner {
	height: 100%;
  	display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
<script>
	const Base64 = require('js-base64').Base64
	export default {
		name: 'base64',
		data () {
			return {
				split: 0.3,
				split2: 0.4,
				reader: null,
				imageTypes: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
				defaultErrorText: '不合法的base64编码',
				unencodedText: '', // 待加密的字符
				encodedText: '', // 已经加密的字符
				undecodedText: '', // 待解密的字符
				decodedText: '', // 已经解密的字符
				decodedImage: '', // 已经解密的图片数据 base64
				encodeImageMessager: ''
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
		    fileType () {
		    	return this.decodedImage.substring(0, 50).replace(/^(data:)(.*)(\/)(.*)(;base64,.*)$/, '$4')
		    }
		},
		created () {
			const that = this
			this.$nextTick(() => {				
				this.reader = new FileReader()
			})
		},
		methods: {
			encode (text) {
				return Base64.encode(text)
			},
			decode (text) {
				let outText = ''
				try {
					outText = Base64.decode(text)
				} catch (err) {
					outText = this.defaultErrorText
				}
				return outText
			},
			changeUnencodedText (e) {
				// 加密
				this.decodedText = ''
				this.unencodedText = e.target.value.trim()
				this.undecodedText = ''
				this.encodedText = this.encode(e.target.value.trim())
			},
			changeUndecodedText (e) {
				// 解密
				this.encodedText = ''
				this.undecodedText = e.target.value.trim()
				this.unencodedText = ''
				this.decodedText = this.decode(e.target.value.trim())
			},
			beforeUploadImage (f) {
				const that = this
				this.encodeImageMessager = this.$Message.loading({
					content: '文件转base64...',
					duration: 0
				})
				setTimeout(() => {
					this.reader.readAsDataURL(f)
					this.reader.onload = function (e) {
						that.decodedImage = this.result
						setTimeout(that.encodeImageMessager, 1000);
					}
				}, 300)
				return false
			},
			changeImageBase64 (e) {
				if (!e.target.value.trim().match(/^data:image\//)) {
					this.decodedImage = 'data:image/png;base64,' + e.target.value.trim()
				} else {
					this.decodedImage = e.target.value.trim()
				}
			}
		}
	}
</script>
<template>
	<div class="color_container" :style="colorContainerStyles">
		<div class="color_inner">
			<div class="top_container">
				<Row class="top_row">
					<Col :span="12" class="image_preview" :style="{backgroundColor: `rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]})`}">
						<img :src="targetImage" ref="target" alt="">
					</Col>
					<Col :span="12" style="height: 100%;">
						<Upload
					        type="drag"
					        accept="image/*"
					        :before-upload="beforeUploadImage"
					        action="/">
					        <div class="upload_inner">
					            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
					            <p>点击或拖动图片上传</p>
					        </div>
					    </Upload>
					</Col>
				</Row>
			</div>
			<div class="bottom_container" v-if="targetImage">
				<div class="color_result">
					<div class="color_result_title">
						<h3>主色调</h3>
					</div>
					<div class="color_result_content">
						<Tooltip content="点击复制颜色" placement="top">
				            <div class="color_item">
								<div class="color_item_bg" :style="{backgroundColor: `rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]})`}"></div>
								<div class="color_item_text" ref="colorRef">{{rgbToHex(`rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]})`)}}</div>
							</div>
				        </Tooltip>
					</div>
				</div>
				<div class="color_result">
					<div class="color_result_title">
						<h4>其它颜色</h4>
					</div>
					<div class="color_result_content">
						<Tooltip content="点击复制颜色" placement="top" v-for="(item, index) in colors" :key="index">
							<div class="color_item">
								<div class="color_item_bg" :style="{backgroundColor: `rgb(${item[0]},${item[1]},${item[2]})`}"></div>
								<div class="color_item_text" ref="colorRef">{{rgbToHex(`rgb(${item[0]},${item[1]},${item[2]})`)}}</div>
							</div>
						</Tooltip>
					</div>
				</div>
			</div>			
		</div>		
	</div>
</template>
<style scoped>
	.color_container {
		width: 100%;		
		padding: 15px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.color_inner {
		width: 1000px;
		height: 100%;
		overflow-y: auto;
		border-radius: 4px;
		padding: 15px;
		box-sizing: border-box;
		background-color: rgba(255, 255, 255, 0.9);
	}
	.top_container {
		width: 100%;
		height: 300px;
	}
	.top_row {
		width: 100%;
		height: 100%;
	}
	.image_preview {
		height: 100%;
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: inset 0 60px rgba(255,255,255,.2), inset 0 0 300px rgba(255,255,255,.1), inset 50px -20px 0 rgba(255,255,255,.1), inset -300px 120px rgba(255,255,255,.06); 
		-webkit-transition: background-color .25s; 
		transition: background-color .25s;
	}
	.image_preview img {
		max-width: 100%;
		max-height: 100%;
	}
	.upload_inner {
		height: 100%;
	  	display: inline-flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: center;
	  }
	.bottom_container {
		width: 100%;
		margin-top: 15px;
	}
	.color_result {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.color_result_content {
		width: 100%;
		height: 80px;
		margin: 8px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;		
	}
	.color_item {
		width: 80px;
		height: 80px;
		margin: 8px;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
	}
	.color_item_bg {
		width: 80px;
		height: 60px;
		pointer-events: none;
	}
	.color_item_text {
		width: 80px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-style: 13px;
		pointer-events: none;
	}
</style>
<script>
	// import 'rgbaster.js'
	// require('../../../static/js/color-thief.min.js')
	// import '../../../static/js/color-thief.min.js'
	// const ColorThief = require('color-thief')
	// const thmclrx = require('thmclrx')
	const Clipboard = require('clipboard')
	export default {
		name: 'image',
		data () {
			return {
				reader: null,
				targetImage: '',
				colorThief: '',
				dominantColor: '',
				colors: []
			}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			colorContainerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			}
		},
		async created () {
			const that = this
			await this.loadScript('/html/static/js/color-thief.min.js')			
			this.$nextTick(() => {
				setTimeout(() => {
					this.colorThief = new ColorThief()
					this.reader = new FileReader()
				}, 100)

				this.initCopyColor()
			})
		},
		methods: {
			beforeUploadImage (f) {
				const that = this
				setTimeout(() => {
					this.reader.readAsDataURL(f)
					this.reader.onload = function (e) {
						that.targetImage = this.result
					}
				}, 300)
				return false
			},
			getImageDominantColor () {
				// 获取图片主题色
				const that = this
				return new Promise((resolve) => {
					that.dominantColor = that.colorThief.getColor(that.$refs.target)
					resolve(true)
				})
			},
			getImageColor (count) {
				// 获取图片的其它颜色
				const that = this
				return new Promise((resolve) => {
					that.colors = that.colorThief.getPalette(that.$refs.target, count || 10)
					resolve(true)
				})
			},
			initCopyColor () {
				const that = this
				const clipboard = new Clipboard('.color_item', {
					target: function (trigger) {
						return trigger.querySelector('.color_item_text')
					}
				})
		      clipboard.on('success', function (e) {
		        if (e.text.trim() !== '') {
		          let _msg = ''
		          if (e.action === 'copy') {
		            _msg = '复制成功'
		          } else if (e.action === 'cut') {
		            _msg = '剪切成功'
		          }
		          that.$Message.success(_msg)
		        }
		      })
		      clipboard.on('error', function (e) {
		        if (e.text.trim() !== '') {
		          let _msg = ''
		          if (e.action === 'copy') {
		            _msg = '复制失败'
		          } else if (e.action === 'cut') {
		            _msg = '剪切失败'
		          }
		          that.$Message.error(_msg)
		        }
		      })
			}
		},
		watch: {
			targetImage (val) {
				if (val) {
					setTimeout(async () => {
						await this.getImageDominantColor()
						await this.getImageColor()
					})
				}
			}
		}
	}
</script>
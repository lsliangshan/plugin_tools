<template>
	<div class="popup_container">
		<div class="popup_title">{{windowInfo.title || windowInfo.url}}</div>
		<div class="popup_qrcode">
			<div class="popup_no_qrcode" key="noqrcode" v-if="!windowInfo.url">
				<div class="popup_no_qrcode_inner">请输入文字</div>
			</div>
			<div class="popup_qrcode_wrapper" key="qrocde" v-else>
				<canvas id="qrcodeWrapperRef"></canvas>
			</div>
		</div>
		<div class="qrcode_address">
			<Input type="textarea" v-model="windowInfo.url" placeholder="请输入文字" :rows="2" class="no-resize" @on-keydown="input" @on-change="change"/>
		</div>
		<div class="popup_bottom">			
			<Button type="text" @click="gotoHome">更多操作</Button>
		</div>
	</div>
</template>

<style scoped>
	.popup_container {
		width: 300px;
		/*height: 400px;*/
		min-height: 400px;
		background-color: #FFFFFF;
	}
	.popup_title {
		width: 300px;
		font-size: 16px;
		font-weight: bold;
		padding: 15px;
		box-sizing: border-box;
	}
	.popup_qrcode {
		width: 300px;
		height: 300px;
	}	
	.popup_no_qrcode {
		width: 300px;
		height: 300px;
		padding: 15px;
		box-sizing: border-box;
	}
	.popup_no_qrcode_inner {
		width: 100%;
		height: 100%;
		color: #dcdee2;
		font-size: 16px;
		border: 1px solid #dcdee2;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.qrcode_address {
		width: 300px;
		padding: 0 15px;
		box-sizing: border-box;
	}
	.popup_bottom {
		width: 300px;
		padding: 15px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

<script>
	import QRCode from 'qrcode'
	export default {
		name: 'Popup',
		data () {
			return {
				qrcodeHtml: '',
				windowInfo: {}
			}
		},
		async mounted () {			
			this.windowInfo = await this.getWindowInfo()
			setTimeout(() => {
				this.initQrcode()
			}, 10)
		},
		methods: {
			getWindowInfo () {
				return new Promise(resolve => {
					chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
						resolve(tabs[0])
					});
				})
			},
			initQrcode (url) {
				const that = this
				if (this.windowInfo.url) {
					QRCode.toCanvas(document.getElementById('qrcodeWrapperRef'), this.windowInfo.url, {
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
		      this.windowInfo.url = e.target.value
		    },
		    gotoHome () {
		    	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.create({url: chrome.extension.getURL('html/index.html')});
				});
		    }
		},
		watch: {
			'windowInfo.url' (val) {
				this.initQrcode()
			}
		}
	}
</script>

<template>
	<div class="scripts_container" :style="scriptsContainerStyles">
		<div class="scripts_inner" :style="scriptsInnerStyles">
			<Card :bordered="false" class="user_script_item" v-for="(item, index) in userScripts" :key="index">
	            <div class="user_script_card_inner" :data-index="index" @click="openModal">
	            	<img class="site_favicon_img pen" :src="'http://' + getHost(item.match) + '/favicon.ico'" @error="imgLoadError">
	            	<Tooltip :content="item.desc" :class="{pen: !item.desc}" placement="bottom" :transfer="true" :max-width="250">
			            <div class="user_script_card_desc" :data-index="index" @click="openModal">{{item.desc || '暂无描述'}}</div>
			        </Tooltip>	            	
	            </div>
	            <div class="user_script_card_item_status pen" :class="{active: item.active}">
	            	<div class="status_text">{{item.active ? 'ON' : 'OFF'}}</div>
	            </div>
	        </Card>
	        <Card :bordered="false" class="user_script_item">
	            <div class="user_script_card_inner" @click="createNewCard">
	            	<Icon type="md-add" size="50" />
	            </div>
	        </Card>
		</div>

		<Modal
	        v-model="cardModal.shown"
	        title="修改"
	        @on-ok="confirmModify"
	        @on-cancel="resetCardModal"
	        >
	        <div style="word-break: break-all;">{{JSON.stringify(cardModal.data)}}</div>
	        <Form :label-width="80" :model="cardModal.data">
	        	<FormItem label="状态">
	        		<i-switch v-model="cardModal.data.active" size="large">
		                <span slot="open">On</span>
		                <span slot="close">Off</span>
		            </i-switch>
	        	</FormItem>
	        	<FormItem label="匹配域名">
	        		<Input type="text" placeholder="请输入匹配的域名" v-model="cardModal.data.match"/>
	        	</FormItem>
	        	<FormItem label="用户脚本">
	        		<div class="user_scripts_wrapper">
	        			<div class="script_item" v-for="(script, idx) in cardModal.data.scripts" :key="idx">
	        				<Input type="text" class="script_input" placeholder="请输入用户脚本" v-model="cardModal.data.scripts[idx]" />
	        				<div class="script_item_operate">
	        					<Icon type="md-remove-circle" class="item_operation remove_operation" size="24" key="remove" v-if="idx < cardModal.data.scripts.length - 1" :data-index="idx" @click="removeScript" />
	        					<Icon type="md-add-circle" class="item_operation add_operation" size="24" key="add" v-else @click="addScript" />
	        				</div>
	        			</div>
	        		</div>
	        	</FormItem>
	        	<FormItem label="脚本描述">
	        		<Input type="textarea" class="no-resize" placeholder="请输入脚本描述, 最多80字" :maxlength="80" :autosize="{ minRows: 2, maxRows: 4 }" v-model="cardModal.data.desc"/>
	        	</FormItem>
	        </Form>
	    </Modal>
	</div>
</template>
<style scoped>
	.pen {
		pointer-events: none;
	}
	.scripts_container {
		width: 100%;		
		/*background-color: rgba(255, 255, 255, .9);*/
	}
	.scripts_container * {
		-webkit-user-select: none;
	}
	.scripts_inner {
		/*width: 100%;*/
		padding: 15px;
		box-sizing: border-box;
		overflow-y: auto;
		/*display: flex;
		flex-direction: row;
		flex-wrap: wrap;*/
	}
	.user_script_item {
		position: relative;
		width: 250px;
		height: 150px;
		cursor: pointer;
		margin: 5px;		
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: all .2s ease-in-out;
		opacity: .8;
		overflow: hidden;
	}
	.user_script_item:hover {
		opacity: 1;
	}
	.user_script_card_inner {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.user_script_card_item_status {
		position: absolute;
		right: 0;
		top: 0;
		width: 0;
		height: 0;
		border-top: 20px solid #ed4014;
		border-right: 25px solid #ed4014;
		border-left: 25px solid transparent;
		border-bottom: 20px solid transparent;
	}
	.user_script_card_item_status.active {
		border-top: 20px solid #19be6b;
		border-right: 25px solid #19be6b;
	}
	.user_script_card_item_status .status_text {
		font-size: 12px;
	    position: absolute;
	    left: -13px;
	    top: -15px;
	    width: 50px;
	    height: 20px;
	    transform: rotate(39deg);
	    color: #FFF;
	    font-weight: bolder;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
	.user_script_card_item_status_2 {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 5px;
		background-color: darkcyan;
	}
	.site_favicon_img {
		width: 32px;
		height: 32px;
	}
	.user_script_card_desc {
		width: 100%;
		max-height: 50px;
		line-height: 25px;
		margin-top: 20px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2;
		word-break: break-all;
		padding: 0 15px;
		box-sizing: border-box;
	}

	.user_scripts_wrapper {
		width: 100%;
		min-height: 32px;
	}
	.user_scripts_wrapper .script_item {
		width: 100%;
		height: 32px;
		margin-top: 8px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.user_scripts_wrapper .script_item:first-child {
		margin-top: 0;
	}
	.user_scripts_wrapper .script_item .script_input {
		width: calc(100% - 40px);
	}
	.user_scripts_wrapper .script_item .script_item_operate {
		width: 40px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.user_scripts_wrapper .script_item .script_item_operate .item_operation {
		cursor: pointer;
		transform: scale(1);
		transition: all .1s cubic-bezier(0.215, 0.61, 0.355, 1);
	}
	.user_scripts_wrapper .script_item .script_item_operate .item_operation:hover {
		transform: scale(1.2);
	}
	.user_scripts_wrapper .script_item .script_item_operate .remove_operation {
		color: #ed4014;
	}
	.user_scripts_wrapper .script_item .script_item_operate .add_operation {
		color: #19be6b;
	}
</style>
<script>
	// const Filer = require('filer.js')
	export default {
		name: 'scripts',
		data () {
			return {
				filer: null,
				blankScript: {
					match: '',
					desc: '',
					scripts: [''],
					active: true
				},
				userScripts: [
					{
						match: '*.baidu.com/*',
						desc: '修改百度背景色',
						scripts: ['https://static.dei2.com/extensions/js/test.js'],
						active: true
					},
					{
						match: '*.sina.cn/*',
						desc: '修改新浪背景色',
						scripts: ['https://static.dei2.com/extensions/js/test.js'],
						active: false
					}
				],
				cardModal: {
					shown: false,
					data: {}
				},
				activeIndex: -1
			}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			scriptsContainerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			},
			scriptsInnerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			}
		},
		async created () {
			const that = this
			// await this.loadScript('/html/static/js/FileSaver.js')
			// setTimeout(() => {
			// 	let file = new File(['alert("Dynamic generation")'], '/html/static/js/scripts/main.js', {type: 'text/plain;charset=utf-8'})
			// 	saveAs(file)
			// })
			// await this.initFiler()
			// this.$nextTick(() => {
			// 	// this.filer.ls('/', function (entries) {
			// 	// 	console.log('entries: ', entries)
			// 	// }, this.filerErrorCallback)
			// 	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			// 		console.log('>>>>>tabs id>>>>>', tabs)
			// 		chrome.tabs.sendRequest(tabs[0].id, {greeting: 'Hello'}, function (response) {
			// 			console.log('........', response.farewell)
			// 		})
			// 	});
			// 	// this.filer.cd('/', function (entries) {
			// 	// 	that.filer.write('main.js', {
			// 	// 		data: 'alert("data created by Filer")',
			// 	// 		type: 'text/plain; charset=utf-8'
			// 	// 	}, function (fileEntry, fileWriter) {
			// 	// 		console.log('..... file entry: ', fileEntry)
			// 	// 		console.log('>>>>> file writer: ', fileWriter)
			// 	// 		that.filer.open('main.js', function (file) {
			// 	// 			let reader = new FileReader()
			// 	// 			reader.onload = function (e) {
			// 	// 				console.log('file content: ', this.result)
			// 	// 			}
			// 	// 			reader.readAsText(file)
			// 	// 		})
			// 	// 	}, that.filerErrorCallback)
			// 	// }, this.filerErrorCallback)
			// })
		},
		methods: {
			initFiler () {
				return new Promise(resolve => {
					if (this.filer) {
						resolve(true)
					} else {
						this.filer = new Filer()
						this.filer.init({}, function (fs) {
							console.log('>>> init: ', fs)
							resolve(true)
						})
					}
				})
			},
			filerErrorCallback (e) {
				console.log('filer error callback: ', e.name || e.message)
			},
			getHost (str) {
				return 'www' + str.replace(/([^\.]*)(\.[a-z0-9-]*\.(ac.cn|bj.cn|sh.cn|tj.cn|cq.cn|he.cn|sn.cn|sx.cn|nm.cn|ln.cn|jl.cn|hl.cn|js.cn|zj.cn|ah.cn|fj.cn|jx.cn|sd.cn|ha.cn|hb.cn|hn.cn|gd.cn|gx.cn|hi.cn|sc.cn|gz.cn|yn.cn|gs.cn|qh.cn|nx.cn|xj.cn|tw.cn|hk.cn|mo.cn|xz.cn|com.cn|net.cn|org.cn|gov.cn|.com.hk|我爱你|在线|中国|网址|网店|中文网|公司|网络|集团|com|cn|cc|org|net|xin|xyz|vip|shop|top|club|wang|fun|info|online|tech|store|site|ltd|ink|biz|group|link|work|pro|mobi|ren|kim|name|tv|red|cool|team|live|pub|company|zone|today|video|art|chat|gold|guru|show|life|love|email|fund|city|plus|design|social|center|world|auto|.rip|.ceo|.sale|.hk|.io|.gg|.tm|.gs|.us))(.*)/, '$2')
			},
			imgLoadError (e) {
				e.target.setAttribute('src', '/html/static/images/earth.png')
			},
			openModal (e) {
				this.activeIndex = Number(e.target.dataset.index)
				this.cardModal.shown = true
				this.cardModal.data = JSON.parse(JSON.stringify(this.userScripts[this.activeIndex]))
			},
			confirmModify (e) {
				this.userScripts.splice(this.activeIndex, 1, this.cardModal.data)
				this.resetCardModal()
				this.$Message.success('修改成功')
			},
			resetCardModal () {
				this.cardModal.data = {}
			},
			removeScript (e) {
				this.cardModal.data.scripts.splice(Number(e.target.dataset.index), 1)
			},
			addScript (e) {
				this.cardModal.data.scripts.push('')
			},
			createNewCard () {
				this.userScripts.push(JSON.parse(JSON.stringify(this.blankScript)))
				this.openModal({
					target: {
						dataset: {
							index: this.userScripts.length - 1
						}
					}
				})
			}
		}
	}
</script>
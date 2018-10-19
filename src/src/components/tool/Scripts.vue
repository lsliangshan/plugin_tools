<template>
	<div class="scripts_container" :style="scriptsContainerStyles">
		<div class="scripts_inner" :style="scriptsInnerStyles">
			<Card :bordered="false" class="user_script_item" v-for="(item, index) in userScripts" :key="index">
	            <div class="user_script_card_inner" :data-index="index" @click="openModal">
	            	<img class="site_favicon_img pen" :src="'http://' + getHost(item.match) + '/favicon.ico'" @error="imgLoadError">
	            	<Tooltip class="pen" :content="item.desc" :class="{pen: !item.desc}" placement="bottom" :transfer="true" :max-width="250">
			            <div class="user_script_card_desc pea" :data-index="index" @click="openModal">{{item.desc || '暂无描述'}}</div>
			        </Tooltip>
			        <div class="script_card_operations">
			        	<Tooltip content="删除脚本" placement="bottom" :transfer="true" class="delete_script_card">
				        	<Icon type="md-trash" color="#ed4014" size="18" :data-index="index" @click="removeUserScriptCard" />
				        </Tooltip>
				        <Tooltip :content="item.active ? '关闭脚本' : '开启脚本'" placement="bottom" :transfer="true" class="delete_script_card">
				        	<Icon type="ios-bulb" :color="item.active ? 'lightgray' : '#19be6b'" size="18" :data-index="index" @click="toggleUserScriptStatus" />
				        </Tooltip>
			        </div>			     
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
	        :fullscreen="true"
	        >
	        <div class="code_container">
	        	<div class="code_preview" :ref="codeContainerRef"></div>
	        </div>
	        <!-- <Form :label-width="80" :model="cardModal.data">
	        	<FormItem label="匹配域名">
	        		<Input type="text" placeholder="请输入匹配的域名" v-model="cardModal.data.match"/>
	        	</FormItem>
	        	<FormItem label="脚本描述">
	        		<Input type="textarea" class="no-resize" placeholder="请输入脚本描述, 最多80字" :maxlength="80" :autosize="{ minRows: 2, maxRows: 4 }" v-model="cardModal.data.desc"/>
	        	</FormItem>
	        	<FormItem label="用户脚本">
	        		<Button type="primary" ghost>点击修改</Button>
	        	</FormItem>
	        </Form> -->
	    </Modal>
	</div>
</template>
<style scoped>
	.code_container {
		position: relative;
		width: 100%;
		min-height: 100%;
	}
	.code_preview {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.pen {
		pointer-events: none;
	}
	.pea {
		pointer-events: auto;
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
	.script_card_operations {
		position: absolute;
		left: 10px;
		top: 10px;
	}
	.delete_script_card {
		transition: opacity .2s ease-in-out;
		opacity: 0;
	}
	.user_script_item:hover .delete_script_card {
		opacity: 1;
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
	// /**
	//  * @author	{{{AUTHOR}}}
	//  * @match	*.baidu.com*
	//  * @desc 	测试弹框
	//  */

	//  (function () {
	// 	// 输入代码...
	//    // document.body.innerHTML = 'TEST!!!!!!!'
	//    // document.body.style.backgroundColor = 'darkcyan'
	//    // document.body.style.color = '#FFF'  
	//    if (location.href.match(/baidu\.com\/?$/)) {
	//     document.querySelector('#kw').value = '摩斯密码'
	//   	document.querySelector('#su').click()
	//   } else if (location.href.match(/hao123\.com\/?$/)) {
	//   	document.querySelector('[data-hook=searchInput]').value = '搞飞机'
	//     document.querySelector('[data-hook=searchSubmit]').click()
	//   } else {
	//     document.querySelector('.c-container').querySelector('a').click()
	//   }
	//  })()
	// import CodeMirror from 'CodeMirror'
	import { StorageUtil } from '../../utils/index.js'
	export default {
		name: 'scripts',
		data () {
			return {
				filer: null,
				codeContainerRef: 'code-container-ref',
				blankScript: {
					match: '',
					desc: '',
					author: '',
					scripts: `/**
* @author	{{{AUTHOR}}}
* @match	{{{MATCH}}}
* @desc 	{{{DESC}}}
*/

(function () {
	// 输入代码...
})()
`,
					active: false
				},
				userScripts: [],
				cardModal: {
					shown: false,
					data: {}
				},
				activeIndex: -1,
				markdownContent: '',
				editor: {}
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
			},
			localStorageKeys () {
		      	return this.$store.state.localStorageKeys
		    }
		},
		async created () {
			const that = this

			this.userScripts = await StorageUtil.getItem(this.localStorageKeys.userScripts) || []

			let isMac = (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel')

			this.$nextTick(() => {
				window.onkeydown = function (ev) {
					if (that.$route.name === 'scripts') {
						if (isMac) {
							if (ev.metaKey && ev.keyCode === 83) {
								// 保存
								that.confirmModify()
								that.closeModal()
								ev.preventDefault()
							}
						} else {
							if (ev.ctrlKey && ev.keyCode === 83) {
								that.confirmModify()
								that.closeModal()
								ev.preventDefault()
							}
						}
					}
				}
				chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
					if (request.action === 'userscript') {
						let _s = that.getScritps({
							location: request.location
						})
						if (_s.length > 0) {
							sendResponse(_s)
						}
					}
				})
			})
			// chrome.extension.sendMessage({message: 'Hello'})
		},
		mounted () {
			const that = this
		},
		methods: {
			getScritps (data) {
				let _userScripts = this.userScripts
				let outScript = []
				let i = 0
				for (i; i < _userScripts.length; i++) {
					if (_userScripts[i].match && _userScripts[i].match.trim() !== '') {
						if (_userScripts[i].active && _userScripts[i].match.split(';').some(item => data.location.match(item.replace(/\*/g, '.*')))) {
							outScript.push(_userScripts[i])
						}
					}
				}
				return outScript
			},
			formatScripts (scripts) {
				return scripts.replace(/{{{AUTHOR}}}/, 'YOU')
				.replace(/{{{MATCH}}}/, this.cardModal.data.match)
				.replace(/{{{DESC}}}/, this.cardModal.data.desc)
			},
			getScriptsConfig () {
				let scripts = this.cardModal.data.scripts
				let _s = scripts.replace(/[\r\n]/g, '###')
				this.cardModal.data.author = _s.replace(/(.*@author\s+)([^(###)]*)(###.*)/, '$2')
				this.cardModal.data.match = _s.replace(/(.*@match\s+)([^(###)]*)(###.*)/, '$2')
				this.cardModal.data.desc = _s.replace(/(.*@desc\s+)([^(###)]*)(###.*)/, '$2')
			},
			beautifyCode () {
				const that = this
				setTimeout(() => {
					let ele = this.$refs[this.codeContainerRef]
			        ele.innerHTML = ''
			        require([
			          'codemirror/lib/codemirror',
			          'codemirror/mode/javascript/javascript',
			          'codemirror/addon/comment/comment',
			          'codemirror/addon/fold/foldcode',
			          'codemirror/addon/fold/foldgutter',
			          'codemirror/addon/fold/markdown-fold',
			          'codemirror/addon/fold/xml-fold',
			          'codemirror/addon/fold/comment-fold',
			          'codemirror/addon/fold/brace-fold',
			          'codemirror/addon/edit/closebrackets',
			          'codemirror/addon/edit/closetag',
			          'codemirror/addon/edit/matchtags',
			          'codemirror/keymap/sublime'
			        ], function (CodeMirror) {
			          that.editor = CodeMirror(ele, Object.assign({
			            value: that.cardModal.data.scripts || that.formatScripts(that.blankScript.scripts)
			          }, {
						theme: 'zenburn',
						mode: 'javascript',
			            lineNumbers: true,
			            lineWrapping: true,
			            styleActiveLine: true,
			            foldGutter: true,
			            matchBrackets: true,
			            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
			            matchTags: {bothTags: true},
			            keyMap: 'sublime'
			          }))

			          that.editor.on('change', function (evt) {
			          	that.cardModal.data.scripts = evt.doc.getValue()
			          	that.getScriptsConfig()
			            // let fileSuffix = that.currentFileName.replace(/^.+\.(.+)$/, '$1').toLowerCase()
			            // if (fileSuffix === 'md') {
			            //   that.markdownContent = marked(evt.doc.getValue())
			            // }
			          })
			        })
				}, 10)
			},
			saveData (callback) {
				const that = this
				navigator.webkitPersistentStorage.requestQuota(5*1024*1024, 
			        function(grantedBytes) {
			            window.webkitRequestFileSystem(window.PERSISTENT, 5*1024*1024, function (fs) {
							fs.root.getFile('userScripts.txt', {create: true}, function (fileEntry) {
								fileEntry.createWriter(function (fileWriter) {
									fileWriter.onwriteend = function (e) {
										console.log('write completed.', e)
										callback && callback()
									}
									fileWriter.onerror = function (e) {
										console.log('write failed: ' + e.toString())
									}

									let bb = new Blob([JSON.stringify(that.userScripts)], {type: 'text/plain'})
									fileWriter.write(bb)
								}, function (e) {
									console.log('create wirter error: ', e.toString())
								})
							}, function (e) {
								console.log('error: ', e.toString())
							})
						}, function (e) {
							console.log('webkitRequestFileSystem error: ', e.toString())
						})
			        }, 
			        function(errorCode) {
			            alert("Storage not granted.");
			        }
			    )
			},
			getCurrentTabId (callback) {
				chrome.tabs.query({
					active: true,
					currentWindow: true
				}, function (tabs) {
					if (callback) {
						callback(tabs.length ? tabs[0].id : null)
					}
				})
			},
			sendMessageToContentScript (message, callback) {
				console.log('in sendMessageToContentScript: ', message)
				this.getCurrentTabId(tabId => {
					console.log('in getCurrentTabId: ', tabId)
					chrome.tabs.sendMessage(tabId, message, function (response) {
						console.log('chrome tabs sendMessage: ', message)
						if (callback) {
							callback(response)
						}
					})
				})
			},
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
				this.beautifyCode()
			},
			closeModal () {
				this.cardModal.shown = false
			},
			confirmModify (e) {
				this.userScripts.splice(this.activeIndex, 1, this.cardModal.data)
				this.resetCardModal()
				this.saveUserScripts()
				this.$Message.success('修改成功')
			},
			resetCardModal () {
				this.cardModal.data = {}
				this.saveUserScripts()
			},
			async removeScript (e) {
				this.cardModal.data.scripts.splice(Number(e.target.dataset.index), 1)
				await this.saveUserScripts()
			},
			addScript (e) {
				this.cardModal.data.scripts.push('')
			},
			removeUserScriptCard (e) {
				e.stopPropagation()
				this.$Modal.confirm({
					title: '删除脚本',
					content: '脚本删除后将不可恢复，是否确定删除',
					okText: '确定',
					cancelText: '再想想',
					onOk: () => {
						this.userScripts.splice(Number(e.target.dataset.index), 1)
						this.$Message.success('删除成功')
					}
				})
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
			},
			toggleUserScriptStatus (e) {
				e.stopPropagation()
				let _index = Number(e.target.dataset.index)
				this.userScripts[_index].active = !this.userScripts[_index].active
			},
			async saveUserScripts () {
				await StorageUtil.setItem(this.localStorageKeys.userScripts, this.userScripts)
			}
		}
	}
</script>
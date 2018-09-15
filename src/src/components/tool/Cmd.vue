<template>
	<div class="window_cmd_container">
		<div class="window_cmd_inner" :class="{show: shown}">
			<div class="window_cmd_toggle_container">
				<Tooltip :content="shown ? '关闭操作框 cmd/ctrl + shift + R' : '打开操作框 cmd/ctrl + shift + R'" placement="left">
		            <div class="window_cmd_toggle" @click="toggleCmdContainer">
						<Icon type="md-hammer" size="20" />
					</div>
		        </Tooltip>
			</div>
			<div class="window_cmd_content">
				<div class="window_cmd_console">
					<div class="window_cmd_console_item" v-for="(item, index) in historyConsoles" :key="index" :class="item.type" >
						<div class="window_cmd_console_item_inner" v-html="item.text"></div>
					</div>
					<div class="blank_div" style="height: 15px;"></div>
				</div>
				<div class="window_cmd_input">
					<span>{{cmdPrefix}}</span>
					<Input v-model="currentCommand" ref="cmdRef" type="text" size="large" @on-enter="sendCommand" @on-keyup="keyupHandler"/>
				</div>
			</div>
		</div>
		<audio style="width: 0; height: 0;" id="cmd_audio" :src="audio.src"></audio>
	</div>
</template>

<style scoped>
	.window_cmd_container {
		position: fixed;
		z-index: 999;
		right: 15px;
		bottom: 15px;
		width: 450px;
		height: 380px;
		overflow: hidden;
		pointer-events: none;
		background-color: transparent;
	}
	.window_cmd_inner {
		position: absolute;
		pointer-events: auto;
		width: 100%;
		height: 100%;
		transform: translate3d(0, 340px, 0);
		transition: all .2s cubic-bezier(0.215, 0.61, 0.355, 1);
	}
	.window_cmd_inner.show {
		transform: translate3d(0, 0, 0);
	}
	.window_cmd_inner.hide {
		
	}
	.window_cmd_toggle_container {
		width: 100%;
		height: 40px;
		pointer-events: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}
	.window_cmd_toggle {
		pointer-events: auto;
		width: 40px;
		height: 40px;
		cursor: pointer;
		border-radius: 50%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		transition: all .2s ease-in-out;
		background-color: rgba(255, 255, 255, 0.5);
	}
	.window_cmd_toggle:hover {
		background-color: rgb(79, 192, 141);
		color: #FFFFFF;
	}
	.window_cmd_toggle:active {
		opacity: .7;
	}
	.window_cmd_content	{
		position: relative;
		color: #ccc;
		width: 100%;
		height: 340px;
		background-color: rgba(0, 0, 0, 1);		
	}
	.window_cmd_content:before {
	    position: absolute;
	    top: 0;
	    width: 450px;
	    z-index: 1;
	    content: "";
	    display: block;
	    height: 19px;
	    box-shadow: inset 0 5px 10px #000;
	}
	.window_cmd_console {
		width: 100%;
		height: 300px;
		padding: 15px;
		box-sizing: border-box;
		overflow-y: auto;
	}
	.window_cmd_console_item {

	}
	.window_cmd_console_item_inner {
		line-height: 1.5;
		overflow: hidden;
    	word-wrap: break-word;
	}
	.window_cmd_console_item.reply {
		margin: 16px 0;
	}
	.window_cmd_input {
		width: 100%;
		height: 39px;
		color: #cccccc;
		padding-left: 15px;
		padding-right: 15px;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.window_cmd_input span {
		width: 60px;
		text-align: center;
	}
	.window_cmd_input input {
		height: 40px;
	}
</style>

<script>
	import router from '../../router/content-routes.js'
	export default {
		name: 'Cmd',
		data () {
			return {
				audio: {
					src: '',
					el: null,
					volume: 50
				},
				cmdPrefix: '~ root# ',
				shown: false,
				currentCommand: '',
				allCommands: ['help', 'go', 'clear', 'reload', 'audio', 'speak'],
				consoleStyles: {
					color: {
						label: 'rgb(79, 192, 141)',
						normal: '#cccccc',
						success: '#19be6b',
						warning: '#ff9900',
						error: '#ed4014'
					}
				},
				allRoutePath: [],
				historyConsoles: [
				],
				historyCommands: [],
				activeHistoryIndex: -1
			}
		},
		mounted () {
			const that = this
			window.onkeydown = function (ev) {
				if ((ev.metaKey || ev.ctrlKey) && ev.shiftKey && ev.keyCode === 82) {
					that.toggleCmdContainer()
					ev.preventDefault()
					return false
				}
	        }
			this.audio.el = document.getElementById('cmd_audio')
			this.allRoutePath = this.getAllRoutePath()
			this.historyConsoles.push({
				type: 'user',
				text: '<span style="color: ' + this.consoleStyles.color.label + ';">' + this.cmdPrefix + '</span> help'
			})
			this.commandHelp()
		},
		methods: {
			toggleCmdContainer () {
				this.shown = !this.shown
			},
			keyupHandler (e) {
				if (e.keyCode === 38) {
					// 上一条
					this.activeHistoryIndex = (this.activeHistoryIndex - 1 + this.historyCommands.length) % this.historyCommands.length
					this.currentCommand = this.historyCommands[this.activeHistoryIndex]
				} else if (e.keyCode === 40) {
					// 下一条
					this.activeHistoryIndex = (this.activeHistoryIndex + 1) % this.historyCommands.length
					this.currentCommand = this.historyCommands[this.activeHistoryIndex]
				} else {}
			},
			async sendCommand () {
				if (!this.currentCommand || !this.currentCommand.trim()) {
					return
				}
				this.historyConsoles.push({
					type: 'user',
					text: '<span style="color: ' + this.consoleStyles.color.label + ';">' + this.cmdPrefix + '</span> ' + this.currentCommand
				})
				await this.dealWithCommand(this.currentCommand.trim())
				if (this.historyCommands[this.historyCommands.length - 1] !== this.currentCommand.trim()) {
					this.historyCommands.push(this.currentCommand.trim())
					this.activeHistoryIndex = this.historyCommands.length
				}
				this.currentCommand = ''
				this.scrollToConsoleBottom()
			},
			autoReply (args) {
				let _status = 'normal'
				if (args.status && this.consoleStyles.color.hasOwnProperty(args.status)) {
					_status = args.status
				}
				this.historyConsoles.push({
					type: 'reply',
					text: '<span style="color: ' + this.consoleStyles.color[_status] + ';">' + args.text + '</span>'
				})
			},
			getCommandName (commandStr) {
				return commandStr.split(' ')[0]
			},
			getCommandArgs (commandStr) {
				let _a = commandStr.split(' ')
				_a.shift()
				return _a				
			},
			getAllRoutePath () {
				let outPath = []
				if (router.hasOwnProperty('name')) {
					outPath.push(router.name)
				}
				for (let i = 0; i < router.children.length; i++) {
					if (router.children[i].hasOwnProperty('name') && outPath.indexOf(router.children[i].name) < 0) {
						outPath.push(router.children[i].name)
					}
				}
				return outPath
			},
			dealWithCommand (commandStr) {
				return new Promise(resolve => {
					let _commandName = this.getCommandName(commandStr)
					if (this.allCommands.indexOf(_commandName) < 0) {
						this.autoReply({
							status: 'error',
							text: '命令 <b>' + _commandName + '</b> 不存在<br/><span style="color: #cccccc;">输入 help 查看帮助</span>'
						})
						resolve(true)
					}
					let _commandArgs = this.getCommandArgs(commandStr)
					switch (_commandName) {
						case 'clear':
							this.clearConsole()
							break
						case 'go':
							this.commandGo({
								args: _commandArgs
							})
							break
						case 'help':
							this.commandHelp()
							break
						case 'reload':
							this.commandReload()
							break
						case 'audio':
							this.commandAudio({
								args: _commandArgs
							})
							break
						case 'speak':
							this.commadnSpeak({
								args: _commandArgs
							})
							break
						// case 'play':
						// 	this.commandPlay({
						// 		args: _commandArgs
						// 	})
						// 	break
						// case 'stop':
						// 	this.commandStop()
						// 	break
						default:
							break
					}
					resolve(true)
				})				
			},
			commandGo (args) {
				/**
				 * Command:  go
				 */
				if (!args.args || args.args.length < 1) {
					this.autoReply({
						status: 'normal',
						text: '请输入待跳转的路由名称：' + this.allRoutePath.join('、') + '<br/>例如：go home'
					})
				} else {
					if (this.allRoutePath.indexOf(args.args[0]) < 0) {
						// 路由不存在
						this.autoReply({
							status: 'warning',
							text: '路由 <b>' + args.args[0] + '</b> 不存在<br/><span style="color: #ccc;">请输入待跳转的路由名称：' + this.allRoutePath.join('、') + '</span><br/><span style="color: #ccc;">例如：go home</span>'
						})
					} else {
						this.$router.replace({
							name: args.args[0]
						})
					}					
				}
			},
			commandHelp () {
				/**
				 * Command: help
				 */
				 this.autoReply({
				 	status: 'normal',
				 	text: '可用命令包括：' + this.allCommands.join('、')
				 })
			},
			commandReload () {
				/**
				 * Command: reload
				 * 页面刷新
				 */
				 this.$router.go(0)
			},
			commandAudio (args) {
				/**
				 * Command: audio
				 * audio相关操作
				 */
				if (!args.args || args.args.length < 1) {
					this.autoReply({
						status: 'error',
						text: '请输入操作名，可用的操作名包括：play、stop、volume、set'
					})
				} else {
					let _op = args.args.shift()
					switch (_op) {						
						case 'play':
							this.commandPlay({
								args: args.args
							})
							break
						case 'stop':
						case 'pause':
							this.commandStop()
							break
						case 'restart':
							this.commandRestart()
							break
						case 'get':
							this.audioGetOp({
								args: args.args
							})
							break
						case 'set':
							this.audioSetOp({
								args: args.args
							})
							break
						case 'volume':
							this.audioGetVolume()
							break
						default:
							break
					}
				}
			},
			commadnSpeak (args) {
				for (let i = 0; i < args.args.length; i++) {
					window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(args.args[i]))
				}
			},
			audioGetOp (args) {
				if (!args.args || args.args.length < 0) {
					this.autoReply({
						status: 'error',
						text: '请输入想获取的属性，如 volume'
					})
				} else {
					let _opName = args.args.shift()
					switch (_opName) {
						case 'volume':
							this.audioGetVolume()
							break
						default:
							break
					}
				}
			},
			audioSetOp (args) {
				if (!args.args || args.args.length < 0) {
					this.autoReply({
						status: 'error',
						text: '请输入想设置的属性，如 volume'
					})
				} else {
					let _opName = args.args.shift()
					switch (_opName) {
						case 'volume':
							this.audioSetVolume(args.args.shift())
							break
						default:
							break
					}
				}
			},
			audioGetVolume () {
				/**
				 * 获取当前音频的音量
				 */
				this.autoReply({
					status: 'normal',
					text: '当前音量：' + this.audio.el.volume * 100
				})
			},
			audioSetVolume (v) {
				this.audio.el.volume = ((parseFloat(v) / 100).toFixed(2) > 1 ? 1 : (parseFloat(v) / 100).toFixed(2))
				this.autoReply({
					status: 'success',
					text: (v > 100 ? '音量上限为100，' : '') + '音量已经设置为：' + Math.min(v, 100)
				})
			},
			commandPlay (args) {
				/**
				 * Command: play
				 * 播放音频
				 */
				if (!args.args || args.args.length < 1) {
					this.autoReply({
						status: 'warning',
						text: '未指定音频资源'
					})
				} else {
					this.audio.src = args.args[0]					
					setTimeout(() => {
						this.audio.el.play()
						this.autoReply({
							status: 'success',
							text: '正在播放: ' + args.args[0].substring(args.args[0].lastIndexOf('/') + 1, args.args[0].lastIndexOf('.'))
						})
					}, 1)
				}
			},
			commandStop () {
				/**
				 * Command: stop
				 * 暂停播放音频
				 */
				this.audio.el.pause()
				this.autoReply({
					status: 'success',
					text: '音乐已经暂停'
				})
			},
			commandRestart () {
				this.audio.el.play()
				this.autoReply({
					status: 'success',
					text: '继续播放: ' + this.audio.src.substring(this.audio.src.lastIndexOf('/') + 1, this.audio.src.lastIndexOf('.'))
				})
			},
			clearConsole () {
				this.historyConsoles = [
					{
						type: 'user',
						text: '<span style="color: ' + this.consoleStyles.color.label + ';">' + this.cmdPrefix + '</span> clear'
					}
				]
			},
			scrollToConsoleBottom () {
				setTimeout(() => {
					document.querySelector('.window_cmd_console').scrollTo(0, 10000)
				}, 10)
			}
		},
		watch: {
			shown (val) {
				if (val) {
					setTimeout(() => {
						this.$refs.cmdRef.focus()
					}, 100)
				}
			}
		}
	}
</script>


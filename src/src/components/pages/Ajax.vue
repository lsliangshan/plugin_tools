<template>
	<div class="ajax_container" :style="ajaxContainerStyles">
		<div class="ajax_inner">
			<div class="ajax_header">
				<h3>Ajax网络请求</h3>
			</div>
			<Tabs type="card" :closable="activeCounts > 1" v-model="currentTabName" class="ajax_tabs" @on-tab-remove="removeAjaxTab" @on-click="changeAjaxTab">
		        <TabPane v-for="(item, index) in ajaxTabs" :key="index" :name="item.type === 'ajax' ? item.name : item.type" :label="(item.type === 'ajax' ? (item.url.slice(0, 10) || '新窗口') : '+')" v-if="!item.ban">
					<div class="ajax_row" v-if="item.type === 'ajax'">
						<Input v-model="ajaxTabs[currentIndex].url" size="large" placeholder="请输入请求url">
					        <Select v-model="ajaxTabs[currentIndex].method" slot="prepend" style="width: 100px;">
					            <Option v-for="(o, idx) in methods" :key="idx" :value="o">{{o}}</Option>
					        </Select>
					        <Button type="primary" slot="append" @click="submit">发送</Button>
					    </Input>
					</div>
					<div class="ajax_body_container">
						<Split v-model="split" mode="vertical">
				            <div slot="top" class="demo-split-pane">
				            	<div class="ajax_request_container">
				            		<Tabs size="small" style="height: 100%;">								        
								        <TabPane label="Params">
								        	<div class="request_inner">
								        		<Row class="header_row">
													<Col :span="1" class="cell_item cell_item_first"></Col>
													<Col :span="11" class="cell_item">Key</Col>
													<Col :span="11" class="cell_item">Value</Col>
													<Col :span="1" class="cell_item cell_item_last"></Col>
												</Row>
												<Row v-for="(p, pi) in item.params" :key="pi">
													<Col :span="1" class="cell_item cell_item_first">
														<Checkbox v-model="p.active"></Checkbox>
													</Col>
													<Col :span="11" class="cell_item">
														<Input type="text" class="no_border_input" v-model="p.key" placeholder="请输入key"/>
													</Col>
													<Col :span="11" class="cell_item">
														<Input type="text" class="no_border_input" v-model="p.value" placeholder="请输入value"/>
													</Col>
													<Col :span="1" class="cell_item cell_item_last">
														<Icon type="ios-close" class="item_remove_icon" size="20" :data-index="pi" data-type="params" @click="removeRequestLine" v-if="pi < item.params.length - 1" />
														<Icon type="ios-add" class="item_add_icon" size="20" data-type="params" @click="addRequestLine" v-if="pi === (item.params.length - 1)" />
													</Col>
												</Row>
								        	</div>
								        </TabPane>
								        <TabPane label="Headers">
											<div class="request_inner">
												<Row class="header_row">
													<Col :span="1" class="cell_item cell_item_first"></Col>
													<Col :span="11" class="cell_item">Key</Col>
													<Col :span="11" class="cell_item">Value</Col>
													<Col :span="1" class="cell_item cell_item_last"></Col>
												</Row>
												<Row v-for="(h, hi) in item.headers" :key="hi">
													<Col :span="1" class="cell_item cell_item_first">
														<Checkbox v-model="h.active"></Checkbox>
													</Col>
													<Col :span="11" class="cell_item">
														<Input type="text" class="no_border_input" v-model="h.key" placeholder="请输入key"/>
													</Col>
													<Col :span="11" class="cell_item">
														<Input type="text" class="no_border_input" v-model="h.value" placeholder="请输入value"/>
													</Col>
													<Col :span="1" class="cell_item cell_item_last">
														<Icon type="ios-close" class="item_remove_icon" size="20" :data-index="hi" data-type="headers" @click="removeRequestLine" v-if="hi < item.headers.length - 1" />
														<Icon type="ios-add" class="item_add_icon" size="20" data-type="headers" @click="addRequestLine" v-if="hi === (item.headers.length - 1)" />
													</Col>
												</Row>
											</div>
								        </TabPane>
								    </Tabs>
				            	</div>				                
				            </div>
				            <div slot="bottom" class="demo-split-pane">
				                <div class="ajax_response_container" id="json-dest" v-html="formatJsonStr" :style="{fontSize: selectedFontSize + 'px'}">				                	
				                </div>
				                <div class="operation_container">
				                	<div class="operation_item">
						              	<Tooltip content="字体大小" placement="bottom">
						                    <Dropdown trigger="hover" :transfer="true" @on-click="changeFontSize" class="custom_dropdown">
										        <span>F-{{selectedFontSize}}</span>
										        <DropdownMenu slot="list">
										            <DropdownItem v-for="(fs, fsi) in allFontSize" :key="fsi" :name="fs" :selected="fs == selectedFontSize">{{fs}}</DropdownItem>
										        </DropdownMenu>
										    </Dropdown>
						                </Tooltip>
					              	</div>
					              	<div class="operation_item copy-format-json" data-clipboard-target="#json-dest">
					                	<Tooltip content="复制" placement="bottom">
					                    	<Icon type="md-copy" size="20"/>
					                	</Tooltip>
					              	</div>					              
					            </div>
				            </div>
				        </Split>						
					</div>
		        </TabPane>
		    </Tabs>			
		</div>
	</div>
</template>
<style scoped>
	.ajax_container {
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
	}
	.ajax_inner {
		width: 100%;
		height: 100%;
		border-radius: 4px;
		background-color: rgba(255, 255, 255, 0.9);
		overflow: hidden;
	}
	.ajax_header {
		width: 100%;
		height: 48px;
		padding: 0 15px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		border-bottom: 1px solid #f2f2f2;
	}
	.ajax_row {
		width: 100%;
		box-sizing: border-box;
	}
	.ajax_tabs {
		height: calc(100% - 48px - 15px);
		width: calc(100% - 30px);
		margin: 0 auto 15px auto;
	}
	.ajax_body_container {
		width: 100%;
		margin-top: 2px;
		height: calc(100% - 38px);
	}
	.demo-split-pane{
		position: relative;
	    height: 100%;
	  }
	  .ajax_request_container {
	  	width: 100%;
	  	height: 100%;	  	
	  	overflow-y: auto;
	  }
	  .request_inner {
	  	width: 100%;
	  	height: 100%;
	  	border: 1px solid #dcdee2;
	  	border-bottom: none;
	  	border-top: none;
	  	overflow-y: auto;
	  	/*height: calc(100% - 10px);*/
	  	/*background-color: darkcyan;*/
	  	/*margin-top: 10px;*/
	  }
	  .header_row {
	  	position: sticky;
	  	top: 0;
	  	z-index: 9;
	  	background-color: #FFFFFF;
	  }
	  .cell_item {
	  	border-right: 1px solid #dcdee2;
	  	border-bottom: 1px solid #dcdee2;
	  	line-height: 32px;
	  	padding: 0 10px;
	  	box-sizing: border-box;
	  	height: 32px;
	  	display: flex;
	  	align-items: center;
	  	justify-content: center;
	  	overflow: hidden;
	  }
	  /*.cell_item_first {
	  	min-width: 40px;
	  }
	  .cell_item_last {
	  	min-width: 80px;
	  }*/
	  .cell_item_last i {
	  	cursor: pointer;
	  	color: #FFFFFF;
	  	border-radius: 4px;
	  }
	  .item_remove_icon {
		background-color: #ed4014;
	  }
	  .item_add_icon {
	  	background-color: #2d8cf0;	  	
	  }
	  .request_inner .ivu-row .cell_item:last-child {
	  	border-right: none;
	  }

	  .ajax_response_container {
	  	width: 100%;
	  	height: calc(100% - 5px);	  	
	  	margin-top: 5px;
	  	border: 1px solid #dcdee2;
	  	border-top: none;
	  	overflow-y: scroll;
	  }
	  .operation_container {
	    position: absolute;
	    top: 0px;
	    right: 0px;
	    height: 32px;
	  }
	  .operation_item {
	    min-width: 32px;
	    height: 32px;
	    cursor: pointer;
	    /*margin-left: 8px;*/
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
	  .custom_dropdown {
	  	max-height: 200px;
	  	overflow-y: auto;
	  	display: inline-flex;
	  	align-items: center;
	  	justify-content: center;
	  }
	  .custom_dropdown span {
	  	display: inline-block;
    	vertical-align: middle;
    	font-size: 16px;
    	margin-top: 4px;
	  }
</style>
<script>
	import qs from 'qs'
	import axios from 'axios'
	import '../../../static/js/jquery.json'
	import '../../../static/js/json2'
	import '../../../static/js/jsonlint'
	const Clipboard = require('clipboard')
	export default {
		name: 'ajax',
		data () {
			return {
				methods: ['POST', 'GET'],
				currentMethod: 'POST',
				currentTabName: '',
				split: 0.3,
				allFontSize: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
				selectedFontSize: '14',
				blankHeadersLine: {
					active: true,
					key: '',
					value: ''
				},
				blankParamsLine: {
					active: true,
					key: '',
					value: ''
				},
				blankAjaxTab: {
					ban: false,
					type: 'ajax',
					method: 'POST',
					url: '',
					headers: [
						{
							active: true,
							key: '',
							value: ''
						}
					],
					params: [
						{
							active: true,
							key: '',
							value: ''
						}
					],
					response: ''
				},
				ajaxTabs: [
				],
				jsonStr: '',
				currentJson: '',
      			currentJsonStr: ''
			}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			ajaxContainerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			},
			ajaxTabNames () {
				let outObj = {}
				for (let i = 0; i < this.ajaxTabs.length - 1; i++) {
					if (!outObj.hasOwnProperty(i)) {
						outObj[String(i)] = i
					}
				}
				return outObj
			},
			currentIndex () {
				let outIndex = 0
				for (let i = 0; i < this.ajaxTabs.length; i++) {
					if (this.ajaxTabs[i].name === this.currentTabName) {
						outIndex = i
						i = this.ajaxTabs.length
					}				
				}
				return outIndex
			},
			activeCounts () {
				let count = 0
				for (let i = 0; i < this.ajaxTabs.length - 1; i++) {
					if (!this.ajaxTabs[i].ban) {
						count += 1
					}
				}
				return count
			},
			formatJsonStr () {
		      let result = ''    
		      if (this.ajaxTabs[Number(this.currentIndex)].response !== '') {
		        let jsonStr = this.ajaxTabs[Number(this.currentIndex)].response
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
		created () {
			this.ajaxTabs.push(this.getANewTab())
			this.ajaxTabs.push({
				ban: false,
				type: 'plus'
			})
			const that = this
		    this.$nextTick(() => {
		      const clipboard = new Clipboard('.copy-format-json', {})
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
		    })
		},
		mounted () {
			const that = this
			window.onkeydown = function (ev) {
				if (ev.keyCode === 9 && that.$route.name === 'ajax') {
					ev.preventDefault()
					return false
				}
			}
		},
		methods: {
			getANewTab () {
				let _blankTab = JSON.parse(JSON.stringify(this.blankAjaxTab))
				if (!_blankTab.hasOwnProperty('name')) {
					_blankTab.name = this.getUUID()
				}
				return _blankTab
			},
			handleBeforeTabRemove (e) {
				return new Promise((resolve, reject) => {
					if (this.ajaxTabs.length <= 2) {
						reject(false)
					}
					resolve()
				})
			},
			handleTabsAdd () {
				this.ajaxTabs.splice(this.ajaxTabs.length - 1, 0, this.getANewTab())
			},
			changeAjaxTab (e) {
				if (e === 'plus') {
					this.handleTabsAdd()
					this.currentTabName = (this.ajaxTabs[this.ajaxTabs.length - 2].name)
					document.querySelector('.ivu-tabs-nav-scroll').scrollTo(10000, 0)
				} else {
				}
			},
			findIndexByName (name) {
				let outIndex = -1
				for (let i = 0; i < this.ajaxTabs.length - 1; i++) {
					if (name === this.ajaxTabs[i].name) {
						outIndex = i
						i = this.ajaxTabs.length
					}
				}
				return outIndex
			},
			findPrevActive (index) {
				let outIndex = -1
				for (let i = Number(index) - 1; i > -1; i--) {
					if (!this.ajaxTabs[i].ban) {
						outIndex = i
						i = -1
					}
				}
				return outIndex
			},
			removeAjaxTab (e) {
				let _index = this.findIndexByName(e)
				if (_index > -1) {
					this.ajaxTabs.splice(_index, 1, Object.assign({}, this.ajaxTabs[_index], {
						ban: true
					}))
					// this.ajaxTabs[_index].ban = true
				}
				if (this.currentTabName === 'plus') {					
					if (_index > 0) {
						// this.ajaxTabs.splice(_index, 1)
						let _prevIndex = this.findPrevActive(_index)
						if (_prevIndex > -1) {
							this.currentTabName = (this.ajaxTabs[_prevIndex].name)
						}
					} else if (_index === 0) {
						this.currentTabName = this.ajaxTabs[0].name
					}
				}
			},
			addRequestLine (e) {
				if (!e.target.dataset.type) {
					return
				}
				switch (e.target.dataset.type.toLowerCase()) {
					case 'headers':
						this.ajaxTabs[Number(this.currentIndex)].headers.push(JSON.parse(JSON.stringify(this.blankHeadersLine)))	
						break
					case 'params':
						this.ajaxTabs[Number(this.currentIndex)].params.push(JSON.parse(JSON.stringify(this.blankParamsLine)))
						break
					default:
						break
				}
				setTimeout(() => {
					document.querySelector('.request_inner').scrollTo(0, 10000)
				}, 20)
			},
			removeRequestLine (e) {
				if (!e.target.dataset.type) {
					return
				}
				switch (e.target.dataset.type.toLowerCase()) {
					case 'headers':
						this.ajaxTabs[Number(this.currentIndex)].headers.splice(Number(e.target.dataset.index), 1)
						break
					case 'params':
						this.ajaxTabs[Number(this.currentIndex)].params.splice(Number(e.target.dataset.index), 1)
						break
					default:
						break
				}
			},
			getHeaders () {				
				let _headers = this.ajaxTabs[Number(this.currentIndex)].headers
				let outHeaders = {}
				for (let i = 0; i < _headers.length; i++) {
					if (_headers[i].active && (_headers[i].key.trim() !== '')) {
						outHeaders[_headers[i].key] = _headers[i].value
					}
				}
				return outHeaders
			},
			getParams () {
				let _params = this.ajaxTabs[Number(this.currentIndex)].params
				let outParams = {}
				for (let i = 0; i < _params.length; i++) {
					if (_params[i].active && (_params[i].key.trim() !== '')) {
						outParams[_params[i].key] = _params[i].value
					}
				}
				return outParams
			},
			async submit () {
				let _currentObj = this.ajaxTabs[Number(this.currentIndex)]
				let requestParams = {
					url: _currentObj.url,
					method: _currentObj.method.toLowerCase()
				}				
				let _data = this.getParams()
				if (!this.isEmptyObject(_data)) {
					if (_currentObj.method.toLowerCase() === 'get') {
						requestParams.params = _data
					} else {
						requestParams.data = _data
					}
				}
				let _headers = this.getHeaders()
				if (!this.isEmptyObject(_headers)) {
					requestParams.headers = _headers
				}
				let response = await this.ajax(requestParams)
				if (response.status === 200 && response.data.status === 200) {
					_currentObj.response = JSON.stringify(response.data.data)
				} else {
					_currentObj.response = JSON.stringify(response.data)
				}
			},
			ajax (args) {
				return new Promise((resolve, reject) => {
					if (!args.url || args.url.trim() === '') {
						reject(new Error('url不能为空'))
					}
					if (args.url.match(/^\/\//)) {
						args.url = 'http://' + args.url.replace(/^\/\//, '')
					} else if (args.url.match(/^http(s?):\/\//)) {						
					} else {
						args.url = 'http://' + args.url
					}
					if (!this.isEmptyObject(args.params) && args.method.toLowerCase() === 'get') {
						if (args.url.indexOf('?') > 0) {
							args.url += '&' + qs.stringify(args.params)
						} else {
							args.url += '?' + qs.stringify(args.params)
						}
						delete args.params
					}
					if (!this.isEmptyObject(args.data)) {
						args.data = qs.stringify(args.data)
					}
					let requestParams = {
						// url: 'http://127.0.0.1:3000/Zpm/cli/a',
						url: 'https://talkapi.dei2.com/Zpm/cli/a',
						method: 'POST',
						data: qs.stringify(args)
					}
					axios(requestParams).then(response => {
						resolve(response)
					}).catch(error => {
						reject(new Error(error.message))
					})
				})
			},
			changeFontSize (e) {
				this.selectedFontSize = e
			}
		}
	}
</script>
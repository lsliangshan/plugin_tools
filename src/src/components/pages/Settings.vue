<template>
	<div class="settings_container" :style="settingsContainerStyles">
		<div class="settings_inner" :style="settingsInnerStyles">
			<div class="settings_tag_container">
				<div class="settings_tag_bg"></div>
				<div class="settings_tag_label">设置</div>
			</div>
			<div class="settings_item">
				<label class="settings_item_label">最多显示几项工具</label>
				<div class="settings_item_value">
					<Input type="text" :value="maxToolCount" @on-change="changeMaxToolCount" />
				</div>
			</div>
			<div class="settings_item">
				<label class="settings_item_label">工具</label>
				<div class="settings_item_value" @click="openToolTagsModal">
					<div class="router_item_tag" v-for="(item, index) in activeTools" :key="index" :class="{fade: (index >= maxToolCount)}">{{item.label}}</div>
				</div>
			</div>
		</div>

		<Modal
        v-model="toolTagsModal.shown"
        :mask-closable="false"
        @on-ok="saveTools"
        ok-text="保存"
        title="订制您常用的工具">
        	<div class="tool_modal_container">
        		<div class="tool_modal_panel tool_modal_left_container active">
        			<div class="tool_modal_panel_title">使用中的工具</div>
        			<div class="tool_modal_panel_content">
        				<draggable v-model="toolTagsModal.activeItems" :options="{draggable: '.item', group: 'tools'}">
				        	<div v-for="(item, index) in toolTagsModal.activeItems" :key="index" class="item draggable_item">
				        		<Icon type="md-move" size="16" />
				        		{{item.label}}
				        	</div>
				        </draggable>
        			</div>
        		</div>
        		<div class="tool_modal_panel tool_modal_right_container">
        			<div class="tool_modal_panel_title">未使用的工具</div>
        			<div class="tool_modal_panel_content">
        				<draggable v-model="toolTagsModal.inactiveItems" :options="{draggable: '.item', group: 'tools'}">
				        	<div v-for="(item, index) in toolTagsModal.inactiveItems" :key="index" class="item draggable_item">
				        		<Icon type="md-move" size="16" />
				        		{{item.label}}
				        	</div>
				        </draggable>
        			</div>
        		</div>
        	</div>
	    </Modal>
	</div>
</template>
<style scoped>
	.settings_container {
		width: 100%;
		height: 100%;
		padding: 15px;
		box-sizing: border-box;
		/*background-color: #f5f5f5;*/
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.settings_inner {
		position: relative;
		width: 500px;
		background-color: #FFFFFF;
		padding: 40px 15px 15px 15px;
		border-radius: 5px;
		overflow-y: auto;
	}
	.settings_tag_container {
		position: absolute;
		top: 0;
		right: 0;
		width: 60px;
		height: 40px;
		pointer-events: none;
	}
	.settings_tag_bg {
		width: 0;
		height: 0;
		border-top: 20px solid rgb(79, 192, 141);
		border-right: 30px solid rgb(79, 192, 141);
		border-bottom: 20px solid transparent;
		border-left: 30px solid transparent;
	}
	.settings_tag_label {
		position: absolute;
		right: 4px;
		top: 6px;
		font-size: 13px;
		color: #FFFFFF;
		font-weight: bolder;
		transform-origin: center;
		transform: rotate(35deg);
	}
	.settings_item {
		width: 100%;
		margin: 15px 0;
		line-height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.settings_item_label {
		display: inline-block;
		width: 80px;
		font-size: 14px;
		line-height: 16px;
	}
	.settings_item_value {
		width: 100%;
		height: 40px;
		padding: 0 15px;
		box-sizing: border-box;
		cursor: pointer;
		/*background-color: #f8f8f8;*/
		overflow-x: auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.router_item_tag {
		background-color: rgb(79, 192, 141);
		color: #FFFFFF;
		height: 24px;
		padding: 0 10px;
		border-radius: 4px;
		margin-right: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
	}
	.router_item_tag.fade {
		background-color: rgba(79, 192, 141, .5);
	}
	
	.tool_modal_container {
		width: 100%;
		height: 300px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tool_modal_panel {
		width: 50%;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
	}
	.tool_modal_panel_title {
		width: 100%;
	    height: 32px;
	    line-height: 32px;
	    font-size: 14px;
	    font-weight: bolder;
	    text-align: center;
	    background-color: #f2f2f2;
	    border-top-left-radius: 4px;
	    border-top-right-radius: 4px;
	}
	.tool_modal_panel.active .tool_modal_panel_title {
		background-color: rgba(79, 192, 141, 1);
	    color: #FFF;
	}
	.tool_modal_panel.active .tool_modal_panel_content {
		border-left: 1px solid rgba(79, 192, 141, .6);
		border-right: 1px solid rgba(79, 192, 141, .6);
		border-bottom: 1px solid rgba(79, 192, 141, .6);
		background-color: rgba(79, 192, 141, .1);
	}
	.tool_modal_panel_content {
		width: 100%;
		height: calc(100% - 32px);
		background-color: #f8f8f8;
		overflow-y: auto;
		padding: 0 10px;
		box-sizing: border-box;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	.tool_modal_panel_content>div {
		height: 250px;
	}
	.draggable_item {
		position: relative;
		cursor: move;
		width: 100%;
		height: 40px;
		border: 1px solid #c8c8c8;
		margin-top: 10px;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.draggable_item i {
		position: absolute;
		left: 10px;		
	}
</style>
<script>
	import * as types from '../../store/mutation-types.js'
	import { StorageUtil } from '../../utils/index.js'
	export default {
		name: 'settings',
		components: {
			Draggable: () => import('vuedraggable')
		},
		data () {
			return {
				toolTagsModal: {
					shown: false,
					activeItems: [],
					inactiveItems: []
				}
			}
		},
		computed: {
			maxToolCount () {
				return this.$store.state.maxToolCount
			},
			tools () {
				return this.$store.state.tools
			},
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
	      settingsContainerStyles () {
	        return {
	          minHeight: (this.bodyStyles.height - 65) + 'px'
	        }
	      },
	      settingsInnerStyles () {
	      	return {
	      		height: (this.bodyStyles.height - 65 - 30) + 'px'
	      	}
	      },
	      localStorageKeys () {
	      	return this.$store.state.localStorageKeys
	      },
	      activeTools () {
	      	return this.$store.state.activeTools
	      },
	      inactiveTools () {
	      	return this.$store.state.inactiveTools
	      }
	    },
	    created () {
	    	this.$nextTick(() => {
	    		this.toolTagsModal.activeItems = JSON.parse(JSON.stringify(this.activeTools))
	    		this.toolTagsModal.inactiveItems = JSON.parse(JSON.stringify(this.inactiveTools))
	    	})
	    },
	    methods: {
	    	getActiveTools () {
	    		return new Promise(async (resolve) => {
					let activeTools = await StorageUtil.getItem(this.localStorageKeys.activeTools)
					resolve(activeTools || JSON.parse(JSON.stringify(this.tools)))
	    		})
	    	},
	    	getInactiveTools () {
	    		return new Promise(async (resolve) => {
	    			let inactiveTools = await StorageUtil.getItem(this.localStorageKeys.inactiveTools)
	    			resolve(inactiveTools || [])
	    		})
	    	},
	    	openToolTagsModal () {
	    		this.toolTagsModal.shown = true
	    	},
	    	async saveTools () {
				this.$store.commit(types.SET_ACTIVE_TOOLS, {
					tools: this.toolTagsModal.activeItems
				})
				this.$store.commit(types.SET_INACTIVE_TOOLS, {
					tools: this.toolTagsModal.inactiveTools
				})
				await StorageUtil.setItem(this.localStorageKeys.activeTools, this.toolTagsModal.activeItems)
				await StorageUtil.setItem(this.localStorageKeys.inactiveTools, this.toolTagsModal.inactiveItems)

	    	},
	    	changeMaxToolCount (e) {	    		
				this.$store.commit(types.SET_MAX_TOOL_COUNT, {
					count: Number(e.target.value)
				})				
	    	}
	    }
	}
</script>
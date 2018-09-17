<template>
	<div class="settings_container" :style="settingsContainerStyles">
		<div class="settings_inner" :style="settingsInnerStyles">
			<div class="settings_item">
				<label class="settings_item_label">我的主页</label>
				<div class="settings_item_value">
					<Input type="text" v-model="cacheBlankHomePage" @on-change="changeBlankHomePage"/>
				</div>
			</div>
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
			<div class="settings_item">
				<label class="settings_item_label">主题</label>
				<div class="settings_item_value h100">
					<div class="bg_preview" @click="openThemeImagesModal">
						<img v-if="activeThemeIndex.join(';').indexOf('-1') < 0" :src="themeImages[activeThemeIndex[0]].sublist[activeThemeIndex[1]].img" />
					</div>
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

	    <Modal
        v-model="themeImagesModal.shown"
        :mask-closable="false"
        :fullscreen="true"
        @on-ok="saveTheme"
        ok-text="确定"
        title="选择主题">
        	<div class="themes_item_containner">
        		<div class="themes_item_label">不设置背景图</div>
        		<div class="themes_item_content">
        			<div class="themes_item blank_theme" :data-index="-1" :data-sub-index="-1" @click="chooseThemeImage">
        				<div class="themes_item_selected" v-if="cacheActiveThemeIndex[0] == -1 || cacheActiveThemeIndex[1] == -1">
        					<Icon type="md-checkmark" size="40" />
        				</div>
        			</div>
        		</div>
        	</div>
        	<div class="themes_item_container" v-for="(item, index) in themeImages" :key="index">
        		<div class="themes_item_label">{{item.label}}</div>
        		<div class="themes_item_content">
        			<div class="themes_item" v-for="(itm, idx) in item.sublist" :key="idx" :data-index="index" :data-sub-index="idx" @click="chooseThemeImage">
        				<img :src="itm.img" />
        				<transition name="theme-item-transition" enter-active-class="animated fast fadeIn" leave-active-class="animated fast fadeOut">
        					<div class="themes_item_selected" v-if="cacheActiveThemeIndex[0] == index && cacheActiveThemeIndex[1] == idx">
	        					<Icon type="md-checkmark" size="40" />
	        				</div>
        				</transition>        				
        			</div>
        		</div>
        	</div>
	    </Modal>
	</div>
</template>
<style scoped>
	.h100 {
		height: 100px!important;
	}
	.settings_container {
		width: 100%;
		height: 100%;
		padding: 15px;
		box-sizing: border-box;
		/*background-color: #f5f5f5;*/
		display: flex;
		align-items: flex-start;
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

	.bg_preview {
		width: 100px;
		height: 100px;
		border: 1px solid #c8c8c8;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
	}
	.bg_preview img {
		max-width: 100%;
		max-height: 100%;
	}

	.themes_item_containner {
		width: 100%;	
		margin-bottom: 15px;
	}
	.themes_item_label {
		height: 32px;
		line-height: 32px;
	}
	.themes_item_content {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
	}
	.themes_item {
		position: relative;
		width: 100px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 8px;
		margin-bottom: 8px;
		cursor: pointer;
		border: 1px solid #f2f2f2;
		border-radius: 4px;
		overflow: hidden;
	}
	.themes_item img {
		max-width: 100%;
		max-height: 100%;
		pointer-events: none;
	}
	.themes_item.blank_theme {
		background-color: #f8f8f8;
	}
	.themes_item_selected {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(79, 192, 141, .8);
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}
	.themes_item_selected i {
		color: #FFFFFF;
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
				},
				themeImagesModal: {
					shown: false
				},
				cacheActiveThemeIndex: [-1, -1],
				cacheBlankHomePage: ''
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
	      		maxHeight: (this.bodyStyles.height - 65 - 30) + 'px'
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
	      },
	      themeImages () {
	      	return this.$store.state.themeImages
	      },
	      activeThemeIndex () {
	      	return this.$store.state.activeThemeIndex
	      },
	      blankHomePage () {
	      	return this.$store.state.blankHomePage
	      }
	    },
	    created () {
	    	this.$nextTick(() => {
	    		this.toolTagsModal.activeItems = JSON.parse(JSON.stringify(this.activeTools))
	    		try {
	    			this.toolTagsModal.inactiveItems = JSON.parse(JSON.stringify(this.inactiveTools))
	    		} catch (err) {
	    		}
	    		this.cacheActiveThemeIndex = this.activeThemeIndex
	    		this.cacheBlankHomePage = this.blankHomePage
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
	    	},
	    	openThemeImagesModal () {
	    		this.themeImagesModal.shown = true
	    	},
	    	chooseThemeImage (e) {
	    		this.cacheActiveThemeIndex = [Number(e.target.dataset.index), Number(e.target.dataset.subIndex)]
	    	},
	    	saveTheme () {
	    		this.$store.commit(types.SET_ACTIVE_THEME_INDEX, {
	    			activeThemeIndex: this.cacheActiveThemeIndex
	    		})
	    	},
	    	changeBlankHomePage () {
	    		this.$store.commit(types.SET_BLANK_HOME_PAGE, {
	    			blankHomePage: this.cacheBlankHomePage
	    		})
	    	}
	    }
	}
</script>
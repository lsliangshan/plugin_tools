<template>
	<div class="pinyin_container" :style="pinyinContainerStyles">
		<div class="pinyin_inner">
			<Split v-model="split" min="100" mode="vertical">
		        <div slot="top" class="demo-split-pane">
		            <Input type="textarea" autofocus class="unformat_wrapper no_bg" v-model="originalText" placeholder="汉字" />
		        </div>
		        <div slot="trigger" class="trigger_container">
		        	<div class="tips_left">
		        		<Checkbox>标注音调</Checkbox>
		        		<Checkbox>字音对照</Checkbox>
		        	</div>
		          	<div class="trigger_wrapper">		          	
		            	<Icon type="ios-code" size="14" />		            
		          	</div>
		          	<div class="tips_right">
		          		<Button type="primary">转换成拼音</Button>
		          	</div>
		        </div>
		        <div slot="bottom" class="demo-split-pane">
		            <div class="converted_container" v-html="targetText" placeholder="拼音"></div>
		        </div>
		    </Split>
		</div>
	</div>
</template>
<style scoped>
	.pinyin_container {
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.pinyin_inner {
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 4px;
	}
	.demo-split-pane{
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
	.converted_container {
		height: 100%;
		border: 1px solid #dcdee2;
		border-radius: 4px;
		overflow-y: auto;
	}
</style>
<script>
	export default {
		name: 'pinyin',
		data () {
			return {
				split: 0.5,
				originalText: '',
				targetText: ''
			}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			pinyinContainerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			}
		}
	}
</script>
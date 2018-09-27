<template>
	<div class="index_container" :style="indexContainerStyles">
		<div class="index_inner">
			<div class="index_tool_item" v-for="(item, index) in tools" :key="item.name" v-if="item.sublist.length > 0">
				<div class="index_tool_item_header">{{item.name}}</div>
				<div class="index_tool_item_body">
					<div class="index_tool_item_card" v-for="(card, idx) in item.sublist" :key="card.pathName" :data-path-name="card.pathName" @click="goTo">
						<div class="index_tool_item_card_left pen">
							<svg>
					          <use :xlink:href="'#route-' + card.pathName"></use>
					        </svg>
						</div>
						<div class="index_tool_item_card_right pen">
							<div class="tool_title pen">{{card.name}}</div>
							<div class="tool_desc pen">{{card.desc}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.pen {
		pointer-events: none;
	}
	.index_container {
		width: calc(100% - 30px);
		overflow-x: auto;
		margin: 15px;
		border-radius: 4px;
	}
	.index_container * {
		-webkit-user-select: none;
	}
	.index_inner {
		width: 900px;
		height: 100%;
		margin: 0 auto;
		border-radius: 4px;
		padding: 15px;
		box-sizing: border-box;
		overflow-y: auto;
		background-color: rgba(255, 255, 255, .9);
	}
	.index_tool_item {
		width: 100%;
	}
	.index_tool_item_header {
		font-size: 20px;
		line-height: 40px;
		font-weight: bold;
	}
	.index_tool_item_body {
		width: 100%;
		min-height: 40px;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.index_tool_item_card {
		width: 246px;
		height: 80px;
		margin: 10px 40px 10px 0;
		padding-right: 10px;
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border-radius: 4px;
		transition: all .3s ease-in-out;
	}
	.index_tool_item_card:hover {
		background-color: rgba(79, 192, 141, .9);
	    -webkit-box-shadow: 0 -1px 10px rgba(0,0,0,.5);
	    -moz-box-shadow: 0 -1px 10px rgba(0,0,0,.5);
	    box-shadow: 0 -1px 10px rgba(0,0,0,.5);
	}
	.index_tool_item_card_left {
		width: 66px;
		height: 66px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.index_tool_item_card_left svg {
		width: 40px;
		height: 40px;
		fill: #555;
		transition: fill .2s ease-in-out;
	}
	.index_tool_item_card_right {
		width: 180px;
		height: 100%;
		padding-bottom: 6px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.index_tool_item_card_right .tool_title {
		font-size: 15px;
		line-height: 2;
		font-weight: bold;
		color: #555;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color .2s ease-in-out;
	}
	.index_tool_item_card_right .tool_desc {
		font-size: 12px;
		line-height: 20px;
		color: #888;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2;
		word-break: break-all;
		transition: color .2s ease-in-out;
	}
	.index_tool_item_card:hover svg {
		fill: #FFF;
	}
	.index_tool_item_card:hover .index_tool_item_card_right .tool_title {
		color: #FFF;
	}
	.index_tool_item_card:hover .index_tool_item_card_right .tool_desc {
		color: #FFF;
	}
</style>
<script>
	export default {
		name: 'index',
		data () {
			return {}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			indexContainerStyles () {
				return {
					height: (this.bodyStyles.height - 65 - 30) + 'px'
				}
			},
			tools () {
				return this.$store.state.tools
			}
		},
		methods: {
			goTo (e) {
				this.$router.replace({
					name: e.target.dataset.pathName
				})
			}
		}
	}
</script>
<template>
	<div class="container">
		<div class="header">
			<p>热门推荐</p>
		</div>
		<div class="content">
			<div class="item" v-for="(item, index) in data" :key="index">
				<div class="item_image_container">
					<img :src="item.picUrl" class="item_image" />
					<div class="item_subtitle">
						<Icon type="ios-headset" size="16" />
						<span class="play_count">{{item.playCount | playCount}}</span>
					</div>
				</div>
				<div class="item_title">
					<p>{{item.name}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.container {
		width: 100%;
		margin-bottom: 30px;
	}
	.header {
		width: 100%;
		height: 33px;
		border-bottom: 2px solid #C10D0C;
	}
	.header p {
		font-size: 18px;
		font-weight: bold;
		line-height: 28px;
		font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
	}
	.content {
		width: 100%;
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.item {
		width: 25%;
		height: 240px;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.item_image_container {
		position: relative;
		width: 140px;
		height: 140px;
		border: 1px solid #dadada;
		box-sizing: content-box;
	}
	.item_image {
		width: 140px;
		height: 140px;
	}
	.item_subtitle {
		position: absolute;
		width: 140px;
		height: 24px;
		background-color: rgba(0, 0, 0, 0.6);
		left: 0;
		bottom: 0;
		padding: 0 5px;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		color: #ccc;
	}
	.play_count {
		margin-left: 8px;
		line-height: 24px;
	}
	.item_title {
		width: 140px;
		margin-top: 5px;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		font-size: 14px;
		color: #333;
	}
</style>
<script>
	export default {
		name: 'AudioPlayList',
		props: {
			data: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data () {
			return {}
		},
		filters: {
			playCount (text) {
				let _c = Number(text)
				if (_c < 10000) {
					return Math.floor(_c)
				} else {
					return (_c / 10000).toFixed(1) + '万'
				}
			}
		}
	}
</script>
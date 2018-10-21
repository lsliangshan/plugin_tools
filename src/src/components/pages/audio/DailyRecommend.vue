<template>
	<div class="container">
		<div class="header">
			<p>个性化推荐</p>
		</div>
		<div class="content">
			<div class="item">
				<div class="item_image_container no_border">
					<a class="item_image_a" href="javascript:void(0)">
						<span class="head">星期日</span>
						<span class="bd">21</span>
						<span class="mask"></span>
					</a>
				</div>
				<div class="item_title">
					<p>每日歌曲推荐</p>
				</div>
				<div class="item_desc">
					<p>根据你的口味生成，每天6:00更新</p>
				</div>
			</div>
			<div class="item" v-for="(item, index) in data" :key="index">
				<div class="item_image_container">
					<img :src="item.picUrl" class="item_image" />
					<div class="item_subtitle">
						<Icon type="ios-headset" size="16" />
						<span class="play_count">{{item.playcount | playCount}}</span>
					</div>
				</div>
				<div class="item_title">
					<p>{{item.name}}</p>
				</div>
				<div class="item_desc">
					<p>{{item.copywriter}}</p>
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
	.item_image_container.no_border {
		border: none;
	}
	.item_image {
		width: 140px;
		height: 140px;
	}
	.item_image_a {
		width: 140px;
		height: 140px;
		position: relative;
	    zoom: 1;
	    display: block;
		background: url('/html/static/images/date.png') no-repeat 0 9999px;
		background-position: 0 0;
	}
	.item_image_a .head {
		display: block;
	    height: 33px;
	    line-height: 33px;
	    color: #fed9d9;
	    font-size: 14px;
	    text-shadow: 0 -1px #962626;
	    text-align: center;
	}
	.item_image_a .bd {
		display: block;
	    line-height: 102px;
	    text-align: center;
	    font-size: 94px;
	    font-family: Arial, Helvetica, sans-serif;
	    font-weight: bold;
	    color: #202020;
	}
	.item_image_a .mask {
		position: absolute;
	    top: 33px;
	    left: 0;
	    width: 142px;
	    height: 107px;	    
	    background: url('/html/static/images/date.png') no-repeat 0 9999px;
	    background-position: 0 -150px;
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
	.item_desc {
		width: 140px;
		margin-top: 5px;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 12px;
		color: #999;
	}
</style>
<script>
	export default {
		name: 'AudioDailyRecommend',
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
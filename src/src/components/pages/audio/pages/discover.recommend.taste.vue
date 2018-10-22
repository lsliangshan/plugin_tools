<template>
	<div class="container" :style="containerStyles">
		<div class="inner">
			<div class="main_content">
				<div class="top">
					<img src="/html/static/images/recmd_daily.jpg" alt="">
					<div class="date_container">
						<span class="head">{{weekDay}}</span>
						<span class="bd">{{date}}</span>
						<span class="mask"></span>
					</div>
				</div>
				<div class="middle">
					<ButtonGroup>
				        <Button type="primary" icon="ios-play">播放全部</Button>
				        <Button type="primary">
				        	<Icon type="md-add"/>
				        </Button>
				    </ButtonGroup>
				</div>
			</div>
			<div class="side_content">
				
			</div>
		</div>
	</div>
</template>
<style scoped>
	.container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, .8);
	}
	.inner {
		width: 950px;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
	}
	.main_content {
		width: 700px;
		height: 100%;
		padding: 40px 30px;
		box-sizing: border-box;
		background-color: #FFF;
		overflow-y: auto;
	}
	.side_content {
		width: 250px;
		height: 100%;
	}
	.top {
		position: relative;
	}
	.date_container {
		position: absolute;
		left: 54px;
		top: 34px;
		width: 114px;
		height: 114px;
		background: url(/html/static/images/date.png) no-repeat 0 9999px;
		background-position: 0 -270px;
	}
	.date_container .head {
		display: block;
	    color: #fed9d9;
	    text-shadow: 0 -1px #962626;
	    text-align: center;
	    height: 26px;
	    line-height: 26px;
	    font-size: 12px;
	}
	.date_container .bd {
		display: block;
	    text-align: center;
	    font-family: Arial, Helvetica, sans-serif;
	    font-weight: bold;
	    color: #202020;
	    font-size: 74px;
    	line-height: 80px;
	}
	.date_container .mask {
		position: absolute;
	    left: 0;
	    width: 142px;
	    height: 107px;	    
	    background: url('/html/static/images/date.png') no-repeat 0 9999px;
	    top: 26px;
    	background-position: 0 -400px;
	}
	.middle {
		width: 640px;
		margin-top: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
</style>
<script>
	import { mapState } from 'vuex'
	export default {
		name: 'discover-recommend-taste',
		data () {
			return {
				weekDay: '',
				date: ''
			}
		},
		computed: {
			...mapState({
				recommendSongsList: state => state.moduleNem.recommendSongsList
			}),
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			containerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			}
		},
		async created () {
			let _date = new Date()
			this.date = _date.getDate()
			let _week_day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
			this.weekDay = _week_day[_date.getDay()]
			await this.$store.dispatch('moduleNem/getRecommendSongs')
			console.log('===========', JSON.stringify(this.recommendSongsList[0]))
		}
	}
</script>
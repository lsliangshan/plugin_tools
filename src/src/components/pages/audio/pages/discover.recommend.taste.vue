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
				<div class="bottom">
					<Table stripe :loading="loadingData" :columns="columns" :data="recommendSongsList"></Table>
				</div>
			</div>
			<div class="side_content">
				<div class="hd">
					<Icon type="md-help-circle" size="24" color="#c20c0c" />
					<span>个性化推荐如何工作</span>
				</div>
				<p class="s-fc3">它聪明、熟悉每个用户的喜好，从海量音乐中挑选出你可能喜欢的音乐。</p>
				<p class="s-fc3">它通过你每一次操作来记录你的口味</p>
				<div class="j-flag">
					<div class="j-flag-item">
						<svg>
							<use xlink:href="#nem-play"></use>
						</svg>
						<p>你播放了<span class="count">{{loginInfo.listenSongs}}</span>首音乐</p>
					</div>
				</div>
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
	.bottom {
		width: 640px;
		margin-top: 30px;
	}

	.item_play_container {
			width: 24px;
			height: 24px;
			margin-left: 8px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px solid #dadada;
			border-radius: 50%;
	}

	.side_content {
		width: 250px;
		height: 100%;
		background-color: #ffffff;
		border-left: 1px solid #dadada;
		padding: 20px 25px 40px 25px;
	}
	.side_content .hd {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
    padding: 5px 0 8px;
    border-bottom: 1px solid #ccc;
    line-height: 22px;
    font-size: 18px;
    box-sizing: content-box;
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
	}
	.side_content .hd span {
		margin-left: 4px;
	}
	.side_content .s-fc3 {
		color: #666666;
		font-size: 12px;
		margin-top: 8px;
		margin-bottom: 8px;
	}
	.side_content .j-flag {
		background-color: #f7f7f7;
		padding: 17px 0 17px 12px;
	}
	.side_content .j-flag .j-flag-item {
		color: #999999;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: flex-start;
	}
	.side_content .j-flag .j-flag-item svg {
		width: 16px;
		height: 16px;
		fill: #999999;
	}
	.side_content .j-flag .j-flag-item p {
		margin-left: 4px;
	}
	.side_content .j-flag .j-flag-item .count {
		color: #C20C0C;
	}
</style>
<script>
	import { mapState } from 'vuex'
	export default {
		name: 'discover-recommend-taste',
		data () {
			return {
				weekDay: '',
				date: '',
				loadingData: true,
				playingIndex: 1, // 正在播放当前列表中第几首歌
				columns: [
					{
						title: '',
						key: '',
						width: 80,
						render: (h, params) => {
							const that = this
							return h('div', {
									style: {
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between'
									}
								}, [
								h('span', params.index + 1),
								h('div', {
									class: 'item_play_container',
									style: {
										marginLeft: '5px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}
								}, [
									h('svg', {
										style: {
											width: '20px',
											height: '20px',
											fill: (that.playingIndex === params.index) ? '#C20C0C' : '#dadada',
											cursor: 'pointer',
											transition: 'all .2s ease-in-out'
										},
										on: {
											mouseenter (e) {
												if (that.playingIndex !== params.index) {
													e.target.style.fill = '#333333'
												}
											},
											mouseleave (e) {
												if (that.playingIndex !== params.index) {
													e.target.style.fill = '#dadada'
												}
											},
											click (e) {
												that.playingIndex = Number(params.index)
												that.$eventHub.$emit(that.events.nemMusic.play, {
													music: [that.recommendSongsList[that.playingIndex]]
												})
											}
										}
									}, [
										h('use', {
											attrs: {
												'xlink:href': (that.playingIndex === params.index) ? '#nem-pause' : '#nem-play'
											}
										})
									])
								])
							])
						}
					},
					{
						title: '歌名',
						key: 'name',
						width: 200
					},
					{
						title: '时长',
						key: 'duration',
						width: 80,
						render: (h, params) => {
							return h('span', this.formatDuration(params.row.duration))
						}
					},
					{
						title: '歌手',
						key: 'artists',
						render: (h, params) => {
							return h('span', params.row.artists[0].name)
						}
					},
					{
						title: '专辑',
						key: 'album',
						render: (h, params) => {
							return h('span', params.row.album.name)
						}
					}
				]
			}
		},
		computed: {
			...mapState({
				// loginInfo: state => state.moduleNem.loginInfo, // 登录信息
				recommendSongsList: state => state.moduleNem.recommendSongsList
			}),
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			containerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			},
			loginInfo () {
				return this.$store.state.nemLoginInfo
			},
			events () {
				return this.$store.state.events
			}
		},
		async created () {
			let _date = new Date()
			this.date = _date.getDate()
			let _week_day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
			this.weekDay = _week_day[_date.getDay()]
			await this.$store.dispatch('moduleNem/getRecommendSongs')
			this.loadingData = false
		},
		methods: {
			formatDuration (text) {
				let _d = Number(text)
				let _h = Math.floor(_d / (60 * 60 * 1000))
				if (_h < 10) {
					_h = '0' + _h
				}
				let _m = Math.floor(_d % (60 * 60 * 1000) / (60 * 1000))
				if (_m < 10) {
					_m = '0' + _m
				}
				let _s = Math.floor((_d % (60 * 1000)) / 1000)
				if (_s < 10) {
					_s = '0' + _s
				}
				return (_h === '00' ? '' : (_h + ':')) + _m + ':' + _s
			}
		}
	}
</script>
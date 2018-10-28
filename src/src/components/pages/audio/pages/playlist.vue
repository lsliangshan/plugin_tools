<template>
	<div class="audio_playlist_container" :style="containerStyles">
		<div class="audio_playlist_inner" v-if="albumDetail.playlist">
			<div class="main_content">
				<div class="m-info">
					<div class="left">
						<img :src="albumDetail.playlist.coverImgUrl">
					</div>
					<div class="right">
						<div class="hd">
							<div class="icn">歌单</div>
							<div class="title">{{albumDetail.playlist.name}}</div>
						</div>
						<div class="user" v-if="albumDetail.playlist.creator">
							<div class="avatar">
								<img :src="albumDetail.playlist.creator.avatarUrl">
							</div>
							<div class="nickname">{{albumDetail.playlist.creator.nickname}}</div>
							<div class="createtime">{{albumDetail.playlist.createTime | formatCreateTime}} 创建</div>
						</div>
						<div class="btns">
							<ButtonGroup>
						        <Button type="primary" icon="ios-play">播放</Button>
						        <Button type="primary">
						        	<Icon type="md-add"/>
						        </Button>
						    </ButtonGroup>
						</div>
						<div class="tags">
							标签:
							<span class="u-tag" v-for="(tag, index) in albumDetail.playlist.tags" :key="index">{{tag}}</span>
						</div>
						<div class="desc">
							<p v-for="(itm, idx) in description">{{itm}}<br/></p>
						</div>
						<div class="desc_toggle" @click="descriptionHide = !descriptionHide">
							<div v-if="descriptionHide">
								展开
								<Icon type="ios-arrow-down" />
							</div>
							<div v-else>
								收起
								<Icon type="ios-arrow-up" />
							</div>
						</div>
					</div>
				</div>
				<div class="m-list">
					<div class="l-hd">
						<div class="left">
							<span class="title">歌曲列表</span>
							<span class="cnt">{{albumDetail.playlist.trackCount}}首歌</span>
						</div>
						<div class="right">
							播放：<span class="play_count">{{albumDetail.playlist.playCount}}</span>次
						</div>
					</div>
					<Table stripe :loading="loadingData" :columns="columns" :data="albumDetail.playlist.tracks"></Table>
				</div>
			</div>
			<div class="side_content">
			</div>
		</div>
	</div>
</template>
<style scoped>
	.audio_playlist_container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, .9);
	}
	.audio_playlist_inner {
		width: 1000px;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
	}
	.main_content {
		width: 750px;
		height: 100%;
		padding: 20px;
		box-sizing: border-box;
		background-color: #FFF;
		overflow-y: auto;
		padding: 40px 30px;
		box-sizing: border-box;
	}
	.main_content .m-info {
		width: 690px;
		/*height: 200px;*/
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
	}
	.main_content .m-info .left {
		width: 200px;
		height: 200px;
		padding: 2px;
		box-sizing: border-box;
		border: 1px solid #dadada;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.main_content .m-info .left img {
		max-width: 100%;
		max-height: 100%;
	}
	.main_content .m-info .right {
		width: 490px;
		min-height: 200px;
		padding-left: 20px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	.main_content .m-info .right .hd {
		width: 100%;
		margin-bottom: 15px;
		color: #333;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
	}
	.main_content .m-info .right .hd .icn {
		width: 54px;
		height: 24px;
		background-color: rgb(79, 192, 141);
		color: #fff;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.main_content .m-info .right .hd .title {
		width: 400px;
		line-height: 24px;
		font-size: 18px;
		margin-left: 8px;
		word-wrap: break-word;
	    word-break: break-word;
	    white-space: normal;
	}
	.main_content .m-info .right .user {
		width: 100%;
		margin-bottom: 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.main_content .m-info .right .user .avatar {
		width: 35px;
		height: 35px;
		overflow: hidden;
	}
	.main_content .m-info .right .user .avatar img {
		width: 35px;
		height: 35px;
	}
	.main_content .m-info .right .user .nickname {
		color: #0c73c2;
		font-size: 12px;
		margin-left: 15px;
	}
	.main_content .m-info .right .user .createtime {
		margin-left: 15px;
		color: #999999;
		font-size: 12px;
	}
	.main_content .m-info .right .btns {
		width: 100%;
		margin-bottom: 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.main_content .m-info .right .tags {
		width: 100%;
		margin-bottom: 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.main_content .m-info .right .tags .u-tag {
		padding: 0 10px;
		margin-left: 10px;
		text-shadow: 0 1px #fdfdfd;
		border: 1px solid #dadada;
		border-radius: 20px;
	}
	.main_content .m-info .right .desc {
		width: 100%;
		color: #333333;
		line-height: 18px;
		display: -webkit-box;    
		-webkit-box-orient: vertical;    
		-webkit-line-clamp: 3;    
		overflow: hidden;
	}
	.main_content .m-info .right .desc:before {
		content: '介绍: ';
		white-space: nowrap;
		margin-right: 8px;
	}
	.main_content .m-info .right .desc p:first-child {
		display: inline-block;
	}
	.main_content .m-info .right .desc_toggle {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		cursor: pointer;
		color: rgb(79, 192, 141);
	}
	.main_content .m-list {
		width: 100%;
		min-height: 300px;
		margin-top: 30px;
	}
	.main_content .m-list .l-hd {
		width: 100%;
		height: 33px;
		border-bottom: 2px solid rgb(79, 192, 141);
		font-weight: 400;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.main_content .m-list .l-hd .left {
		width: 300px;
	}
	.main_content .m-list .l-hd .left .title {
		font-size: 18px;
		color: #333333;
	}
	.main_content .m-list .l-hd .left .cnt {
		color: #666666;
		font-size: 12px;
		margin-left: 15px;
	}
	.main_content .m-list .l-hd .right {
		width: 300px;
		height: 27px;
		font-size: 12px;
		color: #666666;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}
	.main_content .m-list .l-hd .right .play_count {
		color: rgb(79, 192, 141);
		font-weight: bolder;
	}
	.side_content {
		width: 250px;
		height: 100%;
	}
</style>
<script>
	export default {
		name: 'AudioPlaylist',
		data () {
			return {
				albumDetail: {},
				description: '',
				descriptionHide: true,
				loadingData: true,
				playingIndex: -1, // 正在播放当前列表中第几首歌
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
												that.albumDetail.playlist.tracks[that.playingIndex].artists = that.albumDetail.playlist.tracks[that.playingIndex].ar
												that.albumDetail.playlist.tracks[that.playingIndex].album = that.albumDetail.playlist.tracks[that.playingIndex].al
												that.albumDetail.playlist.tracks[that.playingIndex].duration = that.albumDetail.playlist.tracks[that.playingIndex].dt
												that.$eventHub.$emit(that.events.nemMusic.play, {
													music: [that.albumDetail.playlist.tracks[that.playingIndex]]
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
							return h('span', this.formatDuration(params.row.dt))
						}
					},
					{
						title: '歌手',
						key: 'artists',
						render: (h, params) => {
							return h('span', params.row.ar[0].name)
						}
					},
					{
						title: '专辑',
						key: 'album',
						render: (h, params) => {
							return h('span', params.row.al.name)
						}
					}
				]
			}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			containerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			},
			events () {
				return this.$store.state.events
			}
		},
		async created () {
			this.albumDetail = await this.init()
			this.loadingData = false
			this.description = (this.albumDetail.playlist.description.substring(0, 100) + '...').split('\n')
		},
		methods: {
			init () {
				return new Promise(async (resolve) => {
					let albumDetailData = await this.$store.dispatch('moduleNem/getAlbumDetail', {
						id: this.$route.query.id
					})
					resolve(albumDetailData)
				})
			},
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
			},
			getMusicDetail (id) {
				return new Promise(async (resolve) => {
					resolve(true)
				})
			},
			getMusicList () {}
		},
		filters: {
			formatCreateTime (text) {
				let _d = new Date()
				_d.setTime(text)
				let _y = _d.getFullYear()
				let _m = _d.getMonth()
				_m = ((_m + 1) < 10 ? ('0' + (_m + 1)) : (_m + 1))
				let _date = _d.getDate()
				_date = (_date < 10 ? ('0' + _date) : _date)
				return (_y + '-' + _m + '-' + _date)
			}
		},
		watch: {
			'descriptionHide': {
				handler (val) {
					if (val) {
						this.description = (this.albumDetail.playlist.description.substring(0, 100) + '...').split('\n')
					} else {
						this.description = this.albumDetail.playlist.description.split('\n')
					}
				}
			}
		}
	}
</script>
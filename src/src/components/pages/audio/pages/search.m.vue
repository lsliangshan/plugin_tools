<template>
	<div class="container" :style="containerStyles">
		<div class="inner">
			<div class="main_content">
				<div class="m-search">
					<Input search enter-button size="large" placeholder="搜索音乐" class="custom-input" v-model="searchKey" @on-enter="searchMusic" @on-search="searchMusic"/>
				</div>
				<div class="m-bd">
					<div class="m-bd-title">
						搜索“{{searchKey}}”，找到 <span style="color: rgb(79, 192, 141);">{{totalCounts}}</span> 首单曲
					</div>
					<div class="m-bd-table">
						<Table stripe :loading="loadingData" :columns="columns" :data="songs['page-' + currentPage]"></Table>
					</div>
					<transition name="page-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">				
						<div class="m-bd-page" v-if="totalCounts > 0">
							<Page :total="totalCounts" class="music_search_page" show-elevator show-sizer @on-change="changePage"/>
						</div>
					</transition>
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
		background-color: #ffffff;
		padding: 40px;
		overflow-y: auto;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	.main_content {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	.inner .m-search {
		position: sticky;
	    left: 0;
	    top: 0;
	    z-index: 999;
		width: 100%;
		height: 40px;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-bottom: 15px;
	}
	.inner .m-search .custom-input {
		width: 300px;
	}
	.inner .m-bd {
		width: 100%;		
		margin-top: 15px;
	}
	.inner .m-bd-table {
		width: 100%;
		margin-top: 15px;
		min-height: 300px;
	}
	.inner .m-bd-page {
		margin-top: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
<script>
	export default {
		name: 'search-m',
		data () {
			return {
				searchKey: '',
				currentPage: 0,
				limit: 30,
				totalCounts: 0,
				songs: {},
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
												that.songs['page-' + this.currentPage][this.playingIndex].artists = that.songs['page-' + this.currentPage][this.playingIndex].ar
												that.songs['page-' + this.currentPage][this.playingIndex].album = that.songs['page-' + this.currentPage][this.playingIndex].al
												that.songs['page-' + this.currentPage][this.playingIndex].duration = that.songs['page-' + this.currentPage][this.playingIndex].dt
												that.$eventHub.$emit(that.events.nemMusic.play, {
													music: [songs['page-' + this.currentPage][this.playingIndex]]
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
			totalPages () {
				return Math.ceil(this.totalCounts / this.limit)
			},
			offset () {
				return this.limit * this.currentPage
			}
		},
		created () {
			this.searchKey = this.$route.query.s
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
			},
			searchMusic () {				
				return new Promise(async (resolve) => {
					this.loadingData = true
					if (!this.songs.hasOwnProperty('page-' + this.currentPage)) {
						let searchMusicData = await this.$store.dispatch('moduleNem/searchMusic', {
							s: this.searchKey,
							offset: this.offset,
							limit: this.limit
						})
						this.totalCounts = searchMusicData.result.songCount
						this.songs['page-' + this.currentPage] = searchMusicData.result.songs
					}
					this.loadingData = false
					resolve(true)
				})
			},
			async nextPage () {
				if (this.currentPage < this.totalPages - 1) {
					// 下一页
					this.currentPage += 1
					await this.searchMusic()
				}
			},
			prevPage () {
				if (this.currentPage > 0) {
					this.currentPage -= 1
				}
			},
			async changePage (index) {
				this.currentPage = (index - 1)
				await this.searchMusic()
			}
		}
	}
</script>
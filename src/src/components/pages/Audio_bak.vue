<template>
	<div class="audio_container" :style="audioContainerStyles">
		<div class="audio_inner">
			<!-- <div>当前播放：<span>{{audio.list[audio.current] | getMusicName}}</span></div>
			<div>音乐格式：<span>{{audio.list[audio.current] | getMusicSuffix}}</span></div>
			<div>当前音量：<span>{{audio.volume * 100}}</span></div>
			<div>已经播放：{{audioCurrentTime}}s / {{audio.duration.toFixed(1)}}</div>
			<div>{{loginInfo}}</div>
			<Button type="primary" @click="togglePlay">播放</Button> -->
			<div class="main_content">
				<daily-recommend v-if="loginInfo.userPoint && loginInfo.userPoint.userId" :data="dailyRecommendList"></daily-recommend>
				<play-list :data="playList"></play-list>
			</div>
			<div class="side_content">
				<div class="side_login_box" v-if="!loginInfo.userPoint || !loginInfo.userPoint.userId">
					<p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
					<Button type="primary" ghost long size="small" @click="showLoginModal" style="margin-top: 15px;">登录网易云音乐</Button>
				</div>
				<div class="side_login_box" v-else>
					<div class="profile_header">
						<div class="profile_avatar_container">
							<img :src="loginInfo.profile.avatarUrl" class="profile_avatar_image"/>
						</div>
						<div class="profile_nickname_container">
							<div class="profile_nickname">{{loginInfo.profile.nickname}}</div>
							<div class="profile_level">Lv. <span>{{loginInfo.level}}</span></div>
							<Button type="error" ghost long size="small" @click="logout">退出登录</Button>
						</div>
					</div>
					<div class="profile_bottom">
						<div class="profile_bottom_item">
							<span>{{loginInfo.profile.eventCount}}</span>
							<span>动态</span>
						</div>
						<div class="profile_bottom_item">
							<span>{{loginInfo.profile.follows}}</span>
							<span>关注</span>
						</div>
						<div class="profile_bottom_item">
							<span>{{loginInfo.profile.followeds}}</span>
							<span>粉丝</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Modal
			class="nem_login_form"
	        v-model="loginModal.shown"
	        width="320">
	        <p slot="header" class="nem_login_title">
	        	<span>登录</span><span class="login_type">【网易云音乐】</span>
	        </p>
	        <Form>
	        	<FormItem>
	        		<Input type="text" v-model="loginModal.username" placeholder="请输入网易云音乐账号">
		                <Icon type="ios-person-outline" slot="prepend"></Icon>
		            </Input>
	        	</FormItem>
	        	<FormItem>
	        		<Input type="password" v-model="loginModal.password" placeholder="请输入网易云音乐密码">
		                <Icon type="ios-lock-outline" slot="prepend"></Icon>
		            </Input>
	        	</FormItem>
	        	<FormItem>
	        		<Button type="primary" long class="login_button" :disabled="!loginModal.username || !loginModal.password" @click="login" :loading="isLogin">
	        			<span v-if="isLogin">登录中...</span>
	        			<span v-else>登录</span>
	        		</Button>
	        	</FormItem>
	        </Form>
	        <p slot="footer" class="nem_login_footer">
	        	<a href="javascript:void(0)" class="nem_login_other_type">
	        		<Icon type="ios-arrow-back" />
	        		<span>其它登录方式</span>
	        	</a>
	        </p>
	    </Modal>
	</div>
</template>
<style scoped>
	.audio_container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, .9);
	}
	.audio_inner {
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
	}
	.side_content {
		width: 250px;
		height: 100%;
	}
	.side_login_box {
		width: 250px;
		/*height: 130px;*/
		padding: 20px;
		color: #666;
		background-color: rgba(255, 255, 255, .4);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.profile_header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.profile_avatar_container {
		width: 80px;
		height: 80px;
		padding: 2px;
		box-sizing: border-box;
		background-color: #fff;
		border: 1px solid #dadada;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.profile_avatar_image {
		width: 74px;
		height: 74px;
	}
	.profile_nickname_container {
		width: 115px;
		height: 80px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.profile_nickname {
		color: #333;
		font-size: 14px;
		font-weight: bolder;
		width: 115px;
		text-overflow: ellipsis;
		overflow-y: hidden;
		white-space: nowrap;
		word-wrap: normal;
	}
	.profile_level {
		color: #999;
		font-size: 14px;
		font-style: italic;
	}
	.profile_bottom {
		width: 210px;
		height: 40px;
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.profile_bottom_item {
		width: 40px;
		height: 40px;
		color: #666;
		margin-left: 20px;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		/*align-items: flex-start;*/
		justify-content: space-between;
		border-right: 1px solid #e4e4e4;
	}
	.profile_bottom_item:hover {
		color: #0c73c2;
	}
	.profile_bottom_item:first-child {
		margin-left: 0;
	}
	.profile_bottom_item:last-child {
		border-right: none;
	}
	.profile_bottom_item span:first-child {
		font-size: 20px;
		line-height: 25px;
	}
	.profile_bottom_item span:last-child {
		font-size: 12px;
		line-height: 15px;
	}

	.nem_login_title {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.login_type {
		color: #C20C0C;
	}
	.nem_login_footer {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.nem_login_other_type {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.nem_login_other_type i {
		margin-right: 4px;
		margin-left: -4px;
	}
	.login_button {
		transition: all .3s ease-in-out;
	}
</style>
<script>
	import * as types from '../../store/mutation-types'
	import crypto from 'crypto'
	import PlayList from './audio/components/PlayList.vue'
	import DailyRecommend from './audio/components/DailyRecommend.vue'
	export default {
		name: 'audio',
		components: {
			PlayList,
			DailyRecommend
		},
		data () {
			return {
				audioCurrentTime: 0,
				loginModal: {
					shown: false,
					username: 'loveliangshan@126.com',
					password: 'liangshan001'
				},
				isLogin: false,
				loginInfo: {"profile":{"detailDescription":"","djStatus":0,"followed":false,"userId":107163072,"vipType":0,"gender":1,"accountStatus":0,"avatarImgId":1365593467601826,"birthday":1420041600000,"nickname":"netease_Keith","city":110101,"province":110000,"defaultAvatar":false,"avatarUrl":"http://p1.music.126.net/4md55uk14pGYj9eq_HfjWA==/1365593467601826.jpg","userType":0,"mutual":false,"remarkName":null,"expertTags":null,"authStatus":0,"experts":{},"backgroundImgId":3240260770885192,"backgroundUrl":"http://p1.music.126.net/4b1YkvUf91RjZMbgnUhAXA==/3240260770885192.jpg","avatarImgIdStr":"1365593467601826","backgroundImgIdStr":"3240260770885192","description":"","signature":"","authority":0,"artistIdentity":[],"followeds":2,"follows":7,"blacklist":false,"eventCount":1,"artistName":null,"playlistCount":15,"playlistBeSubscribedCount":0},"level":8,"listenSongs":3217,"userPoint":{"userId":107163072,"balance":89,"updateTime":1515040132422,"version":20,"status":0,"blockBalance":0},"mobileSign":false,"pcSign":false,"peopleCanSeeMyPlayRecord":true,"bindings":[{"refreshTime":0,"userId":107163072,"tokenJsonStr":"{\"email\":\"loveliangshan@126.com\"}","url":"","expiresIn":2147483647,"expired":false,"id":49929572,"type":0}],"adValid":true,"code":200,"createTime":1448177780419,"createDays":1065},
				md5sum: {},
				nemApiUrl: 'http://127.0.0.1:3000/nem/index/v1',
				nemApi: {
					baseURL: 'http://music.163.com',
					login: '/weapi/login', // 登录 网易云音乐
					userDetail: '/api/v1/user/detail', // 用户详情
					hotTags: '/api/playlist/hottags', // 歌单类型列表 热门类型
					personalizedNewSong: '/api/personalized/newsong', // 新音乐推荐
					personalizedPlayList: '/api/personalized/playlist', // 推荐歌单
					personalizedMv: '/api/personalized/mv', // 推荐MV,
					personalizedPrivateContent: '/api/personalized/privatecontent', // 独家放送
					personalizedDjProgram: '/api/personalized/djprogram', // 推荐dj
					search: '/weapi/cloudsearch/get/web', // 搜索
					recommendSongs: '/weapi/v1/discovery/recommend/songs', // 每日推荐歌曲
					recommendResource: '/weapi/v1/discovery/recommend/resource', // 每日推荐歌单
					recommendRadio: '/weapi/djradio/recommend/v1', // 精选电台
					newSongs: '/weapi/v1/discovery/new/songs', // 新歌
					newAlbum: '/weapi/album/new', // 新碟
				},
				playList: [], // 热门推荐列表
				recommendRadioList: [],
				dailyRecommendList: [], // 个性化推荐
			}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			audioContainerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			},
			audio () {
				return this.$store.state.audio
			}
		},
		async created () {
			this.md5sum = crypto.createHash('md5')
			// document.cookie = 'MUSIC_U=5ba1ca3e5e2233f8d5b3159b57295c9506fbb44bc725938b977487ab5c764266426bae1a8e6bf0ef71071f7314a90e537cd63890c10dc207f2f513a9c38b5dc7;'
			// document.cookie = '__remember_me=true; Expires=Mon, 05-Nov-2018 06:29:00 GMT;'
			// document.cookie = '__csrf=9340219ae6866e691521a71dbb8b2c93; Expires=Mon, 05-Nov-2018 06:29:10 GMT;'
			// this.$axios({
			// 	url: 'http://127.0.0.1:3000/nem/index/v1',
			// 	method: 'post',
			// 	data: {
			// 		baseURL: 'http://music.163.com',
			// 		url: '/api/v1/user/detail/107163072',
			// 		method: 'get',
			// 		// data: {
			// 		// 	userId: '107163072',
			// 		// 	csrf_token: ''
			// 		// }
			// 	}
			// })
			this.playList = await this.getPersonalizedPlayList()
			// this.recommendRadioList = await this.getRecommendRadio()
			this.dailyRecommendList = await this.getRecommendResource()
		},
		methods: {
			togglePlay () {
				if (!this.audio.playing) {
					this.$store.commit(types.PLAY_AUDIO, {
						current: 0
					})
				} else {
					this.$store.commit(types.PAUSE_AUDIO)
				}
			},
			getAudioProgress () {
				setTimeout(() => {
					if (!this.audio.ele.paused) {
						this.audioCurrentTime = this.audio.ele.currentTime.toFixed(1)
						this.getAudioProgress()
					}
				}, 100)
			},
			getUserDetail (userId) {
				return new Promise(async (resolve) => {
					let userDetailData = await this.$axios({
						url: this.nemApiUrl,
						method: 'post',
						data: {
							baseURL: this.nemApi.baseURL,
							url: this.nemApi.userDetail + '/' + userId,
							method: 'get'
						}
					})
					if (userDetailData.data.status === 200) {
						this.loginInfo = userDetailData.data.data
					}
					resolve(true)
				})
			},
			getPersonalizedNewSong () {
				return new Promise(async (resolve) => {
					let personalizedNewSongData = await this.$axios({
						url: this.nemApiUrl,
						method: 'post',
						data: {
							baseURL: this.nemApi.baseURL,
							url: this.nemApi.personalizedNewSong,
							method: 'post',
							data: {
								type: 'recommend'
							}
						}
					})
					console.log('getPersonalizedNewSong: ', personalizedNewSongData.data.data)
					resolve(personalizedNewSongData.data.data)
				})
			},
			getHotTags () {
				/**
				 * 歌单类型列表-热门类型
				 */
				return new Promise(async (resolve) => {
					let hotTagsData = await this.$axios({
						url: this.nemApiUrl,
						method: 'post',
						data: {
							baseURL: this.nemApi.baseURL,
							url: this.nemApi.hotTags,
							method: 'post'
						}
					})
					console.log('getHotTags: ', hotTagsData.data.data)
					resolve(hotTagsData.data.data)
				})
			},
			getPersonalizedPlayList () {
				/**
				 * 热门推荐
				 */
				return new Promise(async (resolve) => {
					let personalizedPlayListData = await this.$axios({
						url: this.nemApiUrl,
						method: 'post',
						data: {
							baseURL: this.nemApi.baseURL,
							url: this.nemApi.personalizedPlayList,
							method: 'post'
						}
					})
					console.log('personalizedPlayListData: ', personalizedPlayListData.data.data.result)
					resolve(personalizedPlayListData.data.data.result)
				})
			},
			getRecommendResource () {
				/**
				 * 热门推荐, 日推后的
				 */
				return new Promise(async (resolve) => {
					let recommendResourceData = await this.$axios({
						url: this.nemApiUrl,
						method: 'post',
						data: {
							baseURL: this.nemApi.baseURL,
							url: this.nemApi.recommendResource,
							method: 'post',
							data: {
								'offset': 0,
								'limit': 20,
								'total': 'True',
								"csrf_token": ""
							}
						}
					})
					console.log('recommendResourceData: ', recommendResourceData.data.data.recommend)
					resolve(recommendResourceData.data.data.recommend)
				})
			},
			getNewSongs () {
				/**
				 * 新歌
				 */
				return new Promise(async (resolve) => {
					let newSongsData = await this.$axios({
						url: this.nemApiUrl,
						method: 'post',
						data: {
							baseURL: this.nemApi.baseURL,
							url: this.nemApi.newSongs,
							method: 'post',
							data: {
								"csrf_token": ""
							}
						}
					})
					console.log('newSongsData: ', newSongsData.data.data)
					resolve(newSongsData.data.data)
				})
			},
			getNewAlbum () {
				/**
				 * 新碟
				 */
				return new Promise(async (resolve) => {
					let newAlbumData = await this.$axios({
						url: this.nemApiUrl,
						method: 'post',
						data: {
							baseURL: this.nemApi.baseURL,
							url: this.nemApi.newAlbum,
							method: 'post',
							data: {
								"csrf_token": ""
							}
						}
					})
					console.log('newAlbumData: ', newAlbumData.data.data)
					resolve(newAlbumData.data.data)
				})
			},
			getRecommendRadio () {
				/**
				 * 精选电台
				 */
				return new Promise(async (resolve) => {
					let recommendRadioData = await this.$axios({
						url: this.nemApiUrl,
						method: 'post',
						data: {
							baseURL: this.nemApi.baseURL,
							url: this.nemApi.recommendRadio,
							method: 'post',
							data: {
								type: 'recommend',
								"csrf_token": ""
							}
						}
					})
					console.log('recommendRadioData: ', recommendRadioData.data.data.djRadios)
					resolve(recommendRadioData.data.data.djRadios)
				})
			},
			getRecommendSongs () {
				/**
				 *	每日推荐
				 */
				return new Promise(async (resolve) => {
					let recommendSongsData = await this.$axios({
						url: this.nemApiUrl,
						method: 'post',
						data: {
							baseURL: this.nemApi.baseURL,
							url: this.nemApi.recommendSongs,
							method: 'post',
							data: {
								offset: 0,
								total: true,
								limit: 20,
								csrf_token: ''
							}
						}
					})
					resolve(recommendSongsData.data.data)
					console.log('>>>>getRecommendSongs>>>', recommendSongsData)
				})
			},
			async login () {
				this.isLogin = true
				this.md5sum.update(this.loginModal.password)
				let loginInfo = await this.$axios({
					url: 'http://127.0.0.1:3000/nem/index/v1',
					method: 'post',
					data: {
						baseURL: 'http://music.163.com',
						url: this.nemApi.login,
						method: 'post',
						data: {
							username: this.loginModal.username,
							password: this.md5sum.digest('hex'),
							rememberLogin: true
						}
					}
				})
				if (loginInfo.data.status === 200) {
					// 登录成功
					if (loginInfo.data.headers && loginInfo.data.headers['set-cookie']) {
						// 设置cookie
						loginInfo.data.headers['set-cookie'].forEach(item => {
							document.cookie = item.replace(/(domain=[^;]*;?\s?)/i, '').replace(/(path=[^;]*;?\s?)/i, '').replace(/httponly/i, '')
						})
					}
					await this.getUserDetail(loginInfo.data.data.account.id)
					setTimeout(() => {
						this.$Message.success('登录成功')
						this.loginModal.shown = false
					}, 800)
				}
				this.isLogin = false
			},
			logout () {
				this.loginInfo = {}
			},
			showLoginModal () {
				this.loginModal.shown = true
			}
		},
		filters: {
			getMusicName (src) {
				if (!src) {
					return '未播放'
				}
				return src.replace(/(.*)(\/([^\/\.])*)(\.(m4a)|(mp3))(.*)/, '$2').replace(/^\//, '')
			},
			getMusicSuffix (src) {
				if (!src) {
					return '未播放'
				}
				return src.replace(/(.*)(\.(m4a)|(mp3))(.*)/, '$2').replace(/^\./, '').toUpperCase()
			}
		},
		watch: {
			'audio.playing' (val) {
				if (val) {
					this.getAudioProgress()
				}
			}
		}
	}
</script>
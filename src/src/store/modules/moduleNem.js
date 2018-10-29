/*
 * 网易云音乐 模块
 */
import {
	StorageUtil
} from '../../utils/index'
import * as types from '../mutation-types'
import crypto from 'crypto'
const moduleNem = {
	namespaced: true,
	state: {
		md5sum: {},
		loginInfo: {}, // 用户登录信息
		// nemApiUrl: 'https://talkapi.dei2.com/nem/index/v1',
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
			musicDetail: '/weapi/v3/song/detail', // 单曲详情
			musicUrl: '/weapi/song/enhance/player/url', // 歌曲播放地址
			lyric: '/api/song/lyric', // 获取歌词
			albumDetail: '/weapi/v3/playlist/detail', // 专辑详情
			searchMusic: '/weapi/cloudsearch/get/web', // 搜索音乐
		},
		playList: [], // 热门推荐列表
		recommendRadioList: [],
		dailyRecommendList: [], // 个性化推荐
		recommendSongsList: [], // 每日推荐歌曲列表
	},
	actions: {
		async init({
			state,
			dispatch,
			rootState
		}) {
			state.loginInfo = await StorageUtil.getItem(rootState.localStorageKeys.nemMusic.loginInfo)
			if (state.loginInfo.userPoint) {
				dispatch('getRecommendResource')
			}
		},
		getUserDetail({
			state,
			commit,
			rootState
		}, data) {
			return new Promise(async (resolve) => {
				let userDetailData = await global.vue.$axios({
					url: state.nemApiUrl,
					method: 'post',
					data: {
						baseURL: state.nemApi.baseURL,
						url: state.nemApi.userDetail + '/' + data.userId,
						method: 'get'
					}
				})
				if (userDetailData.data.status === 200) {
					state.loginInfo = userDetailData.data.data
					commit(types.CACHE_NEM_LOGIN_INFO, {
						loginInfo: state.loginInfo
					}, {
						root: true
					})
					await StorageUtil.setItem(rootState.localStorageKeys.nemMusic.loginInfo, state.loginInfo)
				}
				resolve(true)
			})
		},
		login({
			state,
			dispatch
		}, data) {
			return new Promise(async (resolve, reject) => {
				state.md5sum = crypto.createHash('md5')
				state.md5sum.update(data.password)
				let loginInfo = await global.vue.$axios({
					url: state.nemApiUrl,
					method: 'post',
					data: {
						baseURL: state.nemApi.baseURL,
						url: state.nemApi.login,
						method: 'post',
						data: {
							username: data.username,
							password: state.md5sum.digest('hex'),
							rememberLogin: true
						}
					}
				})
				if (loginInfo.data.status === 200 && loginInfo.data.data.code === 200) {
					// 登录成功
					if (loginInfo.data.headers && loginInfo.data.headers['set-cookie']) {
						// 设置cookie
						loginInfo.data.headers['set-cookie'].forEach(item => {
							document.cookie = item.replace(/(domain=[^;]*;?\s?)/i, '').replace(/(path=[^;]*;?\s?)/i, '').replace(/httponly/i, '')
						})
					}
					let userDetail = dispatch('getUserDetail', {
						userId: loginInfo.data.data.account.id
					})
					let recommendResource = dispatch('getRecommendResource')
					Promise.all([userDetail, recommendResource]).then(() => {
						resolve(true)
					})
				} else {
					reject(new Error('登录失败，请稍后再试'))
				}
			})
		},
		logout({
			state,
			commit,
			rootState
		}) {
			state.loginInfo = {}
			commit(types.CACHE_NEM_LOGIN_INFO, {
				loginInfo: {}
			}, {
				root: true
			})
			StorageUtil.removeItem(rootState.localStorageKeys.nemMusic.loginInfo)
		},
		getPersonalizedPlayList({
			state
		}) {
			/**
			 * 热门推荐
			 */
			return new Promise(async (resolve) => {
				let personalizedPlayListData = await global.vue.$axios({
					url: state.nemApiUrl,
					method: 'post',
					data: {
						baseURL: state.nemApi.baseURL,
						url: state.nemApi.personalizedPlayList,
						method: 'post'
					}
				})
				if (personalizedPlayListData.data.data.code === 200) {
					state.playList = personalizedPlayListData.data.data.result
				}
				resolve(true)
			})
		},
		getRecommendResource({
			state
		}) {
			/**
			 * 热门推荐, 日推后的
			 */
			return new Promise(async (resolve) => {
				let recommendResourceData = await global.vue.$axios({
					url: state.nemApiUrl,
					method: 'post',
					data: {
						baseURL: state.nemApi.baseURL,
						url: state.nemApi.recommendResource,
						method: 'post',
						data: {
							'offset': 0,
							'limit': 20,
							'total': 'True',
							"csrf_token": ''
						}
					}
				})
				if (recommendResourceData.data.data.code === 200) {
					state.dailyRecommendList = recommendResourceData.data.data.recommend
				}
				resolve(true)
			})
		},
		getRecommendSongs({
			state
		}) {
			/**
			 *	每日推荐 歌曲列表
			 */
			return new Promise(async (resolve) => {
				let recommendSongsData = await global.vue.$axios({
					url: state.nemApiUrl,
					method: 'post',
					data: {
						baseURL: state.nemApi.baseURL,
						url: state.nemApi.recommendSongs,
						method: 'post',
						data: {
							offset: 0,
							total: true,
							limit: 20,
							csrf_token: ''
						}
					}
				})
				if (recommendSongsData.data.data.code === 200) {
					state.recommendSongsList = recommendSongsData.data.data.recommend
				}
				resolve(true)
			})
		},
		getMusicDetail({
			dispatch,
			state
		}, data) {
			/**
			 * 单曲详情
			 * @params:
			 * 	- id
			 */
			return new Promise(async (resolve, reject) => {
				let musicDetailData = await global.vue.$axios({
					url: state.nemApiUrl,
					method: 'post',
					data: {
						baseURL: state.nemApi.baseURL,
						url: state.nemApi.musicDetail,
						method: 'post',
						data: {
							id: data.id,
							c: JSON.stringify([{
								id: data.id
							}]),
							ids: '[' + data.id + ']',
							csrf_token: ''
						}
					}
				})
				if (musicDetailData.data.data.code === 200) {
					state.musicDetail = musicDetailData.data.data.songs
					let musicUrl = await dispatch('getMusicUrl', {
						id: state.musicDetail[0].id,
						br: state.musicDetail[0].h ? state.musicDetail[0].h.br : (state.musicDetail[0].m ? state.musicDetail[0].m.br : state.musicDetail[0].l.br)
					})
					resolve(musicUrl)
				} else {
					resolve([])
				}
			})
		},
		getMusicUrl({
			state
		}, data) {
			/**
			 * 获取歌曲url
			 * @params:
			 * 	- id
			 */
			return new Promise(async (resolve) => {
				let musicUrlData = await global.vue.$axios({
					url: state.nemApiUrl,
					method: 'post',
					data: {
						baseURL: state.nemApi.baseURL,
						url: state.nemApi.musicUrl,
						method: 'post',
						data: {
							ids: '[' + data.id + ']',
							br: data.br,
							csrf_token: ''
						}
					}
				})
				if (musicUrlData.data.data.code === 200) {
					resolve(musicUrlData.data.data.data)
				} else {
					resolve([])
				}
			})
		},
		getLyric({
			state
		}, data) {
			/**
			 * 获取歌词
			 * @params:
			 *  - id
			 */
			return new Promise(async (resolve) => {
				let lyricData = await global.vue.$axios({
					url: state.nemApiUrl,
					method: 'post',
					data: {
						baseURL: state.nemApi.baseURL,
						url: state.nemApi.lyric + '?os=osx&id=' + data.id + '&lv=-1&kv=-1&tv=-1',
						method: 'get'
					}
				})
				if (lyricData.data.data.code === 200) {
					resolve(lyricData.data.data)
				} else {
					resolve({})
				}
			})
		},
		getAlbumDetail({
			state
		}, data) {
			/**
			 * 获取专辑详情
			 * @params
			 *  - id
			 */
			return new Promise(async (resolve) => {
				let albumDetailData = await global.vue.$axios({
					url: state.nemApiUrl,
					method: 'post',
					data: {
						baseURL: state.nemApi.baseURL,
						url: state.nemApi.albumDetail,
						method: 'post',
						data: {
							id: data.id,
							offset: 0,
							total: false,
							n: 100,
							limit: 100,
							csrf_token: ''
						}
					}
				})
				if (albumDetailData.data.data.code === 200) {
					resolve(albumDetailData.data.data)
				} else {
					resolve({
						playlist: {},
						privileges: []
					})
				}
			})
		},
		searchMusic({
			state
		}, data) {
			/**
			 * 搜索音乐
			 */
			return new Promise(async (resolve) => {
				let searchMusicData = await global.vue.$axios({
					url: state.nemApiUrl,
					method: 'post',
					data: {
						baseURL: state.nemApi.baseURL,
						url: state.nemApi.searchMusic,
						method: 'post',
						data: {
							s: data.s,
							offset: data.offset || '0',
							limit: data.limit || 30,
							type: 1
						}
					}
				})
				if (searchMusicData.data.data.code === 200) {
					resolve(searchMusicData.data.data)
				} else {
					resolve([])
				}
			})
		}
	}
}

export default moduleNem
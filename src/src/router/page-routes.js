export default {
	path: '/',
	name: 'home',
	meta: {
		label: 'Home',
		title: 'Dei2 Tools'
	},
	components: {
		HomeRouter: () =>
			import ('../components/Home.vue')
	},
	children: [{
		path: '/index',
		name: 'index',
		meta: {
			title: '在线工具'
		},
		components: {
			ContentRouter: () =>
				import ('../components/pages/Index.vue')
		}
	}, {
		path: '/settings',
		name: 'settings',
		meta: {
			title: '设置'
		},
		components: {
			ContentRouter: () =>
				import ('../components/pages/Settings.vue')
		}
	}, {
		path: '/ajax',
		name: 'ajax',
		meta: {
			title: 'Ajax请求'
		},
		components: {
			ContentRouter: () =>
				import ('../components/pages/Ajax.vue')
		}
	}, {
		path: '/audio',
		name: 'audio',
		meta: {
			title: '音乐',
			needAudio: true
		},
		components: {
			ContentRouter: () =>
				import ('../components/pages/Audio.vue')
		}
	}, {
		path: '/audio/playlist',
		name: 'playlist',
		meta: {
			title: '歌单',
			needAudio: true
		},
		components: {
			ContentRouter: () =>
				import ('../components/pages/audio/pages/playlist.vue')
		}
	}, {
		path: '/audio/discover/recommend/taste',
		name: 'discover.recommend.taste',
		meta: {
			title: '每日推荐歌曲',
			needLogin: 'nem',
			needAudio: true
		},
		components: {
			ContentRouter: () =>
				import ('../components/pages/audio/pages/discover.recommend.taste.vue')
		}
	}, {
		path: '/audio/search/m',
		name: 'search.m',
		meta: {
			title: '搜索结果',
			needAudio: true
		},
		components: {
			ContentRouter: () =>
				import ('../components/pages/audio/pages/search.m.vue')
		}
	}, {
		path: '/lyric',
		name: 'lyric',
		meta: {
			title: '歌词'
		},
		components: {
			ContentRouter: () =>
				import ('../components/pages/audio/components/Lyric.vue')
		}
	}]
}
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
			title: '音乐'
		},
		components: {
			ContentRouter: () =>
				import ('../components/pages/Audio.vue')
		}
	}]
}
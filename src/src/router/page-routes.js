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
	}]
}
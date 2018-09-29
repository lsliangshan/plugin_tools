<template>
	<div class="scripts_container" :style="scriptsContainerStyles">
		scripts container
	</div>
</template>
<style scoped>
	.scripts_container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFF;
	}
</style>
<script>
	const Filer = require('filer.js')
	export default {
		name: 'scripts',
		data () {
			return {
				filer: null
			}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			scriptsContainerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			}
		},
		async created () {
			const that = this
			// await this.loadScript('/html/static/js/FileSaver.js')
			// setTimeout(() => {
			// 	let file = new File(['alert("Dynamic generation")'], '/html/static/js/scripts/main.js', {type: 'text/plain;charset=utf-8'})
			// 	saveAs(file)
			// })
			await this.initFiler()
			this.$nextTick(() => {
				// this.filer.ls('/', function (entries) {
				// 	console.log('entries: ', entries)
				// }, this.filerErrorCallback)
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					console.log('>>>>>tabs id>>>>>', tabs[0].id)
					chrome.tabs.sendRequest(tabs[0].id, {greeting: 'Hello'}, function (response) {
						console.log('........', response.farewell)
					})
				});
				// this.filer.cd('/', function (entries) {
				// 	that.filer.write('main.js', {
				// 		data: 'alert("data created by Filer")',
				// 		type: 'text/plain; charset=utf-8'
				// 	}, function (fileEntry, fileWriter) {
				// 		console.log('..... file entry: ', fileEntry)
				// 		console.log('>>>>> file writer: ', fileWriter)
				// 		that.filer.open('main.js', function (file) {
				// 			let reader = new FileReader()
				// 			reader.onload = function (e) {
				// 				console.log('file content: ', this.result)
				// 			}
				// 			reader.readAsText(file)
				// 		})
				// 	}, that.filerErrorCallback)
				// }, this.filerErrorCallback)
			})
		},
		methods: {
			initFiler () {
				return new Promise(resolve => {
					if (this.filer) {
						resolve(true)
					} else {
						this.filer = new Filer()
						this.filer.init({}, function (fs) {
							console.log('>>> init: ', fs)
							resolve(true)
						})
					}
				})
			},
			filerErrorCallback (e) {
				console.log('filer error callback: ', e.name || e.message)
			}
		}
	}
</script>
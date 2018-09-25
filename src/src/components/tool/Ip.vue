<template>
	<div class="ip_container" :style="ipContainerStyles">
		<div class="ip_inner">
			<iframe src="https://ip.cn/index.php?ip=36.57.129.84" frameborder="0" id="ip_iframe"></iframe>
		</div>
	</div>
</template>
<style scoped>
	.ip_container {
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ip_inner {
		width: 1000px;
		height: 100%;
		padding: 15px;
		box-sizing: border-box;
		border-radius: 4px;
		background-color: rgba(255, 255, 255, .9);
	}
</style>
<script>
	import jsonp from 'jsonp'
	export default {
		name: 'ip',
		data () {
			return {}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			ipContainerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			}
		},
		async created () {
			await this.loadScript('/html/static/pkg/jquery/dist/jquery.min.js')
		},
		mounted () {
			// jsonp('https://ip.cn/index.php?ip=36.57.129.84', {}, function (err, data) {
			// 	console.log('>>>>>>>>', data)
			// })
			setTimeout(() => {
				console.log('========', $(document.getElementById('ip_iframe').contentWindow.document.body).find('#result').text())
			}, 1000)
		}
	}
</script>
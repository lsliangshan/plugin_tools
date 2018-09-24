<template>
	<div class="color_container" :style="colorContainerStyles">
		<img src="../../../static/images/themes/mm2.jpg" style="width: 900px;" ref="target" alt="">
		<div class="color_results">
			<div class="color_result_item" :style="{backgroundColor: main}"></div>
			<div class="color_result_item" :style="{backgroundColor: sub}"></div>
			<div class="color_result_item" v-for="(item, index) in colors" :key="index" :style="{backgroundColor: item}"></div>
		</div>
	</div>
</template>
<style scoped>
	.color_container {
		width: 100%;
		overflow-y: auto;
		background-color: #FFFFFF;
	}
	.color_results {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
	}
	.color_result_item {
		width: 80px;
		height: 80px;
		margin: 8px;
	}
</style>
<script>
	import 'rgbaster.js'
	import '../../../static/js/color-thief.min.js'
	export default {
		name: 'color',
		data () {
			return {
				main: '',
				sub: '',
				colors: []
			}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			colorContainerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			}
		},
		mounted () {
			const that = this
			RGBaster.colors(this.$refs.target, {
				paletteSize: 30,
				// exclude: ['rgb(255,255,255)', 'rgb(0,0,0)'],
				success (preload) {
					that.main = preload.dominant
					that.sub = preload.secondary
					that.colors = preload.palette
				}
			})

			let colorThief = new ColorThief()
			let result = colorThief.getPalette(this.$refs.target, 8)
			console.log('>>>>>', result)
		}
	}
</script>
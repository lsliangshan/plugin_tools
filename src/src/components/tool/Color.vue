<template>
	<div class="color_container" :style="colorContainerStyles">
		Color
	</div>
</template>
<style scoped>
	.color_container {
		width: 100%;
	}
</style>
<script>
	export default {
		name: 'color',
		data () {
			return {}
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
		}
	}
</script>
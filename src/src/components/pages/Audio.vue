<template>
	<div class="audio_container" :style="audioContainerStyles">
		<div class="audio_inner"></div>
	</div>
</template>
<style scoepd>
	.audio_container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.audio_inner {
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, .9);
	}
</style>
<script>
	export default {
		name: 'audio',
		data () {
			return {}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			audioContainerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			}
		}
	}
</script>
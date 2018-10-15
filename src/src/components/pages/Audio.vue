<template>
	<div class="audio_container" :style="audioContainerStyles">
		<div class="audio_inner">
			<div>当前播放：<span>{{audio.list[audio.current] | getMusicName}}</span></div>
			<div>音乐格式：<span>{{audio.list[audio.current] | getMusicSuffix}}</span></div>
			<div>当前音量：<span>{{audio.volume * 100}}</span></div>
			<div>已经播放：{{audioCurrentTime}}s / {{audio.duration.toFixed(1)}}</div>
			<Button type="primary" @click="togglePlay">播放</Button>
		</div>
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
	import * as types from '../../store/mutation-types'
	export default {
		name: 'audio',
		data () {
			return {
				audioCurrentTime: 0
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
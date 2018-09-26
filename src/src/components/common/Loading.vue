<template>
	<transition name="loading-transition"
	enter-active-class="fadeIn animated"
	leave-active-class="fadeOut animated"
	>
		<div class="loading_container" v-if="shown" :style="loadingContainerStyles">
			<div class="loading_mask" :style="loadingMaskStyles" v-if="mask"></div>
			<div class="loading_content" :style="loadingContentStyles">
				<svg>
					<use :xlink:href="'#loading' + type"></use>
				</svg>
			</div>
		</div>
	</transition>	
</template>
<style scoped>
	.loading_container {
		position: absolute;
		left: 0;
		top: 0;
		transition: all .3s ease-in-out;
	}
	.loading_mask {
		position: absolute;
		left: 0;
		top: 0;
	}
	.loading_content {
		position: absolute;
		left:  0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.loading_content svg {
		max-width: 60px;
		max-height: 50px;
		fill: rgb(79, 192, 141);
	}
</style>
<script>
	export default {
		name: 'Loading',
		props: {
			mask: {
				type: Boolean,
				default: true
			},
			width: {
				type: [String, Number],
				default: '100%'
			},
			height: {
				type: [String, Number],
				default: '100%'
			},
			type: {
				type: [String, Number], // 1 - 8
				default: 1
			},
			name: {
				type: String
			}
		},
		data () {
			return {
				shown: false
			}
		},
		computed: {
			loadingContainerStyles () {
				return {
					width: this.getCustomSize(this.width),
					height: this.getCustomSize(this.height)
				}
			},
			loadingMaskStyles () {
				return {
					width: this.getCustomSize(this.width),
					height: this.getCustomSize(this.height),
					backgroundColor: this.mask ? 'rgba(0, 0, 0, 0.85)' : 'transparent'
				}
			},
			loadingContentStyles () {
				return {
					width: this.getCustomSize(this.width),
					height: this.getCustomSize(this.height)
				}
			}
		},
		created () {
			this.$nextTick(() => {
				this.$el.parentNode.style.position = 'relative'
				if (!this.$parent.hasOwnProperty('$Enkel')) {
					this.$parent.$Enkel = {}
				}
				if (!this.$parent.$Enkel.hasOwnProperty('Loading')) {
					this.$parent.$Enkel.Loading = {}
				}
				this.$parent.$Enkel.Loading[this.name] = {
					hide: this.hide,
					show: this.show
				}
			})
		},
		methods: {
			hide () {
				this.shown = false
			},
			show () {
				this.shown = true
			},
			getCustomSize (size) {
				let outSize = ''
				let _s = String(size)
				if (_s.indexOf('px') > 0 || _s.indexOf('%') > 0) {
					outSize = _s
				} else {
					outSize = _s + 'px'
				}
				return outSize
			}
		}
	}
</script>
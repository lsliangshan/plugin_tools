<template>
	<div class="ip_container">
		<div class="ip_inner" :style="ipInnerStyles">
			<div class="ip_result_card">
				<p class="my_ip">
					<span v-if="myIp">我的IP: {{myIp}}</span>
				</p>
				<div class="ip_result_card_top">
					<Input search enter-button="搜索" placeholder="请输入要查询的域名或ip" v-model="query" @on-search="doSearch" />
				</div>
				<div class="ip_result_card_bottom">
					<div class="ip_result_item">
						<span key="noIp" v-if="!query || !searched">您现在的IP: </span>
						<span key="hasIp" v-else>您查询的IP: </span>
						<span class="result_text">{{ip}}</span>
					</div>
					<div class="ip_result_item">
						<span>所在的地理位置: </span>
						<span class="result_text">{{address}}</span>
					</div>
					<div class="ip_result_item ip_result_item_2">
						<span>GeoIp: </span>
						<span style="margin-left: 5px;">{{geoIp}}</span>
					</div>
					<loading type="3" name="ipRef"></loading>
				</div>				
			</div>
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
		/*width: 1000px;*/
		height: 100%;
		padding: 15px;
		box-sizing: border-box;
		border-radius: 4px;
		/*background-color: rgba(255, 255, 255, .9);*/
		background-color: rgba(79, 192, 141, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color .3s ease-in-out;
	}
	.ip_result_card {
		width: 300px;
	}
	.my_ip {
		font-size: 15px;
		line-height: 2;
		height: 30px;
		color: #FFF;
		text-shadow: 0 0 1px #000;
	}
	.ip_result_card_top {
		width: 100%;
		height: 50px;

	}
	.ip_result_card_bottom {
		position: relative;
		width: 100%;
		background-color: #FFF;
		border-radius: 4px;
		padding: 15px;
		box-sizing: border-box;
	}
	.ip_result_item {
		width: 100%;
		height: 32px;
		margin-bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		color: #333;
	}
	.ip_result_item_2 {
		align-items: flex-start;
	}
	.result_text {
		min-width: 50px;
		min-height: 24px;
		padding: 2px 6px;
		color: #d14;
		border: 1px solid #e1e1e8;
		border-radius: 4px;
		margin-left: 8px;
		transition: all .3s ease-in-out;
	}
</style>
<script>
	const qs = require('querystring')
	export default {
		name: 'ip',
		components: {
			Loading: () => import('../common/Loading.vue')
		},
		data () {
			return {
				myIp: '',
				query: '',
				searched: false,
				ip: '',
				address: '',
				geoIp: '',
				isSearching: false,
				themeColor: 'rgba(255, 255, 255, .9)'
			}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			ipContainerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			},
			ipInnerStyles () {
				return {
					backgroundColor: this.themeColor
				}
			},
			themeImages () {
				return this.$store.state.themeImages
			},
			activeThemeIndex () {
				return this.$store.state.activeThemeIndex
			}
		},
		async created () {
			// await this.loadScript('/html/static/js/ls_encode.js')
			this.$nextTick(async () => {
				this.doSearch()
			})
		},
		async mounted () {
			if (this.activeThemeIndex[0] > -1 && this.activeThemeIndex[1] > -1) {
				let themeColor = await this.$getImageDominantColor(this.themeImages[this.activeThemeIndex[0]].sublist[this.activeThemeIndex[1]].img)
				this.themeColor = `rgba(${themeColor[0]}, ${themeColor[1]}, ${themeColor[2]}, .3)`
			}
		},
		methods: {
			getUserInfo () {
				const that = this				
				return new Promise((resolve, reject) => {
					if (that.isSearching) {
						reject(new Error('正在搜索中，请稍后'))
					} else {
						that.isSearching = true
						setTimeout(() => {
							this.$Enkel.Loading.ipRef.show()
						}, 100)
						this.$axios({
							url: 'https://talkapi.dei2.com/enkel/index/index',
							method: 'post',
							data: qs.stringify({
								ip: this.query
							})
						}).then(({data}) => {
							if (data.status === 200 && that.query) {
								that.searched = true
							}
							if (!that.searched) {
								that.myIp = data.data.ip || ''
							}
							that.ip = data.data.ip || ''
							that.address = data.data.address || ''
							that.geoIp = data.data.geoIp || ''
							setTimeout(() => {
								that.$Enkel.Loading.ipRef.hide()
								that.isSearching = false
							}, 800)
							resolve(data)
						})
					}
				})
			},
			async doSearch () {
				await this.getUserInfo().catch(err => {
					this.$Message.warning(err.message)
				})
			}
		}
	}
</script>
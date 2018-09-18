<template>
	<div class="tool_container" :style="toolContainerStyles">
		<div class="tool_inner">
			<div class="line">
				<div class="content">
					<span>当前时间戳（ms）: </span>
					<input class="inline_input colorImportant" :readonly="true" type="text" :value="currentTs"/>
				</div>
			</div>
			<div class="line line2">
				<div class="content content2">
					<span>时间戳（ms）: </span>
					<input class="inline_input" type="text" v-model="userTs"/>
					<Icon type="ios-arrow-forward" style="margin: 0 15px;" />
					<span class="inline_input w190">{{formatUserTs}}</span>
				</div>
			</div>
			<div class="line line2">
				<div class="content content2">
					<span>北京时间: </span>
					<input class="inline_input" type="text" v-model="userDate" placeholder="年/月/日 时:分:秒" />
					<Icon type="ios-arrow-forward" style="margin: 0 15px;" />
					<span class="inline_input w190">{{formatUserDate}}</span>
				</div>
			</div>
			<div class="line line2">
				<div class="content content2">
					<span>北京时间: </span>
					<input class="inline_input w50" type="text" v-model="userDate2[0]" /><span class="date_label">年</span>
					<input class="inline_input w50" type="text" v-model="userDate2[1]" /><span class="date_label">月</span>
					<input class="inline_input w50" type="text" v-model="userDate2[2]" /><span class="date_label">日</span>
					<input class="inline_input w50" type="text" v-model="userDate2[3]" /><span class="date_label">时</span>
					<input class="inline_input w50" type="text" v-model="userDate2[4]" /><span class="date_label">分</span>
					<input class="inline_input w50" type="text" v-model="userDate2[5]" /><span class="date_label">秒</span>

					<Icon type="ios-arrow-forward" style="margin: 0 15px;" />
					<span class="inline_input w190">{{formatUserDate2}}</span>
				</div>
			</div>
			<pre class="bottom_tips">采用Javascript所用的13位时间戳，unix时间戳请自行除以1000</pre>
		</div>		
	</div>
</template>
<style scoped>
	.w190 {
		width: 190px!important;
	}
	.w50 {
		width: 50px!important;
	}
	.date_label {
		/*margin: 0 2px!important;*/
	}
	.tool_container {
		width: 100%;
		/*background-color: #f8f8f8;*/
		padding: 15px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tool_inner {
		position: relative;
		width: 1000px;
		height: 100%;
		/*margin: 0 auto;*/
		background-color: rgba(255, 255, 255, .9);
		border: 1px solid #dcdee2;
		border-radius: 4px;
		overflow: hidden;
	}
	.line {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 30px 0;
	}
	.content {		
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.content span {
		font-size: 16px;
		line-height: 2;
		font-weight: bold;
		display: inline-block;
    	padding: 0 10px;    	
	}
	.content2 span {
		font-size: 14px;
	}
	.colorImportant {
		color: #ff4500;
	}
	.inline_input {
		display: inline-block;
		width: 150px;		
	    height: 32px;
	    line-height: 1.5;
	    padding: 4px 7px;
	    font-size: 14px;
	    border: 1px solid #dcdee2;
	    border-radius: 4px;
	    background-color: #fff;
	    background-image: none;
	    position: relative;
	    cursor: text;
	    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
	}
	.bottom_tips {
		position: absolute;
	    bottom: 0;
	    text-align: center;
	    width: 100%;
	    line-height: 30px;
	    color: #ccc;
	    pointer-events: none;
	    text-shadow: 0 0 1px #c8c8c8;
	}
</style>
<script>
	export default {
		name: 'time',
		data () {
			return {
				currentTs: parseInt((new Date()).getTime() / 1000) * 1000,
				userTs: (new Date()).getTime(), // 用户输入的时间戳
				userDate: '', // 用户输入的时间
				userDate2: ['2018','1','1','0','0','0'] // 用户输入的时间
			}
		},
		computed: {
			bodyStyles () {
		      return this.$store.state.bodyStyles
		    },
		    toolContainerStyles () {
		      return {
		        height: (this.bodyStyles.height - 65) + 'px'
		      }
		    },
		    formatUserTs () {
		    	if (!String(this.userTs).match(/^\d{13}$/i)) {
		    		return '时间戳格式不正确'
		    	}
		    	let _date = new Date(Number(this.userTs))
		    	let _y = _date.getFullYear()
		    	let _m = _date.getMonth() + 1
		    	_m = (_m < 10 ? ('0' + _m) : _m)
		    	let _d = _date.getDate()
		    	_d = (_d < 10 ? '0' + _d : _d)
		    	let _h = _date.getHours()
		    	_h = (_h < 10 ? '0' + _h : _h)
		    	let _mi = _date.getMinutes()
		    	_mi = (_mi < 10 ? '0' + _mi : _mi)
		    	let _s = _date.getSeconds()
		    	_s = (_s < 10 ? '0' + _s : _s)
		    	return _y + '/' + _m + '/' + _d + ' ' + _h + ':' + _mi + ':' + _s
		    },
		    formatUserDate () {
				let _tempD = ''
				try {
					_tempD = new Date(String(this.userDate))
				} catch (err) {
					return '时间格式不正确'
				}
				if (String(_tempD).indexOf('Invalid Date') > -1) {
					return '时间格式不正确'
				}
				return _tempD.getTime()
		    },
		    formatUserDate2 () {
		    	let _y = this.userDate2[0]
		    	let _m = this.userDate2[1] || '1'
		    	let _d = this.userDate2[2] || '1'
		    	let _h = this.userDate2[3] || '0'
		    	let _mi = this.userDate2[4] || '0'
		    	let _s = this.userDate2[5] || '0'
		    	return (new Date(_y + '/' + _m + '/' + _d + ' ' + _h + ':' + _mi + ':' + _s)).getTime()
		    }
		},
		methods: {
			startTs () {
				setInterval(() => {
					this.currentTs = parseInt((new Date()).getTime() / 1000) * 1000
				}, 1000)
			}
		},
		mounted () {
			this.startTs()
		}
	}
</script>

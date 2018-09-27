<template>
	<div class="crypto_container" :style="cryptoContainerStyles">
		<div class="crypto_inner">
			<Split v-model="split" min="100" mode="vertical">
		        <div slot="top" class="demo-split-pane">
		            <Input type="textarea" autofocus class="unformat_wrapper no_bg" v-model="originalText" :class="{'error_input': errorText}" placeholder="明文" @on-change="changeOriginalText" />
		        </div>
		        <div slot="trigger" class="trigger_container">
		        	<div class="tips_left">
		        		<RadioGroup v-model="currentCryptoType" @on-change="changeRadio">
		        			<Radio v-for="(item, index) in cryptoTypes.slice(0, Math.ceil(cryptoTypes.length / 2))" :key="item.value" :label="item.value">
							    <div class="multi_sublist" v-if="item.sublist && item.sublist.length > 0">
							    	<select class="custom_native_select" :data-parent-index="index" @change="changeCrypto" :value="item.active || currentCryptoType || item.sublist[0].value">
			        					<option v-for="(o, idx) in item.sublist" :value="o.value" :key="o.value">{{ o.value }}</option>
			        				</select>
			        				<span class="custom_native_select_placeholder" v-if="JSON.stringify(item.sublist).indexOf(currentCryptoType) < 0">{{item.active || item.value}}</span>
			        				<Icon type="ios-arrow-down" />
							    </div>
		        			</Radio>
		        		</RadioGroup>
		        		<Button type="primary" @click="encrypto">加密</Button>
		        	</div>
		          	<div class="trigger_wrapper">		          	
		            	<Icon type="ios-code" size="14" />		            
		          	</div>
		          	<div class="tips_right">
		          		<Button type="primary" @click="decrypto" :disabled="!currentCryptoType || (canBeDecrypto.indexOf(currentCryptoType) < 0)">解密</Button>
		          		<RadioGroup v-model="currentCryptoType" @on-change="changeRadio" style="margin-left: 8px;">
		        			<Radio v-for="(item, index) in cryptoTypes.slice(Math.ceil(cryptoTypes.length / 2), cryptoTypes.length)" :key="item.value" :label="item.value">
							    <div class="multi_sublist" v-if="item.sublist && item.sublist.length > 0">
							    	<select class="custom_native_select" :data-parent-index="index + Math.ceil(cryptoTypes.length / 2)" @change="changeCrypto" :value="item.active || currentCryptoType || item.sublist[0].value">
			        					<option v-for="(o, idx) in item.sublist" :value="o.value" :key="o.value">{{ o.value }}</option>
			        				</select>
			        				<span class="custom_native_select_placeholder" v-if="JSON.stringify(item.sublist).indexOf(currentCryptoType) < 0">{{item.active || item.value}}</span>
			        				<Icon type="ios-arrow-down" />
							    </div>
		        			</Radio>
		        		</RadioGroup>
		        		<Input class="private_key_input" type="text" v-if="withPrivateKey.indexOf(currentCryptoType) > -1" placeholder="加密密钥, 选填" v-model="privateKey" />
		          	</div>
		        </div>
		        <div slot="bottom" class="demo-split-pane">
		            <Input type="textarea" autofocus class="unformat_wrapper no_bg" v-model="cryptoText" placeholder="密文" />
		        </div>
		    </Split>
		</div>
	</div>
</template>
<style scoped>
	.crypto_container {
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.crypto_inner {
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, .9);
		border-radius: 4px;
		overflow-y: auto;
	}
	.demo-split-pane{
	    height: 100%;
	    padding: 15px;
	    box-sizing: border-box;
	}
	.unformat_wrapper {
		width: 100%;
		height: 100%;
		outline: none;
	}
	.trigger_container {
	    width: 100%;
	    height: 20px;
	    cursor: ns-resize;
	    margin-top: -10px;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
	.tips_left {
		width: calc(50% - 10px);
		height: 20px;
		padding: 0 15px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.tips_right {
		width: calc(50% - 10px);
		height: 20px;
		padding: 0 15px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.multi_sublist {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
	}
	.trigger_wrapper {
	    width: 20px;
	    height: 20px;
	    border-radius: 5px;
	    border: 1px solid #aaaaaa;
	    color: #aaaaaa;
	    overflow: hidden;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    transition: all .2s cubic-bezier(0.215, 0.61, 0.355, 1);
	    transform: scale(1) rotate(90deg);
	}
	.trigger_wrapper:hover, .trigger_wrapper:active {
	    transform: scale(1.2) rotate(90deg);
	}

	.custom_native_select {
		border: none;
		color: #515a6e;
		background-color: transparent;
		cursor: pointer;
	}
	.custom_native_select_placeholder {
		position: absolute;
		left: 0;
		top: 0;
		pointer-events: none;
	}
	.private_key_input {
		position: absolute;
		right: 15px;
		width: 150px;
	}
</style>
<script>
	/*
	 * CryptoJS 更多资料：https://github.com/brix/crypto-js/tree/develop/src
	 */
	var CryptoJS = require("crypto-js")
	export default {
		name: 'crypto',
		data () {
			return {
				split: 0.4,
				cryptoTypes: [
					{
						value: 'md5'
					},
					{
						value: 'sha1',
						sublist: [
							{
								value: 'sha1'
							},
							{
								value: 'sha3'
							},
							{
								value: 'sha224'
							},
							{
								value: 'sha256'
							},
							{
								value: 'sha384'
							},
							{
								value: 'sha512'
							}
						]
					},
					{
						value: 'ripemd160'
					},
					{
						value: 'pbkdf2'
					},
					{
						value: 'evpkdf'
					},
					{
						value: 'aes'
					},
					{
						value: 'tripledes'
					},
					{
						value: 'rc4'
					},
					{
						value: 'rabbit',
						sublist: [
							{
								value: 'rabbit'
							},
							{
								value: 'rabbit-legacy'
							}
						]
					}
				],
				canBeDecrypto: ['aes', 'tripledes', 'rc4', 'rabbit', 'rabbit-legacy'],
				withPrivateKey: ['aes', 'rc4', 'rabbit', 'rabbit-legacy', 'tripledes'],
				privateKey: '',
				currentCryptoType: 'md5',
				errorText: '',
				originalText: '', // 明文
				cryptoText: '', // 密文
				unencodedText: '', // 待加密的字符
				encodedText: '', // 已经加密的字符
				undecodedText: '', // 待解密的字符
				decodedText: '' // 已经解密的字符
			}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			cryptoContainerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			}
		},
		created () {
		},
		methods: {
			changeUnencodedText (e) {
				// 加密
				this.decodedText = ''
				this.unencodedText = e.target.value.trim()
				this.undecodedText = ''
				this.encodedText = this.encrypto()
			},
			changeUndecodedText (e) {
				// 解密
				this.encodedText = ''
				this.undecodedText = e.target.value.trim()
				this.unencodedText = ''
				this.decodedText = this.decrypto()
			},
			changeCrypto (e) {
				this.currentCryptoType = e.target.value
				this.cryptoTypes[Number(e.target.dataset.parentIndex)].value = this.currentCryptoType
				this.cryptoTypes[Number(e.target.dataset.parentIndex)].active = this.currentCryptoType
			},
			changeRadio (e) {
				// console.log('changeRadio', e)
			},
			changeOriginalText () {
				this.errorText = ''
			},
			encrypto () {
				if (this.originalText.trim() === '') {
					return
				}
				switch (this.currentCryptoType.toLowerCase()) {
					case 'md5':
						this.cryptoText = CryptoJS.MD5(this.originalText).toString()
						break
					case 'aes':
						this.cryptoText = CryptoJS.AES.encrypt(this.originalText, this.privateKey).toString()
						break
					case 'rc4':
						this.cryptoText = CryptoJS.RC4.encrypt(this.originalText, this.privateKey).toString()
						break
					case 'rabbit':
						this.cryptoText = CryptoJS.Rabbit.encrypt(this.originalText, this.privateKey).toString()
						break
					case 'rabbit-legacy':
						this.cryptoText = CryptoJS.RabbitLegacy.encrypt(this.originalText, this.privateKey).toString()
						break
					case 'sha1':
						this.cryptoText = CryptoJS.SHA1(this.originalText).toString()
						break
					case 'sha3':
						this.cryptoText = CryptoJS.SHA3(this.originalText).toString()
						break
					case 'sha224':
						this.cryptoText = CryptoJS.SHA224(this.originalText).toString()
						break
					case 'sha256':
						this.cryptoText = CryptoJS.SHA256(this.originalText).toString()
						break
					case 'sha384':
						this.cryptoText = CryptoJS.SHA384(this.originalText).toString()
						break
					case 'sha512':
						this.cryptoText = CryptoJS.SHA512(this.originalText).toString()
						break
					case 'ripemd160':
						this.cryptoText = CryptoJS.RIPEMD160(this.originalText).toString()
						break
					case 'pbkdf2':
						this.cryptoText = CryptoJS.PBKDF2(this.originalText).toString()
						break
					case 'tripledes':
						this.cryptoText = CryptoJS.TripleDES.encrypt(this.originalText, this.privateKey).toString()
						break
					case 'evpkdf':
						this.cryptoText = CryptoJS.EvpKDF(this.originalText).toString()
						break
					default:
						break
				}
			},
			dealWithResult () {
				let _map = {
					aes: 'AES',
					rc4: 'RC4',
					rabbit: 'Rabbit',
					'rabbit-legacy': 'RabbitLegacy',
					tripledes: 'TripleDES'
				}
				let type = this.currentCryptoType.toLowerCase()
				let defaultErrorText = `不是合法的${_map[type]}密文`
				let originalText = ''
				try {
					originalText = CryptoJS[_map[type]].decrypt(this.cryptoText, this.privateKey).toString(CryptoJS.enc.Utf8)
				} catch (err) {
					this.errorText = defaultErrorText
					this.originalText = defaultErrorText
				}
				if (originalText === '') {
					this.errorText = '解密失败'
					this.originalText = '解密失败'
				} else {
					this.errorText = ''
					this.originalText = originalText
				}
			},
			async decrypto () {
				if (this.cryptoText.trim() === '' || this.canBeDecrypto.indexOf(this.currentCryptoType.toLowerCase()) < 0) {
					return
				}
				this.dealWithResult()
			}
		}
	}
</script>
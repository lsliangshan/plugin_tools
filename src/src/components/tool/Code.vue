<template>
	<div class="html_code_container" :style="htmlCodeContainerStyles">
		<div class="html_code_inner">
			<div class="html_code_scroller_header">
				<Input type="text" v-model="filterKey" class="filter_input" placeholder="搜索" :clearable="true"/>
			</div>
			<div class="html_code_scroller">
				<Row class="sticky_row">
					<Col :span="8">
						<Row>
							<Col :span="8" class="tac cell_item">特殊符号</Col>
							<Col :span="8" class="tac cell_item">全名实体</Col>
							<Col :span="8" class="tac cell_item">十进制编码</Col>
						</Row>
					</Col>
					<Col :span="8">
						<Row>
							<Col :span="8" class="tac cell_item">特殊符号</Col>
							<Col :span="8" class="tac cell_item">全名实体</Col>
							<Col :span="8" class="tac cell_item">十进制编码</Col>
						</Row>
					</Col>
					<Col :span="8">
						<Row>
							<Col :span="8" class="tac cell_item">特殊符号</Col>
							<Col :span="8" class="tac cell_item">全名实体</Col>
							<Col :span="8" class="tac cell_item">十进制编码</Col>
						</Row>
					</Col>
				</Row>
				<!-- <Row v-for="(item, index) in Math.ceil(chars.length / 3)" :key="index">
					<Col :span="8" v-for="(itm, idx) in chars.slice(index * 3, index * 3 + 3)" :key="idx">
						<Row v-if="itm.entity.indexOf(filterKey) > -1">
							<Col :span="8" class="tac cell_item cell_item_first" v-html="itm.label"></Col>
							<Col :span="8" class="tac cell_item">{{itm.entity}}</Col>
							<Col :span="8" class="tac cell_item">{{itm.code}}</Col>
						</Row>
					</Col>
				</Row> -->
				<Row>
					<Col :span="8" v-for="(item, index) in chars" :key="index" v-if="(item.entity.indexOf(filterKey) > -1) || (item.code.indexOf(filterKey) > -1) || (item.label.indexOf(filterKey) > -1)">
						<Row>
							<Col :span="8" class="tac cell_item cell_item_first" v-html="item.label"></Col>
							<Col :span="8" class="tac cell_item">{{item.entity}}</Col>
							<Col :span="8" class="tac cell_item">{{item.code}}</Col>
						</Row>
					</Col>
				</Row>
				<div class="blank_row" v-if="chars.length < 1">
					暂无搜索结果
				</div>
			</div>			
		</div>
	</div>
</template>
<style scoped>
	.tac {
		text-align: center;
	}
	.html_code_container {
		width: calc(100% - 30px);
		padding: 15px 0;
		box-sizing: border-box;
		overflow: auto;
		margin: 0 auto;
	}
	.html_code_inner {
		position: relative;
		width: 900px;
		height: 100%;
		border-radius: 4px;
		background-color: rgba(255, 255, 255, .9);		
		margin: 0 auto;
		overflow: hidden;
	}
	.html_code_scroller {
		position: absolute;
		top: 50px;
		left: 10px;
		width: calc(100% - 20px);
		height: calc(100% - 60px);	
		overflow: auto;
		border-left: 1px solid #c8c8c8;
		border-top: 1px solid #c8c8c8;
	}
	.html_code_scroller_header {
		position: absolute;
		width: 100%;
		height: 40px;
		left: 0;
		top: 0;
		padding: 0 10px;
		box-sizing: border-box;
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
	}
	.cell_item {
		border-right: 1px solid #c8c8c8;
		border-bottom: 1px solid #c8c8c8;
		box-sizing: border-box;
		font-size: 15px;
		line-height: 2;
		min-height: 31px;
	}
	.cell_item_first {
		background-color: rgba(79, 192, 141, .2);
	}
	.sticky_row {
		position: sticky;
		left: 0;
		top: 0;
		z-index: 1;
		background-color: rgba(255, 255, 255, .9);
	}
	.blank_row {
		width: 100%;
		height: calc(100% - 31px);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #555;
		text-shadow: 0 0 1px #fff;
		border-right: 1px solid #c8c8c8;
		border-bottom: 1px solid #c8c8c8;
		-webkit-user-select: none;
	}
	.filter_input {
		width: 300px;		
	}
</style>
<script>
	export default {
		name: 'code',
		data () {
			return {
				filterKey: '',
				chars: [
					{
						label: 'Α',
						entity: '&Alpha;',
						code: '&#913;'
					},
					{
						label: 'Β',
						entity: '&Beta;',
						code: '&#914;'
					},
					{
						label: 'Γ',
						entity: '&Gamma;',
						code: '&#915;'
					},
					{
						label: 'Δ',
						entity: '&Delta;',
						code: '&#916;'
					},
					{
						label: 'Ε',
						entity: '&Epsilon;',
						code: '&#917;'
					},
					{
						label: 'Ζ',
						entity: '&Zeta;',
						code: '&#918;'
					},
					{
						label: 'Η',
						entity: '&Eta;',
						code: '&#919;'
					},
					{
						label: 'Θ',
						entity: '&Theta;',
						code: '&#920;'
					},
					{
						label: 'Ι',
						entity: '&Iota;',
						code: '&#921;'
					},
					{
						label: 'Κ',
						entity: '&Kappa;',
						code: '&#922;'
					},
					{
						label: 'Λ',
						entity: '&Lambda;',
						code: '&#923;'
					},
					{
						label: 'Μ',
						entity: '&Mu;',
						code: '&#924;'
					},
					{
						label: 'Ν',
						entity: '&Nu;',
						code: '&#925;'
					},
					{
						label: 'Ξ',
						entity: '&Xi;',
						code: '&#926;'
					},
					{
						label: 'Ο',
						entity: '&Omicron;',
						code: '&#927;'
					},
					{
						label: 'Π',
						entity: '&Pi;',
						code: '&#928;'
					},
					{
						label: 'Ρ',
						entity: '&Rho;',
						code: '&#929;'
					},
					{
						label: 'Σ',
						entity: '&Sigma;',
						code: '&#931;'
					},
					{
						label: 'Τ',
						entity: '&Tau;',
						code: '&#932;'
					},
					{
						label: 'Υ',
						entity: '&Upsilon;',
						code: '&#933;'
					},
					{
						label: 'Φ',
						entity: '&Phi;',
						code: '&#934;'
					},
					{
						label: 'Χ',
						entity: '&Chi;',
						code: '&#935;'
					},
					{
						label: 'Ψ',
						entity: '&Psi;',
						code: '&#936;'
					},
					{
						label: 'Ω',
						entity: '&Omega;',
						code: '&#937;'
					},
					{
						label: 'α',
						entity: '&alpha;',
						code: '&#945;'
					},
					{
						label: 'β',
						entity: '&beta;',
						code: '&#946;'
					},
					{
						label: 'γ',
						entity: '&gamma;',
						code: '&#947;'
					},
					{
						label: 'δ',
						entity: '&delta;',
						code: '&#948;'
					},
					{
						label: 'ε',
						entity: '&epsilon;',
						code: '&#949;'
					},
					{
						label: 'ζ',
						entity: '&zeta;',
						code: '&#950;'
					},
					{
						label: 'η',
						entity: '&eta;',
						code: '&#951;'
					},
					{
						label: 'θ',
						entity: '&theta;',
						code: '&#952;'
					},
					{
						label: 'ι',
						entity: '&iota;',
						code: '&#953;'
					},
					{
						label: 'κ',
						entity: '&kappa;',
						code: '&#954;'
					},
					{
						label: 'λ',
						entity: '&lambda;',
						code: '&#955;'
					},
					{
						label: 'μ',
						entity: '&mu;',
						code: '&#956;'
					},
					{
						label: 'ν',
						entity: '&nu;',
						code: '&#957;'
					},
					{
						label: 'ξ',
						entity: '&xi;',
						code: '&#958;'
					},
					{
						label: 'ο',
						entity: '&omicron;',
						code: '&#959;'
					},
					{
						label: 'π',
						entity: '&pi;',
						code: '&#960;'
					},
					{
						label: 'ρ',
						entity: '&rho;',
						code: '&#961;'
					},
					{
						label: 'ς',
						entity: '&sigmaf;',
						code: '&#962;'
					},
					{
						label: 'σ',
						entity: '&sigma;',
						code: '&#963;'
					},
					{
						label: 'τ',
						entity: '&tau;',
						code: '&#964;'
					},
					{
						label: 'υ',
						entity: '&upsilon;',
						code: '&#965;'
					},
					{
						label: 'φ',
						entity: '&phi;',
						code: '&#966;'
					},
					{
						label: 'χ',
						entity: '&chi;',
						code: '&#967;'
					},
					{
						label: 'ψ',
						entity: '&psi;',
						code: '&#968;'
					},
					{
						label: 'ω',
						entity: '&omega;',
						code: '&#969;'
					},
					{
						label: 'ϑ',
						entity: '&thetasym;',
						code: '&#977;'
					},
					{
						label: 'ϒ',
						entity: '&upsih;',
						code: '&#978;'
					},
					{
						label: 'ϖ',
						entity: '&piv;',
						code: '&#982;'
					},
					{
						label: '•',
						entity: '&bull;',
						code: '&#8226;'
					},
					{
						label: '…',
						entity: '&hellip;',
						code: '&#8230;'
					},
					{
						label: '′',
						entity: '&prime;',
						code: '&#8242;'
					},
					{
						label: '″',
						entity: '&Prime;',
						code: '&#8243;'
					},
					{
						label: '‾',
						entity: '&oline;',
						code: '&#8254;'
					},
					{
						label: '⁄',
						entity: '&frasl;',
						code: '&#8260;'
					},
					{
						label: '℘',
						entity: '&weierp;',
						code: '&#8472;'
					},
					{
						label: 'ℑ',
						entity: '&image;',
						code: '&#8465;'
					},
					{
						label: 'ℜ',
						entity: '&real;',
						code: '&#8476;'
					},
					{
						label: '™',
						entity: '&trade;',
						code: '&#8482;'
					},
					{
						label: 'ℵ',
						entity: '&alefsym;',
						code: '&#8501;'
					},
					{
						label: '←',
						entity: '&larr;',
						code: '&#8592;'
					},
					{
						label: '↑',
						entity: '&uarr;',
						code: '&#8593;'
					},
					{
						label: '→',
						entity: '&rarr;',
						code: '&#8594;'
					},
					{
						label: '↓',
						entity: '&darr;',
						code: '&#8595;'
					},
					{
						label: '↔',
						entity: '&harr;',
						code: '&#8596;'
					},
					{
						label: '↵',
						entity: '&crarr;',
						code: '&#8629;'
					},
					{
						label: '⇐',
						entity: '&lArr;',
						code: '&#8656;'
					},
					{
						label: '⇑',
						entity: '&uArr;',
						code: '&#8657;'
					},
					{
						label: '⇒',
						entity: '&rArr;',
						code: '&#8658;'
					},
					{
						label: '⇓',
						entity: '&dArr;',
						code: '&#8659;'
					},
					{
						label: '⇔',
						entity: '&hArr;',
						code: '&#8660;'
					},
					{
						label: '∀',
						entity: '&forall;',
						code: '&#8704;'
					},
					{
						label: '∂',
						entity: '&part;',
						code: '&#8706;'
					},
					{
						label: '∃',
						entity: '&exist;',
						code: '&#8707;'
					},
					{
						label: '∅',
						entity: '&empty;',
						code: '&#8709;'
					},
					{
						label: '∇',
						entity: '&nabla;',
						code: '&#8711;'
					},
					{
						label: '∈',
						entity: '&isin;',
						code: '&#8712;'
					},
					{
						label: '∉',
						entity: '&notin;',
						code: '&#8713;'
					},
					{
						label: '∋',
						entity: '&ni;',
						code: '&#8715;'
					},
					{
						label: '∏',
						entity: '&prod;',
						code: '&#8719;'
					},
					{
						label: '∑',
						entity: '&sum;',
						code: '&#8722;'
					},
					{
						label: '−',
						entity: '&minus;',
						code: '&#8722;'
					},
					{
						label: '∗',
						entity: '&lowast;',
						code: '&#8727;'
					},
					{
						label: '√',
						entity: '&radic;',
						code: '&#8730;'
					},
					{
						label: '∝',
						entity: '&prop;',
						code: '&#8733;'
					},
					{
						label: '∞',
						entity: '&infin;',
						code: '&#8734;'
					},
					{
						label: '∠',
						entity: '&ang;',
						code: '&#8736;'
					},
					{
						label: '∧',
						entity: '&and;',
						code: '&#8869;'
					},
					{
						label: '∨',
						entity: '&or;',
						code: '&#8870;'
					},
					{
						label: '∩',
						entity: '&cap;',
						code: '&#8745;'
					},
					{
						label: '∪',
						entity: '&cup;',
						code: '&#8746;'
					},
					{
						label: '∫',
						entity: '&int;',
						code: '&#8747;'
					},
					{
						label: '∴',
						entity: '&there4;',
						code: '&#8756;'
					},
					{
						label: '∼',
						entity: '&sim;',
						code: '&#8764;'
					},
					{
						label: '≅',
						entity: '&cong;',
						code: '&#8773;'
					},
					{
						label: '≈',
						entity: '&asymp;',
						code: '&#8773;'
					},
					{
						label: '≠',
						entity: '&ne;',
						code: '&#8800;'
					},
					{
						label: '≡',
						entity: '&equiv;',
						code: '&#8801;'
					},
					{
						label: '≤',
						entity: '&le;',
						code: '&#8804;'
					},
					{
						label: '≥',
						entity: '&ge;',
						code: '&#8805;'
					},
					{
						label: '⊂',
						entity: '&sub;',
						code: '&#8834;'
					},
					{
						label: '⊃',
						entity: '&sup;',
						code: '&#8835;'
					},
					{
						label: '⊄',
						entity: '&nsub;',
						code: '&#8836;'
					},
					{
						label: '⊆',
						entity: '&sube;',
						code: '&#8838;'
					},
					{
						label: '⊇',
						entity: '&supe;',
						code: '&#8839;'
					},
					{
						label: '⊕',
						entity: '&oplus;',
						code: '&#8853;'
					},
					{
						label: '⊗',
						entity: '&otimes;',
						code: '&#8855;'
					},
					{
						label: '⊥',
						entity: '&perp;',
						code: '&#8869;'
					},
					{
						label: '⋅',
						entity: '&sdot;',
						code: '&#8901;'
					},
					{
						label: '⌈',
						entity: '&lceil;',
						code: '&#8968;'
					},
					{
						label: '⌉',
						entity: '&rceil;',
						code: '&#8969;'
					},
					{
						label: '⌊',
						entity: '&lfloor;',
						code: '&#8970;'
					},
					{
						label: '⌋',
						entity: '&rfloor;',
						code: '&#8971;'
					},
					{
						label: '◊',
						entity: '&loz;',
						code: '&#9674;'
					},
					{
						label: '♠',
						entity: '&spades;',
						code: '&#9824;'
					},
					{
						label: '♣',
						entity: '&clubs;',
						code: '&#9827;'
					},
					{
						label: '♥',
						entity: '&hearts;',
						code: '&#9829;'
					},
					{
						label: '♦',
						entity: '&diams;',
						code: '&#9830;'
					},
					{
						label: ' ',
						entity: '&nbsp;',
						code: '&#160;'
					},
					{
						label: '¡',
						entity: '&iexcl;',
						code: '&#161;'
					},
					{
						label: '¢',
						entity: '&cent;',
						code: '&#162;'
					},
					{
						label: '£',
						entity: '&pound;',
						code: '&#163;'
					},
					{
						label: '¤',
						entity: '&curren;',
						code: '&#164;'
					},
					{
						label: '¥',
						entity: '&yen;',
						code: '&#165;'
					},
					{
						label: '¦',
						entity: '&brvbar;',
						code: '&#166;'
					},
					{
						label: '§',
						entity: '&sect;',
						code: '&#167;'
					},
					{
						label: '¨',
						entity: '&uml;',
						code: '&#168;'
					},
					{
						label: '©',
						entity: '&copy;',
						code: '&#169;'
					},
					{
						label: 'ª',
						entity: '&ordf;',
						code: '&#170;'
					},
					{
						label: '«',
						entity: '&laquo;',
						code: '&#171;'
					},
					{
						label: '¬',
						entity: '&not;',
						code: '&#172;'
					},
					{
						label: '&shy;',
						entity: '&shy;',
						code: '	&#173;'
					},
					{
						label: '®',
						entity: '&reg;',
						code: '&#174;'
					},
					{
						label: '¯',
						entity: '&macr;',
						code: '&#175;'
					},
					{
						label: '°',
						entity: '&deg;',
						code: '&#176;'
					},
					{
						label: '±',
						entity: '&plusmn;',
						code: '&#177;'
					},
					{
						label: '²',
						entity: '&sup2;',
						code: '&#178;'
					},
					{
						label: '³',
						entity: '&sup3;',
						code: '&#179;'
					},
					{
						label: '´',
						entity: '&acute;',
						code: '&#180;'
					},
					{
						label: 'µ',
						entity: '&micro;',
						code: '&#181'
					},
					{
						label: '"',
						entity: '&quot;',
						code: '	&#34;'
					},
					{
						label: '<',
						entity: '&lt;',
						code: '&#60;'
					},
					{
						label: '>',
						entity: '&gt;',
						code: '&#62;'
					},
					{
						label: "'",
						entity: '',
						code: '&#39;'
					}
				]
			}
		},
		computed: {
			bodyStyles () {
				return this.$store.state.bodyStyles
			},
			htmlCodeContainerStyles () {
				return {
					height: (this.bodyStyles.height - 65) + 'px'
				}
			}
		}
	}
</script>
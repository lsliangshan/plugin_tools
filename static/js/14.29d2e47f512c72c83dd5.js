webpackJsonp([14],{MsCo:function(t,e,s){(function(t,n){var r;/*! https://mths.be/punycode v1.4.1 by @mathias */!function(o){"object"==typeof e&&e&&e.nodeType,"object"==typeof t&&t&&t.nodeType;var a="object"==typeof n&&n;a.global!==a&&a.window!==a&&a.self;var h,i=2147483647,l=36,c=1,u=26,p=38,f=700,m=72,v=128,d="-",g=/^xn--/,y=/[^\x20-\x7E]/,x=/[\x2E\u3002\uFF0E\uFF61]/g,b={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},C=l-c,j=Math.floor,O=String.fromCharCode;function w(t){throw new RangeError(b[t])}function _(t,e){for(var s=t.length,n=[];s--;)n[s]=e(t[s]);return n}function q(t,e){var s=t.split("@"),n="";return s.length>1&&(n=s[0]+"@",t=s[1]),n+_((t=t.replace(x,".")).split("."),e).join(".")}function T(t){for(var e,s,n=[],r=0,o=t.length;r<o;)(e=t.charCodeAt(r++))>=55296&&e<=56319&&r<o?56320==(64512&(s=t.charCodeAt(r++)))?n.push(((1023&e)<<10)+(1023&s)+65536):(n.push(e),r--):n.push(e);return n}function k(t){return _(t,function(t){var e="";return t>65535&&(e+=O((t-=65536)>>>10&1023|55296),t=56320|1023&t),e+=O(t)}).join("")}function A(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function I(t,e,s){var n=0;for(t=s?j(t/f):t>>1,t+=j(t/e);t>C*u>>1;n+=l)t=j(t/C);return j(n+(C+1)*t/(t+p))}function S(t){var e,s,n,r,o,a,h,p,f,g,y,x=[],b=t.length,C=0,O=v,_=m;for((s=t.lastIndexOf(d))<0&&(s=0),n=0;n<s;++n)t.charCodeAt(n)>=128&&w("not-basic"),x.push(t.charCodeAt(n));for(r=s>0?s+1:0;r<b;){for(o=C,a=1,h=l;r>=b&&w("invalid-input"),((p=(y=t.charCodeAt(r++))-48<10?y-22:y-65<26?y-65:y-97<26?y-97:l)>=l||p>j((i-C)/a))&&w("overflow"),C+=p*a,!(p<(f=h<=_?c:h>=_+u?u:h-_));h+=l)a>j(i/(g=l-f))&&w("overflow"),a*=g;_=I(C-o,e=x.length+1,0==o),j(C/e)>i-O&&w("overflow"),O+=j(C/e),C%=e,x.splice(C++,0,O)}return k(x)}function U(t){var e,s,n,r,o,a,h,p,f,g,y,x,b,C,_,q=[];for(x=(t=T(t)).length,e=v,s=0,o=m,a=0;a<x;++a)(y=t[a])<128&&q.push(O(y));for(n=r=q.length,r&&q.push(d);n<x;){for(h=i,a=0;a<x;++a)(y=t[a])>=e&&y<h&&(h=y);for(h-e>j((i-s)/(b=n+1))&&w("overflow"),s+=(h-e)*b,e=h,a=0;a<x;++a)if((y=t[a])<e&&++s>i&&w("overflow"),y==e){for(p=s,f=l;!(p<(g=f<=o?c:f>=o+u?u:f-o));f+=l)_=p-g,C=l-g,q.push(O(A(g+_%C,0))),p=j(_/C);q.push(O(A(p,0))),o=I(s,b,n==r),s=0,++n}++s,++e}return q.join("")}h={version:"1.4.1",ucs2:{decode:T,encode:k},decode:S,encode:U,toASCII:function(t){return q(t,function(t){return y.test(t)?"xn--"+U(t):t})},toUnicode:function(t){return q(t,function(t){return g.test(t)?S(t.slice(4).toLowerCase()):t})}},void 0===(r=function(){return h}.call(e,s,e,t))||(t.exports=r)}()}).call(e,s("3IRH")(t),s("DuR2"))},UZ5h:function(t,e,s){"use strict";var n=s("MsCo"),r=s("qOJP");function o(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}e.parse=x,e.resolve=function(t,e){return x(t,!1,!0).resolve(e)},e.resolveObject=function(t,e){return t?x(t,!1,!0).resolveObject(e):e},e.format=function(t){r.isString(t)&&(t=x(t));return t instanceof o?t.format():o.prototype.format.call(t)},e.Url=o;var a=/^([a-z0-9.+-]+:)/i,h=/:[0-9]*$/,i=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,l=["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","\t"]),c=["'"].concat(l),u=["%","/","?",";","#"].concat(c),p=["/","?","#"],f=/^[+a-z0-9A-Z_-]{0,63}$/,m=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,v={javascript:!0,"javascript:":!0},d={javascript:!0,"javascript:":!0},g={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},y=s("1nuA");function x(t,e,s){if(t&&r.isObject(t)&&t instanceof o)return t;var n=new o;return n.parse(t,e,s),n}o.prototype.parse=function(t,e,s){if(!r.isString(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var o=t.indexOf("?"),h=-1!==o&&o<t.indexOf("#")?"?":"#",l=t.split(h);l[0]=l[0].replace(/\\/g,"/");var x=t=l.join(h);if(x=x.trim(),!s&&1===t.split("#").length){var b=i.exec(x);if(b)return this.path=x,this.href=x,this.pathname=b[1],b[2]?(this.search=b[2],this.query=e?y.parse(this.search.substr(1)):this.search.substr(1)):e&&(this.search="",this.query={}),this}var C=a.exec(x);if(C){var j=(C=C[0]).toLowerCase();this.protocol=j,x=x.substr(C.length)}if(s||C||x.match(/^\/\/[^@\/]+@[^@\/]+/)){var O="//"===x.substr(0,2);!O||C&&d[C]||(x=x.substr(2),this.slashes=!0)}if(!d[C]&&(O||C&&!g[C])){for(var w,_,q=-1,T=0;T<p.length;T++){-1!==(k=x.indexOf(p[T]))&&(-1===q||k<q)&&(q=k)}-1!==(_=-1===q?x.lastIndexOf("@"):x.lastIndexOf("@",q))&&(w=x.slice(0,_),x=x.slice(_+1),this.auth=decodeURIComponent(w)),q=-1;for(T=0;T<u.length;T++){var k;-1!==(k=x.indexOf(u[T]))&&(-1===q||k<q)&&(q=k)}-1===q&&(q=x.length),this.host=x.slice(0,q),x=x.slice(q),this.parseHost(),this.hostname=this.hostname||"";var A="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!A)for(var I=this.hostname.split(/\./),S=(T=0,I.length);T<S;T++){var U=I[T];if(U&&!U.match(f)){for(var R="",N=0,P=U.length;N<P;N++)U.charCodeAt(N)>127?R+="x":R+=U[N];if(!R.match(f)){var $=I.slice(0,T),E=I.slice(T+1),F=U.match(m);F&&($.push(F[1]),E.unshift(F[2])),E.length&&(x="/"+E.join(".")+x),this.hostname=$.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),A||(this.hostname=n.toASCII(this.hostname));var L=this.port?":"+this.port:"",M=this.hostname||"";this.host=M+L,this.href+=this.host,A&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==x[0]&&(x="/"+x))}if(!v[j])for(T=0,S=c.length;T<S;T++){var z=c[T];if(-1!==x.indexOf(z)){var B=encodeURIComponent(z);B===z&&(B=escape(z)),x=x.split(z).join(B)}}var H=x.indexOf("#");-1!==H&&(this.hash=x.substr(H),x=x.slice(0,H));var Z=x.indexOf("?");if(-1!==Z?(this.search=x.substr(Z),this.query=x.substr(Z+1),e&&(this.query=y.parse(this.query)),x=x.slice(0,Z)):e&&(this.search="",this.query={}),x&&(this.pathname=x),g[j]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){L=this.pathname||"";var J=this.search||"";this.path=L+J}return this.href=this.format(),this},o.prototype.format=function(){var t=this.auth||"";t&&(t=(t=encodeURIComponent(t)).replace(/%3A/i,":"),t+="@");var e=this.protocol||"",s=this.pathname||"",n=this.hash||"",o=!1,a="";this.host?o=t+this.host:this.hostname&&(o=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(o+=":"+this.port)),this.query&&r.isObject(this.query)&&Object.keys(this.query).length&&(a=y.stringify(this.query));var h=this.search||a&&"?"+a||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||g[e])&&!1!==o?(o="//"+(o||""),s&&"/"!==s.charAt(0)&&(s="/"+s)):o||(o=""),n&&"#"!==n.charAt(0)&&(n="#"+n),h&&"?"!==h.charAt(0)&&(h="?"+h),e+o+(s=s.replace(/[?#]/g,function(t){return encodeURIComponent(t)}))+(h=h.replace("#","%23"))+n},o.prototype.resolve=function(t){return this.resolveObject(x(t,!1,!0)).format()},o.prototype.resolveObject=function(t){if(r.isString(t)){var e=new o;e.parse(t,!1,!0),t=e}for(var s=new o,n=Object.keys(this),a=0;a<n.length;a++){var h=n[a];s[h]=this[h]}if(s.hash=t.hash,""===t.href)return s.href=s.format(),s;if(t.slashes&&!t.protocol){for(var i=Object.keys(t),l=0;l<i.length;l++){var c=i[l];"protocol"!==c&&(s[c]=t[c])}return g[s.protocol]&&s.hostname&&!s.pathname&&(s.path=s.pathname="/"),s.href=s.format(),s}if(t.protocol&&t.protocol!==s.protocol){if(!g[t.protocol]){for(var u=Object.keys(t),p=0;p<u.length;p++){var f=u[p];s[f]=t[f]}return s.href=s.format(),s}if(s.protocol=t.protocol,t.host||d[t.protocol])s.pathname=t.pathname;else{for(var m=(t.pathname||"").split("/");m.length&&!(t.host=m.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==m[0]&&m.unshift(""),m.length<2&&m.unshift(""),s.pathname=m.join("/")}if(s.search=t.search,s.query=t.query,s.host=t.host||"",s.auth=t.auth,s.hostname=t.hostname||t.host,s.port=t.port,s.pathname||s.search){var v=s.pathname||"",y=s.search||"";s.path=v+y}return s.slashes=s.slashes||t.slashes,s.href=s.format(),s}var x=s.pathname&&"/"===s.pathname.charAt(0),b=t.host||t.pathname&&"/"===t.pathname.charAt(0),C=b||x||s.host&&t.pathname,j=C,O=s.pathname&&s.pathname.split("/")||[],w=(m=t.pathname&&t.pathname.split("/")||[],s.protocol&&!g[s.protocol]);if(w&&(s.hostname="",s.port=null,s.host&&(""===O[0]?O[0]=s.host:O.unshift(s.host)),s.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===m[0]?m[0]=t.host:m.unshift(t.host)),t.host=null),C=C&&(""===m[0]||""===O[0])),b)s.host=t.host||""===t.host?t.host:s.host,s.hostname=t.hostname||""===t.hostname?t.hostname:s.hostname,s.search=t.search,s.query=t.query,O=m;else if(m.length)O||(O=[]),O.pop(),O=O.concat(m),s.search=t.search,s.query=t.query;else if(!r.isNullOrUndefined(t.search)){if(w)s.hostname=s.host=O.shift(),(A=!!(s.host&&s.host.indexOf("@")>0)&&s.host.split("@"))&&(s.auth=A.shift(),s.host=s.hostname=A.shift());return s.search=t.search,s.query=t.query,r.isNull(s.pathname)&&r.isNull(s.search)||(s.path=(s.pathname?s.pathname:"")+(s.search?s.search:"")),s.href=s.format(),s}if(!O.length)return s.pathname=null,s.search?s.path="/"+s.search:s.path=null,s.href=s.format(),s;for(var _=O.slice(-1)[0],q=(s.host||t.host||O.length>1)&&("."===_||".."===_)||""===_,T=0,k=O.length;k>=0;k--)"."===(_=O[k])?O.splice(k,1):".."===_?(O.splice(k,1),T++):T&&(O.splice(k,1),T--);if(!C&&!j)for(;T--;T)O.unshift("..");!C||""===O[0]||O[0]&&"/"===O[0].charAt(0)||O.unshift(""),q&&"/"!==O.join("/").substr(-1)&&O.push("");var A,I=""===O[0]||O[0]&&"/"===O[0].charAt(0);w&&(s.hostname=s.host=I?"":O.length?O.shift():"",(A=!!(s.host&&s.host.indexOf("@")>0)&&s.host.split("@"))&&(s.auth=A.shift(),s.host=s.hostname=A.shift()));return(C=C||s.host&&O.length)&&!I&&O.unshift(""),O.length?s.pathname=O.join("/"):(s.pathname=null,s.path=null),r.isNull(s.pathname)&&r.isNull(s.search)||(s.path=(s.pathname?s.pathname:"")+(s.search?s.search:"")),s.auth=t.auth||s.auth,s.slashes=s.slashes||t.slashes,s.href=s.format(),s},o.prototype.parseHost=function(){var t=this.host,e=h.exec(t);e&&(":"!==(e=e[0])&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)}},fgOe:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("Xxa5"),r=s.n(n),o=s("exGp"),a=s.n(o),h=s("//Fk"),i=s.n(h),l=(s("UZ5h"),{name:"pinyin",data:function(){return{split:.5,originalText:"",targetText:"",needTone:!1}},computed:{bodyStyles:function(){return this.$store.state.bodyStyles},pinyinContainerStyles:function(){return{height:this.bodyStyles.height-65+"px"}}},methods:{convert:function(t){var e=this;return new i.a(function(s){e.$axios({url:"https://talkapi.dei2.com/enkel/index/delegate",method:"post",data:{baseURL:"https://tool.lu",url:"/py5bconvert/ajax.html",method:"post",data:{code:e.originalText||"",tone:"5b"===t.type?"0":e.needTone?"1":"0",operate:t.type}}}).then(function(t){var e=t.data;200===e.status?s(e.data):s({})})})},getPinYin:function(){var t=this;return a()(r.a.mark(function e(){var s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.convert({type:"py"});case 2:(s=e.sent).status?t.targetText=s.text:t.targetText="转换失败";case 4:case"end":return e.stop()}},e,t)}))()},get5B:function(){var t=this;return a()(r.a.mark(function e(){var s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.convert({type:"5b"});case 2:(s=e.sent).status?t.targetText=s.text:t.targetText="转换失败";case 4:case"end":return e.stop()}},e,t)}))()}}}),c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"pinyin_container",style:t.pinyinContainerStyles},[s("div",{staticClass:"pinyin_inner"},[s("Split",{attrs:{min:"100",mode:"vertical"},model:{value:t.split,callback:function(e){t.split=e},expression:"split"}},[s("div",{staticClass:"demo-split-pane",attrs:{slot:"top"},slot:"top"},[s("Input",{staticClass:"unformat_wrapper no_bg",attrs:{type:"textarea",autofocus:"",placeholder:"汉字"},model:{value:t.originalText,callback:function(e){t.originalText=e},expression:"originalText"}})],1),t._v(" "),s("div",{staticClass:"trigger_container",attrs:{slot:"trigger"},slot:"trigger"},[s("div",{staticClass:"tips_left"},[s("Button",{attrs:{type:"primary",ghost:""},on:{click:t.get5B}},[t._v("转成五笔")])],1),t._v(" "),s("div",{staticClass:"trigger_wrapper"},[s("Icon",{attrs:{type:"ios-code",size:"14"}})],1),t._v(" "),s("div",{staticClass:"tips_right"},[s("Button",{attrs:{type:"primary"},on:{click:t.getPinYin}},[t._v("转成拼音")]),t._v(" "),s("Checkbox",{staticClass:"tone",model:{value:t.needTone,callback:function(e){t.needTone=e},expression:"needTone"}},[t._v("标注音调")])],1)]),t._v(" "),s("div",{staticClass:"demo-split-pane",attrs:{slot:"bottom"},slot:"bottom"},[s("div",{staticClass:"converted_container",attrs:{placeholder:"拼音"},domProps:{innerHTML:t._s(t.targetText)}})])])],1)])},staticRenderFns:[]};var u=s("VU/8")(l,c,!1,function(t){s("skd2")},"data-v-00875dd6",null);e.default=u.exports},qOJP:function(t,e,s){"use strict";t.exports={isString:function(t){return"string"==typeof t},isObject:function(t){return"object"==typeof t&&null!==t},isNull:function(t){return null===t},isNullOrUndefined:function(t){return null==t}}},skd2:function(t,e){}});
//# sourceMappingURL=14.29d2e47f512c72c83dd5.js.map
webpackJsonp([1],{"6CqT":function(e,t){},lO7g:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"home",data:function(){return{}},computed:{homeStyles:function(){return{minHeight:this.$store.state.bodyStyles.height+"px"}},themeImages:function(){return this.$store.state.themeImages},activeThemeIndex:function(){return this.$store.state.activeThemeIndex},mainContentStyles:function(){return{backgroundImage:this.activeThemeIndex.join(";").indexOf("-1")<0?"url("+this.themeImages[this.activeThemeIndex[0]].sublist[this.activeThemeIndex[1]].img+")":""}}},mounted:function(){this.$router.replace({name:"index"})},components:{Greeting:function(){return n.e(32).then(n.bind(null,"HS8a"))},Headers:function(){return n.e(38).then(n.bind(null,"5hXV"))},MainContent:function(){return n.e(36).then(n.bind(null,"uGc3"))},Cmd:function(){return n.e(34).then(n.bind(null,"ZzOL"))}}},s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"home_container",style:this.homeStyles},[t("div",{key:"otherRouter",staticClass:"main_content",style:this.mainContentStyles},[t("headers"),this._v(" "),t("main-content")],1),this._v(" "),t("cmd")],1)},staticRenderFns:[]};var r=n("VU/8")(i,s,!1,function(e){n("6CqT")},"data-v-e669da54",null);t.default=r.exports}});
//# sourceMappingURL=1.85bc0e1df843861abdb6.js.map
webpackJsonp([12],{gVRg:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"top_menu_container"},[n("Menu",{attrs:{mode:"horizontal",theme:"light","active-name":e.activeTool},on:{"on-select":e.useTool}},[e._l(e.activeTools.slice(0,e.maxCount),function(t,o){return e.activeTools?n("MenuItem",{key:o,style:e.topMenuItemStyle,attrs:{name:t.name}},[e._v("\n      "+e._s(t.label)+"\n    ")]):e._e()}),e._v(" "),e.activeTools.length>e.maxCount?n("Submenu",{style:e.topMenuItemStyle,attrs:{name:"more"}},[n("template",{slot:"title"},[n("Icon",{attrs:{type:"ios-more",size:"20"}})],1),e._v(" "),e._l(e.activeTools.slice(e.maxCount),function(t,o){return e.activeTools?n("MenuItem",{key:o,staticClass:"no_border_bottom",attrs:{name:t.name}},[e._v("\n        "+e._s(t.label)+"\n      ")]):e._e()})],2):e._e()],2)],1)},staticRenderFns:[]};var s=n("VU/8")({name:"TopMenu",data:function(){return{}},computed:{maxCount:function(){return this.$store.state.maxToolCount},tools:function(){return this.$store.state.tools},activeTool:function(){return this.$route.name||""},activeTools:function(){return this.$store.state.activeTools},activeThemeIndex:function(){return this.$store.state.activeThemeIndex},topMenuItemStyle:function(){return{color:this.activeThemeIndex.join(";").indexOf("-1")>-1?"#515a6e":"#FFFFFF"}}},methods:{useTool:function(e){this.$router.replace({name:e})}},components:{}},o,!1,function(e){n("j8OS")},null,null);t.default=s.exports},j8OS:function(e,t){}});
//# sourceMappingURL=12.5e3ca7489148257b5431.js.map
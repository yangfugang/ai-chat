(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e861e03c"],{"202a":function(t,e,n){},e15d:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"article-manager"},[e("Card",{staticClass:"ivu-mt",attrs:{bordered:!1,"dis-hover":""}},[e("Form",{ref:"formValidate",staticClass:"form",attrs:{model:t.formValidate,rules:t.ruleValidate,"label-width":t.labelWidth,"label-position":t.labelPosition},nativeOn:{submit:function(t){t.preventDefault()}}},[e("div",{staticClass:"goodsTitle acea-row"},[e("div",{staticClass:"title"},[t._v("客服聊天页面展示：")])]),e("FormItem",{attrs:{label:"展示内容：",prop:"content"}},[e("vue-ueditor-wrap",{staticStyle:{width:"90%"},attrs:{config:t.myConfig},on:{beforeInit:t.addCustomDialog},model:{value:t.formValidate.content,callback:function(e){t.$set(t.formValidate,"content",e)},expression:"formValidate.content"}})],1),e("Button",{staticClass:"submission",attrs:{type:"primary"},on:{click:function(e){return t.onsubmit("formValidate")}}},[t._v("提交")])],1)],1)],1)},r=[],a=(n("8e6e"),n("ac6a"),n("456d"),n("96cf"),n("1da1")),o=(n("7f7f"),n("ade3")),s=n("2f62"),c=n("6625"),l=n.n(c),u=n("8593");function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){Object(o["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var m={name:"kfAdv",components:{VueUeditorWrap:l.a},data:function(){return{dialog:{},isChoice:"单选",grid:{xl:8,lg:8,md:12,sm:24,xs:24},gridPic:{xl:6,lg:8,md:12,sm:12,xs:12},gridBtn:{xl:4,lg:8,md:8,sm:8,xs:8},loading:!1,formValidate:{content:""},ruleValidate:{},value:"",modalPic:!1,template:!1,treeData:[],myConfig:{autoHeightEnabled:!1,initialFrameHeight:500,initialFrameWidth:"100%",UEDITOR_HOME_URL:"/admin/UEditor/",serverUrl:""}}},computed:f(f({},Object(s["e"])("media",["isMobile"])),{},{labelWidth:function(){return this.isMobile?void 0:120},labelPosition:function(){return this.isMobile?"top":"right"}}),watch:{$route:function(t,e){this.getKfAdv()}},methods:{getContent:function(t){this.formValidate.content=t,console.log(this.formValidate.content)},onsubmit:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return!1;Object(u["v"])(e.formValidate).then(function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$Message.success(n.msg);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.$Message.error(t.msg)}))}))},getKfAdv:function(){var t=this;Object(u["h"])().then(function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(n){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:i=n.data,t.formValidate={content:i.content};case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.loading=!1,t.$Message.error(e.msg)}))},addCustomDialog:function(t){window.UE.registerUI("test-dialog",(function(t,e){var n=new window.UE.ui.Dialog({iframeUrl:"/admin/widget.images/index.html?fodder=dialog",editor:t,name:e,title:"上传图片",cssRules:"width:1200px;height:500px;padding:20px;"});this.dialog=n;var i=new window.UE.ui.Button({name:"dialog-button",title:"上传图片",cssRules:"background-image: url(../../../assets/images/icons.png);background-position: -726px -77px;",onclick:function(){n.render(),n.open()}});return i}),37)}},mounted:function(){this.getKfAdv()},created:function(){this.getClass()}},g=m,p=(n("e817"),n("2877")),b=Object(p["a"])(g,i,r,!1,null,"a2b59908",null);e["default"]=b.exports},e817:function(t,e,n){"use strict";n("202a")}}]);
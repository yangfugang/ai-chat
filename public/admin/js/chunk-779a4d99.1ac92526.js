(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-779a4d99"],{"30c8":function(t,e,r){},"33b8":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"i-layout-page-header"},[e("div",{staticClass:"i-layout-page-header"},[e("span",{staticClass:"ivu-page-header-title"},[t._v(t._s(t.$route.meta.title))])])]),e("Card",{staticClass:"ivu-mt",attrs:{bordered:!1,"dis-hover":""}},[e("Form",{ref:"formValidate",attrs:{model:t.formValidate,"label-width":t.labelWidth,"label-position":t.labelPosition},nativeOn:{submit:function(t){t.preventDefault()}}},[e("Row",{attrs:{type:"flex",gutter:24}},[e("Col",t._b({},"Col",t.grid,!1),[e("FormItem",{attrs:{label:"数据搜索：","label-for":"status2"}},[e("Input",{attrs:{search:"","enter-button":"",placeholder:"请输入ID,KEY,数据组名称,简介"},on:{"on-search":t.userSearchs},model:{value:t.formValidate.title,callback:function(e){t.$set(t.formValidate,"title",e)},expression:"formValidate.title"}})],1)],1)],1),e("Row",{attrs:{type:"flex"}},[e("Col",t._b({},"Col",t.grid,!1),[e("Button",{staticClass:"mr20",attrs:{type:"primary",icon:"md-add"},on:{click:function(e){return t.groupAdd("添加数据组")}}},[t._v("添加数据组")])],1)],1)],1),e("Table",{ref:"table",staticClass:"mt25",attrs:{columns:t.columns1,data:t.tabList,loading:t.loading,"highlight-row":"","no-userFrom-text":"暂无数据","no-filtered-userFrom-text":"暂无筛选结果"},scopedSlots:t._u([{key:"statuss",fn:function(r){var a=r.row;r.index;return[e("i-switch",{attrs:{value:a.status,"true-value":1,"false-value":0,size:"large"},on:{"on-change":function(e){return t.onchangeIsShow(a)}},model:{value:a.status,callback:function(e){t.$set(a,"status",e)},expression:"row.status"}},[e("span",{attrs:{slot:"open"},slot:"open"},[t._v("显示")]),e("span",{attrs:{slot:"close"},slot:"close"},[t._v("隐藏")])])]}},{key:"action",fn:function(r){var a=r.row,n=r.index;return[e("a",{on:{click:function(e){return t.goList(a)}}},[t._v("数据列表")]),e("Divider",{attrs:{type:"vertical"}}),e("a",{on:{click:function(e){return t.edit(a,"编辑")}}},[t._v("编辑")]),e("Divider",{attrs:{type:"vertical"}}),e("a",{on:{click:function(e){return t.del(a,"删除数据组",n)}}},[t._v("删除")])]}}])}),e("div",{staticClass:"acea-row row-right page"},[e("Page",{attrs:{total:t.total,current:t.formValidate.page,"show-elevator":"","show-total":"","page-size":t.formValidate.limit},on:{"on-change":t.pageChange}})],1)],1),e("group-from",{ref:"groupfroms",attrs:{titleFrom:t.titleFrom,groupId:t.groupId,addId:t.addId},on:{getList:t.getList}})],1)},n=[],i=(r("8e6e"),r("ac6a"),r("456d"),r("96cf"),r("3b8d")),o=r("bd86"),s=r("2f62"),l=(r("7f7f"),function(){var t=this,e=t._self._c;return e("div",[e("Modal",{attrs:{width:"850",scrollable:"","footer-hide":"",closable:"",title:t.titleFrom,"mask-closable":!1},on:{"on-cancel":t.handleReset},model:{value:t.modals,callback:function(e){t.modals=e},expression:"modals"}},[e("Form",{ref:"formValidate",attrs:{model:t.formValidate,"label-width":100,rules:t.ruleValidate},nativeOn:{submit:function(t){t.preventDefault()}}},[e("Row",{attrs:{type:"flex",gutter:24}},[e("Col",{attrs:{span:"24"}},[e("FormItem",{attrs:{label:"数据组名称：",prop:"name"}},[e("Input",{staticStyle:{width:"90%"},attrs:{placeholder:"请输入数据组名称"},model:{value:t.formValidate.name,callback:function(e){t.$set(t.formValidate,"name",e)},expression:"formValidate.name"}})],1)],1),e("Col",{attrs:{span:"24"}},[e("FormItem",{attrs:{label:"数据字段：",prop:"config_name"}},[e("Input",{staticStyle:{width:"90%"},attrs:{placeholder:"请输入数据字段"},model:{value:t.formValidate.config_name,callback:function(e){t.$set(t.formValidate,"config_name",e)},expression:"formValidate.config_name"}})],1)],1),e("Col",{attrs:{span:"24"}},[e("FormItem",{attrs:{label:"数据简介：",prop:"info"}},[e("Input",{staticStyle:{width:"90%"},attrs:{placeholder:"请输入数据简介"},model:{value:t.formValidate.info,callback:function(e){t.$set(t.formValidate,"info",e)},expression:"formValidate.info"}})],1)],1),e("Col",{attrs:{span:"24"}},[e("FormItem",{attrs:{label:"数类型：",prop:"cate_id"}},[e("RadioGroup",{model:{value:t.formValidate.cate_id,callback:function(e){t.$set(t.formValidate,"cate_id",e)},expression:"formValidate.cate_id"}},[e("Radio",{attrs:{label:0}},[t._v("默认")]),e("Radio",{attrs:{label:1}},[t._v("数据")])],1)],1)],1),t._l(t.formValidate.typelist,(function(r,a){return e("Col",{key:a,attrs:{span:"24"}},[e("Col",t._b({},"Col",t.grid,!1),[e("FormItem",{attrs:{label:"字段"+(a+1)+"：",prop:"typelist."+a+".name.value",rules:{required:!0,message:"请输入字段名称：姓名",trigger:"blur"}}},[e("Input",{attrs:{placeholder:"字段名称：姓名"},model:{value:r.name.value,callback:function(e){t.$set(r.name,"value",e)},expression:"item.name.value"}})],1)],1),e("Col",t._b({staticClass:"goupBox"},"Col",t.grid,!1),[e("FormItem",{attrs:{prop:"typelist."+a+".title.value",rules:{required:!0,message:"请输入字段配置名",trigger:"blur"}}},[e("Input",{attrs:{placeholder:"字段配置名：name"},model:{value:r.title.value,callback:function(e){t.$set(r.title,"value",e)},expression:"item.title.value"}})],1)],1),e("Col",t._b({staticClass:"goupBox mr15",attrs:{prop:"type"}},"Col",t.grid,!1),[e("FormItem",{attrs:{prop:"typelist."+a+".type.value",rules:{required:!0,message:"请选择字段类型",trigger:"change"}}},[e("i-select",{attrs:{placeholder:"字段类型"},model:{value:r.type.value,callback:function(e){t.$set(r.type,"value",e)},expression:"item.type.value"}},[e("i-option",{attrs:{value:"input"}},[t._v("文本框")]),e("i-option",{attrs:{value:"textarea"}},[t._v("多行文本框")]),e("i-option",{attrs:{value:"radio"}},[t._v("单选框")]),e("i-option",{attrs:{value:"checkbox"}},[t._v("多选框")]),e("i-option",{attrs:{value:"select"}},[t._v("下拉选择")]),e("i-option",{attrs:{value:"upload"}},[t._v("单图")]),e("i-option",{attrs:{value:"uploads"}},[t._v("多图")])],1)],1)],1),e("Col",{attrs:{span:"1"}},[e("Icon",{staticClass:"cur",attrs:{type:"ios-close-circle-outline"},on:{click:function(e){return t.delGroup(a)}}})],1),"radio"===r.type.value||"checkbox"===r.type.value||"select"===r.type.value?e("Col",{attrs:{span:"24"}},[e("FormItem",{attrs:{prop:"typelist."+a+".param.value",rules:{required:!0,message:"请输入参数方式",trigger:"blur"}}},[e("Input",{staticStyle:{width:"90%"},attrs:{type:"textarea",rows:4,placeholder:r.param.placeholder},model:{value:r.param.value,callback:function(e){t.$set(r.param,"value",e)},expression:"item.param.value"}})],1)],1):t._e()],1)})),e("Col",[e("FormItem",[e("Button",{attrs:{type:"primary"},on:{click:t.addType}},[t._v("添加字段")])],1)],1),e("Col",{attrs:{span:"24"}},[e("Button",{attrs:{type:"primary",long:"",disabled:t.valids},on:{click:function(e){return t.handleSubmit("formValidate")}}},[t._v("提交")])],1)],2)],1)],1)],1)}),u=[],c=(r("c5f6"),r("8593")),d={name:"menusFrom",props:{groupId:{type:Number,default:0},titleFrom:{type:String,default:""},addId:{type:String,default:""}},data:function(){return{iconVal:"",grid:{xl:7,lg:7,md:12,sm:24,xs:24},modals:!1,modal12:!1,ruleValidate:{name:[{required:!0,message:"请输入数据组名称",trigger:"blur"}],config_name:[{required:!0,message:"请输入数据字段",trigger:"blur"}],info:[{required:!0,message:"请输入数据简介",trigger:"blur"}],names:[{required:!0,message:"请输入字段名称",trigger:"blur"}]},FromData:[],valids:!1,list2:[],formValidate:{name:"",config_name:"",info:"",typelist:[],cate_id:0}}},watch:{addId:function(t){"addId"===t&&(this.formValidate.typelist=[])}},methods:{addType:function(){this.formValidate.typelist.push({name:{value:""},title:{value:""},type:{value:""},param:{placeholder:"参数方式例如:\n1=白色\n2=红色\n3=黑色",value:""}}),console.log(this.formValidate)},delGroup:function(t){this.formValidate.typelist.splice(t,1)},fromData:function(t){var e=this;Object(c["q"])(t).then(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.formValidate=r.data.info;case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.$Message.error(t.msg)}))},handleSubmit:function(t){var e=this,r={url:this.groupId?"/setting/group/".concat(this.groupId):"setting/group",method:this.groupId?"put":"post",datas:this.formValidate};this.$refs[t].validate((function(a){if(a){if(0===e.formValidate.typelist.length)return e.$Message.error("请添加字段名称：姓名！");Object(c["j"])(r).then(function(){var r=Object(i["a"])(regeneratorRuntime.mark((function r(a){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.$Message.success(a.msg),e.modals=!1,e.$refs[t].resetFields(),e.formValidate.typelist=[],e.$emit("getList");case 5:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}()).catch((function(t){e.$Message.error(t.msg)}))}else{if(!e.formValidate.name)return e.$Message.error("请添加数据组名称！");if(!e.formValidate.config_name)return e.$Message.error("请添加数据字段！");if(!e.formValidate.info)return e.$Message.error("请添加数据简介！")}}))},handleReset:function(){this.modals=!1,this.$refs["formValidate"].resetFields(),this.$emit("clearFrom")}},created:function(){},mounted:function(){}},m=d,f=(r("3d52"),r("2877")),p=Object(f["a"])(m,l,u,!1,null,"3328e5d6",null),g=p.exports;function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function b(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var v={name:"group",components:{groupFrom:g},data:function(){return{grid:{xl:7,lg:7,md:12,sm:24,xs:24},formValidate:{page:1,limit:20,title:""},loading:!1,tabList:[],total:0,columns1:[{title:"ID",key:"id",width:80},{title:"KEY",key:"config_name",minWidth:130},{title:"数据组名称",key:"name",minWidth:130},{title:"简介",key:"info",minWidth:130},{title:"操作",slot:"action",fixed:"right",minWidth:150}],FromData:null,titleFrom:"",groupId:0,addId:""}},computed:b(b({},Object(s["e"])("media",["isMobile"])),{},{labelWidth:function(){return this.isMobile?void 0:75},labelPosition:function(){return this.isMobile?"top":"right"}}),mounted:function(){this.getList()},methods:{goList:function(t){this.$router.push({path:"/admin/system/config/system_group/list/"+t.id})},getList:function(){var t=this;this.loading=!0,Object(c["r"])(this.formValidate).then(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(r){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=r.data,t.tabList=a.list,t.total=a.count,t.loading=!1;case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.loading=!1,t.$Message.error(e.msg)}))},pageChange:function(t){this.formValidate.page=t,this.getList()},userSearchs:function(){this.formValidate.page=1,this.getList()},groupAdd:function(t){this.$refs.groupfroms.modals=!0,this.titleFrom=t,this.addId="addId",this.groupId=0},del:function(t,e,r){var a=this,n={title:e,num:r,url:"setting/group/".concat(t.id),method:"DELETE",ids:""};this.$modalSure(n).then((function(t){a.$Message.success(t.msg),a.tabList.splice(r,1)})).catch((function(t){a.$Message.error(t.msg)}))},edit:function(t,e){this.titleFrom=e,this.groupId=t.id,this.$refs.groupfroms.fromData(t.id),this.$refs.groupfroms.modals=!0,this.addId=""}}},y=v,_=Object(f["a"])(y,a,n,!1,null,"3bb4db5f",null);e["default"]=_.exports},"3d52":function(t,e,r){"use strict";r("30c8")},8593:function(t,e,r){"use strict";r.d(e,"c",(function(){return n})),r.d(e,"a",(function(){return i})),r.d(e,"b",(function(){return o})),r.d(e,"w",(function(){return s})),r.d(e,"g",(function(){return l})),r.d(e,"e",(function(){return u})),r.d(e,"f",(function(){return c})),r.d(e,"d",(function(){return d})),r.d(e,"r",(function(){return m})),r.d(e,"j",(function(){return f})),r.d(e,"q",(function(){return p})),r.d(e,"u",(function(){return g})),r.d(e,"x",(function(){return h})),r.d(e,"h",(function(){return b})),r.d(e,"v",(function(){return v})),r.d(e,"i",(function(){return y})),r.d(e,"t",(function(){return _})),r.d(e,"s",(function(){return O}));var a=r("6b6c");function n(t){return Object(a["a"])({url:"setting/config_class",method:"get",params:t})}function i(t){return Object(a["a"])({url:"setting/config_class/create",method:"get"})}function o(t){return Object(a["a"])({url:"setting/config_class/".concat(t,"/edit"),method:"get"})}function s(t){return Object(a["a"])({url:"setting/config_class/set_status/".concat(t.id,"/").concat(t.status),method:"PUT"})}function l(t){return Object(a["a"])({url:"setting/config",method:"get",params:t})}function u(t){return Object(a["a"])({url:"setting/config/create",method:"get",params:t})}function c(t){return Object(a["a"])({url:"/setting/config/".concat(t,"/edit"),method:"get"})}function d(t,e){return Object(a["a"])({url:"setting/config/set_status/".concat(t,"/").concat(e),method:"PUT"})}function m(t){return Object(a["a"])({url:"setting/group",method:"get",params:t})}function f(t){return Object(a["a"])({url:t.url,method:t.method,data:t.datas})}function p(t){return Object(a["a"])({url:"setting/group/".concat(t),method:"get"})}function g(t){return Object(a["a"])({url:"system/log/search_admin",method:"GET"})}function h(t){return Object(a["a"])({url:"system/log",method:"GET",params:t})}function b(){return Object(a["a"])({url:"setting/get_kf_adv",method:"get"})}function v(t){return Object(a["a"])({url:"setting/set_kf_adv",method:"post",data:t})}function y(){return Object(a["a"])({url:"setting/get_user_agreement",method:"get"})}function _(t){return Object(a["a"])({url:"setting/set_user_agreement",method:"post",data:t})}function O(t,e){return Object(a["a"])({url:"setting/config/kefu",method:t||"get",data:e||{}})}}}]);
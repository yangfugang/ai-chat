(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-097b9f86"],{"1c2e":function(t,e,i){"use strict";i("88ce")},"88ce":function(t,e,i){},b0e7:function(t,e,i){"use strict";i("7f7f");var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"Modal"},[e("Row",{staticClass:"colLeft"},[e("Col",{staticClass:"colLeft",attrs:{xl:6,lg:6,md:6,sm:6,xs:24}},[e("div",{staticClass:"Nav"},[e("div",{staticClass:"input"},[e("Input",{staticStyle:{width:"90%"},attrs:{search:"","enter-button":"",placeholder:"请输入分类名称"},on:{"on-search":t.changePage},model:{value:t.uploadName.name,callback:function(e){t.$set(t.uploadName,"name",e)},expression:"uploadName.name"}})],1),e("div",{staticClass:"trees-coadd"},[e("div",{staticClass:"scollhide"},[e("div",{staticClass:"trees"},[e("Tree",{ref:"tree",staticClass:"treeBox",attrs:{data:t.treeData,render:t.renderContent}})],1)])])])]),e("Col",{staticClass:"colLeft",attrs:{xl:18,lg:18,md:18,sm:18,xs:24}},[e("div",{staticClass:"conter"},[e("div",{staticClass:"bnt acea-row row-middle"},[e("Col",{attrs:{span:"24"}},[0!==t.isShow?e("Button",{staticClass:"mr10",attrs:{type:"primary",disabled:0===t.checkPicList.length},on:{click:t.checkPics}},[t._v("使用选中图片")]):t._e(),e("Upload",{staticClass:"mr10 mb10",staticStyle:{"margin-top":"1px",display:"inline-block"},attrs:{"show-upload-list":!1,action:t.fileUrl,"before-upload":t.beforeUpload,data:t.uploadData,headers:t.header,multiple:!0,"on-success":t.handleSuccess}},[e("Button",{attrs:{type:"primary"}},[t._v("上传图片")])],1),e("Button",{staticClass:"mr10",attrs:{type:"error",disabled:0===t.checkPicList.length},on:{click:function(e){return e.stopPropagation(),t.editPicList("图片")}}},[t._v("删除图片")]),e("i-select",{staticClass:"treeSel",staticStyle:{width:"160px"},attrs:{value:t.pids,placeholder:"图片移动至"}},[t._l(t.list,(function(i,s){return e("i-option",{key:s,staticStyle:{display:"none"},attrs:{value:i.value}},[t._v("\n            "+t._s(i.title)+"\n          ")])})),e("Tree",{ref:"reference",staticClass:"treeBox",attrs:{data:t.treeData2,render:t.renderContentSel}})],2)],1)],1),e("div",{staticClass:"pictrueList acea-row"},[e("Row",{staticClass:"conter",attrs:{gutter:24}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowPic,expression:"isShowPic"}],staticClass:"imagesNo"},[e("Icon",{attrs:{type:"ios-images",size:"60",color:"#dbdbdb"}}),e("span",{staticClass:"imagesNo_sp"},[t._v("图片库为空")])],1),e("div",{staticClass:"acea-row mb10"},t._l(t.pictrueList,(function(i,s){return e("div",{key:s,staticClass:"pictrueList_pic mr10 mb10",on:{mouseenter:function(e){return t.enterMouse(i)},mouseleave:function(e){return t.enterMouse(i)}}},[i.num>0?e("p",{staticClass:"number"},[e("Badge",{attrs:{count:i.num,type:"error",offset:[11,12]}},[e("a",{staticClass:"demo-badge",attrs:{href:"#"}})])],1):t._e(),e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i.satt_dir,expression:"item.satt_dir"}],class:i.isSelect?"on":"",on:{click:function(e){return e.stopPropagation(),t.changImage(i,s,t.pictrueList)}}}),e("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"space-between"},on:{mouseenter:function(e){return t.enterLeave(i)},mouseleave:function(e){return t.enterLeave(i)}}},[i.isEdit?e("Input",{staticStyle:{width:"80%"},attrs:{size:"small",type:"text"},on:{"on-blur":function(e){return t.bindTxt(i)}},model:{value:i.real_name,callback:function(e){t.$set(i,"real_name",e)},expression:"item.real_name"}}):e("p",{staticStyle:{width:"80%"}},[t._v("\n                  "+t._s(i.editName)+"\n                ")]),i.isShowEdit?e("span",{staticClass:"iconfont iconbianji1",on:{click:function(t){i.isEdit=!i.isEdit}}}):t._e()],1),e("div",{directives:[{name:"show",rawName:"v-show",value:i.realName&&i.real_name,expression:"item.realName && item.real_name"}],staticClass:"nameStyle"},[t._v("\n                "+t._s(i.real_name)+"\n              ")])])})),0)])],1),e("div",{staticClass:"footer acea-row row-right"},[e("Page",{attrs:{total:t.total,"show-elevator":"","show-total":"","page-size":t.fileData.limit},on:{"on-change":t.pageChange}})],1)])])],1)],1)},a=[],n=(i("28a5"),i("ac6a"),i("75fc")),r=(i("96cf"),i("3b8d")),c=(i("6b54"),i("c5f6"),i("6b6c"));function o(t){return Object(c["a"])({url:"file/category",method:"get",params:t})}function l(t){return Object(c["a"])({url:"file/category/create",method:"get",params:t})}function u(t){return Object(c["a"])({url:"file/category/".concat(t,"/edit"),method:"get"})}function d(t){return Object(c["a"])({url:"file/file",method:"get",params:t})}function h(t){return Object(c["a"])({url:"file/file/do_move",method:"put",data:t})}function p(t,e){return Object(c["a"])({url:"file/file/update/"+t,method:"put",data:e})}var f=i("d708"),m=i("c276"),g={name:"uploadPictures",props:{isChoice:{type:String,default:""},gridBtn:{type:Object,default:null},gridPic:{type:Object,default:null},isShow:{type:Number,default:1}},data:function(){return{spinShow:!1,fileUrl:f["a"].apiBaseURL+"/file/upload",modalPic:!1,treeData:[],treeData2:[],pictrueList:[],uploadData:{},checkPicList:[],uploadName:{name:""},FromData:null,treeId:0,isJudge:!1,buttonProps:{type:"default",size:"small"},fileData:{pid:0,page:1,limit:18},total:0,pids:0,list:[],modalTitleSs:"",isShowPic:!1,header:{},ids:[]}},mounted:function(){this.getToken(),this.getList(),this.getFileList()},methods:{enterMouse:function(t){t.realName=!t.realName},enterLeave:function(t){t.isShowEdit=!t.isShowEdit},getToken:function(){this.header["Authori-zation"]="Bearer "+Object(m["d"])("token")},renderContent:function(t,e){var i=this,s=e.root,a=e.node,n=e.data,r=[];return 0==n.pid&&r.push(t("div",{class:["ivu-dropdown-item"],on:{click:function(){i.append(s,a,n)}}},"添加分类")),""!==n.id&&r.push(t("div",{class:["ivu-dropdown-item"],on:{click:function(){i.editPic(s,a,n)}}},"编辑分类"),t("div",{class:["ivu-dropdown-item"],on:{click:function(){i.remove(s,a,n,"分类")}}},"删除分类")),t("span",{class:["ivu-span"],style:{display:"inline-block",width:"88%",height:"32px",lineHeight:"32px",position:"relative",color:"rgba(0,0,0,0.6)",cursor:"pointer"},on:{mouseenter:function(){i.onMouseOver(s,a,n)},mouseleave:function(){i.onMouseOver(s,a,n)}}},[t("span",{on:{click:function(t){i.appendBtn(s,a,n,t)}}},n.title),t("div",{style:{display:"inline-block",float:"right"}},[t("Icon",{props:{type:"ios-more"},style:{marginRight:"8px",fontSize:"20px",display:n.flag?"inline":"none"},on:{click:function(){i.onClick(s,a,n)}}}),t("div",{class:["right-menu ivu-poptip-inner"],style:{width:"80px",position:"absolute",zIndex:"9",top:"0",right:"0",display:n.flag2?"block":"none"}},r)])])},renderContentSel:function(t,e){var i=this,s=e.root,a=e.node,n=e.data;return t("div",{style:{display:"inline-block",width:"90%"}},[t("span",[t("span",{style:{cursor:"pointer"},class:["ivu-tree-title"],on:{click:function(t){i.handleCheckChange(s,a,n,t)}}},n.title)])])},handleCheckChange:function(t,e,i,s){this.list=[];var a=i.id,n=i.title;this.list.push({value:a,title:n}),this.ids.length?(this.pids=a,this.getMove()):this.$Message.warning("请先选择图片");for(var r=this.$refs.reference.$el.querySelectorAll(".ivu-tree-title-selected"),c=0;c<r.length;c++)r[c].className="ivu-tree-title";s.path[0].className="ivu-tree-title  ivu-tree-title-selected"},getMove:function(){var t=this,e={pid:this.pids,images:this.ids.toString()};h(e).then(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(i){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.$Message.success(i.msg),t.getFileList(),t.pids=0,t.checkPicList=[],t.ids=[];case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.$Message.error(e.msg)}))},editPicList:function(t){var e=this;this.tits=t;var i={ids:this.ids.toString()},s={title:"删除选中图片",url:"file/file/delete",method:"POST",ids:i};this.$modalSure(s).then((function(t){e.$Message.success(t.msg),e.getFileList(),e.checkPicList=[]})).catch((function(t){e.$Message.error(t.msg)}))},onMouseOver:function(t,e,i){event.preventDefault(),i.flag=!i.flag,i.flag2&&(i.flag2=!1)},onClick:function(t,e,i){i.flag2=!i.flag2},appendBtn:function(t,e,i,s){this.treeId=i.id,this.fileData.page=1,this.getFileList();for(var a=this.$refs.tree.$el.querySelectorAll(".ivu-tree-title-selected"),n=0;n<a.length;n++)a[n].className="ivu-tree-title";s.path[0].className="ivu-tree-title  ivu-tree-title-selected"},append:function(t,e,i){this.treeId=i.id,this.getFrom()},remove:function(t,e,i,s){var a=this;this.tits=s;var n={title:"删除 [ "+i.title+" ] 分类",url:"file/category/".concat(i.id),method:"DELETE",ids:""};this.$modalSure(n).then((function(t){a.$Message.success(t.msg),a.getList(),a.checkPicList=[]})).catch((function(t){a.$Message.error(t.msg)}))},editPic:function(t,e,i){var s=this;this.$modalForm(u(i.id)).then((function(){return s.getList()}))},changePage:function(){this.getList()},getList:function(){var t=this,e={title:"全部图片",id:"",pid:0};o(this.uploadName).then(function(){var i=Object(r["a"])(regeneratorRuntime.mark((function i(s){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:t.treeData=s.data.list,t.treeData.unshift(e),t.treeData2=Object(n["a"])(t.treeData),t.addFlag(t.treeData);case 4:case"end":return i.stop()}}),i)})));return function(t){return i.apply(this,arguments)}}()).catch((function(e){t.$Message.error(e.msg)}))},addFlag:function(t){var e=this;t.map((function(t){e.$set(t,"flag",!1),e.$set(t,"flag2",!1),t.children&&e.addFlag(t.children)}))},add:function(){this.treeId=0,this.getFrom()},getFileList:function(){var t=this;this.fileData.pid=this.treeId,d(this.fileData).then(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(i){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:i.data.list.forEach((function(e){e.isSelect=!1,e.isEdit=!1,e.isShowEdit=!1,e.realName=!1,e.num=0,t.editName(e)})),t.pictrueList=i.data.list,console.log(t.pictrueList),t.pictrueList.length?t.isShowPic=!1:t.isShowPic=!0,t.total=i.data.count;case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.$Message.error(e.msg)}))},pageChange:function(t){this.fileData.page=t,this.getFileList(),this.checkPicList=[]},getFrom:function(){var t=this;this.$modalForm(l({id:this.treeId})).then((function(e){console.log(e),t.getList()}))},beforeUpload:function(){var t=this;this.uploadData={pid:this.treeId};var e=new Promise((function(e){t.$nextTick((function(){e(!0)}))}));return e},handleSuccess:function(t,e,i){200===t.status?(this.$Message.success(t.msg),this.getFileList()):this.$Message.error(t.msg)},cancel:function(){this.$emit("changeCancel")},changImage:function(t,e,i){var s=this,a=0;t.isSelect?(t.isSelect=!1,this.checkPicList.map((function(e,i){e.att_id==t.att_id&&(a=i)})),this.checkPicList.splice(a,1)):(t.isSelect=!0,this.checkPicList.push(t)),this.ids=[],this.checkPicList.map((function(t,e){s.ids.push(t.att_id)})),this.pictrueList.map((function(t,e){t.isSelect?s.checkPicList.filter((function(e,i){t.att_id==e.att_id&&(t.num=i+1)})):t.num=0}))},checkPics:function(){if("单选"===this.isChoice){if(this.checkPicList.length>1)return this.$Message.warning("最多只能选一张图片");this.$emit("getPic",this.checkPicList[0])}else{var t=this.$route.query.maxLength;if(void 0!=t&&this.checkPicList.length>Number(t))return this.$Message.warning("最多只能选"+t+"张图片");this.$emit("getPicD",this.checkPicList),console.log(this.checkPicList)}},editName:function(t){var e=t.real_name?t.real_name.split("."):t.name.split("."),i=void 0==e[1]?[]:e[1],s=e[0].length+i.length;t.editName=s<10?t.real_name:t.real_name.substr(0,2)+"..."+t.real_name.substr(-5,5)},bindTxt:function(t){var e=this;""==t.real_name&&this.$Message.error("请填写内容"),p(t.att_id,{real_name:t.real_name}).then((function(i){e.editName(t),t.isEdit=!1,e.$Message.success(i.msg)})).catch((function(t){e.$Message.error(t.msg)}))}}},v=g,w=(i("1c2e"),i("2877")),b=Object(w["a"])(v,s,a,!1,null,"73d8d15e",null);e["a"]=b.exports}}]);
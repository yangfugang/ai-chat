(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5c14208e"],{"0e5e":function(t,e,i){"use strict";i("290c")},1201:function(t,e,i){"use strict";i("2f4f")},"290c":function(t,e,i){},"2f4f":function(t,e,i){},7624:function(t,e,i){"use strict";e["a"]=["em-tlj-1","em-tlj-3","em-tlj-4","em-tlj-5","em-tlj-6","em-tlj-7","em-tlj-8","em-tlj-9","em-tlj-10","em-tlj-11","em-tlj-12","em-tlj-13","em-tlj-14","em-tlj-15","em-tlj-16","em-tlj-17","em-tlj-18","em-tlj-19","em-tlj-20","em-tlj-21","em-tlj-22","em-tlj-23","em-tlj-24","em-tlj-25","em-tlj-26","em-tlj-27","em-tlj-28","em-tlj-29","em-tlj-30","em-tlj-31","em-tlj-32","em-tlj-33","em-tlj-34","em-tlj-35","em-tlj-36","em-tlj-37","em-tlj-38","em-tlj-39","em-tlj-40","em-tlj-41","em-tlj-42","em-tlj-43","em-tlj-44","em-tlj-45","em-tlj-46","em-tlj-47","em-tlj-48","em-tlj-49","em-tlj-50","em-tlj-51","em-tlj-52","em-tlj-53","em-tlj-54","em-tlj-55","em-tlj-56","em-tlj-57","em-tlj-58","em-tlj-59","em-tlj-60","em-tlj-61","em-tlj-62","em-tlj-63","em-tlj-64","em-tlj-65","em-tlj-66","em-tlj-67","em-tlj-68","em-tlj-69","em-tlj-70","em-tlj-71","em-tlj-72","em-tlj-73","em-tlj-74","em-tlj-75","em-tlj-76","em-tlj-77","em-tlj-78","em-tlj-79","em-tlj-80","em-tlj-81","em-tlj-82","em-tlj-83","em-tlj-84","em-tlj-85","em-tlj-86","em-tlj-87","em-tlj-88","em-tlj-89","em-tlj-90","em-tlj-91","em-tlj-92","em-tlj-93","em-tlj-94","em-tlj-95","em-tlj-96","em-smile","em-laughing","em-blush","em-smiley","em-relaxed","em-smirk","em-heart_eyes","em-kissing_heart","em-kissing_closed_eyes","em-flushed","em-relieved","em-satisfied","em-grin","em-wink","em-stuck_out_tongue_winking_eye","em-stuck_out_tongue_closed_eyes","em-grinning","em-kissing","em-kissing_smiling_eyes","em-stuck_out_tongue","em-sleeping","em-worried","em-frowning","em-anguished","em-open_mouth","em-grimacing","em-confused","em-hushed","em-expressionless","em-unamused","em-sweat_smile","em-sweat","em-disappointed_relieved","em-weary","em-pensive","em-disappointed","em-confounded","em-fearful","em-cold_sweat","em-persevere","em-cry","em-sob","em-joy","em-astonished","em-scream","em-tired_face","em-angry","em-rage","em-triumph","em-sleepy","em-yum","em-mask","em-sunglasses","em-dizzy_face","em-imp","em-smiling_imp","em-neutral_face","em-no_mouth","em-innocent","em-alien"]},eea8:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"chat-room"},[e("div",{staticClass:"room",class:{win:!t.chatOptions.popup},on:{click:t.roomClick}},[e("div",{directives:[{name:"drag",rawName:"v-drag"}],staticClass:"head"},[e("div",{staticClass:"image"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.serviceData&&t.serviceData.avatar,expression:"serviceData && serviceData.avatar"}]})]),e("div",{staticClass:"name"},[t._v(t._s(t.serviceData&&t.serviceData.nickname))]),e("div",{class:["iconfont",t.muted?"icon-shengyinjingyinxianxing":"icon-shengyinyinliang"],on:{click:function(e){e.stopPropagation(),t.muted=!t.muted}}}),e("div",{staticClass:"iconfont icon-guanbi5",on:{click:function(e){return e.stopPropagation(),t.close.apply(null,arguments)}}})]),e("div",{staticClass:"main"},[e("div",{staticClass:"chat"},[e("div",{ref:"record",staticClass:"record",on:{scroll:t.onScroll}},[e("div",{ref:"scrollBox",attrs:{id:"chat_scroll"}},[e("Spin",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]},[e("Icon",{staticClass:"demo-spin-icon-load",attrs:{type:"ios-loading",size:"18"}}),e("div",[t._v("Loading")])],1),e("ul",[t._l(t.records,(function(i){return[e("li",{key:i.id,class:{right:i.uid===t.serviceData.tourist_uid},attrs:{id:"chat_".concat(i.id)}},[i.show?e("div",{staticClass:"time-tag"},[t._v("\n                    "+t._s(i.add_time)+"\n                  ")]):t._e(),e("div",{staticClass:"avatar"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i.avatar,expression:"item.avatar"}]})]),e("div",{ref:"chatContent",refInFor:!0,staticClass:"content"},[1===i.msn_type?e("div",{staticClass:"text",domProps:{innerHTML:t._s(i.msn)}}):t._e(),2===i.msn_type?e("div",{staticClass:"image"},[e("div",{staticClass:"text"},[e("i",{class:"em ".concat(i.msn)})])]):t._e(),3===i.msn_type?e("div",{directives:[{name:"viewer",rawName:"v-viewer"}],staticClass:"image"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i.msn,expression:"item.msn"}]})]):t._e(),5===i.msn_type?e("div",{staticClass:"goods"},[e("div",{staticClass:"thumb"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i.productInfo.image,expression:"item.productInfo.image"}]})]),e("div",{staticClass:"intro"},[e("div",{staticClass:"name"},[t._v("\n                          "+t._s(i.productInfo.store_name)+"\n                        ")]),e("div",{staticClass:"attr"},[e("span",[t._v("库存："+t._s(i.productInfo.stock))]),e("span",[t._v("销量："+t._s(i.productInfo.sales))])]),e("div",{staticClass:"group"},[e("div",{staticClass:"money"},[t._v("\n                            ￥"+t._s(i.productInfo.price)+"\n                          ")]),e("span",{staticStyle:{cursor:"pointer"},on:{click:function(e){return e.stopPropagation(),t.onLook(i.productInfo.id)}}},[t._v("查看商品 >")])])])]):t._e(),6===i.msn_type?t._l(i.orderInfo.cartInfo,(function(o){return e("div",{key:o.id,staticClass:"order"},[e("div",{staticClass:"thumb"},[e("img",{attrs:{src:o.productInfo.image}})]),e("div",{staticClass:"intro"},[e("div",{staticClass:"name"},[t._v("\n                            订单ID："+t._s(i.orderInfo.order_id)+"\n                          ")]),e("div",{staticClass:"attr"},[t._v("商品数量："+t._s(o.cart_num))]),e("div",{staticClass:"group"},[e("div",{staticClass:"money"},[t._v("\n                              ￥"+t._s(o.productInfo.price)+"\n                            ")]),e("nuxt-link",{attrs:{target:"_blank",to:{path:"/order_detail",query:{orderId:i.orderInfo.order_id}}}},[t._v("查看订单 >")])],1)])])})):t._e()],2)])]}))],2)],1)]),e("div",{staticClass:"editor"},[e("div",{staticClass:"editor-hd"},[e("div",[e("button",{staticClass:"emoji-btn",attrs:{title:"表情"},on:{click:function(e){return e.stopPropagation(),t.emojiSwitch.apply(null,arguments)}}},[e("span",{staticClass:"iconfont iconbiaoqing1"})]),t.kufuToken?e("button",{attrs:{title:"图片"}},[e("Upload",{attrs:{"show-upload-list":!1,action:t.uploadAction,"before-upload":t.beforeUpload,format:["jpg","jpeg","png","gif"],"on-format-error":t.handleFormatError,data:t.uploadData,"on-success":t.uploadSuccess,"on-error":t.uploadError}},[e("span",{staticClass:"iconfont icontupian1"})])],1):t._e()]),t.emojiShow?e("div",{staticClass:"emoji-panel"},t._l(t.emojiList,(function(i,o){return e("i",{key:o,staticClass:"em",class:i,on:{click:function(e){return e.stopPropagation(),t.selectEmoji(i)}}})})),0):t._e()]),e("div",{staticClass:"editor-bd"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.chatCont,expression:"chatCont"}],attrs:{placeholder:"请输入文字内容"},domProps:{value:t.chatCont},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.ctrlEnter.apply(null,arguments)},input:function(e){e.target.composing||(t.chatCont=e.target.value)}}})]),e("div",{staticClass:"editor-ft"},[e("button",{attrs:{disabled:!t.chatCont},on:{click:function(e){return e.stopPropagation(),t.sendMessage.apply(null,arguments)}}},[t._v("发送")])])])]),e("div",{staticClass:"notice"},[t.notice?e("div",{staticClass:"rich",domProps:{innerHTML:t._s(t.notice)}}):t._e(),t._m(0)])]),e("audio",{ref:"audio",attrs:{src:t.audioSrc}})]),t.change?e("feed-back",{attrs:{change:t.change},on:{closeChange:function(e){return t.closeChange(e)}}}):t._e()],1)},n=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"copy"},[e("a",{attrs:{href:"http://www.crmeb.com/",target:"_blank"}},[t._v("CRMEB提供技术支持")])])}],s=i("2909"),a=(i("28a5"),i("a481"),i("ac6a"),i("f9db"),i("7624")),r=i("49ea"),c=i("d708"),l=i("a78e"),m=i.n(l),d=i("42e3"),u=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"feedback",class:!0===t.change?"on":""},[e("div",{staticClass:"feedback-header acea-row"},[e("span",{staticClass:"sp1"},[t._v("商城客服已离线")]),e("div",[e("Icon",{attrs:{type:"md-close",color:"#fff",size:"18"},on:{click:t.close}})],1)]),t.isShow?t._e():e("div",[e("div",{staticClass:"feedback-conent mb20"},[e("div",{staticClass:"ft",domProps:{textContent:t._s(t.notice)}})]),e("div",[e("Form",{ref:"formItem",staticClass:"pl15",attrs:{model:t.formItem,rules:t.ruleValidate}},[e("FormItem",{attrs:{prop:"rela_name"}},[e("Input",{attrs:{placeholder:"请输入您的姓名"},model:{value:t.formItem.rela_name,callback:function(e){t.$set(t.formItem,"rela_name",e)},expression:"formItem.rela_name"}})],1),e("FormItem",{attrs:{prop:"phone"}},[e("Input",{attrs:{placeholder:"请输入您的联系电话"},model:{value:t.formItem.phone,callback:function(e){t.$set(t.formItem,"phone",e)},expression:"formItem.phone"}})],1),e("FormItem",{attrs:{prop:"content"}},[e("Input",{staticClass:"mb10",attrs:{type:"textarea",placeholder:"请输入留言内容"},model:{value:t.formItem.content,callback:function(e){t.$set(t.formItem,"content",e)},expression:"formItem.content"}})],1),e("FormItem",[e("Button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:function(e){return t.handleSubmit("formItem")}}},[t._v("提交留言")])],1)],1)],1)]),t.isShow?e("div",{staticClass:"sure"},[e("div",{staticClass:"sure-yuan"},[e("Icon",{attrs:{type:"md-checkmark",color:"#fff",size:"30"}})],1),e("div",{staticClass:"sp1 mb10"},[t._v("提交成功")]),e("div",{staticClass:"sp2 mb30"},[t._v("您的信息提交成功，我们会尽快与您取得联系！")]),e("Button",{attrs:{type:"primary"},on:{click:t.close}},[t._v("好的")])],1):t._e()]),e("div",{directives:[{name:"show",rawName:"v-show",value:!0===t.change,expression:"change === true"}],staticClass:"maskModel",on:{touchmove:function(t){t.preventDefault()}}})])},f=[],p=(i("7f7f"),{name:"feedback",props:{change:Boolean},data:function(){return{isShow:!1,formItem:{rela_name:"",content:"",phone:""},notice:"",ruleValidate:{rela_name:[{required:!0,message:"请输入您的姓名",trigger:"blur"}],content:[{required:!0,message:"请输入留言内容",trigger:"blur"}],phone:[{required:!0,message:"请填写手机号码",trigger:"change"},{pattern:/^1[3456789]\d{9}$/,message:"手机号码格式不正确",trigger:"blur"}]}}},mounted:function(){this.getNotice()},methods:{handleSubmit:function(t){var e=this;this.$refs[t].validate((function(t){t&&Object(d["j"])(e.formItem).then((function(t){e.isShow=!0})).cache((function(t){e.$Message.error(t.msg)}))}))},close:function(){this.$emit("closeChange",!1)},getNotice:function(){var t=this;Object(d["i"])().then((function(e){t.notice=e.data.feedback})).cache((function(e){t.$Message.error(e.msg)}))}}}),h=p,v=(i("0e5e"),i("2877")),g=Object(v["a"])(h,u,f,!1,null,"5e5693dc",null),_=g.exports,j=function(t,e){e=1*e||1;var i=[];return t.forEach((function(t,o){o%e===0&&i.push([]),i[i.length-1].push(t)})),i},k={name:"ChatRoom",auth:!1,components:{feedBack:_},props:{chatOptions:{type:Object,default:function(){return{show:!1}}}},directives:{drag:{inserted:function(t){var e=0,i=0,o=0,n=0,s=!1;t.onmousedown=function(a){return e=a.clientX,i=a.clientY,o=t.parentNode.offsetLeft,n=t.parentNode.offsetTop,s=!0,t.style.cursor="move",window.onmousemove=function(a){if(0!=s){var r=a.clientX,c=a.clientY,l=r-(e-o),m=c-(i-n);t.parentNode.style.left=l+"px",t.parentNode.style.top=m+"px"}},window.onmouseup=function(){s=!1,t.style.cursor="default",window.onmousemove=null,window.onmouseup=null},!1}}}},data:function(){return{locations:"".concat(location.origin),change:!1,emojiGroup:j(a["a"],20),emojiList:a["a"],emojiShow:!1,recordList:[],limit:20,loading:!1,finished:!1,chatCont:"",service:null,serviceData:{},uploadAction:"",notice:"",audio:null,muted:!1,audioSrc:"",upperId:0,uploadData:{},is_tourist:1,text:"",isLoad:!1,page:1,tourist_avatar:"",tourist_uid:"",toUid:"",kufuToken:""}},watch:{muted:function(t){this.audio.muted=t}},computed:{records:function(){var t=this;return this.recordList.map((function(e,i){return i&&new Date(e.add_time)-new Date(t.recordList[i-1].add_time)>=3e5?e.show=!0:e.show=!1,e}))}},created:function(){-1!=location.href.indexOf("kefu")&&(this.uploadAction=c["a"].apiBaseURL.replace(/adminapi/,"kefuapi")+"/tourist/upload");var t=m.a.get("auth._token.local1");this.kufuToken=t?t.split("Bearer ")[1]:""},mounted:function(){var t=this,e=this;window.addEventListener("click",(function(){e.emojiShow=!1})),this.$wechat._isMobile()&&this.$router.replace("/kefu/mobile_user_chat"),this.getNotice(),r["a"].then((function(e){t.kufuToken&&e.send({type:"login",data:t.kufuToken}),t.getService(),e.$on(["reply","chat"],(function(e){1==e.msn_type&&(e.msn=t.replace_em(e.msn)),t.recordList.push(e),setTimeout((function(e){t.$nextTick((function(){this.$refs.record.scrollTop=this.$refs.record.scrollHeight-this.$refs.record.clientHeight}))}),300)})),e.$on("to_transfer",(function(i){t.toUid=i.toUid,e.send({data:{id:t.toUid},type:"to_chat"})})),e.$on("socket_error",(function(){t.$Message.error("连接失败")})),e.$on("err_tip",(function(e){t.$Message.error(e.msg)})),e.$on("success",(function(e){t.is_tourist=0}))})),this.text=this.replace_em("[em-smiling_imp]")},beforeDestroy:function(){this.socket.close()},methods:{onLook:function(t){window.open("".concat(location.origin,"/home/goods_detail/").concat(t))},closeChange:function(t){this.change=t},sendMsg:function(t,e){var i={type:"chat",data:{msn:t,type:e,is_tourist:this.is_tourist,to_uid:this.toUid,tourist_uid:this.tourist_uid,tourist_avatar:this.tourist_avatar,form_type:this.$wechat.isWeixin()?1:3}};r["a"].then((function(t){t.send(i)}))},getService:function(){var t=this;Object(d["P"])({token:this.kufuToken||""}).then((function(e){t.serviceData=e.data,t.upperId=0,t.toUid=e.data.uid,t.tourist_uid=e.data.tourist_uid,t.tourist_avatar=e.data.tourist_avatar;var i={data:{id:e.data.uid,tourist_uid:t.tourist_uid},type:"to_chat"};r["a"].then((function(t){t.send(i)})),t.kufuToken&&t.getRecordList()})).catch((function(e){t.$Message.error(e.msg),t.change=!0}))},roomClick:function(t){},ctrlEnter:function(t){13==t.keyCode&&t.preventDefault(),this.chatCont.trim()&&this.sendMessage()},close:function(){this.$emit("chat-close")},selectEmoji:function(t){var e="[".concat(t,"]");this.chatCont+=e,this.emojiShow=!1},replace_em:function(t){return t=t.replace(/\[em-([\s\S]*)\]/g,"<span class='em em-$1'/></span>"),t},onScroll:function(t){t.target.scrollTop<=30&&this.kufuToken&&this.getRecordList()},getRecordList:function(){var t=this;this.loading||this.finished||(this.loading=!0,Object(d["g"])({uid:this.serviceData.uid,limit:this.limit,upperId:this.upperId,token:this.kufuToken}).then((function(e){if(0===e.data.length)return t.loading=!1;e.data.forEach((function(e){1==e.msn_type&&(e.msn=t.replace_em(e.msn))}));var i="";i=0==t.upperId?"chat_".concat(e.data[e.data.length-1].id):"chat_".concat(t.recordList[0].id),t.recordList=[].concat(Object(s["a"])(e.data),Object(s["a"])(t.recordList)),t.upperId=e.data.length>0?e.data[0].id:0,t.loading=!1,t.finished=e.data.length<t.limit,t.$nextTick((function(){this.setPageScrollTo(i)}))})).catch((function(e){t.$Message.error(e.msg),t.loading=!1})))},setPageScrollTo:function(t){var e=this;this.$nextTick((function(){if(t)setTimeout((function(){var i=parseFloat(document.getElementById(t).offsetTop)-60;e.$refs.record.scrollTop=i}),0);else{var i=document.querySelector("#chat_scroll");e.$refs.record.scrollTop=i.offsetHeight,setTimeout((function(t){e.$refs.record.scrollTop!=e.$refs.scrollBox.offsetHeight&&(e.$refs.record.scrollTop=document.querySelector("#chat_scroll").offsetHeight)}),300)}}))},emojiSwitch:function(){this.emojiShow=!this.emojiShow},sendMessage:function(){this.sendMsg(this.chatCont,1),this.chatCont=""},chat:function(t){var e=this;t.uid!=this.$auth.user.uid&&this.audio&&this.audio.play(),this.recordList.push(t),this.$nextTick((function(){e.$refs.record.scrollTop=e.$refs.record.scrollHeight-e.$refs.record.clientHeight}))},sendGoods:function(){var t=this;this.chatOptions.goodsId&&r["a"].then((function(e){e.send({data:{msn:t.chatOptions.goodsId,type:5,to_uid:t.toUid},type:"to_chat"})}))},sendOrder:function(){var t=this;this.chatOptions.orderId&&r["a"].then((function(e){e.send({data:{msn:t.chatOptions.orderId,type:6,to_uid:t.toUid},type:"to_chat"})}))},chatEnd:function(){navigator.userAgent.indexOf("MSIE")>0?navigator.userAgent.indexOf("MSIE 6.0")>0?(window.opener=null,window.close()):(window.open("","_top"),window.top.close()):navigator.userAgent.indexOf("Firefox")>0?window.location.href="about:blank ":(window.opener=null,window.open("","_self",""),window.close())},getNotice:function(){var t=this;Object(d["k"])().then((function(e){t.notice=e.data.content}))},beforeUpload:function(t){var e=this;this.uploadData={filename:t,token:this.kufuToken};var i=new Promise((function(t){e.$nextTick((function(){t(!0)}))}));return i},handleFormatError:function(t){this.$Message.error("上传图片只能是 jpg、jpg、jpeg、gif 格式!")},uploadSuccess:function(t){this.sendMsg(t.data.url,3)},uploadError:function(t){this.$Message.error(t)}}},w=k,y=(i("1201"),Object(v["a"])(w,o,n,!1,null,"087cccd9",null));e["default"]=y.exports},f9db:function(t,e,i){}}]);
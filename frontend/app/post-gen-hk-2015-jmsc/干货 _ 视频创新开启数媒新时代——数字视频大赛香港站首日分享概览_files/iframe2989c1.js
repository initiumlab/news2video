define("biz_wap/utils/storage.js",[],function(){
"use strict";
function t(t){
if(!t)throw"require function name.";
this.key=t,this.init();
}
var e="__WXLS__";
return t.getItem=function(t){
return t=e+t,localStorage.getItem(t);
},t.setItem=function(n,r){
n=e+n;
for(var i=3;i--;)try{
localStorage.setItem(n,r);
break;
}catch(a){
t.clear();
}
},t.clear=function(){
var t,n;
for(t=localStorage.length-1;t>=0;t--)n=localStorage.key(t),0==n.indexOf(e)&&localStorage.removeItem(n);
},t.prototype={
constructor:t,
init:function(){
this.check();
},
getData:function(){
var e=t.getItem(this.key)||"{}";
return e=JSON.parse(e);
},
check:function(){
var e,n,r=this.getData(),i={},a=+new Date;
for(e in r)n=r[e],+n.exp>a&&(i[e]=n);
t.setItem(this.key,JSON.stringify(i));
},
set:function(e,n,r){
var i=this.getData();
i[e]={
val:n,
exp:r||+new Date
},t.setItem(this.key,JSON.stringify(i));
},
get:function(t){
var e=this.getData();
return e=e[t],e?e.val||null:null;
},
remove:function(e){
var n=this.getData();
n[e]&&delete n[e],t.setItem(this.key,JSON.stringify(n));
}
},t;
});define("biz_common/tmpl.js",[],function(){
"use strict";
var n=function(n,t){
var r=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+n.replace(/[\r\t\n]/g," ").split("<#").join("	").replace(/((^|#>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)#>/g,"',$1,'").split("	").join("');").split("#>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");
return r(t);
},t=function(t,r){
return n(document.getElementById(t).innerHTML,r);
};
return{
render:t,
tmpl:n
};
});define("appmsg/img_copyright_tpl.html.js",[],function(){
return'<span class="original_img_wrp">            \n    <span class="tips_global">来自: <#=source_nickname#></span>\n</span>    ';
});define("appmsg/ad_tpl.html.js",[],function(){
return'<div class="rich_media_extra" id="gdt_area">\n    <# if(pos_type==0){ #>\n    <div class="rich_tips with_line title_tips">\n        <span class="tips">广告</span>\n    </div>\n    <# } #>\n    <div class="js_ad_link extra_link" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>">\n        <# if(pt==1){ #>\n        <#=hint_txt#>\n        <img class="icon_arrow_gray" src="<%@GetResFullName($images_path$icon/common/icon_arrow_gray.png)%>">\n        <img class="icon_loading_white icon_after" style="display:none;" id="loading_<#=traceid#>" src="<%@GetResFullName($images_path$icon/common/icon_loading_white.gif)%>">\n        <# }else if(pt==2){ #>\n        <!--第三方logo-->\n        <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n        <div class="brand_logo"><img src="<#=logo#>" alt="logo图片"></div>\n        <# } #>\n        <img class="appmsg_banner" src="<#=image_url#>">\n        <# if(watermark_type!=0){ #><i class="promotion_tag"><# if(watermark_type==1){ #>商品推广<# }else if (watermark_type==2){ #>活动推广<# }else if (watermark_type==3){ #>应用下载<# } #></i><# } #>\n        <# }else if(pt==7){ #>\n        <!-- 图文 -->\n        <div class="preview_group preview_card">\n            <div class="preview_group_inner card_inner">\n                <div class="preview_group_info">\n                    <strong class="preview_group_title2"><#=hint_txt#></strong>\n                    <div class="preview_group_desc"><#=ad_desc#></div>\n                    <img src="<#=image_url#>" alt="" class="preview_card_avatar">\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==100){ #>\n        <div class="preview_group">\n            <div class="preview_group_inner">\n                <div class="preview_group_info append_btn">\n                    <strong class="preview_group_title"><#=biz_info.nick_name#></strong>\n                    <div class="preview_group_desc"><#=hint_txt#></div>\n                    <# if(!!biz_info.head_img){ #>\n                    <img src="<#=biz_info.head_img#>" alt="" class="preview_group_avatar br_radius">\n                    <# }else{ #>\n                    <img class="preview_group_avatar br_radius" src="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0" alt="<#=biz_info.nick_name#>">\n                    <# } #>                                 \n                </div>\n                <div class="preview_group_opr">\n                    <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="btn btn_inline btn_primary btn_line js_ad_btn" href="javascript:void(0);">查看</a>\n                    <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="btn btn_inline btn_line  btn_primary js_ad_btn" href="javascript:void(0);">关注</a>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==102){ #>\n        <div class="preview_group">\n            <div class="preview_group_inner">\n                <div class="preview_group_info append_btn">\n                    <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                    <div class="preview_group_desc"><#=hint_txt#></div>\n                    <img src="<#=app_info.icon_url#>" alt="" class="preview_group_avatar br_radius">\n                </div>\n                <div class="preview_group_opr">\n                    <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn btn_download" href="javascript:void(0);">下载</a>\n                </div>\n            </div>\n        </div>\n        <# }else if(pt==101){ #>\n        <div class="preview_group preview_card">\n            <div class="preview_group_inner card_inner">                            \n                <div class="preview_group_info append_btn">\n                    <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                    <div class="preview_group_desc"><#=hint_txt#></div>\n                    <img src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar">                               \n                </div>\n                <div class="preview_group_opr">\n                    <a href="javascript:void(0);" id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn">下载</a>\n                </div>\n            </div>                        \n        </div>\n        <# }else if(pt==103||pt==104){ #>\n        <div class="preview_group obvious_app">\n            <div class="preview_group_inner">\n                <div class="pic_app">\n                    <img src="<#=image_url#>" alt="">\n                </div>\n                <div class="info_app">\n                    <p class="name_app"><#=app_info.app_name#></p>\n                    <# if(pt==103){ #>\n                    <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._category#></span><em>|</em><span class="compacity"><#=app_info._app_size#></span></p>\n                    <# } else if(pt==104){ #>\n                    <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._app_size#></span><em>|</em><span class="compacity"><#=app_info._down_count#></span></p>\n                    <# } #>\n                    <!--星级评分-->\n                    <p class="grade_app" id="js_app_rating_<#=pos_type#>">\n                        <!--\n                            半星：star_half\n                            一星：star_one\n                            一星半：star_one_half\n                            二星：star_two\n                            三星：star_three\n                            四星：star_four\n                            五星：star_five\n                        -->\n                        <span class="js_stars stars" style="display:none;"></span>\n                        <!--暂无评分\n                        <span class="scores">3.5</span>\n                        -->\n                        <span class="js_scores scores"></span>\n                    </p>\n                    <div class="dm_app">\n                        <a href="javascript:void(0);" id="js_appdetail_action_<#=pos_type#>" class="ad_btn btn_download js_ad_btn">下载</a>\n                        <p class="extra_info">来自<# if(pt==103){ #>App Store<# }else{ #>腾讯应用宝<# } #></p>\n                    </div>\n                </div>\n            </div>            \n        </div>\n        <# }else if(pt==105){ #>\n        <div class="mpda_card cardticket">\n            <div class="cardticket_hd cell">\n                <div class="cell_hd">\n                    <span class="radius_avatar">\n                        <img class="avatar" src="<#=card_info.card_logo_url#>">\n                    </span>\n                </div>\n                <div class="cell_bd cell_primary"><#=card_info.card_title#></div>\n                <div class="cell_ft">\n                    <a href="javascript:void(0);"  class="btn btn_plain_primary btn_inline js_ad_btn" id="js_card_action_<#=pos_type#>">领券</a>\n                </div>\n            </div>\n            <div class="cardticket_ft">\n                <div class="cardticket_theme"></div>\n                <p class="cardticket_source tips_global"><#=card_info.card_brand_name#></p>\n            </div>\n        </div>\n        <# } #>\n    </div>\n</div>';
});define("biz_common/ui/imgonepx.js",[],function(){
"use strict";
return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJDQzA1MTVGNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDQzA1MTYwNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkNDMDUxNUQ2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkNDMDUxNUU2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6p+a6fAAAAD0lEQVR42mJ89/Y1QIABAAWXAsgVS/hWAAAAAElFTkSuQmCC";
});define("biz_common/dom/attr.js",[],function(){
"use strict";
function t(t,e,n){
return"undefined"==typeof n?t.getAttribute(e):t.setAttribute(e,n);
}
function e(t,e,n,r){
t.style.setProperty?(r=r||null,t.style.setProperty(e,n,r)):"undefined"!=typeof t.style.cssText&&(r=r?"!"+r:"",
t.style.cssText+=";"+e+":"+n+r+";");
}
return{
attr:t,
setProperty:e
};
});define("biz_wap/utils/ajax.js",["biz_common/utils/url/parse.js"],function(e){
"use strict";
function t(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),"undefined"!=typeof wxtoken&&(t.wxtoken=wxtoken),
"undefined"!=typeof top.window.devicetype&&(t.devicetype=top.window.devicetype),
"undefined"!=typeof top.window.clientversion&&(t.clientversion=top.window.clientversion),
t.x5=i?"1":"0",o.join(e,t);
}
function n(e){
var n=(e.type||"GET").toUpperCase(),o=t(e.url),i="undefined"==typeof e.async?!0:e.async,r=new XMLHttpRequest,s=null,u=null;
if("object"==typeof e.data){
var a=e.data;
u=[];
for(var d in a)a.hasOwnProperty(d)&&u.push(d+"="+encodeURIComponent(a[d]));
u=u.join("&");
}else u="string"==typeof e.data?e.data:null;
r.open(n,o,i),r.onreadystatechange=function(){
3==r.readyState&&e.received&&e.received(r),4==r.readyState&&(r.onreadystatechange=null,
r.status>=200&&r.status<400?e.success&&e.success(r.responseText):e.error&&e.error(r),
clearTimeout(s),e.complete&&e.complete(),e.complete=null);
},"POST"==n&&r.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
r.setRequestHeader("X-Requested-With","XMLHttpRequest"),"undefined"!=typeof e.timeout&&(s=setTimeout(function(){
r.abort("timeout"),e.complete&&e.complete(),e.complete=null;
},e.timeout));
try{
r.send(u);
}catch(p){
e.error&&e.error();
}
}
var o=e("biz_common/utils/url/parse.js"),i=-1!=navigator.userAgent.indexOf("TBS/");
return n;
});define("biz_common/utils/string/html.js",[],function(){
"use strict";
return String.prototype.html=function(t){
var e=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
}
};
});define("appmsg/report.js",["biz_common/dom/event.js","biz_common/utils/huatuo.js","biz_wap/utils/ajax.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function t(){
var t=(e("biz_wap/utils/mmversion.js"),e("biz_common/utils/report.js"),e("biz_common/utils/monitor.js")),a=!1,s=window.performance||window.msPerformance||window.webkitPerformance;
return function(){
return;
}(),s&&s.timing&&s.timing.navigationStart?(a=s.timing.navigationStart,function(){
return;
}(),function(){
function e(){
if(-1==n.indexOf("NetType/"))return!1;
for(var e=["2G","cmwap","cmnet","uninet","uniwap","ctwap","ctnet"],t=0,i=e.length;i>t;++t)if(-1!=n.indexOf(e[t]))return!0;
return!1;
}
var i=write_sceen_time-a,s=first_sceen__time-a,d=page_endtime-a,m=window.logs.jsapi_ready_time?window.logs.jsapi_ready_time-a:void 0,w=window.logs.a8key_ready_time?window.logs.a8key_ready_time-a:void 0,g=c&&c.connectEnd-c.connectStart,p=c&&c.secureConnectionStart&&c.connectEnd-c.secureConnectionStart;
if(window.logs.pagetime.wtime=i,window.logs.pagetime.ftime=s,window.logs.pagetime.ptime=d,
window.logs.pagetime.jsapi_ready_time=m,window.logs.pagetime.a8key_ready_time=w,
Math.random()<.01){
var c=window.performance&&window.performance.timing,u={
28:d,
29:s,
30:i,
31:m,
32:w,
33:g,
34:p
};
o.setFlags(1636,1,1);
for(var f in u)!u[f]||u[f]<0||o.setPoint(f,u[f]);
o.report();
}
if(need_report_cost&&r({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["1,1,"+d,"1,2,"+s,"1,3,"+i,"1,4,"+m,"1,5,"+w,"1,6,"+g,"1,7,"+p].join(";")
}
}),!(Math.random()>.2||0>i||0>s||0>d)){
if(m&&t.setAvg(27822,15,m),w&&t.setAvg(27822,17,w),d>=15e3)return t.setAvg(27822,29,d),
void t.send();
t.setAvg(27822,1,d).setAvg(27822,3,i).setAvg(27822,5,s),window.isWeixinCached&&t.setAvg(27822,19,d),
e()?(t.setAvg(27822,9,d),window.isWeixinCached&&t.setAvg(27822,23,d)):"wifi"==networkType?(t.setAvg(27822,7,d),
window.isWeixinCached&&t.setAvg(27822,21,d)):"2g/3g"==networkType?(t.setAvg(27822,11,d),
window.isWeixinCached&&t.setAvg(27822,25,d)):(t.setAvg(27822,13,d),window.isWeixinCached&&t.setAvg(27822,28,d)),
t.send();
}
}(),function(){
window.logs.jsapi_ready_fail&&(t.setSum(24729,55,window.logs.jsapi_ready_fail),t.send());
}(),function(){
var e=document.getElementById("js_toobar3"),t=document.getElementById("page-content"),n=window.innerHeight||document.documentElement.clientHeight;
if(t&&!(Math.random()>.1)){
var o=function(){
var r=window.pageYOffset||document.documentElement.scrollTop,a=e.offsetTop;
if(r+n>=a){
for(var d,m,w=t.getElementsByTagName("img"),g={},p=[],c=0,u=0,f=0,l=0,v=w.length;v>l;++l){
var _=w[l];
d=_.getAttribute("data-src")||_.getAttribute("src"),m=_.getAttribute("src"),d&&(d.isCDN()?u++:f++,
c++,g[m]={});
}
if(p.push("1="+1e3*c),p.push("2="+1e3*u),p.push("3="+1e3*f),s.getEntries){
var h=s.getEntries(),y=window.logs.img.download,j=[0,0,0],A=[0,0,0];
c=u=0;
for(var l=0,b=h.length;b>l;++l){
var k=h[l],T=k.name;
T&&"img"==k.initiatorType&&g[T]&&(T.isCDN()&&(A[0]+=k.duration,u++),j[0]+=k.duration,
c++,g[T]={
startTime:k.startTime,
responseEnd:k.responseEnd
});
}
j[0]>0&&c>0&&(j[2]=j[0]/c),A[0]>0&&u>0&&(A[2]=A[0]/u);
for(var l in y)if(y.hasOwnProperty(l)){
for(var M=y[l],E=0,x=0,z=0,C=0,S=0,v=M.length;v>S;++S){
var d=M[S];
if(g[d]&&g[d].startTime&&g[d].responseEnd){
var N=g[d].startTime,W=g[d].responseEnd;
E=Math.max(E,W),x=x?Math.min(x,N):N,d.isCDN()&&(z=Math.max(E,W),C=x?Math.min(x,N):N);
}
}
j[1]+=Math.round(E-x),A[1]+=Math.round(z-C);
}
for(var I=4,P=7,l=0;3>l;l++)j[l]=Math.round(j[l]),A[l]=Math.round(A[l]),j[l]>0&&(p.push(I+l+"="+j[l]),
"wifi"==networkType?p.push(I+l+6+"="+j[l]):"2g/3g"==networkType&&p.push(I+l+12+"="+j[l])),
A[l]>0&&(p.push(P+l+"="+A[l]),"wifi"==networkType?p.push(P+l+6+"="+A[l]):"2g/3g"==networkType&&p.push(P+l+12+"="+A[l]));
}
i.off(window,"scroll",o,!1);
}
};
i.on(window,"scroll",o,!1);
}
}(),void function(){
if(!(Math.random()>.001)){
var e=document.createElement("iframe"),t=[600,800,1e3,1200,1500,2e3,3e3,5e3,1e4,18e3],i=Math.ceil(10*Math.random())-1,n=uin+mid+idx+Math.ceil(1e3*Math.random())+(new Date).getTime();
e.style.display="none",e.id="js_ajax",e.setAttribute("data-time",i),e.src="/mp/iframetest?action=page&traceid="+n+"&devicetype="+devicetype+"&timeout="+t[i];
var o=document.getElementById("js_article");
o.appendChild(e);
}
}()):!1;
}
var i=e("biz_common/dom/event.js"),n=navigator.userAgent,o=e("biz_common/utils/huatuo.js"),r=e("biz_wap/utils/ajax.js");
e("appmsg/cdn_img_lib.js"),i.on(window,"load",function(){
if(""==networkType&&window.isInWeixinApp()){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
JSAPI.invoke("getNetworkType",{},function(i){
networkType=e[i.err_msg],t();
});
}else t();
},!1);
});define("biz_common/dom/class.js",[],function(){
"use strict";
function s(s,a){
return s.classList?s.classList.contains(a):s.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"));
}
function a(s,a){
s.classList?s.classList.add(a):this.hasClass(s,a)||(s.className+=" "+a);
}
function e(a,e){
if(a.classList)a.classList.remove(e);else if(s(a,e)){
var c=new RegExp("(\\s|^)"+e+"(\\s|$)");
a.className=a.className.replace(c," ");
}
}
function c(c,l){
s(c,l)?e(c,l):a(c,l);
}
return{
hasClass:s,
addClass:a,
removeClass:e,
toggleClass:c
};
});define("appmsg/report_and_source.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(require,exports,module){
"use strict";
function viewSource(){
var redirectUrl=sourceurl.indexOf("://")<0?"http://"+sourceurl:sourceurl;
if(-1!=redirectUrl.indexOf("mp.weixin.qq.com/s")||-1!=redirectUrl.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var redirectUrlArr=redirectUrl.split("#");
redirectUrl=ParseJs.addParam(redirectUrlArr[0],"scene",25,!0)+(redirectUrlArr[1]?"#"+redirectUrlArr[1]:""),
redirectUrl=redirectUrl.replace(/#rd$/g,"#wechat_redirect");
}else redirectUrl="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(sourceurl);
var opt={
url:"/mp/advertisement_report"+location.search+"&report_type=3&action_type=0&url="+encodeURIComponent(sourceurl)+"&__biz="+biz+"&r="+Math.random(),
type:"GET",
async:!1
};
return tid?opt.success=function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0==res.ret?location.href=redirectUrl:viewSource();
}:(opt.timeout=2e3,opt.complete=function(){
location.href=redirectUrl;
}),ajax(opt),!1;
}
require("biz_common/utils/string/html.js");
var DomEvent=require("biz_common/dom/event.js"),ParseJs=require("biz_common/utils/url/parse.js"),ajax=require("biz_wap/utils/ajax.js"),title=msg_title.htmlDecode(),sourceurl=msg_source_url.htmlDecode(),js_report_article=document.getElementById("js_report_article3"),JSAPI=require("biz_wap/jsapi/core.js");
DomEvent.tap(js_report_article,function(){
var e=["/mp/infringement?url=",encodeURIComponent(location.href),"&title=",encodeURIComponent(title),"&__biz=",biz].join("");
return location.href=e+"#wechat_redirect",!1;
});
var js_view_source=document.getElementById("js_view_source");
DomEvent.on(js_view_source,"click",function(){
return viewSource(),!1;
});
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js"],function(e){
"use strict";
function t(e){
for(var t=5381,n=0;n<e.length;n++)t=(t<<5)+t+e.charCodeAt(n),t&=2147483647;
return t;
}
function n(e,t){
if(e&&!(e.length<=0))for(var n,o,i,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,l=0,m=e.length;m>l;++l)n=e[l],
n&&(o=n.getAttribute(t),o&&(i=o.match(a),i&&i[2]&&(w[i[2]]=!0)));
}
function o(e){
for(var t=0,n=f.length;n>t;++t)if(f[t]==e)return!0;
return!1;
}
function i(){
w={},n(document.getElementsByTagName("a"),"href"),n(document.getElementsByTagName("link"),"href"),
n(document.getElementsByTagName("iframe"),"src"),n(document.getElementsByTagName("script"),"src"),
n(document.getElementsByTagName("img"),"src");
var e=[];
for(var t in w)w.hasOwnProperty(t)&&(window.networkType&&"wifi"==window.networkType&&!_&&o(t)&&(_=!0),
e.push(t));
return w={},e.join(",");
}
function a(){
var e,t=window.pageYOffset||document.documentElement.scrollTop,n=document.getElementById("js_content"),o=document.documentElement.clientHeight||window.innerHeight,a=document.body.scrollHeight||document.body.offsetHeight,l=Math.ceil(a/o),r=Math.ceil((n.scrollHeight||n.offsetHeight)/o),d=(window.logs.read_height||t)+o,g=document.getElementById("js_toobar3").offsetTop,w=n.getElementsByTagName("img")||[],f=Math.ceil(d/o)||1,u=document.getElementById("media"),p=50,h=0,b=0,v=0,y=0,T=d+p>g?1:0;
f>l&&(f=l);
var j=function(t){
if(t)for(var n=0,o=t.length;o>n;++n){
var i=t[n];
if(i){
h++;
var a=i.getAttribute("src"),l=i.getAttribute("data-type");
a&&0==a.indexOf("http")&&(b++,a.isCDN()&&(v++,-1!=a.indexOf("tp=webp")&&y++),l&&(e["img_"+l+"_cnt"]=e["img_"+l+"_cnt"]||0,
e["img_"+l+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=y||0,e.download_img_cnt=b||0,e.download_cdn_img_cnt=v||0,
e.img_cnt=h||0;
},O=window.appmsgstat||{},x=window.logs.img||{},z=window.logs.pagetime||{},E=x.load||{},D=x.read||{},B=[],N=[],k=0,S=0,I=0;
for(var H in D)H&&0==H.indexOf("http")&&D.hasOwnProperty(H)&&N.push(H);
for(var H in E)H&&0==H.indexOf("http")&&E.hasOwnProperty(H)&&B.push(H);
for(var M=0,Y=B.length;Y>M;++M){
var P=B[M];
P&&P.isCDN()&&(-1!=P.indexOf("/0")&&k++,-1!=P.indexOf("/640")&&S++,-1!=P.indexOf("/300")&&I++);
}
var e={
__biz:biz,
title:msg_title.htmlDecode(),
mid:mid,
idx:idx,
read_cnt:O.read_num||0,
like_cnt:O.like_num||0,
screen_height:o,
screen_num:r,
video_cnt:window.logs.video_cnt||0,
read_screen_num:f||0,
is_finished_read:T,
scene:source,
content_len:c.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
img_640_cnt:S,
img_0_cnt:k,
img_300_cnt:I,
wtime:z.wtime||0,
ftime:z.ftime||0,
ptime:z.ptime||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=B.length,
e.wifi_read_imgs_cnt=N.length),window.logs.webplog&&4==window.logs.webplog.total){
var A=window.logs.webplog;
e.webp_total=1,e.webp_lossy=A.lossy,e.webp_lossless=A.lossless,e.webp_alpha=A.alpha,
e.webp_animation=A.animation;
}
j(!!u&&u.getElementsByTagName("img")),j(w);
var C=(new Date).getDay(),J=i();
(_||0!==user_uin&&Math.floor(user_uin/100)%7==C)&&(e.domain_list=J),_&&(e.html_content=s),
m({
url:"/mp/appmsgreport?action=page_time",
type:"POST",
data:e,
async:!1,
timeout:2e3
});
}
e("biz_common/utils/string/html.js");
{
var l=e("biz_common/dom/event.js"),m=e("biz_wap/utils/ajax.js");
e("biz_common/utils/cookie.js");
}
e("appmsg/cdn_img_lib.js");
var s,r=e("biz_wap/utils/storage.js"),d=new r("ad"),g=new r("page_pos"),c={};
!function(){
if(s=document.getElementsByTagName("html"),s&&1==!!s.length){
s=s[0].innerHTML;
var e=s.replace(/[\x00-\xff]/g,""),t=s.replace(/[^\x00-\xff]/g,"");
c.content_length=1*t.length+3*e.length+"<!DOCTYPE html><html></html>".length;
}
window.logs.pageinfo=c;
}();
var w={},_=!1,f=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],u=null,p=0,h=msg_link.split("?").pop(),b=t(h);
!function(){
if(!localStorage.getItem("clear_page_pos")){
for(var e=localStorage.length-1;e>=0;){
var t=localStorage.key(e);
t.match(/^\d+$/)?localStorage.removeItem(t):t.match(/^adinfo_/)&&localStorage.removeItem(t),
e--;
}
localStorage.setItem("clear_page_pos","true");
}
}(),window.localStorage&&(l.on(window,"load",function(){
p=1*g.get(b);
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var n=t.offsetTop;
window.scrollTo(0,n-25);
}else window.scrollTo(0,p);
}),l.on(window,"unload",function(){
if(g.set(n,p,+new Date+72e5),window._adRenderData&&"undefined"!=typeof JSON&&JSON.stringify){
var e=JSON.stringify(window._adRenderData),t=+new Date,n=[biz,sn,mid,idx].join("_");
d.set(n,{
info:e,
time:t
},+new Date+24e4);
}
a();
}),window.logs.read_height=0,l.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(u),u=setTimeout(function(){
p=window.pageYOffset,g.set(b,p,+new Date+72e5);
},500);
}),l.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(u),u=setTimeout(function(){
p=window.pageYOffset,g.set(b,p,+new Date+72e5);
},500);
}));
});define("appmsg/cdn_speed_report.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function n(){
function e(e){
var n=[];
for(var i in e)n.push(i+"="+encodeURIComponent(e[i]||""));
return n.join("&");
}
if(networkType){
var n=window.performance||window.msPerformance||window.webkitPerformance;
if(n&&"undefined"!=typeof n.getEntries){
var i,t,a=100,o=document.getElementsByTagName("img"),s=o.length,p=navigator.userAgent,m=!1;
/micromessenger\/(\d+\.\d+)/i.test(p),t=RegExp.$1;
for(var g=0,w=o.length;w>g;g++)if(i=parseInt(100*Math.random()),!(i>a)){
var d=o[g].getAttribute("src");
if(d&&!(d.indexOf("mp.weixin.qq.com")>=0)){
for(var f,c=n.getEntries(),_=0;_<c.length;_++)if(f=c[_],f.name==d){
r({
type:"POST",
url:"/mp/appmsgpicreport?__biz="+biz+"#wechat_redirect",
data:e({
rnd:Math.random(),
uin:uin,
version:version,
client_version:t,
device:navigator.userAgent,
time_stamp:parseInt(+new Date/1e3),
url:d,
img_size:o[g].fileSize||0,
user_agent:navigator.userAgent,
net_type:networkType,
appmsg_id:window.appmsgid||"",
sample:s>100?100:s,
delay_time:parseInt(f.duration)
})
}),m=!0;
break;
}
if(m)break;
}
}
}
}
}
var i=e("biz_common/dom/event.js"),t=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/ajax.js"),a={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
t.invoke("getNetworkType",{},function(e){
networkType=a[e.err_msg],n();
}),i.on(window,"load",n,!1);
});define("appmsg/voice.js",["biz_common/utils/string/html.js","pages/voice_component.js"],function(e){
"use strict";
function t(){
return p("js_content")?(m._oElements=js_content.getElementsByTagName("mpvoice")||[],
m._oElements.length<=0?!1:!0):!1;
}
function i(){
m.musicLen=m._oElements.length;
}
function n(){
for(var e=0,t=0;t<m.musicLen;t++){
var i=m._oElements[t],n={};
n.voiceid=s(decodeURIComponent(i.getAttribute("voice_encode_fileid")||"")),n.voiceid=n.voiceid.replace(/&#61;/g,"="),
n.src=m.srcRoot.replace("#meidaid#",n.voiceid),n.voiceid&&"undefined"!=n.voiceid&&(o(i,n,e),
e++);
}
}
function o(e,t,i){
t.duration=1*e.getAttribute("play_length")||0,t.duration_str=a(t.duration),t.posIndex=i,
t.title=s(decodeURIComponent(e.getAttribute("name")||"")),d.renderPlayer("voice_tpl",t,e,!0),
c(t),m.musicList[t.voiceid+"_"+t.posIndex]=t;
}
function c(e){
var t=e.voiceid+"_"+e.posIndex,i=r(e.title);
e.player=d.init({
type:2,
songId:e.voiceid,
comment_id:"",
src:e.src,
duration:1*(e.duration/1e3).toFixed(2),
title:i.length>8?i.substr(0,8)+"...":i,
singer:window.nickname?window.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"playing",
playCssDom:p("voice_main_"+t),
playArea:p("voice_main_"+t),
progress:p("voice_progress_"+t)
});
}
function r(e){
return e=(e||"").replace(/&#96;/g,"`").replace(/&#61;/g,"=").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
}
function s(e){
return e=(e||"").replace(/&/,"&amp;").replace(/>/,"&gt;").replace(/</,"&lt;").replace(/"/,"&quot;").replace(/'/,"&#39;").replace(/=/,"&#61;").replace(/`/,"&#96;");
}
function a(e){
if(isNaN(e))return"0:00";
var t=new Date(0),i=new Date(1*e),n=i.getHours()-t.getHours(),o=i.getMinutes()+60*n,c="i:ss".replace(/i|I/g,o).replace(/ss|SS/,l(i.getSeconds(),2));
return c;
}
function l(e,t){
for(var i=0,n=t-(e+"").length;n>i;i++)e="0"+e;
return e+"";
}
function p(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var d=e("pages/voice_component.js"),m={
musicList:{},
musicLen:0,
srcRoot:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid=#meidaid#"
};
if(t())return i(),n(),m.musicList;
});define("appmsg/qqmusic.js",["biz_common/utils/string/html.js","pages/voice_component.js"],function(e){
"use strict";
function i(){
return o("js_content")?(l._oElements=js_content.getElementsByTagName("qqmusic")||[],
l._oElements.length<=0?!1:!0):!1;
}
function t(){
l.musicLen=l._oElements.length;
}
function n(){
for(var e=0,i=0;i<l.musicLen;i++){
var t=l._oElements[i],n={};
n.musicid=s(t.getAttribute("musicid")||""),n.comment_id=s(t.getAttribute("commentid")||""),
n.musicid&&"undefined"!=n.musicid&&n.comment_id&&"undefined"!=n.comment_id&&(m(t,n,e),
e++);
}
}
function m(e,i,t){
i.media_id=s(e.getAttribute("mid")||""),i.duration=e.getAttribute("play_length")||0,
i.posIndex=t,i.musicImgPart=s(e.getAttribute("albumurl")||""),i.music_img=l.imgroot+i.musicImgPart,
i.audiourl=s(e.getAttribute("audiourl")||""),i.singer=s(e.getAttribute("singer")||""),
i.music_name=s(e.getAttribute("music_name")||""),a.renderPlayer("qqmusic_tpl",i,e,!0),
c(i),l.musicList[i.musicid+"_"+i.posIndex]=i;
}
function c(e){
var i=e.musicid+"_"+e.posIndex,t=e.comment_id+"_"+e.posIndex,n=["http://i.y.qq.com/v8/playsong.html?songmid=",e.media_id,,"&ADTAG=weixin_gzh#wechat_redirect"].join(""),m=u(e.music_name);
e.player=a.init({
type:0,
comment_id:e.comment_id,
mid:e.media_id,
songId:e.musicid,
duration:1*(e.duration/1e3).toFixed(2),
title:m.length>8?m.substr(0,8)+"...":m,
singer:window.nickname?window.nickname+"推荐的歌":"公众号推荐的歌",
epname:"QQ音乐",
coverImgUrl:e.music_img,
playingCss:"qqmusic_playing",
playCssDom:o("qqmusic_main_"+t),
playArea:o("qqmusic_play_"+i),
detailUrl:n,
detailArea:o("qqmusic_home_"+i)
});
}
function u(e){
return e=(e||"").replace(/&#96;/g,"`").replace(/&#61;/g,"=").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
}
function s(e){
return e=(e||"").replace(/&/,"&amp;").replace(/>/,"&gt;").replace(/</,"&lt;").replace(/"/,"&quot;").replace(/'/,"&#39;").replace(/=/,"&#61;").replace(/`/,"&#96;");
}
function r(){}
function o(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var a=e("pages/voice_component.js"),l={
imgroot:"https://imgcache.qq.com/music/photo/mid_album_68",
musicList:{},
musicLen:0
};
if(i())return t(),n(),r(),l.musicList;
});define("appmsg/iframe.js",["new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
var t=0;
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight);
var i=e.parentElement;
if(i&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var o=e.contentWindow.document.getElementsByTagName("html");
o&&o.length&&(o[0].style.overflow="hidden");
}
}
function i(e,t){
t===!0?(d.checkOriTime=0,d.orientation!=window.orientation?(d.orientation=window.orientation,
window.mpVideoFullScreent(e)):i(e,!1)):d.checkOriTime<=2&&(d.checkOriTime++,setTimeout(function(){
d.orientation!=window.orientation?(d.checkOriTime=0,d.orientation=window.orientation,
window.mpVideoFullScreent(e)):i(e,!1);
},150));
}
function o(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=d.video_top.length,i=e+d.innerHeight,n=0,c=0;t>c;c++){
var m=d.video_top[c];
m.reported?n++:i>=m.start&&i<=m.end&&(m.reported=!0,r.report({
step:1,
vid:m.vid
}));
}
n==t&&(a.off(window,"scroll",o),d.video_top=d.video_iframe=o=null);
}
{
var n,r=e("new_video/ctl.js"),d={
mpVideoBotH:37,
checkOri:"orientation"in window,
innerHeight:window.innerHeight||document.documentElement.clientHeight,
video_iframe:[],
video_top:[]
},c=e("pages/version4video.js"),m=e("biz_common/dom/attr.js"),s=m.setProperty,a=e("biz_common/dom/event.js"),p=document.getElementsByTagName("iframe");
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var u=0,l=p.length;l>u;++u){
n=p[u];
var f=n.getAttribute("data-src")||"",v=n.className||"",h=n.getAttribute("src")||f;
if(!f||"#"==f){
var w=n.getAttribute("data-display-src");
if(w&&(0==w.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==w.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
w=w.replace(/&amp;/g,"&");
for(var g=w.split("&"),_=["/mp/newappmsgvote?action=show"],u=0;u<g.length;u++)(0==g[u].indexOf("__biz=")||0==g[u].indexOf("supervoteid="))&&_.push(g[u]);
_.length>1&&(f=_.join("&")+"#wechat_redirect");
}
}
if(c.isShowMpVideo()&&h&&(0==h.indexOf("http://v.qq.com/iframe/player.html")||0==h.indexOf("http://v.qq.com/iframe/preview.html")||0==h.indexOf("https://v.qq.com/iframe/player.html")||0==h.indexOf("https://v.qq.com/iframe/preview.html"))){
f=f.replace(/^http:/,location.protocol),f=f.replace(/preview.html/,"player.html");
var x=h.match(/[\?&]vid\=([^&]*)/),y=x[1],b=document.getElementById("js_content").offsetWidth,O=Math.ceil(3*b/4);
window.reportVid.push(y),d.video_iframe.push({
dom:n,
vid:y
}),h=["/mp/videoplayer?video_h=",O,"&scene=1&source=4&vid=",y,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join(""),
setTimeout(function(e,t,i,o){
return function(){
o.removeAttribute("style"),o.setAttribute("width",e),o.setAttribute("height",t+d.mpVideoBotH),
o.setAttribute("marginWidth",0),o.setAttribute("marginHeight",0),o.style.top="0",
o.setAttribute("src",i);
};
}(b,O,h,n),0);
}else if(f&&(f.indexOf("newappmsgvote")>-1&&v.indexOf("js_editor_vote_card")>=0||0==f.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&v.indexOf("card_iframe")>=0||f.indexOf("appmsgvote")>-1||f.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(f=f.replace(/^http:/,location.protocol),v.indexOf("card_iframe")>=0){
var k=f.replace("#wechat_redirect",["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(k+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
n.setAttribute("src",k);
}else{
var A=f.indexOf("#wechat_redirect")>-1,j=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?j+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join(""):v.indexOf("vote_iframe")>=0&&(j+=["&mid=",mid,"&idx=",idx].join(""));
var k=A?f.replace("#wechat_redirect",j):f+j;
n.setAttribute("src",k);
}
-1==f.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&!function(e){
e.onload=function(){
t(e);
};
}(n),n.appmsg_idx=u;
}
if(f&&f.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&b>0){
var H=b,q=3*H/4;
n.width=H,n.height=q,n.style.setProperty&&(n.style.setProperty("width",H+"px","important"),
n.style.setProperty("height",q+"px","important"));
}
}
var T="onorientationchange"in window?"orientationchange":"resize";
if(a.on(window,T,function(){
for(var e=document.getElementsByTagName("iframe"),t=0,o=e.length;o>t;t++){
var n=e[t],r=n.getAttribute("src");
r&&-1!=r.indexOf("/mp/videoplayer")&&n.className.indexOf("iframe_full_video")>=0&&setTimeout(function(e){
return function(){
d.checkOri?i(e,!0):window.mpVideoFullScreent(e);
};
}(n),0);
}
},!1),a.on(window,"resize",function(){
for(var e=document.getElementsByTagName("iframe"),t=0,i=e.length;i>t;t++){
var o=e[t],n=o.getAttribute("src");
n&&-1!=n.indexOf("/mp/videoplayer")&&setTimeout(function(e){
return function(){
var t=document.getElementById("js_content").offsetWidth,i=Math.ceil(3*t/4)+d.mpVideoBotH;
e.setAttribute("width",t),e.setAttribute("height",i);
};
}(o),100);
}
},!1),window.resetMpVideoH=function(e){
var t=document.getElementById("js_content").offsetWidth,i=Math.ceil(3*t/4)+d.mpVideoBotH;
return e.setAttribute("width",t),e.setAttribute("height",i),s(e,"position","static","important"),
!1;
},window.mpVideoFullScreent=function(e){
d.orientation=window.orientation||0;
var t=window.innerHeight,i=window.innerWidth,o=0;
if(d.checkOri&&90==Math.abs(d.orientation)){
var n=t;
t=i,i=n,o=0;
}
(e.getAttribute("height")!=t||e.getAttribute("width")!=i)&&setTimeout(function(){
s(e,"position","absolute","important"),e.setAttribute("width",i),e.setAttribute("height",t),
setTimeout(function(){
s(e,"position","fixed","important");
},20);
},0);
},window.iframe_reload=function(){
for(var e=0,i=p.length;i>e;++e){
n=p[e];
var o=n.getAttribute("src");
o&&(o.indexOf("newappmsgvote")>-1||o.indexOf("appmsgvote")>-1)&&t(n);
}
},"getElementsByClassName"in document)for(var B,E=document.getElementsByClassName("video_iframe"),u=0;B=E.item(u++);)B.setAttribute("scrolling","no"),
B.style.overflow="hidden";
d.video_iframe.length>0&&setTimeout(function(){
for(var e=d.video_iframe,t=document.getElementById("js_article"),i=0,n=e.length;n>i;i++){
var r=e[i];
if(!r||!r.dom)return;
for(var c=r.dom,m=c.offsetHeight,s=0;c&&t!==c;)s+=c.offsetTop,c=c.offsetParent;
d.video_top.push({
start:s+m/2,
end:s+m/2+d.innerHeight,
reported:!1,
vid:r.vid
});
}
o(),a.on(window,"scroll",o);
},0);
});
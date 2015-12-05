define("appmsg/index.js",["biz_wap/jsapi/a8key.js","biz_wap/utils/device.js","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","appmsg/share.js","biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","appmsg/pay_for_reading.js","appmsg/cache.js","appmsg/copyright_report.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/iframe.js","appmsg/qqmusic.js","appmsg/voice.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/report_and_source.js","biz_common/dom/class.js","appmsg/report.js"],function(e){
"use strict";
function t(){
function t(e,t){
var o={
lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
},n=new Image;
n.onload=function(){
var o=n.width>0&&n.height>0;
t(e,o);
},n.onerror=function(){
t(e,!1);
},n.src="data:image/webp;base64,"+o[e];
}
var o=document.getElementsByTagName("body");
if(!o||!o[0])return!1;
o=o[0],function(){
var e=(new Date).getHours(),t=function(e,t){
t=t||"",t=["uin:"+top.window.user_uin,"resp:"+t].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+t+"&r="+Math.random();
},o=e>=11&&17>=e&&Math.random()<1,n=function(e,n){
o&&t(e,n);
};
window.__report=t,window.__commonVideoReport=n;
}();
var i=/^http(s)?:\/\/mp\.weixin\.qq\.com\//g;
try{
if(top!=window&&(!top||top&&top.location.href&&i.test(top.location.href)))throw new Error("in iframe");
}catch(r){
var s="",a=new Image;
a.src=("http://mp.weixin.qq.com/mp/jsreport?key=4&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key4]"+s+"&r="+Math.random()).substr(0,1024);
}
window.isInWeixinApp()&&/#rd$/.test(location.href)&&!window.isWeixinCached&&location.replace(location.href.replace(/#rd$/,"#wechat_redirect"));
var c=e("biz_common/utils/url/parse.js");
e("appmsg/cdn_img_lib.js"),window.page_endtime=+new Date;
{
var p=e("biz_wap/utils/mmversion.js"),m=!p.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger");
-1!=navigator.userAgent.indexOf("WindowsWechat");
}
if(e("appmsg/share.js"),"mp.weixin.qq.com"==location.host){
var d=e("biz_common/log/jserr.js");
d({
key:0,
reporturl:"http://mp.weixin.qq.com/mp/jsreport?1=1",
replaceStr:/http(s)?:(.*?)js\//g
});
}
window.logs.webplog={
lossy:0,
lossless:0,
alpha:0,
animation:0,
total:0
};
var l=-1!=navigator.userAgent.indexOf("TBS/"),g=function(e,o){
t(e,function(e,t){
if(window.logs.webplog[e]=t?1:0,window.logs.webplog.total++,4==window.logs.webplog.total){
var n=window.logs.webplog,i=Math.random();
l&&1>=i&&(n.lossy=n.lossless=n.alpha=1,window.logs.webplog=n);
var r=n.lossy&n.lossless&n.alpha;
o(!!r);
}
});
},w=function(e){
g("lossy",e),g("lossless",e),g("alpha",e),g("animation",e);
};
window.webp=!1,w(function(t){
window.webp=t,t&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1"),
window.logs.img={
download:{},
read:{},
load:{}
};
var o=document.getElementById("js_cover");
if(o){
var n=o.getAttribute("data-src");
if(n){
if(n.isCDN()){
var i=new Date;
for(i.setFullYear(2014,9,1);-1!=n.indexOf("?tp=webp");)n=n.replace("?tp=webp","");
for(;-1!=n.indexOf("&tp=webp");)n=n.replace("&tp=webp","");
1e3*ct>=i.getTime()&&""!=img_format&&"gif"!=img_format&&(n=n.replace(/\/0$/,"/640"),
n=n.replace(/\/0\?/,"/640?"),o.dataset&&(o.dataset.s="300,640")),t&&(n=c.addParam(n,"tp","webp",!0)),
n=c.addParam(n,"wxfrom","5",!0),is_https_res&&(n=n.http2https());
}
o.setAttribute("src",n),window.logs.img.read[n]=!0,window.logs.img.load[n]=!0,o.removeAttribute("data-src");
}
}
var r=e("biz_wap/ui/lazyload_img.js");
new r({
attrKey:"data-src",
lazyloadHeightWhenWifi:function(){
var e,t=1,o=1;
e=window.svr_time?new Date(1e3*window.svr_time):new Date;
var n=e.getHours();
return n>=20&&23>n&&(t=.5,o=0),{
bottom:t,
top:o
};
},
inImgRead:function(e){
e&&(window.logs.img.read[e]=!0);
},
changeSrc:function(e,t){
if(!t)return"";
for(var o=t;-1!=o.indexOf("?tp=webp");)o=o.replace("?tp=webp","");
for(;-1!=o.indexOf("&tp=webp");)o=o.replace("&tp=webp","");
t.isCDN()&&((e.dataset&&e.dataset.s||-1!=t.indexOf("wx_fmt=")&&-1==t.indexOf("wx_fmt=gif"))&&(o=o.replace(/\/0$/,"/640"),
o=o.replace(/\/0\?/,"/640?")),window.webp&&(o=c.addParam(o,"tp","webp",!0)),o=c.addParam(o,"wxfrom","5",!0),
is_https_res&&(o=o.http2https()));
var n=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
return o=o.replace(n,"http://m.qpic.cn"),o=c.addParam(o,"wx_lazy","1",!0),window.logs.img.load[o]=!0,
o;
},
onerror:function(e){
if(e&&e.isCDN()){
var t=10;
/tp\=webp/.test(e)&&(t=11);
var o=new Image;
o.src="http://mp.weixin.qq.com/mp/jsreport?key="+t+"&content="+(encodeURIComponent(e)+"["+uin+"]")+"&r="+Math.random();
}
},
detect:function(e){
if(e&&e.time&&e.loadList){
var t=e.time,o=e.loadList;
window.logs.img.download[t]=o;
}
},
container:document.getElementById("page-content")
});
}),e("appmsg/async.js"),e("appmsg/pay_for_reading.js"),e("appmsg/cache.js");
var u=e("appmsg/copyright_report.js"),A=e("biz_common/dom/event.js"),f=e("biz_wap/jsapi/core.js");
!function(){
var e=document.getElementById("post-user"),t=document.getElementById("copyright_info"),o=[];
if(e){
var n="57";
"26"==window.source&&(n="95"),"28"==window.source&&(n="96"),o.push({
dom:e,
username:user_name_new||user_name,
scene:n
});
}
t&&source_username&&o.push({
dom:t,
username:source_username,
profile_ext_signature:profile_ext_signature,
scene:"84"
});
for(var i=0,r=o.length;r>i;i++)!function(e){
A.on(e.dom,"click",function(){
return"copyright_info"==e.dom.id&&source_username?(u.card_click_report({
scene:"0"
}),location.href="https://mp.weixin.qq.com/mp/profile_ext?action=home&username="+e.username+"&sn="+e.profile_ext_signature+"&scene=1#wechat_redirect"):f.invoke("profile",{
username:e.username,
scene:e.scene
}),!1;
}),p.isWp&&e.dom.setAttribute("href","weixin://profile/"+e.username);
}(o[i]);
}(),function(){
location.href.match(/fontScale=\d+/)&&p.isIOS&&f.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
document.getElementsByTagName("html").item(0).style.lineHeight=160/e.fontScale;
});
}();
var _=e("appmsg/outer_link.js");
if(new _({
container:document.getElementById("js_content"),
changeHref:function(e,t){
if(e&&0==e.indexOf("http://mp.weixin.qq.com/s"))e=e.replace(/#rd\s*$/,""),e=e.replace(/#wechat_redirect\s*$/,""),
e=e.replace(/[\?&]scene=21/,""),e+="&scene=21#wechat_redirect";else if(0!=e.indexOf("http://mp.weixinbridge.com/mp/wapredirect"))return"http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+t+"&scene=0";
return e;
}
}),!m){
var h=e("appmsg/review_image.js"),v=document.getElementById("js_cover"),j=[];
v&&j.push(v),new h({
container:document.getElementById("js_content"),
is_https_res:is_https_res,
imgs:j
});
}
window.fromWeixinCached||e("appmsg/iframe.js"),e("appmsg/qqmusic.js"),e("appmsg/voice.js"),
e("appmsg/cdn_speed_report.js"),e("appmsg/page_pos.js"),setTimeout(function(){
A.tap(document.getElementById("copyright_logo"),function(){
location.href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
}),e("appmsg/report_and_source.js"),function(){
if(m){
var t=e("biz_common/dom/class.js");
t.addClass(o,"not_in_mm");
var n=document.createElement("link");
n.rel="stylesheet",n.type="text/css",n.async=!0,n.href=not_in_mm_css;
var i=document.getElementsByTagName("head")[0];
i.appendChild(n);
var r=document.getElementById("js_pc_qr_code_img");
if(r){
var s=10000004,a=document.referrer;
0==a.indexOf("http://weixin.sogou.com")?s=10000001:0==a.indexOf("https://wx.qq.com")&&(s=10000003),
r.setAttribute("src","/mp/qrcode?scene="+s+"&size=102&__biz="+biz),document.getElementById("js_pc_qr_code").style.display="block";
var c=new Image;
c.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+s+"&r="+Math.random();
}
var p=document.getElementById("js_profile_qrcode"),d=document.getElementById("js_profile_arrow_wrp"),l=document.getElementById("post-user");
if(p&&l&&d){
var g=function(){
var e=10000005,t=document.referrer;
0==t.indexOf("http://weixin.sogou.com")?e=10000006:0==t.indexOf("https://wx.qq.com")&&(e=10000007);
var o=document.getElementById("js_profile_qrcode_img");
o&&o.setAttribute("src","/mp/qrcode?scene="+e+"&size=102&__biz="+biz),p.style.display="block";
var n=new Image;
return n.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+e+"&r="+Math.random(),
d.style.left=l.offsetLeft-p.offsetLeft+l.offsetWidth/2-8+"px",!1;
};
A.on(l,"click",g),A.on(p,"click",g),A.on(document,"click",function(e){
var t=e.target||e.srcElement;
t!=l&&t!=p&&(p.style.display="none");
});
}
}else{
var w=document.getElementById("js_report_article3");
!!w&&(w.style.display="");
}
}(),function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=document.getElementById("img-content");
if(e&&t&&t.getBoundingClientRect){
var o=t.getBoundingClientRect().height;
window.scrollTo(0,o);
}
}(),e("appmsg/report.js");
for(var t=document.getElementsByTagName("map"),n=0,i=t.length;i>n;++n)t[n].parentNode.removeChild(t[n]);
u.card_pv_report();
},1e3),function(){
if(n.os.ios&&"onorientationchange"in window){
var e=[],t="onorientationchange"in window?"orientationchange":"resize",o=function(){
return 90===Math.abs(window.orientation)?1:2;
};
e.push({
ori:o(),
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
var i=(new Date).getHours();
A.on(window,t,function(){
var t=e.length-2,n=o();
if(t>=0){
var r=e[t],s=r.ori;
s!==n||e[e.length-1].istouchmove||(i>=11&&17>=i&&window.__report(63),window.scrollTo(0,r.scroll));
}
e.push({
ori:n,
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
}),A.on(window,"scroll",function(){
var t=e.length-1;
e[t].ori==o()&&(e[t].scroll=window.pageYOffset||document.documentElement.scrollTop,
e[t].istouchmove=!0);
});
}
}();
}
var o=e("biz_wap/jsapi/a8key.js"),n=e("biz_wap/utils/device.js");
o.onReady(function(){
window.logs.pagetime.jsapi_ready_time=+new Date,t();
});
});
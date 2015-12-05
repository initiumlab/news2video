define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js"],function(e){
"use strict";
function t(e,t){
a.invoke("imagePreview",{
current:e,
urls:t
});
}
function i(e){
var i=[],a=e.container,n=e.imgs||[];
if(a)for(var p=a.getElementsByTagName("img")||[],m=0,o=p.length;o>m;m++)n.push(p.item(m));
for(var m=0,o=n.length;o>m;m++){
var c=n[m],u=c.getAttribute("data-src")||c.getAttribute("src"),g=c.getAttribute("data-type");
if(u){
for(;-1!=u.indexOf("?tp=webp");)u=u.replace("?tp=webp","");
c.dataset&&c.dataset.s&&u.isCDN()&&(u=u.replace(/\/640$/,"/0"),u=u.replace(/\/640\?/,"/0?")),
u.isCDN()&&(u=s.addParam(u,"wxfrom","3",!0)),e.is_https_res&&(u=u.http2https()),
g&&(u=s.addParam(u,"wxtype",g,!0)),i.push(u),function(e){
r.on(c,"click",function(){
return t(e,i),!1;
});
}(u);
}
}
}
var r=e("biz_common/dom/event.js"),a=e("biz_wap/jsapi/core.js"),s=e("biz_common/utils/url/parse.js");
return e("appmsg/cdn_img_lib.js"),i;
});define("appmsg/outer_link.js",["biz_common/dom/event.js"],function(e){
"use strict";
function n(e){
var n=e.container;
if(!n)return!1;
for(var r=n.getElementsByTagName("a")||[],i=0,o=r.length;o>i;++i)!function(n){
var i=r[n],o=i.getAttribute("href");
if(!o)return!1;
var a=0,c=i.innerHTML;
/^[^<>]+$/.test(c)?a=1:/^<img[^>]*>$/.test(c)&&(a=2),!!e.changeHref&&(o=e.changeHref(o,a)),
t.on(i,"click",function(){
return location.href=o,!1;
},!0);
}(i);
}
var t=e("biz_common/dom/event.js");
return n;
});define("biz_wap/jsapi/core.js",[],function(){
"use strict";
document.domain="qq.com";
var i={
ready:function(i){
"undefined"!=typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.invoke?i():top.window.document.addEventListener?top.window.document.addEventListener("WeixinJSBridgeReady",i,!1):top.window.document.attachEvent&&(top.window.document.attachEvent("WeixinJSBridgeReady",i),
top.window.document.attachEvent("onWeixinJSBridgeReady",i));
},
invoke:function(i,n,e){
this.ready(function(){
return"object"!=typeof top.window.WeixinJSBridge?(alert("请在微信中打开此链接！"),!1):void top.window.WeixinJSBridge.invoke(i,n,e);
});
},
call:function(i){
this.ready(function(){
return"object"!=typeof top.window.WeixinJSBridge?!1:void top.window.WeixinJSBridge.call(i);
});
},
on:function(i,n){
this.ready(function(){
return"object"==typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.on?void top.window.WeixinJSBridge.on(i,n):!1;
});
}
};
return i;
});define("biz_common/dom/event.js",[],function(){
"use strict";
function e(e,t,n,o){
a.isPc||a.isWp?i(e,"click",o,t,n):i(e,"touchend",o,function(e){
if(-1==a.tsTime||+new Date-a.tsTime>200)return a.tsTime=-1,!1;
var n=e.changedTouches[0];
return Math.abs(a.y-n.clientY)<=5&&Math.abs(a.x-n.clientX)<=5?t.call(this,e):void 0;
},n);
}
function t(e,t){
if(!e||!t||e.nodeType!=e.ELEMENT_NODE)return!1;
var n=e.webkitMatchesSelector||e.msMatchesSelector||e.matchesSelector;
return n?n.call(e,t):(t=t.substr(1),e.className.indexOf(t)>-1);
}
function n(e,n,i){
for(;e&&!t(e,n);)e=e!==i&&e.nodeType!==e.DOCUMENT_NODE&&e.parentNode;
return e;
}
function i(t,i,o,r,c){
var s,d,u;
return"input"==i&&a.isPc,t?("function"==typeof o&&(c=r,r=o,o=""),"string"!=typeof o&&(o=""),
t==window&&"load"==i&&/complete|loaded/.test(document.readyState)?r({
type:"load"
}):"tap"==i?e(t,r,c,o):(s=function(e){
var t=r(e);
return t===!1&&(e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()),
t;
},o&&"."==o.charAt(0)&&(u=function(e){
var i=e.target||e.srcElement,r=n(i,o,t);
return r?(e.delegatedTarget=r,s(e)):void 0;
}),d=u||s,r[i+"_handler"]=d,t.addEventListener?void t.addEventListener(i,d,!!c):t.attachEvent?void t.attachEvent("on"+i,d,!!c):void 0)):void 0;
}
function o(e,t,n,i){
if(e){
var o=n[t+"_handler"]||n;
return e.removeEventListener?void e.removeEventListener(t,o,!!i):e.detachEvent?void e.detachEvent("on"+t,o,!!i):void 0;
}
}
var r=navigator.userAgent,a={
isPc:/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),
isWp:/Windows\sPhone/i.test(r),
tsTime:-1
};
return a.isPc||i(document,"touchstart",function(e){
var t=e.changedTouches[0];
a.x=t.clientX,a.y=t.clientY,a.tsTime=+new Date;
}),{
on:i,
off:o,
tap:e
};
});define("appmsg/copyright_report.js",["biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
var t=["/mp/copyrightreport?action=report&biz=",biz,"&scene=",e.scene,"&ori_username=",source_username,"&user_uin=",user_uin,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&t=",Math.random()].join(""),o=new Image;
o.src=t.substr(0,1024);
}
function o(){
var e=__appmsgCgiData;
if("2"==e.copyright_stat){
for(var t=r("copyright_info"),o=r("js_article");t&&o!==t;)c.copyright_top+=t.offsetTop,
t=t.offsetParent;
i.on(window,"scroll",n);
}
}
function n(){
var e=window.pageYOffset||document.documentElement.scrollTop;
e+c.innerHeight>c.copyright_top&&(t({
scene:"1",
card_pos:"0"
}),i.off(window,"scroll",n),n=c.copyright_top=null);
}
function r(e){
return document.getElementById(e);
}
var i=e("biz_common/dom/event.js"),c={
innerHeight:window.innerHeight||document.documentElement.clientHeight,
copyright_top:0
};
return{
card_click_report:t,
card_pv_report:o
};
});define("appmsg/cache.js",["biz_wap/jsapi/core.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function i(){
o();
}
function n(e,i,n,o){
0>o||setTimeout(function(){
"avg"==e?a.setAvg(i,n,o):a.setSum(i,n,o),a.send();
},1150);
}
function o(){
var e=write_sceen_time-window.logs.pagetime.html_begin,i=Math.random()>=.8,o=t(decodeURIComponent(window.uin)),a=Math.ceil(o/100)%2!=0?!0:!1;
if(!window.isInWeixinApp()||a)window.isInWeixinApp()&&i&&n("avg",27822,47,e);else{
for(var c=(location.href.replace(/\&key\=.*$/g,"#rd"),[]),m=document.getElementsByTagName("link"),f=0;f<m.length;f++)"stylesheet"==m[f].rel&&c.push(m[f].href);
r.invoke("cache",{
disable:!1,
appId:s,
resourceList:c
},function(o){
o&&"cache:ok"==o.err_msg&&i&&n("avg",27822,49,e);
});
}
}
function t(e){
var i,n,o,t,r={},a=0,s=0,c="",m=String.fromCharCode,f=e.length,u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(i=0;64>i;i++)r[u.charAt(i)]=i;
for(o=0;f>o;o++)for(n=r[e.charAt(o)],a=(a<<6)+n,s+=6;s>=8;)((t=a>>>(s-=8)&255)||f-2>o)&&(c+=m(t));
return c;
}
var r=e("biz_wap/jsapi/core.js"),a=e("biz_common/utils/monitor.js"),s="wx3be6367203f983ac";
i();
});define("appmsg/pay_for_reading.js",["biz_common/dom/class.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/pay.js","biz_common/utils/spin.js"],function(e){
"use strict";
function t(e){
e&&(e.style.display="block");
}
function a(e){
e&&(e.style.display="none");
}
function s(e){
m=!0,r.addClass(d.pay,"disabled"),t(d.toast),i({
url:"/mp/payforread?action=pay",
type:"POST",
data:{
appmsgid:appmsgid,
__biz:biz,
idx:idx,
fee:e,
timestamp:pay_timestamp
},
success:function(e){
try{
e=JSON.parse(e);
}catch(s){
e={},l.src="/mp/jsreport?key=42&content=type:jsonparseerr&r="+Math.random();
}
if(e&&e.base_resp){
var r=+e.base_resp.ret;
if(0==r)n(e.package_info);else{
switch(m=!1,r){
case-6:
alert("操作过于频繁，请稍后重试");
break;

case 155001:
t(d.tips),o.on(d.tipsOK,"touchend",function i(t){
a(d.tips),n(e.package_info),t.preventDefault(),o.off(d.tipsOK,"touchend",i);
});
break;

case 155002:
alert("重复付费");
break;

case 155003:
alert("该文章已关闭付费，可以免费阅读了"),location.reload();
break;

case 155004:
alert("该帐号已被封，不能进行支付");
break;

case 155005:
alert("该文章已被删除");
break;

case 155006:
alert("该文章已被取消原创声明，不需要支付");
break;

case 268502026:
alert("你今日的微信支付已达上限，请择日再付费");
break;

case 268502027:
alert("该公众号已达到微信支付的收款最高限额，不能再进行付费");
break;

case 268502028:
alert("该公众号今日的收款额度已达上限，请择日再付费");
break;

case 268502029:
alert("该公众号已达到微信支付的收款限额，不能再进行付费");
break;

default:
alert("系统错误，请重试");
}
l.src="/mp/jsreport?key=42&content=type:resperr;ret:"+r+"&r="+Math.random();
}
}
},
error:function(){
m=!1,alert("系统错误，请重试"),l.src="/mp/jsreport?key=42&content=type:ajaxerr&r="+Math.random();
},
complete:function(){
r.removeClass(d.pay,"disabled"),a(d.toast);
}
});
}
function n(e){
e.success=function(){
m=!1,location.reload();
},e.error=function(e){
m=!1,-1==e.indexOf(":cancel")&&(l.src="/mp/jsreport?key=43&content=type:jsapierr;msg:"+e+"&r="+Math.random());
},p.pay(e);
}
if(document.getElementById("js_pay_area")){
var r=e("biz_common/dom/class.js");
if(!window.uin||!window.key||!/micromessenger/i.test(window.navigator.userAgent)||/WindowsWechat/i.test(window.navigator.userAgent))return document.getElementById("js_pay_desc").innerText="文章已设置需要付费才能阅读，请在手机微信内进行付费",
void r.addClass(document.getElementById("js_pay_btn"),"disabled");
var o=e("biz_common/dom/event.js"),i=e("biz_wap/utils/ajax.js"),p=e("biz_wap/jsapi/pay.js"),c=e("biz_common/utils/spin.js"),d={
pay:document.getElementById("js_pay_btn"),
tips:document.getElementById("js_pay_tips"),
tipsOK:document.getElementById("js_pay_tips_ok"),
toast:document.getElementById("js_pay_toast")
},m=!1,l=new Image;
!function(){
{
var e=document.getElementById("js_pay_spinner");
new c({
top:"38%",
lines:10,
width:4,
length:8,
radius:8,
color:"#FFF"
}).spin(e);
}
}(),o.on(d.pay,"tap",function(){
s(pay_fee);
});
}
});define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/ad_tpl.html.js","appmsg/img_copyright_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_common/tmpl.js","biz_wap/utils/storage.js","pages/version4video.js","appmsg/cdn_img_lib.js","biz_common/utils/url/parse.js","appmsg/a.js","appmsg/like.js","appmsg/comment.js","appmsg/reward_entry.js","appmsg/iframe.js"],function(require,exports,module){
"use strict";
function saveCopy(e){
var t={};
for(var i in e)if(e.hasOwnProperty(i)){
var r=e[i],a=typeof r;
r="string"==a?r.htmlDecode():r,"object"==a&&(r=saveCopy(r)),t[i]=r;
}
return t;
}
function img_copyright(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var t={},i=e.img_copy_info.list,r=window.__appmsgCgiData.copyright_stat,a=window.__appmsgCgiData.source_biz,n=0,o=i.length;o>n;n++){
var d=i[n];
if(2==d.type){
if(2==r&&a==d.source_uin)continue;
t[d.img_url]={
source_nickname:d.source_nickname,
source_uin:d.source_uin
};
}
}
for(var s=document.getElementsByTagName("img"),n=0,o=s.length;o>n;n++){
var d=s[n],p=d.getAttribute("data-backsrc")||d.getAttribute("data-src")||"";
if(t[p]){
var m=document.createElement("div");
m.innerHTML=TMPL.tmpl(img_copyright_tpl,t[p]);
var c=m.children[0],l=d.parentNode,_=l.insertBefore(c,d),f=_.childNodes[0];
_.insertBefore(d,f);
}
}
}
}
function fillVedio(e){
if(vedio_iframes&&vedio_iframes.length>0)for(var t,i,r,a=0,n=vedio_iframes.length;n>a;++a)t=vedio_iframes[a],
i=t.iframe,r=t.src,e&&(r=r.replace(/\&encryptVer=[^\&]*/gi,""),r=r.replace(/\&platform=[^\&]*/gi,""),
r=r.replace(/\&cKey=[^\&]*/gi,""),r=r+"&encryptVer=6.0&platform=61001&cKey="+e),
i.setAttribute("src",r);
}
function fillData(e){
var t=e.adRenderData||{
advertisement_num:0
};
if(!t.flag&&t.advertisement_num>0){
var i=t.advertisement_num,r=t.advertisement_info;
window.adDatas.num=i;
for(var a=0;i>a;++a){
var n=null,o=r[a];
if(o.biz_info=o.biz_info||{},o.app_info=o.app_info||{},o.pos_type=o.pos_type||0,
o.logo=o.logo||"",100==o.pt)n={
usename:o.biz_info.user_name,
pt:o.pt,
url:o.url,
traceid:o.traceid,
adid:o.aid,
ticket:o.ticket,
is_appmsg:!0
};else if(102==o.pt)n={
appname:o.app_info.app_name,
versioncode:o.app_info.version_code,
pkgname:o.app_info.apk_name,
androiddownurl:o.app_info.apk_url,
md5sum:o.app_info.app_md5,
signature:o.app_info.version_code,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(101==o.pt)n={
appname:o.app_info.app_name,
app_id:o.app_info.app_id,
icon_url:o.app_info.icon_url,
appinfo_url:o.app_info.appinfo_url,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(103==o.pt||104==o.pt){
var d=o.app_info.down_count||0,s=o.app_info.app_size||0,p=o.app_info.app_name||"",m=o.app_info.category,c=["万","百万","亿"];
if(d>=1e4){
d/=1e4;
for(var l=0;d>=10&&2>l;)d/=100,l++;
d=d.toFixed(1)+c[l]+"次";
}else d=d.toFixed(1)+"次";
s>=1024?(s/=1024,s=s>=1024?(s/1024).toFixed(2)+"MB":s.toFixed(2)+"KB"):s=s.toFixed(2)+"B",
m=m?m[0]||"其他":"其他";
for(var _=["-","(",":",'"',"'","：","（","—","“","‘"],f=-1,u=0,g=_.length;g>u;++u){
var w=_[u],v=p.indexOf(w);
-1!=v&&(-1==f||f>v)&&(f=v);
}
-1!=f&&(p=p.substring(0,f)),o.app_info._down_count=d,o.app_info._app_size=s,o.app_info._category=m,
o.app_info.app_name=p,n={
appname:o.app_info.app_name,
app_rating:o.app_info.app_rating||0,
app_id:o.app_info.app_id,
channel_id:o.app_info.channel_id,
md5sum:o.app_info.app_md5,
rl:o.rl,
pkgname:o.app_info.apk_name,
androiddownurl:o.app_info.apk_url,
versioncode:o.app_info.version_code,
appinfo_url:o.app_info.appinfo_url,
traceid:o.traceid,
pt:o.pt,
url:o.url,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}else if(105==o.pt){
var h=o.card_info.card_id||"",y=o.card_info.card_ext||"";
y=y.htmlDecode();
try{
y=JSON.parse(y),y.outer_str=o.card_info.card_outer_id||"",y=JSON.stringify(y);
}catch(b){
y="{}";
}
n={
card_id:h,
card_ext:y,
pt:o.pt,
ticket:o.ticket||"",
url:o.url,
rl:o.rl,
tid:o.traceid,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}
var j=o.image_url;
require("appmsg/cdn_img_lib.js");
var x=require("biz_common/utils/url/parse.js");
j&&j.isCDN()&&(j=j.replace(/\/0$/,"/640"),j=j.replace(/\/0\?/,"/640?"),o.image_url=x.addParam(j,"wxfrom","50",!0)),
adDatas.ads["pos_"+o.pos_type]={
a_info:o,
adData:n
};
}
var k=function(e){
var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
"undefined"!=typeof e&&(t=e);
10>=t&&(z.style.display="block",DomEvent.off(window,"scroll",k));
},q=document.getElementById("js_bottom_ad_area"),z=document.getElementById("js_top_ad_area"),D=adDatas.ads;
for(var E in D)if(0==E.indexOf("pos_")){
var n=D[E],o=!!n&&n.a_info;
if(n&&o)if(0==o.pos_type)q.innerHTML=TMPL.tmpl(ad_tpl,o);else if(1==o.pos_type){
z.style.display="none",z.innerHTML=TMPL.tmpl(ad_tpl,o),DomEvent.on(window,"scroll",k);
var I=0;
window.localStorage&&(I=1*localStorage.getItem(E)||0),window.scrollTo(0,I),k(I);
}
}
require("appmsg/a.js");
}
var O=e.appmsgstat||{};
window.appmsgstat||(window.appmsgstat=O),O.show&&(!function(){
var e=document.getElementById("js_read_area3"),t=document.getElementById("like3");
e.style.display="block",t.style.display="inline",O.liked&&Class.addClass(t,"praised"),
t.setAttribute("like",O.liked?"1":"0");
var i=document.getElementById("likeNum3"),r=document.getElementById("readNum3"),a=O.read_num,n=O.like_num;
a||(a=1),n||(n="赞"),parseInt(a)>1e5?a="100000+":"",parseInt(n)>1e5?n="100000+":"",
r&&(r.innerHTML=a),i&&(i.innerHTML=n);
}(),require("appmsg/like.js")),1==e.comment_enabled&&require("appmsg/comment.js"),
-1==ua.indexOf("WindowsWechat")&&-1!=ua.indexOf("MicroMessenger")&&e.reward&&(rewardEntry=require("appmsg/reward_entry.js"),
rewardEntry.handle(e.reward,getCountPerLine()));
}
function getAsyncData(){
var is_need_ticket="";
vedio_iframes&&vedio_iframes.length>0&&(is_need_ticket="&is_need_ticket=1");
var is_need_ad=1,_adInfo=null;
if(window.localStorage)try{
var key=[biz,sn,mid,idx].join("_"),_ad=adLS.get(key);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&18e4>_now-1*_adInfoSaveTime&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(key);
}catch(e){
is_need_ad=1,_adInfo=null;
}
(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx)&&(is_need_ad=0);
var screen_num=Math.ceil(document.body.scrollHeight/(document.documentElement.clientHeight||window.innerHeight)),both_ad=screen_num>=2?1:0;
ajax({
url:"/mp/getappmsgext?__biz="+biz+"&mid="+mid+"&sn="+sn+"&idx="+idx+"&scene="+source+"&title="+encodeURIComponent(msg_title.htmlDecode())+"&ct="+ct+"&devicetype="+devicetype.htmlDecode()+"&version="+version.htmlDecode()+"&f=json&r="+Math.random()+is_need_ticket+"&is_need_ad="+is_need_ad+"&comment_id="+comment_id+"&is_need_reward="+is_need_reward+"&both_ad="+both_ad+"&reward_uin_count="+(is_need_reward?3*getCountPerLine():0),
type:"POST",
async:!0,
success:function(ret){
var tmpret=ret;
if(ret)try{
try{
ret=eval("("+tmpret+")");
}catch(e){
var img=new Image;
return void(img.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=3&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key3]"+encodeURIComponent(tmpret)+"&r="+Math.random()).substr(0,1024));
}
if(ret&&ret.base_resp&&ret.base_resp.wxtoken&&(window.wxtoken=ret.base_resp.wxtoken),
window.fromWeixinCached&&require("appmsg/iframe.js"),fillVedio(ret.appmsgticket?ret.appmsgticket.ticket:""),
img_copyright(ret),ret.ret)return;
var adRenderData={};
if(0==is_need_ad)adRenderData=_adInfo,adRenderData||(adRenderData={
advertisement_num:0
});else{
if(ret.advertisement_num>0&&ret.advertisement_info){
var d=ret.advertisement_info;
adRenderData.advertisement_info=saveCopy(d);
}
adRenderData.advertisement_num=ret.advertisement_num;
}
1==is_need_ad&&(window._adRenderData=adRenderData),fillData({
adRenderData:adRenderData,
appmsgstat:ret.appmsgstat,
comment_enabled:ret.comment_enabled,
reward:{
reward_total:ret.reward_total_count,
reward_head_imgs:ret.reward_head_imgs||[],
can_reward:ret.can_reward,
timestamp:ret.timestamp
}
});
}catch(e){
var img=new Image;
return img.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(e.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(e));
}
},
error:function(){
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function getCountPerLine(){
return DomEvent.on(window,"resize",function(){
onResize(),rewardEntry&&rewardEntry.render(getCountPerLine());
}),onResize();
}
function onResize(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
e=document.getElementById("page-content").getBoundingClientRect().width;
}catch(t){}
var i=30,r=34,a=Math.floor(.9*(e-i)/r);
return document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=a*r+"px"),
getCountPerLine=function(){
return a;
},a;
}
require("biz_common/utils/string/html.js");
var ad_tpl=require("appmsg/ad_tpl.html.js"),img_copyright_tpl=require("appmsg/img_copyright_tpl.html.js"),iswifi=!1,ua=navigator.userAgent,in_mm=-1!=ua.indexOf("MicroMessenger"),inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat"),DomEvent=require("biz_common/dom/event.js"),offset=200,ajax=require("biz_wap/utils/ajax.js"),Class=require("biz_common/dom/class.js"),TMPL=require("biz_common/tmpl.js"),LS=require("biz_wap/utils/storage.js"),rewardEntry,adLS=new LS("ad"),iframes=document.getElementsByTagName("iframe"),iframe,js_content=document.getElementById("js_content"),vedio_iframes=[],w=js_content.offsetWidth,h=3*w/4;
window.logs.video_cnt=0;
for(var i=0,len=iframes.length;len>i;++i){
iframe=iframes[i];
var src=iframe.getAttribute("data-src")||"",realsrc=iframe.getAttribute("src")||src;
if(realsrc){
var Version4video=require("pages/version4video.js");
if(!Version4video.isShowMpVideo()&&(0==realsrc.indexOf("http://v.qq.com/iframe/player.html")||0==realsrc.indexOf("https://v.qq.com/iframe/player.html")||0==realsrc.indexOf("http://v.qq.com/iframe/preview.html")||0==realsrc.indexOf("https://v.qq.com/iframe/preview.html"))||0==realsrc.indexOf("http://z.weishi.com/weixin/player.html")){
-1==realsrc.indexOf("http://z.weishi.com/weixin/player.html")&&-1==src.indexOf("http://z.weixin.com/weixin/player.html")&&(src=src.replace(/^http:/,location.protocol),
src=src.replace(/preview.html/,"player.html"),realsrc=realsrc.replace(/^http:/,location.protocol),
realsrc=realsrc.replace(/preview.html/,"player.html")),realsrc=realsrc.replace(/width=\d+/g,"width="+w),
realsrc=realsrc.replace(/height=\d+/g,"height="+h),in_mm&&(0==realsrc.indexOf("http://v.qq.com/iframe/player.html")||0==realsrc.indexOf("https://v.qq.com/iframe/player.html"))||in_mm&&(0==realsrc.indexOf("http://v.qq.com/iframe/preview.html")||0==realsrc.indexOf("https://v.qq.com/iframe/preview.html"))?vedio_iframes.push({
iframe:iframe,
src:realsrc
}):iframe.setAttribute("src",realsrc),iframe.width=w,iframe.height=h,iframe.style.setProperty&&(iframe.style.setProperty("width",w+"px","important"),
iframe.style.setProperty("height",h+"px","important")),window.logs.video_cnt++;
continue;
}
}
}
window.adDatas={
ads:{},
num:0
};
var js_toobar=document.getElementById("js_toobar3"),innerHeight=window.innerHeight||document.documentElement.clientHeight,onScroll=function(){
var e=window.pageYOffset||document.documentElement.scrollTop,t=js_toobar.offsetTop;
e+innerHeight+offset>=t&&(getAsyncData(),DomEvent.off(window,"scroll",onScroll));
};
iswifi?(DomEvent.on(window,"scroll",onScroll),onScroll()):getAsyncData();
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=e+40,n=this.offset||20,a=0;
if("wifi"==window.networkType){
var s={
bottom:1,
top:1
};
this.lazyloadHeightWhenWifi&&(s=this.lazyloadHeightWhenWifi()),n=Math.max(s.bottom*e,n),
a=Math.max(s.top*e,a);
}
for(var l=+new Date,d=[],c=this.sw,u=0,w=t.length;w>u;u++){
var p=t[u],f=p.el.offsetTop;
if(!p.show&&(i>=f&&i<=f+p.height+a||f>i&&i+o+n>f)){
var g=p.src,v=this;
this.inImgRead&&(i>=f&&i<=f+p.height||f>i&&i+o>f)&&this.inImgRead(g,networkType),
this.changeSrc&&(g=this.changeSrc(p.el,g)),p.el.onerror=function(){
!!v.onerror&&v.onerror(g);
},p.el.onload=function(){
var t=this;
m(t,"height","auto","important"),t.getAttribute("_width")?m(t,"width",t.getAttribute("_width"),"important"):m(t,"width","auto","important");
},h(p.el,"src",g),d.push(g),p.show=!0,m(p.el,"visibility","visible","important");
}
r.isWp&&1*p.el.width>c&&(p.el.width=c);
}
d.length>0&&this.detect&&this.detect({
time:l,
loadList:d,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,n=this.attrKey||"data-src",r=o.offsetWidth,a=0;
o.currentStyle?a=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(a=getComputedStyle(o).width),
this.sw=1*a.replace("px","");
for(var s=0,d=t.length;d>s;s++){
var c=t.item(s),u=h(c,n);
if(u){
var w=100;
if(c.dataset&&c.dataset.ratio){
var p=1*c.dataset.ratio,f=1*c.dataset.w||r;
"number"==typeof p&&p>0?(f=r>=f?f:r,w=f*p,c.style.width&&c.setAttribute("_width",c.style.width),
m(c,"width",f+"px","important"),m(c,"visibility","visible","important"),c.setAttribute("src",l)):m(c,"visibility","hidden","important");
}else m(c,"visibility","hidden","important");
m(c,"height",w+"px","important"),e.push({
el:c,
src:u,
height:w,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
var e=this,o=e.timer;
clearTimeout(o),e.timer=setTimeout(function(){
i.call(e,t);
},300);
}
function n(t){
a.on(window,"scroll",function(i){
o.call(t,i);
}),a.on(window,"load",function(i){
e.call(t,i);
}),a.on(document,"touchmove",function(i){
o.call(t,i);
});
}
var r=t("biz_wap/utils/mmversion.js"),a=t("biz_common/dom/event.js"),s=t("biz_common/dom/attr.js"),h=s.attr,m=s.setProperty,l=t("biz_common/ui/imgonepx.js");
return n;
});define("biz_common/log/jserr.js",[],function(){
function e(e,n){
return e?(r.replaceStr&&(e=e.replace(r.replaceStr,"")),n&&(e=e.substr(0,n)),encodeURIComponent(e.replace("\n",","))):"";
}
var r={};
return window.onerror=function(n,o,t,c,i){
return"Script error."==n||o?"undefined"==typeof r.key||"undefined"==typeof r.reporturl?!0:void setTimeout(function(){
c=c||window.event&&window.event.errorCharacter||0;
var l=[];
if(l.push("msg:"+e(n,100)),o&&(o=o.replace(/[^\,]*\/js\//g,"")),l.push("url:"+e(o,200)),
l.push("line:"+t),l.push("col:"+c),i&&i.stack)l.push("info:"+e(i.stack.toString(),200));else if(arguments.callee){
for(var s=[],u=arguments.callee.caller,a=3;u&&--a>0&&(s.push(u.toString()),u!==u.caller);)u=u.caller;
s=s.join(","),l.push("info:"+e(s,200));
}
var p=new Image;
if(p.src=(r.reporturl+"&key="+r.key+"&content="+l.join("||")).substr(0,1024),window.console&&window.console.log){
var f=l.join("\n");
try{
f=decodeURIComponent(f);
}catch(d){}
console.log(f);
}
},0):!0;
},function(e){
r=e;
};
});define("appmsg/share.js",["biz_common/utils/string/html.js","appmsg/cdn_img_lib.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","biz_wap/utils/mmversion.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(i){
"use strict";
function e(i,e){
var n="";
""!=tid&&(n="tid="+tid+"&aid=54");
var t=i.split("?")[1]||"";
if(t=t.split("#")[0],""!=t){
var o=[t,"scene="+e,"srcid="+srcid];
return""!=n&&o.push(n),t=o.join("&"),i.split("?")[0]+"?"+t+"#"+(i.split("#")[1]||"");
}
}
function n(i,e,n){
var t=i.split("?").pop();
if(t=t.split("#").shift(),""!=t){
var o=[t,"action_type="+n,"vid="+("undefined"!=typeof window.reportVid?window.reportVid.join(";"):""),"musicid="+("undefined"!=typeof window.reportMid?window.reportMid.join(";"):""),"voiceid="+("undefined"!=typeof window.reportVoiceid?window.reportVoiceid.join(";"):"")].join("&");
m({
url:"/mp/appmsg/show",
type:"POST",
timeout:2e3,
data:o
});
}
}
function t(i,e){
return i.isCDN()&&(i=o.addParam(i,"wxfrom",e,!0)),i;
}
i("biz_common/utils/string/html.js"),i("appmsg/cdn_img_lib.js");
var o=(i("biz_common/dom/event.js"),i("biz_common/utils/url/parse.js")),s=i("biz_wap/utils/mmversion.js"),m=i("biz_wap/utils/ajax.js"),r=i("biz_wap/jsapi/core.js");
r.call("hideToolbar"),r.call("showOptionMenu");
var a=msg_title.htmlDecode(),d=(msg_source_url.htmlDecode(),""),l=msg_cdn_url,c=msg_link.htmlDecode(),a=msg_title.htmlDecode(),u=msg_desc.htmlDecode();
u=u||c,u=u.replace(/<br\/>/g,"\n"),idx>1&&document.getElementById("js_content")&&1446652800>ct&&(u=document.getElementById("js_content").innerHTML.replace(/<\/?[^>]*\/?>/g,"").htmlDecode().replace(/^(\s*)|(\s*)$/g,"").substr(0,54)),
l.isCDN()&&(l=l.replace(/\/0$/,"/300")),"1"==is_limit_user&&r.call("hideOptionMenu"),
r.on("menu:share:appmessage",function(i){
var o=1,s=t(l,"1");
i&&"favorite"==i.scene&&(o=24,s=t(l,"4")),r.invoke("sendAppMessage",{
appid:d,
img_url:s,
img_width:"640",
img_height:"640",
link:e(c,o),
desc:u,
title:a
},function(){
n(c,fakeid,o);
});
}),r.on("menu:share:timeline",function(){
var i=l;
s.isIOS||(i=t(l,"2")),n(c,fakeid,2),r.invoke("shareTimeline",{
img_url:i,
img_width:"640",
img_height:"640",
link:e(c,2),
desc:u,
title:a
},function(){});
});
r.on("menu:share:weiboApp",function(){
r.invoke("shareWeiboApp",{
img_url:l,
link:e(c,3),
title:a
},function(){
n(c,fakeid,3);
});
}),r.on("menu:share:facebook",function(){
n(c,fakeid,4),r.invoke("shareFB",{
img_url:l,
img_width:"640",
img_height:"640",
link:e(c,4),
desc:u,
title:a
},function(){});
}),r.on("menu:share:QZone",function(){
var i=t(l,"6");
n(c,fakeid,5),r.invoke("shareQZone",{
img_url:i,
img_width:"640",
img_height:"640",
link:e(c,22),
desc:u,
title:a
},function(){});
}),r.on("menu:share:qq",function(){
var i=t(l,"7");
n(c,fakeid,5),r.invoke("shareQQ",{
img_url:i,
img_width:"640",
img_height:"640",
link:e(c,23),
desc:u,
title:a
},function(){});
}),r.on("menu:share:email",function(){
n(c,fakeid,5),r.invoke("sendEmail",{
content:e(c,5),
title:a
},function(){});
});
});define("biz_wap/utils/mmversion.js",[],function(){
"use strict";
function n(){
var n=/MicroMessenger\/([\d\.]+)/i,t=s.match(n);
return t&&t[1]?t[1]:!1;
}
function t(t,r,i){
var e=n();
if(e){
e=e.split("."),t=t.split("."),e.pop();
for(var o,s,u=f["cp"+r],c=0,a=Math.max(e.length,t.length);a>c;++c){
o=e[c]||0,s=t[c]||0,o=parseInt(o)||0,s=parseInt(s)||0;
var p=f.cp0(o,s);
if(!p)return u(o,s);
}
return i||0==r?!0:!1;
}
}
function r(n){
return t(n,0);
}
function i(n,r){
return t(n,1,r);
}
function e(n,r){
return t(n,-1,r);
}
function o(){
return u?"ios":a?"android":"unknown";
}
var s=navigator.userAgent,u=/(iPhone|iPad|iPod|iOS)/i.test(s),c=/Windows\sPhone/i.test(s),a=/(Android)/i.test(s),f={
"cp-1":function(n,t){
return t>n;
},
cp0:function(n,t){
return n==t;
},
cp1:function(n,t){
return n>t;
}
};
return{
get:n,
cpVersion:t,
eqVersion:r,
gtVersion:i,
ltVersion:e,
getPlatform:o,
isWp:c,
isIOS:u,
isAndroid:a
};
});define("appmsg/cdn_img_lib.js",[],function(){
"use strict";
String.prototype.http2https=function(){
return this.replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qlogo.cn/");
},String.prototype.https2http=function(){
return this.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
},String.prototype.isCDN=function(){
return 0==this.indexOf("http://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qlogo.cn/");
};
});define("biz_common/utils/url/parse.js",[],function(){
"use strict";
function r(r){
var n=r.length,e=r.indexOf("?"),t=r.indexOf("#");
t=-1==t?n:t,e=-1==e?t:e;
var s=r.substr(0,e),a=r.substr(e+1,t-e-1),i=r.substr(t+1);
return{
host:s,
query_str:a,
hash:i
};
}
function n(n,e){
var t=r(n),s=t.query_str,a=[];
for(var i in e)e.hasOwnProperty(i)&&a.push(i+"="+encodeURIComponent(e[i]));
return a.length>0&&(s+=(""!=s?"&":"")+a.join("&")),t.host+(""!=s?"?"+s:"")+(""!=t.hash?"#"+t.hash:"");
}
function e(r,n,e,t){
r=r||location.href,-1!=r.indexOf("&")&&-1==r.indexOf("?")&&(r=r.replace("&","?"));
var s=new RegExp("([\\?&]"+n+"=)[^&#]*");
return r.match(s)?t===!0?r.replace(s,"$1"+e):r:-1==r.indexOf("?")?r+"?"+n+"="+e:r+"&"+n+"="+e;
}
return{
parseUrl:r,
join:n,
addParam:e
};
});define("biz_wap/utils/device.js",[],function(){
"use strict";
function s(s){
{
var e=s.match(/MQQBrowser\/(\d+\.\d+)/i),r=s.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i)||s.match(/V1_AND_SQ_([\d\.]+)/),i=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)||s.match(/MicroMessenger\/((\d+)\.(\d+))/),t=s.match(/Mac\sOS\sX\s(\d+\.\d+)/),n=s.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/),a=s.match(/MiuiBrowser\/(\d+\.\d+)/i),d=s.match(/MI-ONE/),h=s.match(/MI PAD/),w=s.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/)||s.match(/\sUC\s/),c=s.match(/IEMobile(\/|\s+)(\d+\.\d+)/)||s.match(/WPDesktop/),b=s.match(/(ipod).*\s([\d_]+)/i),u=s.match(/(ipad).*\s([\d_]+)/i),p=s.match(/(iphone)\sos\s([\d_]+)/i),v=s.match(/Chrome\/(\d+\.\d+)/),m=s.match(/Mozilla.*Linux.*Android.*AppleWebKit.*Mobile Safari/),f=s.match(/(android)\s([\d\.]+)/i);
s.indexOf("HTC")>-1;
}
if(o.browser=o.browser||{},o.os=o.os||{},window.ActiveXObject){
var l=6;
(window.XMLHttpRequest||s.indexOf("MSIE 7.0")>-1)&&(l=7),(window.XDomainRequest||s.indexOf("Trident/4.0")>-1)&&(l=8),
s.indexOf("Trident/5.0")>-1&&(l=9),s.indexOf("Trident/6.0")>-1&&(l=10),o.browser.ie=!0,
o.browser.version=l;
}else s.indexOf("Trident/7.0")>-1&&(o.browser.ie=!0,o.browser.version=11);
f&&(this.os.android=!0,this.os.version=f[2]),b&&(this.os.ios=this.os.ipod=!0,this.os.version=b[2].replace(/_/g,".")),
u&&(this.os.ios=this.os.ipad=!0,this.os.version=u[2].replace(/_/g,".")),p&&(this.os.iphone=this.os.ios=!0,
this.os.version=p[2].replace(/_/g,".")),n&&(this.os.windows=!0,this.os.version=n[2]),
t&&(this.os.Mac=!0,this.os.version=t[1]),s.indexOf("lepad_hls")>0&&(this.os.LePad=!0),
h&&(this.os.MIPAD=!0),e&&(this.browser.MQQ=!0,this.browser.version=e[1]),r&&(this.browser.MQQClient=!0,
this.browser.version=r[1]),i&&(this.browser.WeChat=!0,this.browser.version=i[1]),
a&&(this.browser.MIUI=!0,this.browser.version=a[1]),w&&(this.browser.UC=!0,this.browser.version=w[1]||0/0),
c&&(this.browser.IEMobile=!0,this.browser.version=c[2]),m&&(this.browser.AndriodBrowser=!0),
d&&(this.browser.M1=!0),v&&(this.browser.Chrome=!0,this.browser.version=v[1]),this.os.windows&&(this.os.win64="undefined"!=typeof navigator.platform&&"win64"==navigator.platform.toLowerCase()?!0:!1);
var M={
iPad7:"iPad; CPU OS 7",
LePad:"lepad_hls",
XiaoMi:"MI-ONE",
SonyDTV:"SonyDTV",
SamSung:"SAMSUNG",
HTC:"HTC",
VIVO:"vivo"
};
for(var g in M)this.os[g]=-1!==s.indexOf(M[g]);
o.os.phone=o.os.phone||/windows phone/i.test(s),this.os.getNumVersion=function(){
return parseFloat(o.os.version,"10");
},this.os.hasTouch="ontouchstart"in window,this.os.hasTouch&&this.os.ios&&this.os.getNumVersion()<6&&(this.os.hasTouch=!1),
o.browser.WeChat&&o.browser.version<5&&(this.os.hasTouch=!1),o.browser.getNumVersion=function(){
return parseFloat(o.browser.version,"10");
},o.browser.isFFCanOcx=function(){
return o.browser.firefox&&o.browser.getNumVersion()>=3?!0:!1;
},o.browser.isCanOcx=function(){
return!(!o.os.windows||!o.browser.ie&&!o.browser.isFFCanOcx()&&!o.browser.webkit);
},o.browser.isNotIESupport=function(){
return!!o.os.windows&&(!!o.browser.webkit||o.browser.isFFCanOcx());
},o.userAgent={},o.userAgent.browserVersion=o.browser.version,o.userAgent.osVersion=o.os.version,
delete o.userAgent.version;
}
var o={};
s.call(o,top.window.navigator.userAgent);
var e=function(){
var s=top.window.navigator.userAgent,e=null;
if(o.os.android){
if(o.browser.MQQ&&o.browser.getNumVersion()>=4.2)return!0;
if(-1!=s.indexOf("MI2"))return!0;
if(o.os.version>="4"&&(e=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/))&&e[1]>=4.2)return!0;
if(o.os.version>="4.1")return!0;
}
return!1;
}(),r=function(){
var s=document.createElement("video");
if("function"==typeof s.canPlayType){
if("probably"==s.canPlayType('video/mp4; codecs="mp4v.20.8"'))return!0;
if("probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E"')||"probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'))return!0;
}
return!1;
}();
return o.canSupportVideo=r||e,o.canSupportVideoMp4=r,o.canSupportH5Video=e,o;
});define("biz_wap/jsapi/a8key.js",["biz_wap/jsapi/core.js"],function(n){
"use strict";
var e,i=n("biz_wap/jsapi/core.js"),o=!1,t={},a=function(){
"undefined"!=typeof window.pass_ticket&&window.pass_ticket?(t.onAlreadyHasA8Key&&t.onAlreadyHasA8Key.call(A),
u()):0==window.isInWeixinApp()?(t.onOutOfWeixinApp&&t.onOutOfWeixinApp.call(A),u()):(o=1,
i.ready(c));
},c=function(){
window.isWeixinCached?w(u):(t.onNoCacheFuncWeixin&&t.onNoCacheFuncWeixin.call(A),
u());
},w=function(n){
if(t.onJSAPIGetA8KeyStart&&t.onJSAPIGetA8KeyStart.call(A),window.getA8KeyUrl)t.onJSAPIGetA8KeyEnd&&t.onJSAPIGetA8KeyEnd.call(A),
n(window.getA8KeyUrl);else{
var e=!1,o=setTimeout(function(){
e=!0,t.onJSAPIGetA8KeyTimeout&&t.onJSAPIGetA8KeyTimeout.call(A),n("");
},1500);
i.on("onGetA8KeyUrl",function(i){
o&&clearTimeout(o),e||(t.onJSAPIGetA8KeyEnd&&t.onJSAPIGetA8KeyEnd.call(A,i),n(i.url));
});
}
},u=function(n){
var i=!1;
if(n){
var o=getQueryFromURL(n);
window.uin=o.uin||window.uin,window.key=o.key||window.key,window.pass_ticket=o.pass_ticket||window.pass_ticket,
i=!0;
}
e&&e(i);
},A={
isPageCached:o
};
return A.config=function(n){
return t=n||{},A;
},A.onReady=function(n){
e=n,a();
},A;
});
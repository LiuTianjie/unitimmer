(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"1e2d":function(e,t,n){"use strict";var o=n("e08e"),r=n.n(o);r.a},"27e5":function(e,t,n){"use strict";n.r(t);var o=n("49e5"),r=n("f933");for(var u in r)"default"!==u&&function(e){n.d(t,e,function(){return r[e]})}(u);n("1e2d");var a=n("2877"),i=Object(a["a"])(r["default"],o["a"],o["b"],!1,null,null,null);t["default"]=i.exports},"49e5":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return r})},9308:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{title:"Moment",days:""}},onLoad:function(){},methods:{gettime:function(){var e="2019/02/02 00:00:00",t=new Date,n=t.getTime()-new Date(e).getTime(),o=Math.floor(n/864e5),r=n%864e5,u=Math.floor(r/36e5),a=r%36e5,i=Math.floor(a/6e4),f=a%6e4,c=Math.round(f/1e3);this.days=o+"天"+u+"小时"+i+"分钟"+c+"秒"}},mounted:function(){setInterval(this.gettime,1e3)},beforeDestroy:function(){clearInterval(this.timer)}};t.default=o},e08e:function(e,t,n){},f933:function(e,t,n){"use strict";n.r(t);var o=n("9308"),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,function(){return o[e]})}(u);t["default"]=r.a}},[["60c6","common/runtime","common/vendor"]]]);
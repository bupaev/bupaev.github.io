(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{226:function(t,e,n){},244:function(t,e,n){var o=n(3),r=n(245),c=n(112);o({target:"Array",proto:!0},{fill:r}),c("fill")},245:function(t,e,n){"use strict";var o=n(21),r=n(84),c=n(13);t.exports=function(t){for(var e=o(this),n=c(e.length),l=arguments.length,d=r(l>1?arguments[1]:void 0,n),f=l>2?arguments[2]:void 0,h=void 0===f?n:r(f,n);h>d;)e[d++]=t;return e}},246:function(t,e,n){"use strict";n(226)},252:function(t,e,n){"use strict";n.r(e);n(37),n(244),n(85);var o=2009,r=2022,c=Array(13).fill(1).map((function(t,i){return o+i})),l=[{position:"Lead Front-end developer",company:"Holmusk",skills:"VueJS, Vuetify, TypeScript",startDate:"2018-07",endDate:"2021-05",id:"holmusk"},{position:"Lead UI/Front-end developer",company:"Codenetix",skills:"ES6, React, Gatsby",startDate:"2016-11",endDate:"2018-07",id:"codenetix"},{position:"Front-end developer",company:"Bandlab",skills:"React, Angular, VueJS",startDate:"2014-09",endDate:"2016-10",id:"bandlab"},{position:"Front-end developer",company:"DXC Luxoft",skills:"React, Angular, VueJS",startDate:"2012-07",endDate:"2014-09",zIndex:2,id:"luxoft"},{position:"Web developer",company:"Mir IT",skills:"React, Angular, VueJS",startDate:"2011-06",endDate:"2012-07",zIndex:2,id:"mirIt"},{position:"Teaching Assistant",company:"Omsk State Technical University",skills:"React, Angular, VueJS",startDate:"2009-09",endDate:"2014-09",height:1.6,id:"omstu"},{position:"Software developer",company:"Freelance",skills:"React, Angular, VueJS",startDate:"2008-08",endDate:"2011-06",id:"freelance",zIndex:1}],d={name:"Timeline",data:function(){return{jobs:l,years:c,componentWidth:0}},computed:{millisecondWidth:function(){var t=new Date(r,0,1).getTime()-new Date(o,0,1).getTime();return this.componentWidth/t},halfYearShift:function(){return this.componentWidth/26}},mounted:function(){var t=this;new ResizeObserver((function(e){var n=e[0].contentRect;t.componentWidth=n.width})).observe(this.$el)},methods:{getDatePosition:function(t){return(new Date(t).getTime()-new Date(o,0,1).getTime())*this.millisecondWidth},getJobPositionStyle:function(t){var e=this.getDatePosition(t.startDate),n=this.getDatePosition(t.endDate)-e;return"left: ".concat(e+this.halfYearShift,"px; width: ").concat(n-1,"px; height: ").concat(60*(t.height||1),"%; z-index: ").concat(t.zIndex||0)},goToJob:function(t){var e=document.getElementById("experience").offsetTop+document.getElementById(t).offsetTop;window.scrollTo({top:e,left:0,behavior:"smooth"})}}},f=(n(246),n(20)),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"timeline"},[n("div",{staticClass:"jobs-wrapper"},t._l(t.jobs,(function(e){return n("div",{key:e.company,staticClass:"job",style:t.getJobPositionStyle(e),on:{click:function(n){return t.goToJob(e.id)}}},[n("div",{staticClass:"text-wrapper"},[t._v("\n        "+t._s(e.position)+" / "+t._s(e.company)+"\n      ")])])})),0),t._v(" "),n("div",{staticClass:"years-wrapper"},t._l(t.years,(function(i){return n("div",{key:i,staticClass:"year"},[t._v("\n      "+t._s(i)+"\n    ")])})),0)])}),[],!1,null,"0634ef90",null);e.default=component.exports}}]);
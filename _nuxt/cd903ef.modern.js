(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{185:function(e,t,n){},202:function(e,t,n){"use strict";n(185)},208:function(e,t,n){"use strict";n.r(t);var o=2009,r=2022,l=Array(13).fill(1).map(((e,i)=>o+i)),c=[{position:"Lead Front-end developer",company:"Holmusk",skills:"VueJS, Vuetify, TypeScript",startDate:"2018-07",endDate:"2021-05",id:"holmusk"},{position:"Lead UI/Front-end developer",company:"Codenetix",skills:"ES6, React, Gatsby",startDate:"2016-11",endDate:"2018-07",id:"codenetix"},{position:"Front-end developer",company:"Bandlab",skills:"React, Angular, VueJS",startDate:"2014-09",endDate:"2016-10",id:"bandlab"},{position:"Front-end developer",company:"DXC Luxoft",skills:"React, Angular, VueJS",startDate:"2012-07",endDate:"2014-09",zIndex:2,id:"luxoft"},{position:"Web developer",company:"Mir IT",skills:"React, Angular, VueJS",startDate:"2011-06",endDate:"2012-07",zIndex:2,id:"mirIt"},{position:"Teaching Assistant",company:"Omsk State Technical University",skills:"React, Angular, VueJS",startDate:"2009-09",endDate:"2014-09",height:1.6,id:"omstu"},{position:"Software developer",company:"Freelance",skills:"React, Angular, VueJS",startDate:"2008-08",endDate:"2011-06",id:"freelance",zIndex:1}],d={name:"Timeline",data:()=>({jobs:c,years:l,componentWidth:0}),computed:{millisecondWidth(){var e=new Date(r,0,1).getTime()-new Date(o,0,1).getTime();return this.componentWidth/e},halfYearShift(){return this.componentWidth/26}},mounted(){new ResizeObserver((e=>{var t=e[0].contentRect;this.componentWidth=t.width})).observe(this.$el)},methods:{getDatePosition(e){return(new Date(e).getTime()-new Date(o,0,1).getTime())*this.millisecondWidth},getJobPositionStyle(e){var t=this.getDatePosition(e.startDate),n=this.getDatePosition(e.endDate)-t;return"left: ".concat(t+this.halfYearShift,"px; width: ").concat(n-1,"px; height: ").concat(60*(e.height||1),"%; z-index: ").concat(e.zIndex||0)},goToJob(e){var t=document.getElementById("experience").offsetTop+document.getElementById(e).offsetTop;window.scrollTo({top:t,left:0,behavior:"smooth"})}}},m=(n(202),n(10)),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"timeline"},[n("div",{staticClass:"jobs-wrapper"},e._l(e.jobs,(function(t){return n("div",{key:t.company,staticClass:"job",style:e.getJobPositionStyle(t),on:{click:function(n){return e.goToJob(t.id)}}},[n("div",{staticClass:"text-wrapper"},[e._v("\n        "+e._s(t.position)+" / "+e._s(t.company)+"\n      ")])])})),0),e._v(" "),n("div",{staticClass:"years-wrapper"},e._l(e.years,(function(i){return n("div",{key:i,staticClass:"year"},[e._v("\n      "+e._s(i)+"\n    ")])})),0)])}),[],!1,null,"0634ef90",null);t.default=component.exports}}]);
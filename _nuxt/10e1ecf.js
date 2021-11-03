(window.webpackJsonp=window.webpackJsonp||[]).push([[8,7,9],{231:function(e,t,l){},232:function(e,t,l){"use strict";l.r(t);l(237);var n={name:"SkillBar",props:{level:{type:Number,required:!0}}},r=(l(241),l(16)),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{class:"skill-bar mb-4 mt-1"},e._l(3,(function(i){return l("div",{key:i,class:["segment",{filled:e.level>=i}]})})),0)}),[],!1,null,"47e36e61",null);t.default=component.exports},234:function(e,t,l){e.exports=l.p+"a0bd0ef89faffc5a6709c1928a046240.svg"},235:function(e,t,l){},237:function(e,t,l){"use strict";var n=l(13),r=l(1),o=l(3),c=l(100),f=l(18),v=l(14),m=l(177),d=l(36),S=l(99),_=l(176),h=l(5),k=l(73).f,y=l(27).f,I=l(17).f,w=l(238),A=l(239).trim,C="Number",E=r.Number,N=E.prototype,x=r.TypeError,G=o("".slice),T=o("".charCodeAt),J=function(e){var t=_(e,"number");return"bigint"==typeof t?t:B(t)},B=function(e){var t,l,n,r,o,c,f,code,v=_(e,"number");if(S(v))throw x("Cannot convert a Symbol value to a number");if("string"==typeof v&&v.length>2)if(v=A(v),43===(t=T(v,0))||45===t){if(88===(l=T(v,2))||120===l)return NaN}else if(48===t){switch(T(v,1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+v}for(c=(o=G(v,2)).length,f=0;f<c;f++)if((code=T(o,f))<48||code>r)return NaN;return parseInt(o,n)}return+v};if(c(C,!E(" 0o1")||!E("0b1")||E("+0x1"))){for(var M,R=function(e){var t=arguments.length<1?0:E(J(e)),l=this;return d(N,l)&&h((function(){w(l)}))?m(Object(t),l,R):t},V=n?k(E):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),L=0;V.length>L;L++)v(E,M=V[L])&&!v(R,M)&&I(R,M,y(E,M));R.prototype=N,N.constructor=R,f(r,C,R)}},238:function(e,t,l){var n=l(3);e.exports=n(1..valueOf)},239:function(e,t,l){var n=l(3),r=l(22),o=l(11),c=l(240),f=n("".replace),v="["+c+"]",m=RegExp("^"+v+v+"*"),d=RegExp(v+v+"*$"),S=function(e){return function(t){var l=o(r(t));return 1&e&&(l=f(l,m,"")),2&e&&(l=f(l,d,"")),l}};e.exports={start:S(1),end:S(2),trim:S(3)}},240:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},241:function(e,t,l){"use strict";l(231)},245:function(e,t,l){"use strict";l.r(t);var n=[function(){var e=this.$createElement,t=this._self._c||e;return t("i",{staticClass:"info-icon"},[t("img",{attrs:{alt:"icon",src:l(234)}})])}],r={name:"SkillsGroup",components:{SkillBar:l(232).default},props:{title:{type:String,required:!0},info:{type:String,default:null},items:{type:Array,required:!0}},computed:{hasAnyInfo:function(){return this.info&&this.items.some((function(e){return e.info}))}}},o=(l(253),l(16)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{class:["skills-section",{"interactive-area":!0}]},[l("h4",{staticClass:"is-size-5 has-text-weight-bold mb-4"},[e._v("\n    "+e._s(e.title)+"\n  ")]),e._v(" "),l("div",{staticClass:"mb-2"},[e._v("\n    "+e._s(e.info)+"\n  ")]),e._v(" "),l("div",e._l(e.items,(function(t){return l("div",{key:t.title,staticClass:"skill-item"},[l("span",{staticClass:"item-title"},[e._v(e._s(t.title))]),e._v(" "),t.info?l("span",[e._m(0,!0),e._v(" "),l("span",{staticClass:"info"},[e._v(e._s(t.info))])]):e._e(),e._v(" "),l("SkillBar",{attrs:{level:t.level}})],1)})),0)])}),n,!1,null,"781a663a",null);t.default=component.exports;installComponents(component,{SkillBar:l(232).default})},253:function(e,t,l){"use strict";l(235)},290:function(e,t,l){"use strict";l.r(t);var n={name:"Skills",components:{SkillsGroup:l(245).default},data:function(){return{skills:[{title:"Programming/Markup languages",items:[{title:"Javascript",info:"The main language I work with ⭐︎",level:3},{title:"TypeScript",info:"Have been using TypeScript in production for a year",level:2},{title:"CSS, SCSS, LESS, JSS",info:"Key points: Bootstrap and Bulma, Atomic and BEM, Flexbox, CSS Animation",level:3},{title:"HTML5",info:"Key points: Semantic markup, accessibility, native controls",level:3}]},{title:"JavaScript Frameworks and SSR",items:[{title:"Vue",info:"Standard stack (Vuex and Vue Router) plus TypeScript, Vuetify and Vuelidate",level:3},{title:"React",info:"With Redux-Saga and JSS, but the last React version I used was 16.3",level:1},{title:"AngularJS 1.x",info:"",level:1},{title:"NuxtJS",info:"",level:2},{title:"Gatsby",info:"",level:1}]},{title:"Browser APIs",items:[{title:"Web Audio (Web Audio API, MIDI API)",info:"",level:3},{title:"Web Graphics (SVG, Canvas)",info:"",level:2},{title:"Data Storage (Local Storage, IndexedDB)",info:"",level:2},{title:"WebWorkers",info:"",level:2}]},{title:"UX/UI design tools",items:[{title:"Photoshop",level:2},{title:"Figma",level:2},{title:"Illustrator",level:1},{title:"Balsamiq",level:1}]},{title:"Infrastructure",info:"",items:[{title:"Git (GitHub, Gitlab, Bitbucket)",level:2},{title:"Bundling/Automation (Webpack, gulp)",level:2},{title:"CI/CD (Azure, AWS, Travis, CircleCI, Gitlab Pipeline)",level:1},{title:"Virtualization (Docker, VMware Workstation)",level:1}]},{title:"Server communication",items:[{title:"REST API",level:3},{title:"GraphQL",level:1},{title:"WebSockets",level:1}]},{title:"Code quality and performance",info:"",items:[{title:"Linting, Formatting, Style guides",info:"I usually use ESLint, StyleLint, Prettier (it hurts), StandardJS and Airbnb styles ",level:3},{title:"Unit-testing (Jest, Vue Test Utils, Mocha/Ava)",level:2},{title:"Documentation (JSDoc, Swagger)",info:"",level:2},{title:"Code review",level:3},{title:"Web page performance",info:"PageSpeed, Lighthouse, Chrome Performance tools",level:2}]},{title:"Workflow & Methodology",items:[{title:"Agile SCRUM/KANBAN",level:2},{title:"JIRA",level:2},{title:"Confluence",level:2},{title:"Trello",level:1}]},{title:"Languages",items:[{title:"Russian",info:"My native language",level:3},{title:"English",info:"It's been my working language for the last seven years (~B2)",level:2},{title:"German",info:"Just enough to survive for several days in the German language-only environment ☺︎ (~A1)",level:1}]}]}}},r=l(16),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"skills container"},[l("h2",{staticClass:"title is-2 has-text-weight-bold"},[e._v("\n    Skills\n  ")]),e._v(" "),l("div",{staticClass:"content"},[l("h3",[e._v("What I can do:")]),e._v(" "),e._m(0),e._v(" "),l("h3",[e._v("Detailed list:")]),e._v(" "),l("div",{staticClass:"is-flex is-flex-wrap-wrap is-justify-content-space-between",staticStyle:{"margin-left":"-0.75rem","margin-bottom":"-1.5rem"}},e._l(e.skills,(function(t){return l("SkillsGroup",e._b({key:t.title,staticClass:"mb-3 p-3"},"SkillsGroup",t,!1))})),1)])])}),[function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("ul",[l("li",[e._v("\n        develop and maintain complex web apps with modern JS frameworks (preferably Vue, but I have worked with React and AngularJS too)\n      ")]),e._v(" "),l("li",[e._v("\n        create reasonably pixel-perfect, adaptive, rich-media web interfaces with a nontrivial design\n      ")]),e._v(" "),l("li",[e._v("\n        make wireframes and user flows based on business requirements, create interactive HTML prototypes\n      ")]),e._v(" "),l("li",[e._v("\n        manage a small team of developers in Agile process. However, I prefer coding and UX design more\n      ")])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{SkillsGroup:l(245).default})}}]);
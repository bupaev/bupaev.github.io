(window.webpackJsonp=window.webpackJsonp||[]).push([[13,3,4,5,6,7,8,11,12],{227:function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},t.exports.default=t.exports,t.exports.__esModule=!0},228:function(t,e,n){var r=n(234);t.exports=function(source,t){if(null==source)return{};var e,i,n=r(source,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(source);for(i=0;i<c.length;i++)e=c[i],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(source,e)&&(n[e]=source[e])}return n},t.exports.default=t.exports,t.exports.__esModule=!0},229:function(t,e,n){},230:function(t,e,n){"use strict";n.r(e);n(235);var r={name:"SkillBar",props:{level:{type:Number,required:!0}}},c=(n(239),n(16)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:"skill-bar mb-4 mt-1"},t._l(3,(function(i){return n("div",{key:i,class:["segment",{filled:t.level>=i}]})})),0)}),[],!1,null,"47e36e61",null);e.default=component.exports},231:function(t,e,n){t.exports=n.p+"d436272b78c60a917725911b79f4ebc2.svg"},232:function(t,e,n){},233:function(t,e,n){},234:function(t,e){t.exports=function(source,t){if(null==source)return{};var e,i,n={},r=Object.keys(source);for(i=0;i<r.length;i++)e=r[i],t.indexOf(e)>=0||(n[e]=source[e]);return n},t.exports.default=t.exports,t.exports.__esModule=!0},235:function(t,e,n){"use strict";var r=n(13),c=n(1),o=n(3),l=n(100),f=n(18),v=n(14),d=n(175),h=n(36),m=n(99),y=n(174),w=n(5),_=n(73).f,O=n(27).f,C=n(17).f,S=n(236),x=n(237).trim,k="Number",j=c.Number,I=j.prototype,P=c.TypeError,E=o("".slice),A=o("".charCodeAt),M=function(t){var e=y(t,"number");return"bigint"==typeof e?e:z(e)},z=function(t){var e,n,r,c,o,l,f,code,v=y(t,"number");if(m(v))throw P("Cannot convert a Symbol value to a number");if("string"==typeof v&&v.length>2)if(v=x(v),43===(e=A(v,0))||45===e){if(88===(n=A(v,2))||120===n)return NaN}else if(48===e){switch(A(v,1)){case 66:case 98:r=2,c=49;break;case 79:case 111:r=8,c=55;break;default:return+v}for(l=(o=E(v,2)).length,f=0;f<l;f++)if((code=A(o,f))<48||code>c)return NaN;return parseInt(o,r)}return+v};if(l(k,!j(" 0o1")||!j("0b1")||j("+0x1"))){for(var H,D=function(t){var e=arguments.length<1?0:j(M(t)),n=this;return h(I,n)&&w((function(){S(n)}))?d(Object(e),n,D):e},L=r?_(j):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),V=0;L.length>V;V++)v(j,H=L[V])&&!v(D,H)&&C(D,H,O(j,H));D.prototype=I,I.constructor=D,f(c,k,D)}},236:function(t,e,n){var r=n(3);t.exports=r(1..valueOf)},237:function(t,e,n){var r=n(3),c=n(22),o=n(11),l=n(238),f=r("".replace),v="["+l+"]",d=RegExp("^"+v+v+"*"),h=RegExp(v+v+"*$"),m=function(t){return function(e){var n=o(c(e));return 1&t&&(n=f(n,d,"")),2&t&&(n=f(n,h,"")),n}};t.exports={start:m(1),end:m(2),trim:m(3)}},238:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},239:function(t,e,n){"use strict";n(229)},240:function(t,e,n){"use strict";n.r(e);var r=n(244),c={name:"VennDiagramProfessions",components:{HeadIcon:n.n(r).a},data:function(){return{basicFontSize:null}},computed:{fontSizeCss:function(){return this.basicFontSize?"font-size:".concat(this.basicFontSize,"px"):""}},mounted:function(){var t=this;new ResizeObserver((function(e){var n=e[0].contentRect;t.basicFontSize=n.width/20})).observe(this.$refs.wrapper)}},o=(n(245),n(16)),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"venn-diagram-professions",style:t.fontSizeCss},[n("div",{ref:"wrapper",staticClass:"wrapper"},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),n("div",{staticClass:"me-area"},[n("span",{staticClass:"pin"},[n("HeadIcon")],1),t._v(" "),n("span",{staticClass:"speech-bubble"},[t._v("Hi! It's me!")])])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"circle-left"},[n("span",{staticClass:"circle-title"},[t._v("Back End")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"circle-top"},[n("span",{staticClass:"circle-title",staticStyle:{"font-size":"1.45em"}},[t._v("Front End")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"circle-right"},[n("span",{staticClass:"circle-title"},[t._v("UI/UX Design")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"center-area"},[n("span",{staticClass:"circle-title"},[t._v("Unicorn"),n("br"),t._v("Area")])])}],!1,null,"17e52ec4",null);e.default=component.exports},241:function(t,e,n){"use strict";n.r(e);var r=[function(){var t=this.$createElement,e=this._self._c||t;return e("i",{staticClass:"info-icon"},[e("img",{attrs:{alt:"icon",src:n(231)}})])}],c={name:"SkillsGroup",components:{SkillBar:n(230).default},props:{title:{type:String,required:!0},info:{type:String,default:null},items:{type:Array,required:!0}},computed:{hasAnyInfo:function(){return this.info&&this.items.some((function(t){return t.info}))}}},o=(n(247),n(16)),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:["skills-section",{"interactive-area":!0}]},[n("h4",{staticClass:"is-size-5 has-text-weight-bold mb-4"},[t._v("\n    "+t._s(t.title)+"\n  ")]),t._v(" "),n("div",{staticClass:"mb-2"},[t._v("\n    "+t._s(t.info)+"\n  ")]),t._v(" "),n("div",t._l(t.items,(function(e){return n("div",{key:e.title,staticClass:"skill-item"},[n("span",{staticClass:"item-title"},[t._v(t._s(e.title))]),t._v(" "),e.info?n("span",[t._m(0,!0),t._v(" "),n("span",{staticClass:"info"},[t._v(t._s(e.info))])]):t._e(),t._v(" "),n("SkillBar",{attrs:{level:e.level}})],1)})),0)])}),r,!1,null,"781a663a",null);e.default=component.exports;installComponents(component,{SkillBar:n(230).default})},242:function(t,e,n){},243:function(t,e,n){},244:function(t,e,n){n(45),n(34),n(44),n(71),n(35),n(72);var r=n(227),c=n(228),o=["class","staticClass","style","staticStyle","attrs"];function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}n(98),t.exports={functional:!0,render:function(t,e){var n=e._c,data=(e._v,e.data),f=e.children,v=void 0===f?[]:f,d=data.class,h=data.staticClass,style=data.style,m=data.staticStyle,y=data.attrs,w=void 0===y?{}:y,_=c(data,o);return n("svg",function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){r(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({class:[d,h],style:[style,m],attrs:Object.assign({version:"1.2",baseProfile:"tiny",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",viewBox:"0 0 400 512"},w)},_),v.concat([n("path",{attrs:{"fill-rule":"evenodd",fill:"#FFD700",stroke:"#FFFFFF","stroke-width":"20","stroke-miterlimit":"10",d:"M194.8,489\n\tc-23.2,0-44.1-4.6-60.4-15.1c-33.7-19.7-54.6-52.3-70.9-106.9L60,356.6c-22.1-10.5-30.2-40.7-37.2-70.9v-1.2\n\tc-2.3-16.3-3.5-36,10.5-52.3c-5.8-23.2-7-46.5-3.5-69.7c4.6-26.7,16.3-49.9,36-68.5c18.6-19.7,41.8-32.5,67.4-37.2\n\tc11.6-2.3,15.1-2.3,47.6-2.3l13.9-1.2v-8.1c2.3-8.1,9.3-13.9,17.4-16.3h23.2c15.1,4.6,26.7,13.9,34.8,25.6l8.1-1.2\n\tc22.1,1.2,39.5,17.4,43,38.3c17.4,13.9,32.5,33.7,41.8,54.6c10.5,23.2,11.6,45.3,8.1,77.8l-2.3,17.4c9.3,13.9,9.3,36-1.2,65.1\n\tl-1.3,3.6c-9.3,22.1-21.9,35.9-35.8,45.2l-2.3,8.1l-2.3,7c-17.4,53.4-40.7,87.1-74.3,105.7h-1.2C233.1,484.4,213.4,489,194.8,489z"}}),n("path",{staticClass:"contour",attrs:{d:"M215.7,42.9c-7,1.2-8.1,9.3-3.5,12.8c4.6,3.5,3.5,10.5-2.3,12.8h-30.2c-31.4,0-33.7,0-44.1,2.3\n\tC72.1,84,31.3,146.1,44.5,209.6c0.1,0.6,0.3,1.2,0.4,1.8l4.6,24.4l-1.2,1.2c-11.6,9.3-15.1,24.4-10.5,44.1\n\tc8.1,39.5,16.3,58.1,31.4,62.7h2.3l1.2,4.6l4.6,13.9c15.1,52.3,34.8,81.3,63.9,97.6c15.1,9.3,34.8,13.9,53.4,13.9\n\tc17.4,0,34.8-3.5,48.8-11.6c31.4-15.1,52.3-45.3,67.4-96.4l4.6-15.1l2.3-5.8l2.3-2.3c12.8-5.8,24.4-20.9,32.5-41.8\n\tc10.5-26.7,10.5-43,1.2-53.4l-2.3-2.3l1.2-3.5l3.5-18.6c3.5-29,2.3-49.9-7-70.9c-8.1-19.7-24.4-39.5-41.8-51.1l-1.2-1.2v-2.3\n\tc1.2-16.3-11.6-29-27.9-30.2c-4.6,0-7,2.3-7,7c-1.2,2.3-2.3,4.6-4.6,4.6c-2.3,0-4.6-2.3-5.8-5.8c-3.5-13.9-21.9-27.1-27.9-29\n\tC226.5,42,223.4,41.8,215.7,42.9z M222.7,31.3c6.5,0,12.8,2.3,12.8,2.3c5.8,1.2,25.6,12.8,32.5,25.6l10.5-2.3h7\n\tc17.4,5.8,30.2,18.6,31.4,37.2c40.7,30.2,60.4,80.2,51.1,130.1l-2.3,12.8l-1.2,5.8c5.8,7,8.1,15.1,8.1,25.6c0,10.5-3.5,22.1-9.3,36\n\tc-9.3,24.4-22.1,40.7-36,48.8l-1.2,1.2l-2.3,8.1l-2.3,7c-16.3,53.4-38.3,86-72,103.4c-36,18.1-78.6,17.2-113.8-2.3\n\tc-32.5-18.6-53.4-49.9-69.7-104.5l-3.5-12.8c-19.7-8.1-29-33.7-36-69.7c-5.8-25.6,1.2-40.7,10.5-51.1l-1.2-3.5l-3.5-15.1\n\tc-2.3-20.9-2.3-36,0-51.1c9.3-52.3,48.8-92.9,101.1-103.4c11.6-2.3,16.3-2.3,46.5-2.3h19.7c-2.3-3.5-2.3-7-1.2-11.6\n\tc1.2-7,8.1-10.5,15.1-12.8C213.4,32.5,216.2,31.3,222.7,31.3z"}}),n("g",{staticClass:"features"},[n("path",{attrs:{d:"M233.3,387c-3.5,0-6.9,4-6.9,4c-8.1,7-17.6,11.3-28.1,11.3s-19.9-4.5-29.2-11.5c0,0-2.9-2.5-4.5-2.8\n\t\tc-1.6-0.3-3.5,0.3-3.5,0.3c-5.8,2.3-5.8,8.1,0,12.8c10.5,9.3,24.4,13.9,37.2,13.9c11.6,0,23.2-3.5,32.5-10.5\n\t\tc9.3-5.8,10.8-11.5,7.2-15.6C238.1,389.1,235.7,387,233.3,387z"}}),n("path",{attrs:{d:"M322.6,243.2c-7-2.3-32.8-3.5-47.5-3.5c-14.7,0-27.7,2.2-27.7,2.2c-12,1.8-17.7,5.9-24.7,9.4c-16.3,5.5-34,5.1-49.9-1.2\n\t\tc-8.1-5.8-16.3-8.1-31.4-9.3h-43L74,243.2c-4.6,3.5-5.8,12.8-1.2,17.4l1.2,12.8c1.2,33.7,10.5,47.6,34.8,51.1\n\t\tc17.4,2.3,34.8,1.2,52.3-2.3c13.9-4.6,19.7-11.6,24.4-31.4l4.6-13.9h17.4l2.3,10.5c5.8,22.1,10.5,29,23.2,33.7\n\t\tc8.1,3.5,20.9,4.6,33.7,4.6s25.6-1.2,33.7-4.6c13.9-5.8,20.9-18.6,22.1-41.8l2.3-18.6C329.6,255.9,327.2,244.3,322.6,243.2z\n\t\t M170.4,294.3c-3.5,12.8-9.3,17.4-32.5,18.6h-10.5c-19.7,0-30.2-4.6-33.7-12.8c-5.8-9.3-7-38.3-2.3-41.8l20.9-3.5h1.2h1.2h8.1\n\t\tc19.7,0,36,2.3,44.1,8.1C176.2,268.7,176.2,275.7,170.4,294.3z M304,298.9c-3.5,9.3-13.9,13.9-33.7,13.9h-11.6\n\t\tc-25.6-1.2-29-4.6-34.8-26.7c-5.8-20.9,3.5-29,38.3-31.4h11.6l23.2,1.2c8.1,1.2,9.3,2.3,10.5,5.8\n\t\tC309.8,268.7,307.5,291.9,304,298.9z"}})])]))}}},245:function(t,e,n){"use strict";n(232)},246:function(t,e,n){},247:function(t,e,n){"use strict";n(233)},250:function(t,e,n){var map={"./academic-cap-detailed.svg":251,"./academic-cap.svg":252,"./download.svg":253,"./head-with-glasses-bg-black.svg":254,"./head-with-glasses-bg-gold.svg":255,"./head-with-glasses.svg":256,"./info.svg":231,"./linkedin.svg":257,"./mail.svg":258,"./mountain-with-flag-detailed.svg":259,"./mountain-with-flag.svg":260,"./pen-and-wrench-detailed.svg":261,"./pen-and-wrench.svg":262,"./telegram.svg":263,"./venn-diagram.svg":264};function r(t){var e=c(t);return n(e)}function c(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=c,t.exports=r,r.id=250},251:function(t,e,n){t.exports=n.p+"982e13caced881dad6e0e0fd78c57df4.svg"},252:function(t,e,n){t.exports=n.p+"6d33130f218fb6e9900239dc15723b4c.svg"},253:function(t,e,n){t.exports=n.p+"6df8af4744b570042829a51c8f6745dc.svg"},254:function(t,e,n){t.exports=n.p+"3e45d5b03907807a6796f20db98a055b.svg"},255:function(t,e,n){t.exports=n.p+"0106c681146b5757099c1263a84068df.svg"},256:function(t,e,n){t.exports=n.p+"58c0f60159b1f02920316de8a6d353d3.svg"},257:function(t,e,n){t.exports=n.p+"1b099cb3f2e27b341d12d736c3ea0a89.svg"},258:function(t,e,n){t.exports=n.p+"fdba37e2c761ccc1669d87eab317e7ac.svg"},259:function(t,e,n){t.exports=n.p+"90587fedf0cfa02147525c702ea17a60.svg"},260:function(t,e,n){t.exports=n.p+"3b5d4716017df043dd58f854eeeafc1d.svg"},261:function(t,e,n){t.exports=n.p+"87e830bdb5d42de0df36ec45cbe4da12.svg"},262:function(t,e,n){t.exports=n.p+"851aca639df47e5ff61d68c7cacc7150.svg"},263:function(t,e,n){t.exports=n.p+"f4f18b5cf3996d90bd7862a036003b56.svg"},264:function(t,e,n){t.exports=n.p+"b11fc3b0db388fa929bfed4f138ad21b.svg"},265:function(t,e,n){"use strict";var r=n(6),c=n(74).findIndex,o=n(127),l="findIndex",f=!0;l in[]&&Array(1).findIndex((function(){f=!1})),r({target:"Array",proto:!0,forced:f},{findIndex:function(t){return c(this,t,arguments.length>1?arguments[1]:void 0)}}),o(l)},266:function(t,e,n){"use strict";n(242)},267:function(t,e,n){n(45),n(34),n(44),n(71),n(35),n(72);var r=n(227),c=n(228),o=["class","staticClass","style","staticStyle","attrs"];function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}n(98),t.exports={functional:!0,render:function(t,e){var n=e._c,data=(e._v,e.data),f=e.children,v=void 0===f?[]:f,d=data.class,h=data.staticClass,style=data.style,m=data.staticStyle,y=data.attrs,w=void 0===y?{}:y,_=c(data,o);return n("svg",function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){r(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({class:[d,h],style:[{"enable-background":"new 0 0 19.9 19.8"},style,m],attrs:Object.assign({version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 19.9 19.8",style:"enable-background:new 0 0 19.9 19.8;","xml:space":"preserve"},w)},_),v.concat([n("g",[n("path",{attrs:{fill:"none",d:"M-2-2.1h24v24H-2V-2.1z"}}),n("g",[n("path",{attrs:{d:"M2,18.6c-0.4,0-0.7-0.3-0.7-0.7v-16c0-0.4,0.3-0.7,0.7-0.7h16c0.4,0,0.7,0.3,0.7,0.7v16c0,0.4-0.3,0.7-0.7,0.7H2z\n\t\t\t M2.7,17.2h14.6V2.6H2.7V17.2z M13.8,15.1v-4c0-1.1-0.9-2-2-2c-1.1,0-2,0.9-2,2v4H8.3V8.2h1.4v0.8l0.5-0.5C10.8,8,11.4,7.7,12,7.7\n\t\t\tc1.8,0,3.2,1.5,3.2,3.5v4H13.8z M4.8,15.1V8.2h1.4v6.9H4.8z M5.5,6.6c-0.7,0-1.2-0.5-1.2-1.2s0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2\n\t\t\tS6.2,6.6,5.5,6.6z"}})])])]))}}},268:function(t,e,n){n(45),n(34),n(44),n(71),n(35),n(72);var r=n(227),c=n(228),o=["class","staticClass","style","staticStyle","attrs"];function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}n(98),t.exports={functional:!0,render:function(t,e){var n=e._c,data=(e._v,e.data),f=e.children,v=void 0===f?[]:f,d=data.class,h=data.staticClass,style=data.style,m=data.staticStyle,y=data.attrs,w=void 0===y?{}:y,_=c(data,o);return n("svg",function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){r(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({class:[d,h],style:[{"enable-background":"new 0 0 189.473 189.473"},style,m],attrs:Object.assign({version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 189.473 189.473",style:"enable-background:new 0 0 189.473 189.473;","xml:space":"preserve"},w)},_),v.concat([n("g",[n("path",{attrs:{d:"M152.531,179.476c-1.48,0-2.95-0.438-4.211-1.293l-47.641-32.316l-25.552,18.386c-2.004,1.441-4.587,1.804-6.914,0.972\n\t\tc-2.324-0.834-4.089-2.759-4.719-5.146l-12.83-48.622L4.821,93.928c-2.886-1.104-4.8-3.865-4.821-6.955\n\t\tc-0.021-3.09,1.855-5.877,4.727-7.02l174.312-69.36c0.791-0.336,1.628-0.53,2.472-0.582c0.302-0.018,0.605-0.018,0.906-0.001\n\t\tc1.748,0.104,3.465,0.816,4.805,2.13c0.139,0.136,0.271,0.275,0.396,0.42c1.11,1.268,1.72,2.814,1.835,4.389\n\t\tc0.028,0.396,0.026,0.797-0.009,1.198c-0.024,0.286-0.065,0.571-0.123,0.854L159.898,173.38c-0.473,2.48-2.161,4.556-4.493,5.523\n\t\tC154.48,179.287,153.503,179.476,152.531,179.476z M104.862,130.579l42.437,28.785L170.193,39.24l-82.687,79.566l17.156,11.638\n\t\tC104.731,130.487,104.797,130.533,104.862,130.579z M69.535,124.178l5.682,21.53l12.242-8.809l-16.03-10.874\n\t\tC70.684,125.521,70.046,124.893,69.535,124.178z M28.136,86.782l31.478,12.035c2.255,0.862,3.957,2.758,4.573,5.092l3.992,15.129\n\t\tc0.183-1.745,0.974-3.387,2.259-4.624L149.227,38.6L28.136,86.782z"}})])]))}}},269:function(t,e,n){n(45),n(34),n(44),n(71),n(35),n(72);var r=n(227),c=n(228),o=["class","staticClass","style","staticStyle","attrs"];function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}n(98),t.exports={functional:!0,render:function(t,e){var n=e._c,data=(e._v,e.data),f=e.children,v=void 0===f?[]:f,d=data.class,h=data.staticClass,style=data.style,m=data.staticStyle,y=data.attrs,w=void 0===y?{}:y,_=c(data,o);return n("svg",function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){r(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({class:[d,h],style:[style,m],attrs:Object.assign({width:"24px",height:"24px",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},w)},_),v.concat([n("path",{attrs:{d:"M22 20.007a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V19h18V7.3l-8 7.2-10-9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16.007zM4.434 5L12 11.81 19.566 5H4.434zM0 15h8v2H0v-2zm0-5h5v2H0v-2z"}})]))}}},270:function(t,e,n){n(45),n(34),n(44),n(71),n(35),n(72);var r=n(227),c=n(228),o=["class","staticClass","style","staticStyle","attrs"];function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}n(98),t.exports={functional:!0,render:function(t,e){var n=e._c,data=(e._v,e.data),f=e.children,v=void 0===f?[]:f,d=data.class,h=data.staticClass,style=data.style,m=data.staticStyle,y=data.attrs,w=void 0===y?{}:y,_=c(data,o);return n("svg",function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){r(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({class:[d,h],style:[style,m],attrs:Object.assign({version:"1.2",baseProfile:"tiny",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",viewBox:"0 0 32 32"},w)},_),v.concat([n("polygon",{attrs:{points:"19.4,25 20.9,23.5 23.6,25.3 23.6,17.6 26.4,17.6 26.4,25.3 29.1,23.5 30.6,25 25,30.6 "}}),n("path",{attrs:{d:"M7.8,30.4l-2.2-2.2V3.8l2.2-2.2h11.3l7.2,7.2v6.6h-2.8v-3h-5.8l-2.2-2.2V4.4H8.4v23.2h10v2.8H7.8z M23,9.6L18.4,5v4.6H23z"}})]))}}},271:function(t,e,n){"use strict";n(243)},272:function(t,e,n){"use strict";n(246)},277:function(t,e,n){"use strict";n.r(e);var r=n(118);var c=n(128),o=n(89);function l(t){return function(t){if(Array.isArray(t))return Object(r.a)(t)}(t)||Object(c.a)(t)||Object(o.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n(46),n(265);var f={name:"VerticalMenu",data:function(){return{items:[{title:"Hello!",id:"hero-area",icon:"head-with-glasses.svg"},{title:"Overview",id:"synopsis",icon:"venn-diagram.svg"},{title:"Skills",id:"skills",icon:"pen-and-wrench.svg"},{title:"Experience",id:"experience",icon:"mountain-with-flag.svg"},{title:"Education",id:"education",icon:"academic-cap.svg"}],menuItemHeight:0,contentSectionsHeightArray:[],contentSectionsOffsetArray:[],scaleCoefficients:[],markerOffset:0,markerHeight:0}},mounted:function(){var t=this;this.menuItemHeight=this.$refs.menu.getElementsByClassName("item")[0].clientHeight,this.contentSectionsHeightArray=this.getSectionsProp("clientHeight"),this.contentSectionsOffsetArray=this.getSectionsProp("offsetTop"),this.scaleCoefficients=this.contentSectionsHeightArray.map((function(e){return t.menuItemHeight/e})),this.setAreaMarkerPosition(),window.addEventListener("scroll",this.setAreaMarkerPosition),window.addEventListener("resize",this.setAreaMarkerPosition)},destroyed:function(){window.removeEventListener("scroll",this.setAreaMarkerPosition),window.removeEventListener("resize",this.setAreaMarkerPosition)},methods:{onMenuItemClick:function(t){window.scrollTo({top:this.contentSectionsOffsetArray[t],left:0,behavior:"smooth"})},getSectionsProp:function(t){return l(document.getElementsByClassName("anchor-for-navigation")).map((function(section){return section[t]}))},getRescaledOffset:function(t){var e=this.contentSectionsOffsetArray.findIndex((function(e){return t<e})),n=-1===e?this.contentSectionsOffsetArray.length:Math.max(e-1,0);return n*this.menuItemHeight+(t-this.contentSectionsOffsetArray[n])*this.scaleCoefficients[n]},setAreaMarkerPosition:function(){var t=window.scrollY,e=t+window.innerHeight;this.markerOffset=this.getRescaledOffset(t),e!==document.body.clientHeight?this.markerHeight=this.getRescaledOffset(e)-this.markerOffset:this.markerHeight=this.menuItemHeight}}},v=(n(266),n(16)),component=Object(v.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("nav",{staticClass:"vertical-menu"},[r("div",{staticClass:"visible-area-marker",style:"transform: translateY("+t.markerOffset+"px); height: "+t.markerHeight+"px"}),t._v(" "),r("div",{ref:"menu"},t._l(t.items,(function(e,c){return r("div",{key:e.id,staticClass:"item",on:{click:function(e){return t.onMenuItemClick(c)}}},[r("span",{staticClass:"item-icon"},[r("img",{attrs:{src:n(250)("./"+e.icon),draggable:"false"}})]),t._v(" "),r("span",{staticClass:"item-text"},[t._v("\n        "+t._s(e.title)+"\n      ")])])})),0)])}),[],!1,null,null,null);e.default=component.exports},278:function(t,e,n){"use strict";n.r(e);const r={props:{src:{type:String,required:!0},srcPlaceholder:{type:String,default:"data:,"},srcset:{type:String},intersectionOptions:{type:Object,default:()=>({})},usePicture:{type:Boolean,default:!1}},inheritAttrs:!1,data:()=>({observer:null,intersected:!1,loaded:!1}),computed:{srcImage(){return this.intersected&&this.src?this.src:this.srcPlaceholder},srcsetImage(){return!(!this.intersected||!this.srcset)&&this.srcset}},methods:{load(){this.$el.getAttribute("src")!==this.srcPlaceholder&&(this.loaded=!0,this.$emit("load"))},error(){this.$emit("error",this.$el)}},render(t){let e=t("img",{attrs:{src:this.srcImage,srcset:this.srcsetImage},domProps:this.$attrs,class:{"v-lazy-image":!0,"v-lazy-image-loaded":this.loaded},on:{load:this.load,error:this.error}});return this.usePicture?t("picture",{on:{load:this.load}},this.intersected?[this.$slots.default,e]:[e]):e},mounted(){"IntersectionObserver"in window&&(this.observer=new IntersectionObserver((t=>{t[0].isIntersecting&&(this.intersected=!0,this.observer.disconnect(),this.$emit("intersect"))}),this.intersectionOptions),this.observer.observe(this.$el))},destroyed(){"IntersectionObserver"in window&&this.observer.disconnect()}};var c=n(267),o=n.n(c),l=n(268),f=n.n(l),v=n(269),d=n.n(v),h=n(270),m={name:"HeroArea",components:{VLazyImage:r,DownloadIcon:n.n(h).a,MailIcon:d.a,LinkedinIcon:o.a,TelegramIcon:f.a}},y=(n(271),n(16)),component=Object(y.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hero-area hero"},[n("div",{staticClass:"container"},[n("div",{staticClass:"hero-body"},[n("div",{staticClass:"columns"},[n("div",{staticClass:"left-column column has-text-right is-three-fifths-touch"},[n("div",{staticClass:"parallelogram-image-container is-hidden-tablet"},[n("v-lazy-image",{attrs:{src:"../pics/portrait-1-mobile-2x.jpg","src-placeholder":"../pics/portrait-1-mobile-placeholder.jpg"}})],1),t._v(" "),t._m(0),t._v(" "),n("p",{staticClass:"contacts pt-5"},[n("span",{staticClass:"mr-5"},[n("a",{attrs:{href:"mailto:mail@paulbu.com"}},[n("span",{staticClass:"icon-text"},[n("span",{staticClass:"icon"},[n("MailIcon",{staticClass:"svg-icon"})],1),t._v(" "),n("span",[t._v("Email")])])])]),t._v(" "),n("span",{staticClass:"mr-5"},[n("a",{attrs:{href:"https://t.me/bupaev"}},[n("span",{staticClass:"icon-text"},[n("span",{staticClass:"icon"},[n("TelegramIcon",{staticClass:"svg-icon"})],1),t._v(" "),n("span",[t._v("Telegram")])])])]),t._v(" "),n("span",[n("a",{attrs:{href:"https://www.linkedin.com/in/pavel-buramensky/"}},[n("span",{staticClass:"icon-text"},[n("span",{staticClass:"icon"},[n("LinkedinIcon",{staticClass:"svg-icon"})],1),t._v(" "),n("span",[t._v("LinkedIn")])])])]),t._v(" "),n("span",{staticClass:"is-block-tablet"},[n("span",{staticClass:"vertical-align-hack mr-2 is-hidden-mobile"},[t._v("also you can")]),t._v(" "),n("a",{attrs:{href:"/pavel-buramensky-cv.pdf",target:"_blank"}},[n("span",{staticClass:"icon-text"},[n("span",{staticClass:"icon"},[n("DownloadIcon",{staticClass:"svg-icon"})],1),t._v(" "),n("span",[t._v("Download my CV")])])])])])]),t._v(" "),n("div",{staticClass:"column is-hidden-mobile"},[n("div",{staticClass:"parallelogram-image-container"},[n("v-lazy-image",{attrs:{src:"../pics/portrait-1-desktop.jpg","src-placeholder":"../pics/portrait-1-desktop-placeholder.jpg"}})],1)])])])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",{staticClass:"title pt-6"},[n("div",{staticClass:"text-shape-limiter is-hidden-mobile"}),t._v(" "),n("span",{staticClass:"is-size-1 has-text-right"},[t._v("Hi! I’m Pavel Buramensky")]),t._v(" "),n("p",{staticClass:"is-size-2 pt-4"},[t._v("\n              I’m a front-end developer who cares about user experience and tries to make the world a better place\n            ")])])}],!1,null,null,null);e.default=component.exports},279:function(t,e,n){"use strict";n.r(e);var r={name:"Overview",components:{VennDiagramProfessions:n(240).default}},c=(n(272),n(16)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"overview container"},[n("h2",{staticClass:"title is-2"},[t._v("\n    Overview\n  ")]),t._v(" "),n("div",{staticClass:"columns"},[n("div",{staticClass:"column"},[n("div",{staticClass:"content"},[n("figure",{staticClass:"diagram-container"},[n("VennDiagramProfessions")],1),t._v(" "),t._m(0),t._v(" "),n("p",[t._v("\n          I achieve this goal through expertise in the following areas:\n        ")]),t._v(" "),t._m(1),t._v(" "),n("p",[t._v("\n          This combination of skills and knowledge, that isn't only technical but also creative, helps me a lot in my work: it gives me the ability to\n          implement complex functionality from an idea to a real product, find an optimal balance between aesthetics, efforts and performance,\n          effectively communicate with design team and even carry out tasks of UX design if needed.\n        ")])])])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("\n          I've been doing front-end development for over a decade, mostly for complex web applications, like\n          "),n("a",{attrs:{href:"https://www.bandlab.com/creation-features",target:"_blank"}},[t._v("multitrack audio workstation")]),t._v(" or\n          "),n("a",{attrs:{href:"https://www.holmusk.com/solutions",target:"_blank"}},[t._v("electronic health record system")]),t._v(". Besides, I really enjoy creating\n          stylish web-sites, fancy CSS/SVG animations and data visualization. No matter what I do, my ultimate goal is to deliver a first-class user experience.\n        ")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"section-with-delimiter"},[n("p",[n("span",{staticClass:"bullet is-hidden-widescreen"}),n("strong",[t._v("Front-end engineering")]),t._v(" as my main specialization: building scalable,\n            maintainable front-end architectures, writing clean, readable code and making robust interface layouts (reasonably pixel-perfect)\n            using modern JavaScript frameworks, advanced web APIs, and everything else that you can find in trendy FE tech stack.\n          ")]),t._v(" "),n("p",{staticClass:"mb-4"},[n("span",{staticClass:"bullet is-hidden-widescreen"}),n("strong",[t._v("Visual design and user experience")]),t._v(" as an important addition.\n            My longstanding interest in photography and behavioral psychology gave me a good fundamental basis; ten years of creating\n            visual interfaces in close cooperation with professional UI/UX designers gave me a practical knowledge.\n          ")])])}],!1,null,"68039a5c",null);e.default=component.exports;installComponents(component,{VennDiagramProfessions:n(240).default})},280:function(t,e,n){"use strict";n.r(e);var r={name:"Skills",components:{SkillsGroup:n(241).default},data:function(){return{skills:[{title:"Programming/Markup languages",items:[{title:"Javascript",info:"The main language I work with ⭐︎",level:3},{title:"TypeScript",info:"Have been using TypeScript in production for a year",level:2},{title:"CSS, SCSS, LESS, JSS",info:"Key points: Bootstrap and Bulma, Atomic and BEM, Flexbox, CSS Animation",level:3},{title:"HTML5",info:"Key points: Semantic markup, accessibility, native controls",level:3}]},{title:"JavaScript Frameworks and SSR",items:[{title:"Vue",info:"Standard stack (Vuex and Vue Router) plus TypeScript, Vuetify and Vuelidate",level:3},{title:"React",info:"With Redux-Saga and JSS, but the last React version I used was 16.3",level:1},{title:"AngularJS 1.x",info:"",level:1},{title:"NuxtJS",info:"",level:2},{title:"Gatsby",info:"",level:1}]},{title:"Browser APIs",items:[{title:"Web Audio (Web Audio API, MIDI API)",info:"",level:3},{title:"Web Graphics (SVG, Canvas)",info:"",level:2},{title:"Data Storage (Local Storage, IndexedDB)",info:"",level:2},{title:"WebWorkers",info:"",level:2}]},{title:"UX/UI design tools",items:[{title:"Photoshop",level:2},{title:"Figma",level:2},{title:"Illustrator",level:1},{title:"Balsamiq",level:1}]},{title:"Infrastructure",info:"",items:[{title:"Git (GitHub, Gitlab, Bitbucket)",level:2},{title:"Bundling/Automation (Webpack, gulp)",level:2},{title:"CI/CD (Azure, AWS, Travis, CircleCI, Gitlab Pipeline)",level:1},{title:"Virtualization (Docker, VMware Workstation)",level:1}]},{title:"Server communication",items:[{title:"REST API",level:3},{title:"GraphQL",level:1},{title:"WebSockets",level:1}]},{title:"Code quality and performance",info:"",items:[{title:"Linting, Formatting, Style guides",info:"I usually use ESLint, StyleLint, Prettier (it hurts), StandardJS and Airbnb styles ",level:3},{title:"Unit-testing (Jest, Vue Test Utils, Mocha/Ava)",level:2},{title:"Documentation (JSDoc, Swagger)",info:"",level:2},{title:"Code review",level:3},{title:"Web page performance",info:"PageSpeed, Lighthouse, Chrome Performance tools",level:2}]},{title:"Workflow & Methodology",items:[{title:"Agile SCRUM/KANBAN",level:2},{title:"JIRA",level:2},{title:"Confluence",level:2},{title:"Trello",level:1}]},{title:"Languages",items:[{title:"Russian",info:"My native language",level:3},{title:"English",info:"It's been my working language for the last seven years (~B2)",level:2},{title:"German",info:"Just enough to survive for several days in the German language-only environment ☺︎ (~A1)",level:1}]}]}}},c=n(16),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"skills container"},[n("h2",{staticClass:"title is-2 has-text-weight-bold"},[t._v("\n    Skills\n  ")]),t._v(" "),n("div",{staticClass:"content"},[n("h3",[t._v("What I can do:")]),t._v(" "),t._m(0),t._v(" "),n("h3",[t._v("Detailed list:")]),t._v(" "),n("div",{staticClass:"is-flex is-flex-wrap-wrap is-justify-content-space-between",staticStyle:{"margin-left":"-0.75rem","margin-bottom":"-1.5rem"}},t._l(t.skills,(function(e){return n("SkillsGroup",t._b({key:e.title,staticClass:"mb-3 p-3"},"SkillsGroup",e,!1))})),1)])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[t._v("\n        develop and maintain complex web apps with modern JS frameworks (preferably Vue, but I have worked with React and AngularJS too)\n      ")]),t._v(" "),n("li",[t._v("\n        create reasonably pixel-perfect, adaptive, rich-media web interfaces with a nontrivial design\n      ")]),t._v(" "),n("li",[t._v("\n        make wireframes and user flows based on business requirements, create interactive HTML prototypes\n      ")]),t._v(" "),n("li",[t._v("\n        manage a small team of developers in Agile process. However, I prefer coding and UX design more\n      ")])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{SkillsGroup:n(241).default})},283:function(t,e,n){"use strict";n.r(e);var r={name:"Education"},c=n(16),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"education container"},[n("h2",{staticClass:"title is-2"},[t._v("\n    Education\n  ")]),t._v(" "),n("div",{staticClass:"content"},[n("h3",[t._v("Endless professional self-development")]),t._v(" "),n("p",[t._v("\n      Udemy, Coursera, Skillbox, JavaScript.Ninja, Refactoring.Guru and infinite number of articles, books and Youtube videos\n    ")]),t._v(" "),n("h3",[t._v("\n      Doctor of Philosophy (postgraduate student), Computer science (unfinished)\n    ")]),t._v(" "),n("p",[t._v("\n      Omsk State Technical University, 2013 - 2015.\n    ")]),t._v(" "),n("h3",[t._v("Master of Science, Computer science")]),t._v(" "),n("p",[t._v("\n      Omsk State Technical University, 2009-2011 - GPA 4.9/5.0\n    ")]),t._v(" "),n("h3",[t._v("Bachelor of Science, Computer science")]),t._v(" "),n("p",[t._v("\n      Omsk State Technical University, 2005-2009 - GPA 4.6/5.0\n    ")])])])}],!1,null,null,null);e.default=component.exports},285:function(t,e,n){},288:function(t,e,n){"use strict";n(285)},289:function(t,e,n){"use strict";n.r(e);var r=n(277),c=n(278),o=n(279),l=n(280),f=n(286),v=n(283),d={components:{VerticalMenu:r.default,HeroArea:c.default,Overview:o.default,Skills:l.default,Experience:f.default,Education:v.default},data:function(){return{heroAreaHeight:0,menuStyle:""}},mounted:function(){this.heroAreaHeight=this.$refs.heroArea.clientHeight,window.innerWidth<=768&&this.onScroll(),this.onResize(),window.addEventListener("resize",this.onResize)},destroyed:function(){window.removeEventListener("scroll",this.onScroll),window.removeEventListener("resize",this.onResize)},methods:{onResize:function(){this.heroAreaHeight=this.$refs.heroArea.clientHeight,this.onScroll(),window.innerWidth<=768?window.addEventListener("scroll",this.onScroll):(window.removeEventListener("scroll",this.onScroll),this.menuStyle="")},onScroll:function(){this.menuStyle=window.scrollY<this.heroAreaHeight?"top: ".concat(this.heroAreaHeight,"px; position: absolute"):""}}},h=(n(288),n(16)),component=Object(h.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("VerticalMenu",{style:t.menuStyle}),t._v(" "),n("section",{ref:"heroArea",staticClass:"anchor-for-navigation",staticStyle:{position:"sticky !important"},attrs:{id:"hero-area"}},[n("HeroArea")],1),t._v(" "),n("section",{staticClass:"section anchor-for-navigation is-primary",attrs:{id:"overview"}},[n("Overview")],1),t._v(" "),n("section",{staticClass:"section anchor-for-navigation with-background",attrs:{id:"skills"}},[n("Skills")],1),t._v(" "),n("section",{staticClass:"section anchor-for-navigation with-background",attrs:{id:"experience"}},[n("Experience")],1),t._v(" "),n("section",{staticClass:"section anchor-for-navigation with-background",attrs:{id:"education"}},[n("Education")],1)],1)}),[],!1,null,"1203086c",null);e.default=component.exports;installComponents(component,{VerticalMenu:n(277).default,HeroArea:n(278).default,Overview:n(279).default,Skills:n(280).default,Experience:n(286).default,Education:n(283).default})}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{231:function(e,t,n){e.exports=n.p+"d436272b78c60a917725911b79f4ebc2.svg"},242:function(e,t,n){},250:function(e,t,n){var map={"./academic-cap-detailed.svg":251,"./academic-cap.svg":252,"./download.svg":253,"./head-with-glasses-bg-black.svg":254,"./head-with-glasses-bg-gold.svg":255,"./head-with-glasses.svg":256,"./info.svg":231,"./linkedin.svg":257,"./mail.svg":258,"./mountain-with-flag-detailed.svg":259,"./mountain-with-flag.svg":260,"./pen-and-wrench-detailed.svg":261,"./pen-and-wrench.svg":262,"./telegram.svg":263,"./venn-diagram.svg":264};function r(e){var t=o(e);return n(t)}function o(e){if(!n.o(map,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return map[e]}r.keys=function(){return Object.keys(map)},r.resolve=o,e.exports=r,r.id=250},251:function(e,t,n){e.exports=n.p+"982e13caced881dad6e0e0fd78c57df4.svg"},252:function(e,t,n){e.exports=n.p+"6d33130f218fb6e9900239dc15723b4c.svg"},253:function(e,t,n){e.exports=n.p+"6df8af4744b570042829a51c8f6745dc.svg"},254:function(e,t,n){e.exports=n.p+"3e45d5b03907807a6796f20db98a055b.svg"},255:function(e,t,n){e.exports=n.p+"0106c681146b5757099c1263a84068df.svg"},256:function(e,t,n){e.exports=n.p+"58c0f60159b1f02920316de8a6d353d3.svg"},257:function(e,t,n){e.exports=n.p+"1b099cb3f2e27b341d12d736c3ea0a89.svg"},258:function(e,t,n){e.exports=n.p+"fdba37e2c761ccc1669d87eab317e7ac.svg"},259:function(e,t,n){e.exports=n.p+"90587fedf0cfa02147525c702ea17a60.svg"},260:function(e,t,n){e.exports=n.p+"3b5d4716017df043dd58f854eeeafc1d.svg"},261:function(e,t,n){e.exports=n.p+"87e830bdb5d42de0df36ec45cbe4da12.svg"},262:function(e,t,n){e.exports=n.p+"851aca639df47e5ff61d68c7cacc7150.svg"},263:function(e,t,n){e.exports=n.p+"f4f18b5cf3996d90bd7862a036003b56.svg"},264:function(e,t,n){e.exports=n.p+"b11fc3b0db388fa929bfed4f138ad21b.svg"},265:function(e,t,n){"use strict";var r=n(6),o=n(74).findIndex,c=n(127),f="findIndex",d=!0;f in[]&&Array(1).findIndex((function(){d=!1})),r({target:"Array",proto:!0,forced:d},{findIndex:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),c(f)},266:function(e,t,n){"use strict";n(242)},277:function(e,t,n){"use strict";n.r(t);var r=n(118);var o=n(128),c=n(89);function f(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(o.a)(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n(46),n(265);var d={name:"VerticalMenu",data:function(){return{items:[{title:"Hello!",id:"hero-area",icon:"head-with-glasses.svg"},{title:"Overview",id:"synopsis",icon:"venn-diagram.svg"},{title:"Skills",id:"skills",icon:"pen-and-wrench.svg"},{title:"Experience",id:"experience",icon:"mountain-with-flag.svg"},{title:"Education",id:"education",icon:"academic-cap.svg"}],menuItemHeight:0,contentSectionsHeightArray:[],contentSectionsOffsetArray:[],scaleCoefficients:[],markerOffset:0,markerHeight:0}},mounted:function(){var e=this;this.menuItemHeight=this.$refs.menu.getElementsByClassName("item")[0].clientHeight,this.contentSectionsHeightArray=this.getSectionsProp("clientHeight"),this.contentSectionsOffsetArray=this.getSectionsProp("offsetTop"),this.scaleCoefficients=this.contentSectionsHeightArray.map((function(t){return e.menuItemHeight/t})),this.setAreaMarkerPosition(),window.addEventListener("scroll",this.setAreaMarkerPosition),window.addEventListener("resize",this.setAreaMarkerPosition)},destroyed:function(){window.removeEventListener("scroll",this.setAreaMarkerPosition),window.removeEventListener("resize",this.setAreaMarkerPosition)},methods:{onMenuItemClick:function(e){window.scrollTo({top:this.contentSectionsOffsetArray[e],left:0,behavior:"smooth"})},getSectionsProp:function(e){return f(document.getElementsByClassName("anchor-for-navigation")).map((function(section){return section[e]}))},getRescaledOffset:function(e){var t=this.contentSectionsOffsetArray.findIndex((function(t){return e<t})),n=-1===t?this.contentSectionsOffsetArray.length:Math.max(t-1,0);return n*this.menuItemHeight+(e-this.contentSectionsOffsetArray[n])*this.scaleCoefficients[n]},setAreaMarkerPosition:function(){var e=window.scrollY,t=e+window.innerHeight;this.markerOffset=this.getRescaledOffset(e),t!==document.body.clientHeight?this.markerHeight=this.getRescaledOffset(t)-this.markerOffset:this.markerHeight=this.menuItemHeight}}},l=(n(266),n(16)),component=Object(l.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("nav",{staticClass:"vertical-menu"},[r("div",{staticClass:"visible-area-marker",style:"transform: translateY("+e.markerOffset+"px); height: "+e.markerHeight+"px"}),e._v(" "),r("div",{ref:"menu"},e._l(e.items,(function(t,o){return r("div",{key:t.id,staticClass:"item",on:{click:function(t){return e.onMenuItemClick(o)}}},[r("span",{staticClass:"item-icon"},[r("img",{attrs:{src:n(250)("./"+t.icon),draggable:"false"}})]),e._v(" "),r("span",{staticClass:"item-text"},[e._v("\n        "+e._s(t.title)+"\n      ")])])})),0)])}),[],!1,null,null,null);t.default=component.exports}}]);
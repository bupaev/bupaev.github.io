(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{123:function(t,o,e){"use strict";e.r(o);var n={name:"GoToTop",methods:{goToTop:function(){window.scrollTo({top:0,left:0,behavior:"smooth"})}}},r=(e(226),e(16)),component=Object(r.a)(n,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"go-to-top",on:{click:t.goToTop}},[e("div",{staticClass:"arrow"}),t._v(" "),e("div",{staticClass:"arrow"}),t._v(" "),e("div",{staticClass:"arrow"})])}),[],!1,null,"0c46dbb1",null);o.default=component.exports},127:function(t,o,e){"use strict";var n=e(171);e.n(n).a.polyfill()},163:function(t,o,e){},165:function(t,o,e){},166:function(t,o,e){},167:function(t,o,e){},174:function(t,o,e){"use strict";var n={components:{Footer:e(94).default}},r=e(16),component=Object(r.a)(n,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("section",{staticClass:"main-content"},[e("Nuxt")],1),t._v(" "),e("Footer")],1)}),[],!1,null,null,null);o.a=component.exports;installComponents(component,{Footer:e(94).default})},175:function(t,o,e){"use strict";var n={layout:"empty"},r=(e(228),e(16)),component=Object(r.a)(n,(function(){var t=this.$createElement,o=this._self._c||t;return o("div",{staticClass:"service-page-wrapper"},[o("div",{staticClass:"service-page-text p-5"},[o("Nuxt")],1)])}),[],!1,null,"aa561afc",null);o.a=component.exports},178:function(t,o,e){e(179),t.exports=e(180)},222:function(t,o,e){"use strict";e(163)},224:function(t,o,e){},225:function(t,o,e){},226:function(t,o,e){"use strict";e(165)},227:function(t,o,e){"use strict";e(166)},228:function(t,o,e){"use strict";e(167)},32:function(t,o,e){"use strict";var n={layout:"servicePage",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},r=(e(222),e(16)),component=Object(r.a)(n,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[404===t.error.statusCode?e("div",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):e("div",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),e("NuxtLink",{staticClass:"back-to-home",attrs:{to:"/cv"}},[t._v("\n    ◁ back to home page\n  ")])],1)}),[],!1,null,"1c1666f6",null);o.a=component.exports},94:function(t,o,e){"use strict";e.r(o);var n={name:"Footer",components:{GoToTop:e(123).default}},r=(e(227),e(16)),component=Object(r.a)(n,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("footer",{staticClass:"footer is-size-5"},[e("GoToTop",{staticClass:"go-to-top-left"}),t._v(" "),e("GoToTop",{staticClass:"go-to-top-right"}),t._v(" "),t._m(0)],1)}),[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"text"},[e("span",[t._v("\n      Made with "),e("a",{attrs:{href:"https://github.com/bupaev/bupaev.github.io",target:"_blank"}},[t._v("love and NuxtJS")])])])}],!1,null,"0cb9b9c0",null);o.default=component.exports;installComponents(component,{GoToTop:e(123).default,Footer:e(94).default})}},[[178,15,2,16]]]);
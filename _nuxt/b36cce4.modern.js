(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{116:function(t,o,e){},118:function(t,o,e){},119:function(t,o,e){},120:function(t,o,e){},127:function(t,o,e){"use strict";var n={components:{Footer:e(58).default}},r=e(12),component=Object(r.a)(n,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("section",{staticClass:"main-content"},[e("Nuxt")],1),t._v(" "),e("Footer")],1)}),[],!1,null,null,null);o.a=component.exports;installComponents(component,{Footer:e(58).default})},128:function(t,o,e){"use strict";var n={layout:"empty"},r=(e(188),e(12)),component=Object(r.a)(n,(function(){var t=this.$createElement,o=this._self._c||t;return o("div",{staticClass:"service-page-wrapper"},[o("div",{staticClass:"service-page-text p-5"},[o("Nuxt")],1)])}),[],!1,null,"69e8b07b",null);o.a=component.exports},131:function(t,o,e){e(132),t.exports=e(133)},182:function(t,o,e){"use strict";e(116)},184:function(t,o,e){},185:function(t,o,e){},186:function(t,o,e){"use strict";e(118)},187:function(t,o,e){"use strict";e(119)},188:function(t,o,e){"use strict";e(120)},25:function(t,o,e){"use strict";var n={layout:"servicePage",props:{error:{type:Object,default:null}},data:()=>({pageNotFound:"404 Not Found",otherError:"An error occurred"}),head(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},r=(e(182),e(12)),component=Object(r.a)(n,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[404===t.error.statusCode?e("div",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):e("div",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),e("NuxtLink",{staticClass:"back-to-home",attrs:{to:"/cv"}},[t._v("\n    ◁ back to home page\n  ")])],1)}),[],!1,null,"1c1666f6",null);o.a=component.exports},58:function(t,o,e){"use strict";e.r(o);var n={name:"Footer",components:{GoToTop:e(83).default}},r=(e(187),e(12)),component=Object(r.a)(n,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("footer",{staticClass:"footer is-size-5"},[e("GoToTop",{staticClass:"go-to-top-left"}),t._v(" "),e("GoToTop",{staticClass:"go-to-top-right"}),t._v(" "),t._m(0)],1)}),[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"text"},[e("span",[t._v("\n      Made with "),e("a",{attrs:{href:"https://github.com/bupaev/bupaev.github.io",target:"_blank"}},[t._v("love and NuxtJS")])])])}],!1,null,"0cb9b9c0",null);o.default=component.exports;installComponents(component,{GoToTop:e(83).default,Footer:e(58).default})},83:function(t,o,e){"use strict";e.r(o);var n={name:"GoToTop",methods:{goToTop(){window.scrollTo({top:0,left:0,behavior:"smooth"})}}},r=(e(186),e(12)),component=Object(r.a)(n,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"go-to-top",on:{click:t.goToTop}},[e("div",{staticClass:"arrow"}),t._v(" "),e("div",{staticClass:"arrow"}),t._v(" "),e("div",{staticClass:"arrow"})])}),[],!1,null,"ac749f08",null);o.default=component.exports},87:function(t,o,e){"use strict";var n=e(124);e.n(n).a.polyfill()}},[[131,16,2,17]]]);
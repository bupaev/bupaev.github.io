(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{114:function(t,o,e){},116:function(t,o,e){},117:function(t,o,e){},118:function(t,o,e){},125:function(t,o,e){"use strict";var n={name:"GoToTop",methods:{goToTop(){window.scrollTo({top:0,left:0,behavior:"smooth"})}}},r=(e(183),e(12)),c={name:"Footer",components:{GoToTop:Object(r.a)(n,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"go-to-top",on:{click:t.goToTop}},[e("div",{staticClass:"arrow"}),t._v(" "),e("div",{staticClass:"arrow"}),t._v(" "),e("div",{staticClass:"arrow"})])}),[],!1,null,"4387df0e",null).exports}},l=(e(184),{components:{Footer:Object(r.a)(c,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("footer",{staticClass:"footer is-size-5"},[e("GoToTop",{staticClass:"go-to-top-left"}),t._v(" "),e("GoToTop",{staticClass:"go-to-top-right"}),t._v(" "),t._m(0)],1)}),[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"text"},[e("span",[t._v("\n      Made with "),e("a",{attrs:{href:"https://github.com/bupaev/bupaev.github.io",target:"_blank"}},[t._v("love and NuxtJS")])])])}],!1,null,"0cb9b9c0",null).exports}}),v=Object(r.a)(l,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("section",{staticClass:"main-content"},[e("Nuxt")],1),t._v(" "),e("Footer")],1)}),[],!1,null,null,null);o.a=v.exports},126:function(t,o,e){"use strict";var n={layout:"empty"},r=(e(185),e(12)),component=Object(r.a)(n,(function(){var t=this.$createElement,o=this._self._c||t;return o("div",{staticClass:"service-page-wrapper"},[o("div",{staticClass:"service-page-text p-5"},[o("Nuxt")],1)])}),[],!1,null,"5ed45ab6",null);o.a=component.exports},129:function(t,o,e){t.exports=e(130)},179:function(t,o,e){"use strict";e(114)},181:function(t,o,e){},182:function(t,o,e){},183:function(t,o,e){"use strict";e(116)},184:function(t,o,e){"use strict";e(117)},185:function(t,o,e){"use strict";e(118)},24:function(t,o,e){"use strict";var n={layout:"servicePage",props:{error:{type:Object,default:null}},data:()=>({pageNotFound:"404 Not Found",otherError:"An error occurred"}),head(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},r=(e(179),e(12)),component=Object(r.a)(n,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[404===t.error.statusCode?e("div",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):e("div",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),e("NuxtLink",{staticClass:"back-to-home",attrs:{to:"/cv"}},[t._v("\n    ◁ back to home page\n  ")])],1)}),[],!1,null,"1c1666f6",null);o.a=component.exports},85:function(t,o,e){"use strict";var n=e(122);e.n(n).a.polyfill()}},[[129,4,1,5]]]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{465:function(t,e,l){"use strict";l.r(e);var r=l(475),n=l(196),c={name:"Category",props:["categoryName"]},o=l(91),component=Object(o.a)(c,(function(){var t=this,e=t._self._c;return e(r.a,{staticClass:"mt-2 ml-2",attrs:{color:"primary",label:""}},[e(n.a,{staticClass:"mr-1"},[t._v("mdi-folder")]),t._v("\n  "+t._s(t.categoryName)+"\n")],1)}),[],!1,null,null,null);e.default=component.exports},466:function(t,e,l){"use strict";l.r(e);var r=l(475),n=l(196),c={name:"Tag",props:["tagName"]},o=l(91),component=Object(o.a)(c,(function(){var t=this,e=t._self._c;return e(r.a,{staticClass:"mt-2 ml-2",attrs:{color:"pink","text-color":"white",label:""}},[e(n.a,{staticClass:"mr-1"},[t._v("mdi-label")]),t._v("\n  "+t._s(t.tagName)+"\n")],1)}),[],!1,null,null,null);e.default=component.exports},467:function(t,e,l){"use strict";l.r(e);var r=l(493),n=l(464),c=l(519),o=l(465),m=l(466),_={name:"ArticleCard",props:["article"],components:{Category:o.default,Tag:m.default}},f=l(91),component=Object(f.a)(_,(function(){var t=this,e=t._self._c;return e(r.a,{attrs:{to:"/articles/".concat(t.article.slug),hover:""}},[e(n.c,[t._v(t._s(t.article.title))]),t._v(" "),e(n.a,[t._v(t._s(t._f("date")(t.article.createdAt)))]),t._v(" "),e(c.a,{staticClass:"mx-3 my-n1"}),t._v(" "),e(n.b,{staticClass:"pb-0"},[e("div",{staticClass:"mt-n2 ml-n2"},t._l(t.article.category,(function(t,l){return e("span",{key:l,attrs:{"data-category":t}},[e("Category",{attrs:{categoryName:t}})],1)})),0)]),t._v(" "),e(n.b,[e("div",{staticClass:"mt-n2 ml-n2"},t._l(t.article.tags,(function(t,l){return e("span",{key:l,attrs:{"data-tag":t}},[e("Tag",{attrs:{tagName:t}})],1)})),0)])],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Category:l(465).default,Tag:l(466).default})}}]);
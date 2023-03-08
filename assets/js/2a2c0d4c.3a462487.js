"use strict";(self.webpackChunkjanzhou_123_github_io=self.webpackChunkjanzhou_123_github_io||[]).push([[28],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,u=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=c(r),g=a,f=s["".concat(u,".").concat(g)]||s[g]||m[g]||i;return r?n.createElement(f,o(o({ref:t},p),{},{components:r})):n.createElement(f,o({ref:t},p))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=g;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l[s]="string"==typeof e?e:a,o[1]=l;for(var c=2;c<i;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},2608:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const i={slug:"git-basic-usage",title:"Git\u5e38\u7528\u547d\u4ee4",authors:"zxx",tags:["Git","\u6280\u672f"]},o=void 0,l={permalink:"/blog/git-basic-usage",source:"@site/blog/2022-04-29-Git\u57fa\u7840\u4f7f\u7528.md",title:"Git\u5e38\u7528\u547d\u4ee4",description:"\u4e00\u4e9b\u5e38\u7528\u7684\u547d\u4ee4\u5982\u4e0b\uff0c\u4e0d\u7b97\u5168\u9762\u4f46\u662f\u65e5\u5e38\u5bf9\u6211\u6765\u8bf4\u662f\u591f\u7528\u4e86\u3002",date:"2022-04-29T00:00:00.000Z",formattedDate:"April 29, 2022",tags:[{label:"Git",permalink:"/blog/tags/git"},{label:"\u6280\u672f",permalink:"/blog/tags/\u6280\u672f"}],readingTime:13.48,hasTruncateMarker:!0,authors:[{name:"Zhouxiaoxiao",title:"\u575a\u6301\u5b66\u4e60\uff0c\u575a\u6301\u8fdb\u6b65",url:"https://github.com/janzhou123",imageURL:"https://github.com/janzhou123.png",key:"zxx"}],frontMatter:{slug:"git-basic-usage",title:"Git\u5e38\u7528\u547d\u4ee4",authors:"zxx",tags:["Git","\u6280\u672f"]},prevItem:{title:"Nestjs\u901a\u7528\u914d\u7f6e-\u57fa\u7840\u914d\u7f6e",permalink:"/blog/nestjs-config-@nestjs/config"}},u={authorsImageUrls:[void 0]},c=[],p={toc:c},s="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(s,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u4e00\u4e9b\u5e38\u7528\u7684\u547d\u4ee4\u5982\u4e0b\uff0c\u4e0d\u7b97\u5168\u9762\u4f46\u662f\u65e5\u5e38\u5bf9\u6211\u6765\u8bf4\u662f\u591f\u7528\u4e86\u3002")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"git clone url")," \uff1a\u514b\u9686\u9879\u76ee\uff0c\u5982\u9700\u81ea\u5b9a\u4e49\u672c\u5730\u6587\u4ef6\u5939\u7684\u540d\u79f0\uff0c\u5728 url \u4e4b\u540e\u52a0\u4e2a\u540d\u79f0\u5373\u53ef\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"git add")," \uff1a\u8fd9\u662f\u4e2a\u591a\u529f\u80fd\u547d\u4ee4\uff0c\u53ef\u4ee5\u7528\u5b83\u5f00\u59cb\u8ddf\u8e2a\u65b0\u6587\u4ef6\uff0c\u6216\u8005\u628a\u5df2\u8ddf\u8e2a\u7684\u53d1\u751f\u66f4\u6539\u7684\u6587\u4ef6\u653e\u5230\u6682\u5b58\u533a\uff0c\u8fd8\u80fd\u7528\u4e8e\u5408\u5e76\u65f6\u628a\u6709\u51b2\u7a81\u7684\u6587\u4ef6\u6807\u8bb0\u4e3a\u5df2\u89e3\u51b3\u72b6\u6001\u7b49\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"git rm")," \uff1a\u8981\u4ece Git \u4e2d\u79fb\u9664\u67d0\u4e2a\u6587\u4ef6\uff0c\u5c31\u5fc5\u987b\u8981\u4ece\u6682\u5b58\u533a\u57df\u79fb\u9664\uff0c\u7136\u540e\u63d0\u4ea4\u3002\u53ef\u4ee5\u7528 ",(0,a.kt)("inlineCode",{parentName:"li"},"git rm")," \u5b8c\u6210\uff0c\u5e76\u8fde\u5e26\u4ece\u5de5\u4f5c\u76ee\u5f55\u4e2d\u5220\u9664\u6307\u5b9a\u7684\u6587\u4ef6\uff0c\u8fd9\u6837\u4ee5\u540e\u5c31\u4e0d\u4f1a\u51fa\u73b0\u5728\u672a\u8ddf\u8e2a\u6587\u4ef6\u6e05\u5355\u4e2d\u4e86\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"git diff")," \uff1a\u67e5\u770b\u5c1a\u672a\u6682\u5b58\u7684\u6587\u4ef6\u66f4\u65b0\u4e86\u54ea\u4e9b\u90e8\u5206\u3002\u5728\u540e\u9762\u52a0\u4e00\u4e2a ",(0,a.kt)("inlineCode",{parentName:"li"},"--staged")," \u53c2\u6570\uff0c\u5c06\u6bd4\u5bf9\u5df2\u6682\u5b58\u6587\u4ef6\u4e0e\u6700\u540e\u4e00\u6b21\u63d0\u4ea4\u7684\u6587\u4ef6\u5dee\u5f02\u3002")))}m.isMDXComponent=!0}}]);
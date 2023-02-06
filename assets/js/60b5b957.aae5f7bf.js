"use strict";(self.webpackChunkjanzhou_123_github_io=self.webpackChunkjanzhou_123_github_io||[]).push([[30],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},v=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),d=s(n),v=a,u=d["".concat(l,".").concat(v)]||d[v]||m[v]||i;return n?r.createElement(u,o(o({ref:t},c),{},{components:n})):r.createElement(u,o({ref:t},c))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=v;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[d]="string"==typeof e?e:a,o[1]=p;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}v.displayName="MDXCreateElement"},7649:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>p,toc:()=>s});var r=n(7462),a=(n(7294),n(3905));const i={sidebar_label:"\u63d0\u4f9b\u8005",sidebar_position:3,hide_title:!0},o=void 0,p={unversionedId:"nestjs-docs-v8/overview/03provider",id:"nestjs-docs-v8/overview/03provider",title:"03provider",description:"\u63d0\u4f9b\u8005(Providers)",source:"@site/docs/nestjs-docs-v8/overview/03provider.md",sourceDirName:"nestjs-docs-v8/overview",slug:"/nestjs-docs-v8/overview/03provider",permalink:"/docs/nestjs-docs-v8/overview/03provider",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/nestjs-docs-v8/overview/03provider.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_label:"\u63d0\u4f9b\u8005",sidebar_position:3,hide_title:!0},sidebar:"tutorialSidebar",previous:{title:"\u63a7\u5236\u5668",permalink:"/docs/nestjs-docs-v8/overview/02controller"}},l={},s=[{value:"\u63d0\u4f9b\u8005(Providers)",id:"\u63d0\u4f9b\u8005providers",level:3},{value:"\u670d\u52a1(Services)",id:"\u670d\u52a1services",level:4},{value:"\u4f9d\u8d56\u6ce8\u5165(Dependency injection)",id:"\u4f9d\u8d56\u6ce8\u5165dependency-injection",level:4},{value:"\u4f5c\u7528\u57df(Scopes)",id:"\u4f5c\u7528\u57dfscopes",level:4},{value:"\u81ea\u5b9a\u4e49providers(Custom providers)",id:"\u81ea\u5b9a\u4e49providerscustom-providers",level:4},{value:"\u53ef\u9009\u7684providers(Optional providers)",id:"\u53ef\u9009\u7684providersoptional-providers",level:4},{value:"\u57fa\u4e8e\u5c5e\u6027\u7684\u6ce8\u5165(Property-based injection)",id:"\u57fa\u4e8e\u5c5e\u6027\u7684\u6ce8\u5165property-based-injection",level:4},{value:"\u6ce8\u518c\u63d0\u4f9b\u8005",id:"\u6ce8\u518c\u63d0\u4f9b\u8005",level:4},{value:"\u624b\u52a8\u5b9e\u4f8b\u5316",id:"\u624b\u52a8\u5b9e\u4f8b\u5316",level:4}],c={toc:s},d="wrapper";function m(e){let{components:t,...i}=e;return(0,a.kt)(d,(0,r.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"\u63d0\u4f9b\u8005providers"},"\u63d0\u4f9b\u8005(Providers)"),(0,a.kt)("p",null," ",(0,a.kt)("inlineCode",{parentName:"p"},"Providers"),"\u5728Nest\u4e2d\u662f\u4e00\u4e2a\u57fa\u7840\u6027\u7684\u6982\u5ff5\u3002\u8bb8\u591aNest\u57fa\u7c7b\u90fd\u88ab\u8ba4\u4e3a\u662fprovider\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"services"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"repositories"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"factories"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"helpers"),"\u7b49\u7b49",(0,a.kt)("inlineCode",{parentName:"p"},"(\u8bd1\u8005\u6ce8\uff1a\u8fd9\u91cc\u66f4\u613f\u610f\u7406\u89e3\u4e3a\u7ec4\u4ef6-Component)"),"\u3002\u63d0\u4f9b\u8005(\u7ec4\u4ef6)\u53ef\u4ee5\u901a\u8fc7\u4f9d\u8d56\u5173\u7cfb\u76f4\u63a5\u8fdb\u884c\u6ce8\u5165\uff0c\u56e0\u6b64\u5404\u4e2a\u5bf9\u8c61\u4e4b\u95f4\u53ef\u4ee5\u5efa\u7acb\u590d\u6742\u7684\u5173\u7cfb\uff0c\u5e76\u4e14\u8fd9\u79cd\u590d\u6742\u7684\u5173\u7cfb\u662f\u59d4\u6258\u7ed9Nest\u8fd0\u884c\u65f6\u7cfb\u7edf\u8fdb\u884c\u7ba1\u7406\u7684\u3002\u63d0\u4f9b\u8005\u662f\u4e00\u4e2a\u6211\u4eec\u4f7f\u7528\u88c5\u9970\u5668@Injectable()\u8fdb\u884c\u6ce8\u89e3\u7684\u7c7b\u3002"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"\u6765\u81ea\u9759\u6001\u76ee\u5f55\u7684\u56fe\u50cf",src:n(5405).Z,width:"970",height:"518"})),(0,a.kt)("p",null,"\u5728\u4e0a\u4e00\u7ae0\u4e2d\uff0c\u6211\u4eec\u6784\u5efa\u4e86\u4e00\u4e2a\u7b80\u5355\u7684 CatsController\u3002\u63a7\u5236\u5668\u5e94\u5904\u7406 HTTP \u8bf7\u6c42\u5e76\u5c06\u66f4\u590d\u6742\u7684\u4efb\u52a1\u59d4\u6258\u7ed9\u63d0\u4f9b\u7a0b\u5e8f\u3002Providers\u662f\u5728\u6a21\u5757\u4e2d\u58f0\u660e\u4e3a\u63d0\u4f9b\u7a0b\u5e8f\u7684\u7eaf JavaScript \u7c7b\u3002"),(0,a.kt)("admonition",{title:"\u63d0\u793a",type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"\u7531\u4e8e Nest \u80fd\u591f\u4ee5\u66f4\u9762\u5411\u5bf9\u8c61\u7684\u65b9\u5f0f\u8bbe\u8ba1\u548c\u7ec4\u7ec7\u4f9d\u8d56\u9879\uff0c\u56e0\u6b64\u6211\u4eec\u5f3a\u70c8\u5efa\u8bae\u9075\u5faa",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/SOLID"},"SOLID")," \u539f\u5219")),(0,a.kt)("h4",{id:"\u670d\u52a1services"},"\u670d\u52a1(Services)"),(0,a.kt)("p",null,"\u8ba9\u6211\u4eec\u4ece\u4e00\u4e2a\u7b80\u5355",(0,a.kt)("inlineCode",{parentName:"p"},"CatsService"),"\u5f00\u59cb\u3002\u8be5\u670d\u52a1\u5c06\u8d1f\u8d23\u6570\u636e\u5b58\u50a8\u548c\u68c0\u7d22\uff0c\u5176\u5c06\u88ab",(0,a.kt)("inlineCode",{parentName:"p"},"CatsController"),"\u8fdb\u884c\u8c03\u7528\uff0c\u56e0\u6b64\u53ef\u4ee5\u628a\u5b83\u5b9a\u4e49\u4e3a",(0,a.kt)("inlineCode",{parentName:"p"},"Provider"),"\uff0c\u6240\u4ee5\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"Service"),"\u7c7b\u4e0a\u9700\u8981\u8fdb\u884c\u4e00\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"@Injectable()"),"\u7684\u58f0\u660e\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="cats.service"',title:'"cats.service"'},"import { Injectable } from '@nestjs/common';\nimport { Cat } from './interfaces/cat.interface';\n\n@Injectable()\nexport class CatsService {\n  private readonly cats: Cat[] = [];\n\n  create(cat: Cat) {\n    this.cats.push(cat);\n  }\n\n  findAll(): Cat[] {\n    return this.cats;\n  }\n}\n")),(0,a.kt)("admonition",{title:"\u63d0\u793a",type:"info"},(0,a.kt)("p",{parentName:"admonition"},"\u65b0\u589e",(0,a.kt)("inlineCode",{parentName:"p"},"Service"),"\u7c7b\u53ef\u4ee5\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"CLI"),"\uff0c\u6267\u884c",(0,a.kt)("inlineCode",{parentName:"p"},"$ nest g service cats"),"\u547d\u4ee4\u5373\u53ef")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"CatsService"),"\u662f\u4e00\u4e2a\u7b80\u5355\u7684\u7c7b\uff0c\u62e5\u6709\u4e00\u4e2a\u5c5e\u6027\u548c\u4e24\u4e2a\u65b9\u6cd5\u3002\u552f\u4e00\u65b0\u7279\u6027\u662f\u5b83\u4f7f\u7528\u4e86",(0,a.kt)("inlineCode",{parentName:"p"},"@Injectable()"),"\u88c5\u9970\u5668\u3002\u88ab",(0,a.kt)("inlineCode",{parentName:"p"},"@Injectable()"),"\u88c5\u9970\u540e",(0,a.kt)("inlineCode",{parentName:"p"},"CatsService"),"\u7c7b\u5c31\u53ef\u4ee5\u88ab",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Inversion_of_control"},"Nest IoC\u5bb9\u5668"),"\u8bc6\u522b\u5e76\u5bf9\u5176\u8fdb\u884c\u7ba1\u7406\u3002\u53e6\u5916\u6211\u4eec\u4f7f\u7528\u4e00\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"Cat"),"\u63a5\u53e3\uff0c\u5176\u4ee3\u7801\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="cat.interface"',title:'"cat.interface"'},"export interface Cat {\n  name: string;\n  age: number;\n  breed: string;\n}\n")),(0,a.kt)("p",null,"\u73b0\u5728\u6211\u4eec\u6709\u4e00\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"CatsService"),"\u7c7b\u6765\u68c0\u7d22",(0,a.kt)("inlineCode",{parentName:"p"},"cat"),"\uff0c\u8ba9\u6211\u4eec\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"CatsController"),"\u91cc\u8c03\u7528\u5b83\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="cats.controller"',title:'"cats.controller"'},"import { Controller, Get, Post, Body } from '@nestjs/common';\nimport { CreateCatDto } from './dto/create-cat.dto';\nimport { CatsService } from './cats.service';\nimport { Cat } from './interfaces/cat.interface';\n\n@Controller('cats')\nexport class CatsController {\n  constructor(private catsService: CatsService) {}\n\n  @Post()\n  async create(@Body() createCatDto: CreateCatDto) {\n    this.catsService.create(createCatDto);\n  }\n\n  @Get()\n  async findAll(): Promise<Cat[]> {\n    return this.catsService.findAll();\n  }\n}\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"CatsService"),"\u7c7b\u662f\u901a\u8fc7\u6784\u9020\u5668\u8fdb\u884c\u6ce8\u5165\u7684\u3002\u6ce8\u610f",(0,a.kt)("inlineCode",{parentName:"p"},"private"),"\u8bed\u6cd5\uff0c\u8868\u660e\u6211\u4eec\u5728\u540c\u4e00\u5730\u65b9\u58f0\u660e\u5e76\u521d\u59cb\u5316\u4e86",(0,a.kt)("inlineCode",{parentName:"p"},"catsService"),"\u7c7b\u3002"),(0,a.kt)("h4",{id:"\u4f9d\u8d56\u6ce8\u5165dependency-injection"},"\u4f9d\u8d56\u6ce8\u5165(Dependency injection)"),(0,a.kt)("p",null,"Nest \u662f\u56f4\u7ed5",(0,a.kt)("inlineCode",{parentName:"p"},"\u4f9d\u8d56\u6ce8\u5165"),"\u8fd9\u4e2a\u5f3a\u5927\u7684\u8bbe\u8ba1\u6a21\u5f0f\u800c\u6784\u5efa\u7684\u3002\u6211\u4eec\u5efa\u8bae\u5728\u5b98\u65b9\u7684 ",(0,a.kt)("a",{parentName:"p",href:"https://angular.io/guide/dependency-injection"},"Angular\u6587\u6863")," \u4e2d\u9605\u8bfb\u6709\u5173\u6b64\u6982\u5ff5\u7684\u76f8\u5173\u6587\u6863\u3002"),(0,a.kt)("p",null,"\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"Nest"),"\u4e2d\uff0c\u501f\u52a9",(0,a.kt)("inlineCode",{parentName:"p"},"TypeScript"),"\u529f\u80fd\u7279\u6027\uff0c\u4f7f\u5f97\u7ba1\u7406\u4f9d\u8d56\u975e\u5e38\u5bb9\u6613\uff0c\u56e0\u4e3a\u5b83\u4eec\u4ec5\u6309\u7c7b\u578b\u8fdb\u884c\u89e3\u6790\u3002\u5728\u4e0b\u9762\u7684\u793a\u4f8b\u4e2d\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"Nest"),"\u5c06\u901a\u8fc7\u521b\u5efa\u548c\u8fd4\u56de",(0,a.kt)("inlineCode",{parentName:"p"},"CatsService"),"\u7684\u5b9e\u4f8b\u6765\u89e3\u6790",(0,a.kt)("inlineCode",{parentName:"p"},"catsService"),"\uff08\u6216\u8005\uff0c\u5728\u5355\u4f8b\u7684\u6b63\u5e38\u60c5\u51b5\u4e0b\uff0c\u5982\u679c\u5df2\u7ecf\u5728\u5176\u4ed6\u5730\u65b9\u8bf7\u6c42\u4e86\u73b0\u6709\u5b9e\u4f8b\uff0c\u5219\u8fd4\u56de\u73b0\u6709\u5b9e\u4f8b\uff09\u3002\u6b64\u4f9d\u8d56\u9879\u88ab\u89e3\u6790\u5e76\u4f20\u9012\u7ed9\u63a7\u5236\u5668\u7684\u6784\u9020\u51fd\u6570\uff08\u6216\u5206\u914d\u7ed9\u6307\u793a\u7684\u5c5e\u6027\uff09\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"constructor(private catsService: CatsService) {}\n")),(0,a.kt)("h4",{id:"\u4f5c\u7528\u57dfscopes"},"\u4f5c\u7528\u57df(Scopes)"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Provider"),"\u901a\u5e38\u5177\u6709\u4e0e\u5e94\u7528\u7a0b\u5e8f\u751f\u547d\u5468\u671f\u540c\u6b65\u7684\u751f\u547d\u5468\u671f\uff08\u4f5c\u7528\u57df\uff09\u3002\u5728\u542f\u52a8\u5e94\u7528\u7a0b\u5e8f\u65f6\uff0c\u5fc5\u987b\u89e3\u6790\u6bcf\u4e2a\u4f9d\u8d56\u9879\uff0c\u56e0\u6b64\u6bcf\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"Provider"),"\u5fc5\u987b\u88ab\u5b9e\u4f8b\u5316\u3002\u540c\u6837\uff0c\u5f53\u5e94\u7528\u7a0b\u5e8f\u5173\u95ed\u65f6\uff0c\u6bcf\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"Provider"),"\u90fd\u5c06\u88ab\u9500\u6bc1\u3002\u4f46\u662f\uff0c\u6709\u4e00\u4e9b\u65b9\u6cd5\u53ef\u4ee5\u6539\u53d8",(0,a.kt)("inlineCode",{parentName:"p"},"Provider"),"\u751f\u547d\u5468\u671f\u7684\u8bf7\u6c42\u8303\u56f4\u3002\u60a8\u53ef\u4ee5\u5728\u6b64\u5904\u8be6\u7ec6\u4e86\u89e3\u8fd9\u4e9b\u6280\u672f\u3002"),(0,a.kt)("h4",{id:"\u81ea\u5b9a\u4e49providerscustom-providers"},"\u81ea\u5b9a\u4e49providers(Custom providers)"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Nest"),"\u6709\u4e00\u4e2a\u5185\u7f6e\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"IoC\u5bb9\u5668"),"\uff0c\u7528\u4e8e\u7ba1\u7406",(0,a.kt)("inlineCode",{parentName:"p"},"Provider"),"\u4e4b\u95f4\u7684\u5173\u7cfb\u3002\u6b64\u529f\u80fd\u662f\u4e0a\u8ff0\u4f9d\u8d56\u6ce8\u5165\u529f\u80fd\u7684\u57fa\u7840\uff0c\u4f46\u5b9e\u9645\u4e0a\u6bd4\u6211\u4eec\u76ee\u524d\u63cf\u8ff0\u7684\u529f\u80fd\u8981\u5f3a\u5927\u5f97\u591a\u3002\u6709\u51e0\u79cd\u65b9\u6cd5\u53ef\u4ee5\u5b9a\u4e49",(0,a.kt)("inlineCode",{parentName:"p"},"Provider"),"\uff1a\u53ef\u4ee5\u4f7f\u7528\u666e\u901a\u503c(plain values)\u3001\u7c7b\u4ee5\u53ca\u5f02\u6b65\u6216\u540c\u6b65\u5de5\u5382\u3002\u6b64\u5904\u63d0\u4f9b\u4e86\u66f4\u591a\u793a\u4f8b\u3002"),(0,a.kt)("h4",{id:"\u53ef\u9009\u7684providersoptional-providers"},"\u53ef\u9009\u7684providers(Optional providers)"),(0,a.kt)("p",null,"\u5076\u5c14\uff0c\u4f60\u53ef\u80fd\u6709\u4e00\u4e9b\u4e0d\u786e\u5b9a\u7684\u4f9d\u8d56\u5173\u7cfb\u3002\u4f8b\u5982\uff0c\u4f60\u7684\u7c7b\u53ef\u80fd\u4f9d\u8d56\u4e8e\u4e00\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"\u914d\u7f6e\u5bf9\u8c61"),"\uff0c\u4f46\u5982\u679c\u6ca1\u6709\u4f20\u9012\uff0c\u5c31\u5e94\u8be5\u4f7f\u7528\u9ed8\u8ba4\u503c\u3002\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u8fd9\u4e2a\u4f9d\u8d56\u5173\u7cfb\u5c31\u53d8\u6210\u4e86\u53ef\u9009\u7684\uff0c\u56e0\u4e3a\u7f3a\u5c11\u914d\u7f6e\u63d0\u4f9b\u8005\u4e0d\u4f1a\u5bfc\u81f4\u9519\u8bef\u3002"),(0,a.kt)("p",null,"\u8981\u6807\u660e",(0,a.kt)("inlineCode",{parentName:"p"},"Provider"),"\u662f\u53ef\u9009\u7684\uff0c\u8bf7\u5728\u6784\u9020\u5668\u53c2\u6570\u4e2d\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"@Optional()"),"\u88c5\u9970\u5668\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"import { Injectable, Optional, Inject } from '@nestjs/common';\n\n@Injectable()\nexport class HttpService<T> {\n  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}\n}\n")),(0,a.kt)("p",null,"\u8bf7\u6ce8\u610f\uff0c\u5728\u4e0a\u9762\u7684\u793a\u4f8b\u4e2d\uff0c\u6211\u4eec\u4f7f\u7528\u7684\u662f\u81ea\u5b9a\u4e49",(0,a.kt)("inlineCode",{parentName:"p"},"Provider"),"\uff0c\u8fd9\u5c31\u662f\u6211\u4eec\u5305\u542b\u201cHTTP_OPTIONS\u201d\u81ea\u5b9a\u4e49\u53c2\u6570\u7684\u539f\u56e0\u3002\u524d\u9762\u7684\u793a\u4f8b\u6f14\u793a\u4e86\u57fa\u4e8e\u6784\u9020\u51fd\u6570\u7684\u6ce8\u5165(\u901a\u8fc7\u5728\u6784\u9020\u51fd\u6570\u53c2\u6570\u4e2d\u6307\u5b9a\u4e00\u4e2a\u7c7b\u4ee5\u5efa\u7acb\u4f9d\u8d56\u5173\u7cfb)\u3002\u9605\u8bfb\u6709\u5173\u81ea\u5b9a\u4e49",(0,a.kt)("inlineCode",{parentName:"p"},"Provider"),"\u53ca\u5176\u5173\u8054\u53c2\u6570\u7684\u8be6\u7ec6\u4fe1\u606f ","[\u6b64\u5904]"),(0,a.kt)("h4",{id:"\u57fa\u4e8e\u5c5e\u6027\u7684\u6ce8\u5165property-based-injection"},"\u57fa\u4e8e\u5c5e\u6027\u7684\u6ce8\u5165(Property-based injection)"),(0,a.kt)("p",null,"\u6211\u4eec\u76ee\u524d\u4f7f\u7528\u7684\u6280\u672f\u79f0\u4e3a\u57fa\u4e8e\u6784\u9020\u51fd\u6570\u7684\u6ce8\u5165\uff0c\u5373\u901a\u8fc7\u6784\u9020\u51fd\u6570\u65b9\u6cd5\u6ce8\u5165",(0,a.kt)("inlineCode",{parentName:"p"},"providers"),"\u3002\u5728\u67d0\u4e9b\u975e\u5e38\u7279\u6b8a\u7684\u60c5\u51b5\u4e0b\uff0c\u57fa\u4e8e\u5c5e\u6027\u7684\u6ce8\u5165\u53ef\u80fd\u4f1a\u6709\u7528\u3002\u4f8b\u5982\uff0c\u5982\u679c\u9876\u7ea7\u7c7b\u4f9d\u8d56\u4e8e\u4e00\u4e2a\u6216\u591a\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"providers"),"\uff0c\u90a3\u4e48\u901a\u8fc7\u4ece\u6784\u9020\u51fd\u6570\u4e2d\u8c03\u7528\u5b50\u7c7b\u4e2d\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"super()"),"\u6765\u4f20\u9012\u5b83\u4eec\u5c31\u4f1a\u975e\u5e38\u7e41\u7410\u3002\u56e0\u6b64\uff0c\u4e3a\u4e86\u907f\u514d\u51fa\u73b0\u8fd9\u79cd\u60c5\u51b5\uff0c\u53ef\u4ee5\u5728\u5c5e\u6027\u4e0a\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"@Inject()"),"\u88c5\u9970\u5668\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"import { Injectable, Inject } from '@nestjs/common';\n\n@Injectable()\nexport class HttpService<T> {\n  @Inject('HTTP_OPTIONS')\n  private readonly httpClient: T;\n}\n")),(0,a.kt)("admonition",{title:"\u8b66\u544a",type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"\u5982\u679c\u60a8\u7684\u7c7b\u6ca1\u6709\u6269\u5c55\u5176\u4ed6\u63d0\u4f9b\u8005\uff0c\u4f60\u5e94\u8be5\u603b\u662f\u4f7f\u7528\u57fa\u4e8e\u6784\u9020\u51fd\u6570\u7684\u6ce8\u5165\u3002")),(0,a.kt)("h4",{id:"\u6ce8\u518c\u63d0\u4f9b\u8005"},"\u6ce8\u518c\u63d0\u4f9b\u8005"),(0,a.kt)("p",null,"\u73b0\u5728\u6211\u4eec\u5df2\u7ecf\u5b9a\u4e49\u4e86\u670d\u52a1\u63d0\u4f9b\u8005",(0,a.kt)("inlineCode",{parentName:"p"},"CatsService"),"\uff0c\u5e76\u4e14\u5df2\u7ecf\u6709\u4e86\u8be5\u670d\u52a1\u7684\u4f7f\u7528\u8005",(0,a.kt)("inlineCode",{parentName:"p"},"CatsController"),"\uff0c\u6211\u4eec\u9700\u8981\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"Nest"),"\u4e2d\u6ce8\u518c\u8be5\u670d\u52a1\uff0c\u4ee5\u4fbf\u5b83\u53ef\u4ee5\u6267\u884c\u6ce8\u5165\u3002 \u4e3a\u6b64\uff0c\u6211\u4eec\u53ef\u4ee5\u7f16\u8f91\u6a21\u5757\u6587\u4ef6",(0,a.kt)("inlineCode",{parentName:"p"},"app.module.ts"),"\uff0c\u7136\u540e\u5c06\u670d\u52a1\u6dfb\u52a0\u5230",(0,a.kt)("inlineCode",{parentName:"p"},"@Module()"),"\u88c5\u9970\u5668\u7684\u53c2\u6570",(0,a.kt)("inlineCode",{parentName:"p"},"providers"),"\u6570\u7ec4\u4e2d\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="app.module.ts"',title:'"app.module.ts"'},"@@filename(app.module)\nimport { Module } from '@nestjs/common';\nimport { CatsController } from './cats/cats.controller';\nimport { CatsService } from './cats/cats.service';\n\n@Module({\n  controllers: [CatsController],\n  providers: [CatsService],\n})\nexport class AppModule {}\n")),(0,a.kt)("p",null,"\u6839\u636e",(0,a.kt)("inlineCode",{parentName:"p"},"@Module"),"\u6240\u914d\u7f6e\u7684\u63d0\u4f9b\u8005\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"Nest"),"\u4f1a\u81ea\u52a8\u89e3\u51b3",(0,a.kt)("inlineCode",{parentName:"p"},"CatsController"),"\u7684\u6240\u6709\u4f9d\u8d56\u5173\u7cfb\u3002"),(0,a.kt)("p",null,"\u73b0\u5728\u6211\u4eec\u7684\u4ee3\u7801\u7ed3\u6784\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"src\n\u251c\u2500\u2500 cats\n\u2502    \u251c\u2500\u2500dto\n\u2502    \u2502   \u2514\u2500\u2500create-cat.dto.ts\n\u2502    \u251c\u2500\u2500 interfaces\n\u2502    \u2502       \u2514\u2500\u2500cat.interface.ts\n\u2502    \u251c\u2500\u2500cats.service.ts\n\u2502    \u2514\u2500\u2500cats.controller.ts\n\u251c\u2500\u2500app.module.ts\n\u2514\u2500\u2500main.ts\n")),(0,a.kt)("h4",{id:"\u624b\u52a8\u5b9e\u4f8b\u5316"},"\u624b\u52a8\u5b9e\u4f8b\u5316"),(0,a.kt)("p",null,"\u5230\u76ee\u524d\u4e3a\u6b62\uff0c\u6211\u4eec\u5df2\u7ecf\u8ba8\u8bba\u4e86 Nest \u5982\u4f55\u81ea\u52a8\u5904\u7406\u89e3\u51b3\u4f9d\u8d56\u5173\u7cfb\u7684\u5927\u591a\u6570\u7ec6\u8282\u3002\u5728\u67d0\u4e9b\u60c5\u51b5\u4e0b\uff0c\u60a8\u53ef\u80fd\u9700\u8981\u8df3\u51fa\u5185\u7f6e\u7684\u4f9d\u8d56\u6ce8\u5165\u7cfb\u7edf\uff0c\u5e76\u624b\u52a8\u68c0\u7d22\u6216\u5b9e\u4f8b\u5316\u63d0\u4f9b\u7a0b\u5e8f\u3002\u6211\u4eec\u5728\u4e0b\u9762\u7b80\u8981\u8ba8\u8bba\u4e24\u4e2a\u8fd9\u6837\u7684\u4e3b\u9898\u3002"),(0,a.kt)("p",null,"\u8981\u83b7\u53d6\u73b0\u6709\u5b9e\u4f8b\u6216\u52a8\u6001\u5b9e\u4f8b\u5316\u63d0\u4f9b\u7a0b\u5e8f\uff0c\u53ef\u4ee5\u4f7f\u7528",(0,a.kt)("a",{parentName:"p",href:"https://docs.nestjs.com/fundamentals/module-ref"},(0,a.kt)("inlineCode",{parentName:"a"},"Module reference")),"\u3002"),(0,a.kt)("p",null,"\u8981\u5728 bootstrap() \u51fd\u6570\u5185\u4f7f\u7528\u63d0\u4f9b\u7a0b\u5e8f\uff08\u4f8b\u5982\uff0c\u5bf9\u4e8e\u4e0d\u5e26\u63a7\u5236\u5668\u7684\u72ec\u7acb\u5e94\u7528\u7a0b\u5e8f\uff0c\u6216\u5728\u5f15\u5bfc\u8fc7\u7a0b\u4e2d\u4f7f\u7528\u914d\u7f6e\u670d\u52a1\uff09\uff0c\u8bf7\u53c2\u89c1",(0,a.kt)("a",{parentName:"p",href:"https://docs.nestjs.com/standalone-applications"},(0,a.kt)("inlineCode",{parentName:"a"},"\u72ec\u7acb\u5e94\u7528\u7a0b\u5e8f")),"\u3002"))}m.isMDXComponent=!0},5405:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/Components_1-63008a011353e24e97a15c04479a37a2.png"}}]);
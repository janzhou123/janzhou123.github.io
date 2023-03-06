"use strict";(self.webpackChunkjanzhou_123_github_io=self.webpackChunkjanzhou_123_github_io||[]).push([[2307],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>g});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=r.createContext({}),u=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=u(e.components);return r.createElement(s.Provider,{value:n},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=u(t),m=i,g=p["".concat(s,".").concat(m)]||p[m]||d[m]||a;return t?r.createElement(g,l(l({ref:n},c),{},{components:t})):r.createElement(g,l({ref:n},c))}));function g(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,l=new Array(a);l[0]=m;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o[p]="string"==typeof e?e:i,l[1]=o;for(var u=2;u<a;u++)l[u]=t[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},1092:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>o,toc:()=>u});var r=t(7462),i=(t(7294),t(3905));const a={title:"\u751f\u6210\u5668\u6a21\u5f0f (Builder)",slug:"builder",sidebar_position:4},l=void 0,o={unversionedId:"pattern/builder",id:"pattern/builder",title:"\u751f\u6210\u5668\u6a21\u5f0f (Builder)",description:"\u6982\u5ff5",source:"@site/docs/pattern/builder.md",sourceDirName:"pattern",slug:"/pattern/builder",permalink:"/docs/pattern/builder",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/pattern/builder.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"\u751f\u6210\u5668\u6a21\u5f0f (Builder)",slug:"builder",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"\u62bd\u8c61\u5de5\u5382\u6a21\u5f0f (Abstract Factory)",permalink:"/docs/pattern/abstract-factory"},next:{title:"\u539f\u578b\u6a21\u5f0f (Prototype)",permalink:"/docs/pattern/prototype"}},s={},u=[{value:"\u6982\u5ff5",id:"\u6982\u5ff5",level:2},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",level:2}],c={toc:u},p="wrapper";function d(e){let{components:n,...t}=e;return(0,i.kt)(p,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"\u6982\u5ff5"},"\u6982\u5ff5"),(0,i.kt)("p",null,"\u751f\u6210\u5668\u6a21\u5f0f\u4e5f\u53eb\u5efa\u9020\u8005\u6a21\u5f0f\uff0c\u8fd9\u79cd\u6a21\u5f0f\u53ef\u4ee5\u5206\u6b65\u9aa4\u521b\u5efa\u590d\u6742\u5bf9\u8c61\u3002\u8be5\u6a21\u5f0f\u5141\u8bb8\u4f60\u4f7f\u7528\u76f8\u540c\u7684\u521b\u5efa\u4ee3\u7801\u751f\u6210\u4e0d\u540c\u7c7b\u578b\u548c\u5f62\u5f0f\u7684\u5bf9\u8c61\u3002"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u4f60\u53ef\u4ee5\u5206\u6b65\u521b\u5efa\u5bf9\u8c61"),(0,i.kt)("li",{parentName:"ul"},"\u751f\u6210\u4e0d\u540c\u5f62\u5f0f\u7684\u4ea7\u54c1\u65f6\uff0c\u53ef\u4ee5\u590d\u7528\u76f8\u540c\u7684\u5236\u9020\u4ee3\u7801"),(0,i.kt)("li",{parentName:"ul"},"\u5355\u4e00\u804c\u8d23\u539f\u5219\uff0c\u4f60\u53ef\u4ee5\u5c06\u590d\u6742\u6784\u9020\u4ee3\u7801\u4ece\u4ea7\u54c1\u7684\u4e1a\u52a1\u903b\u8f91\u4e2d\u5206\u79bb\u51fa\u6765"),(0,i.kt)("li",{parentName:"ul"},"\u7531\u4e8e\u8be5\u6a21\u5f0f\u9700\u8981\u65b0\u589e\u591a\u4e2a\u7c7b\uff0c\u56e0\u6b64\u4ee3\u7801\u6574\u4f53\u590d\u6742\u7a0b\u5ea6\u4f1a\u6709\u6240\u589e\u52a0")),(0,i.kt)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),(0,i.kt)("p",null,"\u4e0b\u5217\u4ee3\u7801\uff0c\u6839\u636e ",(0,i.kt)("inlineCode",{parentName:"p"},"Builder")," \u751f\u6210\u5668\u63a5\u53e3\uff0c\u5b9e\u73b0\u4e86 ",(0,i.kt)("inlineCode",{parentName:"p"},"CarBuilder")," \u6765\u9020\u8f66\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"CarBuilder")," \u63d0\u4f9b\u4e86\u9020\u8f66\u7684\u4e00\u7cfb\u5217\u6b65\u9aa4\u51fd\u6570\uff0c\u5e76\u63d0\u4f9b\u81ea\u5df1\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"getCar()")," \u65b9\u6cd5\u6765\u83b7\u53d6\u7ed3\u679c\u4ea7\u54c1\u3002"),(0,i.kt)("p",null,"\u53ef\u9009\u7684\u4e3b\u7ba1\u7c7b ",(0,i.kt)("inlineCode",{parentName:"p"},"Director")," \u7528\u6765\u6307\u5bfc\u9020\u8f66\uff0c\u5b83\u63d0\u4f9b\u4e00\u4e2a ",(0,i.kt)("inlineCode",{parentName:"p"},"makeCar(builder: Builder)")," \u65b9\u6cd5\u6765\u6309\u7167\u4e00\u5b9a\u5de5\u827a\u6d41\u7a0b\u6765\u8c03\u7528\u4e00\u7cfb\u5217\u9020\u8f66\u51fd\u6570\u3002"),(0,i.kt)("p",null,"\u5728\u9020\u5b8c\u8f66\u4e4b\u540e\uff0c\u8c03\u7528\u6c7d\u8f66\u751f\u6210\u5668\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"getCar()")," \u65b9\u6cd5\u83b7\u53d6\u6210\u54c1\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"// \u751f\u6210\u5668\u63a5\u53e3\u6307\u5b9a\u4e86\u521b\u5efa\u4ea7\u54c1\u5bf9\u8c61\u4e0d\u540c\u90e8\u5206\u7684\u4e00\u7cfb\u5217\u65b9\u6cd5\ninterface Builder {\n  setEngine(engine: string): void;\n  setGPS(gps: string): void;\n  setWheels(wheels: string): void;\n  reset(): void;\n}\n\n// \u7279\u5b9a\u751f\u6210\u5668\u7c7b\u6839\u636e\u751f\u6210\u5668\u63a5\u53e3\uff0c\u5b9e\u73b0\u4e00\u7cfb\u5217\u521b\u5efa\u4ea7\u54c1\u7684\u6b65\u9aa4\u65b9\u6cd5\u3002\n// \u53ef\u4ee5\u6839\u636e\u8be5\u63a5\u53e3\uff0c\u5b9e\u73b0\u591a\u4e2a\u4e0d\u540c\u7684\u751f\u6210\u5668\u53d8\u4f53\uff0c\u4f8b\u5982 TruckBuilder\u3001BusBuilder\nclass CarBuilder implements Builder {\n  private car;\n\n  // \u4e00\u4e2a\u751f\u6210\u5668\u5b9e\u4f8b\uff0c\u5e94\u8be5\u5305\u542b\u4e00\u4e2a\u7a7a\u7684\u4ea7\u54c1\u5bf9\u8c61\uff0c\u672a\u6765\u7528\u4e8e\u8fdb\u4e00\u6b65\u7684\u7ec4\u5408\n  constructor() {\n    this.car = new Car();\n  }\n\n  reset(): void {\n    this.car = new Car();\n  }\n  setEngine(engine: string): void {\n    this.car.addItem(engine);\n  }\n  setGPS(gps: string): void {\n    this.car.addItem(gps);\n  }\n  setWheels(wheels: string): void {\n    this.car.addItem(wheels);\n  }\n\n  /**\n   * \u5177\u4f53\u7684\u751f\u6210\u5668\u63d0\u4f9b\u81ea\u5df1\u7684\u65b9\u6cd5\u6765\u83b7\u53d6\u7ed3\u679c\uff0c\u56e0\u4e3a\u4e0d\u540c\u7c7b\u578b\u7684\u751f\u6210\u5668\u53ef\u80fd\u521b\u5efa\u51fa\u5b8c\u5168\n   * \u4e0d\u540c\u7684\u4ea7\u54c1\u800c\u4e14\u4e0d\u5b9e\u73b0\u540c\u4e00\u63a5\u53e3\uff0c\u56e0\u6b64\u8fd9\u79cd\u65b9\u6cd5\u4e0d\u80fd\u88ab\u58f0\u660e\u5728\u57fa\u7840\u751f\u6210\u5668\u63a5\u53e3\u4e2d\u3002\n   * \u901a\u5e38\uff0c\u5728\u628a\u7ed3\u679c\u8fd4\u56de\u7ed9\u5ba2\u6237\u7aef\u4e4b\u540e\uff0c\u751f\u6210\u5668\u5b9e\u4f8b\u4f1a\u51c6\u5907\u8fdb\u884c\u4e0b\u4e00\u4e2a\u4ea7\u54c1\u7684\u521b\u5efa\u3002\n   * \u8fd9\u5c31\u662f\u4e3a\u4ec0\u4e48\u4e00\u822c\u8981\u5728 getProduct \u51fd\u6570\u7684\u672b\u5c3e\u8c03\u7528 reset \u51fd\u6570\u3002\n   * \u4f46\u8fd9\u79cd\u505a\u6cd5\u5e76\u4e0d\u662f\u5f3a\u5236\u7684\uff0c\u4e5f\u53ef\u4ee5\u5728\u5408\u9002\u7684\u65f6\u95f4\uff0c\u5728\u5ba2\u6237\u7aef\u6216\u8005\u4e3b\u7ba1\u7c7b\u4ee3\u7801\u6765\u4e00\u6b21 reset \u8c03\u7528\u3002\n   */\n  getCar() {\n    const result = this.car;\n    this.reset();\n    return result;\n  }\n}\n\n// \u6700\u597d\u53ea\u5728\u521b\u5efa\u4ea7\u54c1\u5f88\u590d\u6742\u800c\u4e14\u9700\u8981\u5927\u91cf\u914d\u7f6e\u7684\u65f6\u5019\u7528\u751f\u6210\u5668\u6a21\u5f0f\u3002\nclass Car {\n  private items: any[] = [];\n\n  public addItem(item: any) {\n    this.items.push(item);\n  }\n\n  public listParts() {\n    return this.items;\n  }\n}\n\n/**\n * \u4e3b\u7ba1\u53ea\u8d1f\u8d23\u6309\u7167\u7279\u5b9a\u987a\u5e8f\u6267\u884c\u751f\u6210\u6b65\u9aa4\u3002\u5176\u5728\u6839\u636e\u7279\u5b9a\u6b65\u9aa4\u6216\u914d\u7f6e\u6765\u751f\u6210\u4ea7\u54c1\u65f6\n * \u4f1a\u5f88\u6709\u5e2e\u52a9\u3002\u7531\u4e8e\u5ba2\u6237\u7aef\u53ef\u4ee5\u76f4\u63a5\u63a7\u5236\u751f\u6210\u5668\uff0c\u6240\u4ee5\u4e25\u683c\u610f\u4e49\u4e0a\u6765\u8bf4\uff0c\u4e3b\u7ba1\u7c7b\u5e76\n * \u4e0d\u662f\u5fc5\u9700\u7684\u3002\n */\nclass Director {\n  makeCar(builder: Builder) {\n    builder.setEngine('Engine');\n    builder.setGPS('GPS');\n    builder.setWheels('Wheels');\n  }\n}\n\nfunction ClientCode() {\n  // \u4e3b\u7ba1\u7c7b\u6307\u5bfc\u9020\u8f66\n  const director = new Director();\n  const carBuilder = new CarBuilder();\n  director.makeCar(carBuilder);\n  console.log(carBuilder.getCar().listParts()); // ['Engine', 'GPS', 'Wheels']\n\n  // \u518d\u9020\u4e00\u8f86\uff0c\u4e0d\u7528\u4e3b\u7ba1\u7c7b\n  carBuilder.setEngine('SuperEngine');\n  carBuilder.setWheels('AntiBullet');\n  console.log(carBuilder.getCar().listParts()); // ['SuperEngine', 'AntiBullet']\n}\n\nClientCode();\n")))}d.isMDXComponent=!0}}]);
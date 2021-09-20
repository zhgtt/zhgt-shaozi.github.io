"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[353],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),c=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):u(u({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),f=c(r),m=a,g=f["".concat(i,".").concat(m)]||f[m]||p[m]||o;return r?n.createElement(g,u(u({ref:t},l),{},{components:r})):n.createElement(g,u({ref:t},l))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,u=new Array(o);u[0]=f;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:a,u[1]=s;for(var c=2;c<o;c++)u[c]=r[c];return n.createElement.apply(null,u)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},7713:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return i},metadata:function(){return c},assets:function(){return l},toc:function(){return p},default:function(){return m}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),u=["components"],s={slug:"ahooks-useRequest",title:"ahooks \u4e2d useRequest \u7684\u4f7f\u7528",author:"\u52fa\u5b50",author_title:"\u524d\u7aef(\u25cf\u2014\u25cf) @ \u65e0\u4e1a\u6e38\u6c11",author_url:"https://github.com/zhgt-shaozi/zhgt-shaozi.github.io",author_image_url:"/static/img/logo.svg",tags:["ahooks"]},i=void 0,c={permalink:"/blog/ahooks-useRequest",source:"@site/blog/2021-09-16-ahooks-useRequest \u7684\u4f7f\u7528 .md",title:"ahooks \u4e2d useRequest \u7684\u4f7f\u7528",description:"`jsx",date:"2021-09-16T00:00:00.000Z",formattedDate:"2021\u5e749\u670816\u65e5",tags:[{label:"ahooks",permalink:"/blog/tags/ahooks"}],readingTime:1.855,truncated:!1,authors:[{name:"\u52fa\u5b50",title:"\u524d\u7aef(\u25cf\u2014\u25cf) @ \u65e0\u4e1a\u6e38\u6c11",url:"https://github.com/zhgt-shaozi/zhgt-shaozi.github.io",imageURL:"/static/img/logo.svg"}],nextItem:{title:"VS Code \u4e2a\u4eba\u5e38\u7528\u62d3\u5c55\u63d2\u4ef6",permalink:"/blog/docusaurus2-vscode"}},l={authorsImageUrls:[void 0]},p=[],f={toc:p};function m(e){var t=e.components,r=(0,a.Z)(e,u);return(0,o.kt)("wrapper",(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"const {\n  data, // \u8fd4\u56de\u6570\u636e\n  request, // \u53d1\u8d77\u8bf7\u6c42\n  run, // \u53d1\u8d77\u8bf7\u6c42\uff0c\u4f1a\u6267\u884c request\n  pagination, // \u5206\u9875\u6570\u636e\uff0cpaginated \u4e3a true \u65f6\uff0c\u8be5\u65b9\u6cd5\u624d\u4f1a\u6709\u6570\u636e\n  loading, // \u63a5\u53e3 pedding \u72b6\u6001\n  error, // \u63a5\u53e3\u629b\u9519\n  cancel, // \u53d6\u6d88\u8bf7\u6c42\n  refresh, // \u4f7f\u7528\u4e0a\u4e00\u6b21\u7684 params \u91cd\u65b0\u53d1\u8d77\u8bf7\u6c42\n  mutate,\n  fetches,\n} = useRequest(services, {\n  manual: true, // \u662f\u5426\u5f00\u542f\u624b\u52a8\u8bf7\u6c42\u63a5\u53e3\uff0c\u9ed8\u8ba4\u4e3a true\uff0c\u8bbe\u7f6e\u4e3a false \u65f6\u4f1a\u5728\u521d\u59cb\u5316\u65f6\u53d1\u8d77\u8bf7\u6c42\n  paginated: true, // \u662f\u5426\u5f00\u542f\u5206\u9875\u6a21\u5f0f\n  defaultPageSize: 10, // \u9ed8\u8ba4\u8bf7\u6c42\u5206\u9875\u7684 pageSize\n  defaultParams: { ...params }, // manual \u4e3a false \u65f6\uff0c\u53d1\u8d77\u8bf7\u6c42\u7684\u9ed8\u8ba4\u53c2\u6570\n  refreshDeps: [state], // \u91cd\u7f6e\u8bf7\u6c42\uff0c\u53ea\u8981 refreshDeps \u4e2d\u5b9a\u4e49\u7684\u72b6\u6001\u53d1\u751f\u6539\u53d8\uff0c\u5c31\u4f1a\u5c06\u5176\u4ed6\u53c2\u6570\u6062\u590d\u4e3a \u9ed8\u8ba4\u503c\uff0c\u91cd\u65b0\u53d1\u8d77\u8bf7\u6c42\n  onSuccess: (data, params) => {}, // \u8bf7\u6c42\u6210\u529f\u56de\u8c03\uff0c\u53c2\u6570\u4e3a data - \u8fd4\u56de\u503c\uff0cparams - \u8bf7\u6c42\u53c2\u6570\n  onError: (error, params) => {}, // \u8bf7\u6c42\u5931\u8d25\u56de\u8c03\uff0c\u53c2\u6570\u4e3a error - \u8fd4\u56de\u7684\u9519\u8bef\u4fe1\u606f\uff0cparams - \u8bf7\u6c42\u53c2\u6570\n});\n\nreact \u540c\u65f6\u64cd\u4f5c\u591a\u4e2a\u6570\u7ec4\u65f6\uff0c\u5982\u679c\u5176\u4e2d\u6709\u4e00\u4e2a\u8fdb\u884c\u4e86 setState\uff0c\u5219\u540c\u65f6\u4f1a\u6539\u53d8\u5176\u4ed6\u6570\u7ec4\u7684\u72b6\u6001\uff0c\u56e0\u4e3a setState \u91cd\u65b0\u89e6\u53d1\u4e86\u7ec4\u4ef6\u6e32\u67d3\uff0c\u5bfc\u81f4\u5176\u4ed6\u6570\u7ec4\u7684\u72b6\u6001\u4e0d\u7528\u901a\u8fc7 setState \u5c31\u80fd\u53d1\u751f\u6539\u53d8\u3002\n\nreact table \u7ffb\u9875+\u591a\u9009\uff0c\u5bf9\u591a\u9009\u6570\u636e\u8fdb\u884c\u8bb0\u5f55\uff1f\u5b9e\u73b0\n\nreact \u5217\u8868\u9875 -> \u8be6\u60c5\u9875\uff0c\u5728\u8be6\u60c5\u9875\u4e2d\u66f4\u6539\u72b6  \u6001\u540e\u8fd4\u56de\u5217\u8868\u9875\uff0c\u5217\u8868\u4e2d\u5bf9\u5e94\u6570\u636e\u72b6\u6001\u4e5f\u8ddf\u7740\u6539\u53d8\uff1f\u5b9e\u73b0\n")))}m.isMDXComponent=!0}}]);
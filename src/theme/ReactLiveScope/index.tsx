import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';
import { isEmpty } from 'lodash';
import ReactJsonView from '@site/src/components/ReactJsonView';
import * as toolsFun from '@site/src/utils/tools-fun';

// 自定义组件，需使用 <BrowserOnly /> 进行包裹，使用该组件进行包裹时，只能使用 require 导入其他组件，使组件不在服务端运行
// interface FTypes {}
function addBrowserOnlyByComponent(
  componentName: string,
  type: 'arco' | 'custom' | 'demo' = 'custom'
) {
  return function IComponent(props) {
    return (
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          let Component;
          switch (type) {
            // arco-design 组件
            case 'arco':
              Component = require('@arco-design/web-react')[componentName];
              break;

            // demo 组件
            case 'demo':
              Component = require(`./components/Demo`).default[componentName];
              break;

            // 自定义组件
            default:
              Component = require(`./components/${componentName}`).default; // 末尾必须要加 default，否则会报错
              break;
          }
          return <Component {...props} />;
        }}
      </BrowserOnly>
    );
  };
}

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Button: addBrowserOnlyByComponent('Button', 'arco'),
  Space: addBrowserOnlyByComponent('Space', 'arco'),
  Input: addBrowserOnlyByComponent('Input', 'arco'),
  Demo: {
    DocJSToolsByTree: addBrowserOnlyByComponent('DocJSToolsByTree', 'demo'),
  },
  ResultButton: addBrowserOnlyByComponent('ResultButton'),
  // 以下是方法
  ...toolsFun,
};

export default ReactLiveScope;

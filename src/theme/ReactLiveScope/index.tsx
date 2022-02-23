import React from 'react';
import { Button, Input, Message, Space } from '@arco-design/web-react';
import ReactJsonView from '@site/src/components/ReactJsonView';
import { isEmpty } from 'lodash';
import utils from './utils';

// 自定义组件
const ButtonExample = (props) => <Button type='primary'>😄</Button>;

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Button,
  Input,
  Message,
  Space,
  ReactJsonView,
  // 以下是方法
  ...utils,
};

export default ReactLiveScope;

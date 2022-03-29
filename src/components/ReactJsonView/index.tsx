/**
 * @description JSON 数据格式化渲染组件
 */

import React from 'react';
import ReactJson from 'react-json-view';
import type { ReactJsonViewProps } from 'react-json-view'; // 格式化渲染 json 对象
import './styles.scss';

const ReactJsonView: React.FC<ReactJsonViewProps> = (props) => {
  const { src = {}, collapsed = false, ...restProps } = props;

  return (
    <ReactJson
      src={src} // json 数据（必须是 js 对象形式）
      name={null} // json 根节点
      enableClipboard // 是否显示复制按钮
      iconStyle='circle' // 展开收起图标
      displayDataTypes={false} // 是否显示子节点的 数据类型
      displayObjectSize={false} // 是否显示子节点的 个数
      collapsed={collapsed} // 展开的 json 节点的深度，可以为 number 类型，false 表示全展开
      indentWidth={4} // 缩进的宽度，1 = 5px
      {...restProps}
    />
  );
};

export default ReactJsonView;

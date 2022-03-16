import React, { useState } from 'react';
import { Button, Input, Space } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import ReactJsonView from '@site/src/components/ReactJsonView';
import {
  _filterTreeNode,
  _findTreeNode,
  _findTreeNodePath,
  _findTreeManyNodePath,
  _getTreeFirstNode,
} from '@site/src/utils/tools-fun';

interface IProps {
  dataSource: any[];
}

export const DocJSToolsByTree: React.FC<IProps> = ({ dataSource }) => {
  const [value, setValue] = useState('');
  const [jsonData, setJsonData] = useState({});

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Input
        addBefore={<IconSearch />}
        allowClear
        placeholder='输入 code 对树结构进行筛选（若查询多条，需使用英文逗号进行分隔）'
        value={value}
        onChange={(v) => setValue(v)}
      />
      <Space wrap>
        <Button
          type='primary'
          onClick={() => {
            const result = _filterTreeNode(dataSource, (item) => item.code === value);
            setJsonData(result);
          }}
        >
          过滤节点
        </Button>
        <Button
          type='primary'
          onClick={() => {
            const result = _findTreeNode(dataSource, (item) => item.code === value) || {};
            setJsonData(result);
          }}
        >
          查找节点
        </Button>
        <Button
          type='primary'
          onClick={() => {
            const result = _findTreeNodePath(dataSource, (item) => item.code === value);
            setJsonData(result);
          }}
        >
          查找节点路径
        </Button>
        <Button
          type='primary'
          onClick={() => {
            const result = _findTreeManyNodePath(dataSource, (item) => value.includes(item.code));
            setJsonData(result);
          }}
        >
          查找多条节点路径
        </Button>
      </Space>
      <span>以下操作无需进行查找:</span>
      <Button
        type='primary'
        onClick={() => {
          const result = _getTreeFirstNode(dataSource);
          setJsonData(result);
        }}
      >
        获取第一节点的最后一级
      </Button>
      <ReactJsonView src={jsonData} collapsed={2} />
    </Space>
  );
};

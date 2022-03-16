import React from 'react';
import { Button, Space } from '@arco-design/web-react';
import type { ButtonProps } from '@arco-design/web-react/es/Button';
import type { ReactJsonViewProps } from 'react-json-view'; // 格式化渲染 json 对象
import ReactJsonView from '@site/src/components/ReactJsonView';

interface IProps {
  results?: any;
  openJsonView?: boolean;
  jsonViewProps?: ReactJsonViewProps;
  text?: string;
  buttonGroup?: { text?: string; [key: string]: any }[];
}

const DocButton: React.FC<IProps & ButtonProps> = ({
  text,
  results,
  openJsonView = true,
  jsonViewProps,
  buttonGroup,
  ...buttonProps
}) => {
  // JSON.stringify(result, null, '\t'); // 格式化 json，缩进一个 tab
  // JSON.stringify(result, null, 4); // 缩进 4 个空格（实际只有一个空格）

  return (
    <Space direction='vertical'>
      {buttonGroup && buttonGroup.length > 0 ? (
        <Space wrap>
          {buttonGroup.map(({ text, ...btnProps }, index) => (
            <Button key={index} type='primary' {...btnProps}>
              {text}
            </Button>
          ))}
        </Space>
      ) : (
        <Button type='primary' {...buttonProps}>
          {text || '点击显示结果'}
        </Button>
      )}

      {openJsonView ? (
        <ReactJsonView src={results} collapsed={2} {...jsonViewProps} />
      ) : (
        <span>RESULT: {results}</span>
      )}
    </Space>
  );
};

export default DocButton;

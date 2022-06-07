/**
 * @description 代码展示功能
 */

import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import { Divider, Button, Tooltip, Space } from '@arco-design/web-react';
import { IconCode, IconCodeSandbox } from '@arco-design/web-react/icon';
import clsx from 'clsx';
import BrowserWindow from '@site/src/components/BrowserWindow';

import styles from './styles.module.scss';

interface IProps {
  codeBlock: string | Array<{ code: string; language?: string }>;
  codeSandBoxHref?: string;
  codeLanguage?: string;
}

const CodePreview: React.FC<IProps> = (props) => {
  const { children, codeBlock = '', codeSandBoxHref = null, codeLanguage = 'tsx' } = props;

  const [visible, setVisible] = useState(false);

  const handleShowCodeBlock = () => {
    setVisible(!visible);
  };

  const codeBlockRender = () => {
    return (
      <div className={clsx(styles.codeBlockList, 'thin-scrollbar')}>
        {Array.isArray(codeBlock) ? (
          <>
            {codeBlock.map((item, index) => (
              <CodeBlock key={index} language={item.language || 'jsx'}>
                {item.code}
              </CodeBlock>
            ))}
          </>
        ) : (
          <CodeBlock language={codeLanguage}>{codeBlock}</CodeBlock>
        )}
      </div>
    );
  };

  return (
    <div className={styles.codePreview}>
      <BrowserWindow bodyStyle={{ padding: 0 }}>
        <div className='p-6'>{children}</div>

        <Divider className='arco-divider-dashed' orientation='center'>
          {/* Button Action */}
          <Space size={16}>
            <Tooltip position='top' trigger='hover' content={visible ? '收起代码' : '展开代码'}>
              <Button
                shape='circle'
                size='small'
                className={clsx(styles.optionsBtn, { [styles.expanded]: visible })}
                onClick={handleShowCodeBlock}
              >
                <IconCode className={styles.icon} />
              </Button>
            </Tooltip>
            {codeSandBoxHref && (
              <Tooltip position='top' trigger='hover' content='在 CodeSandBox 打开'>
                <Button
                  shape='circle'
                  size='small'
                  className={styles.optionsBtn}
                  href={codeSandBoxHref}
                  target='_blank'
                >
                  <IconCodeSandbox />
                </Button>
              </Tooltip>
            )}
          </Space>
        </Divider>

        {/* CodeBlock */}
        {visible && (
          <>
            <Divider className='m-0 arco-divider-dashed' />
            {codeBlockRender()}
          </>
        )}
      </BrowserWindow>
    </div>
  );
};

export default CodePreview;

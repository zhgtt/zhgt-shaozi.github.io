/**
 * @description 代码展示功能
 */

import React, { useState } from 'react';
import { Card, Button, Tooltip } from '@arco-design/web-react';
import { IconCode, IconCodeSandbox } from '@arco-design/web-react/icon';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IProps {
  codeBlock: string | Array<{ title?: string; code: string; language?: string }>;
  codeSandBoxHref: string;
  codeLanguage?: string;
}

const CodePreview: React.FC<IProps> = (props) => {
  const { children, codeBlock = '', codeSandBoxHref, codeLanguage = 'tsx' } = props;

  const [visible, setVisible] = useState(false);

  const handleShowCodeBlock = () => {
    setVisible(!visible);
  };

  const codeBlockRender = () => {
    if (Array.isArray(codeBlock)) {
      return (
        <div className={clsx(styles.codeBlockList, 'thin-scrollbar')}>
          {codeBlock.map((item, index) => (
            <CodeBlock key={index} language={item.language || 'jsx'} title={item.title}>
              {item.code}
            </CodeBlock>
          ))}
        </div>
      );
    }
    return <CodeBlock language={codeLanguage}>{codeBlock}</CodeBlock>;
  };

  return (
    <div className={styles.codePreview}>
      <Card bodyStyle={{ padding: '2.4rem' }}>{children}</Card>
      <div className='flex justify-end mt-3 mb-4'>
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
      </div>
      {/* CodeBlock */}
      {visible && codeBlockRender()}
    </div>
  );
};

export default CodePreview;

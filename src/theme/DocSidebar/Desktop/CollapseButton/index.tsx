/**
 * @description 桌面侧边栏 - 菜单收起 按钮
 *
 * @代码修改内容 ✅ 修改按钮的类名，将图标替换为 <IconLeft /> 组件
 */

import React from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import IconArrow from '@theme/IconArrow';
import type { Props } from '@theme/DocSidebar/Desktop/CollapseButton';

// import styles from './styles.module.css';

import { IconLeft } from '@arco-design/web-react/icon';

export default function CollapseButton({ onClick }: Props): JSX.Element {
  return (
    <button
      type='button'
      title={translate({
        id: 'theme.docs.sidebar.collapseButtonTitle',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      aria-label={translate({
        id: 'theme.docs.sidebar.collapseButtonAriaLabel',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      //  className={clsx(
      //    'button button--secondary button--outline',
      //    styles.collapseSidebarButton,
      //  )}
      className='collapse-sidebar-btn dino-collapse-sidebar-btn'
      onClick={onClick}
    >
      {/* <IconArrow className={styles.collapseSidebarButtonIcon} /> */}

      <IconLeft className='collapse-sidebar-btn-icon' />
    </button>
  );
}

/**
 * @description 侧边栏 - 菜单展开 按钮
 *
 * @代码修改内容 ✅ 修改按钮的类名，将图标替换为 <IconRight /> 组件
 */

import React from 'react';
import { translate } from '@docusaurus/Translate';
import IconArrow from '@theme/IconArrow';
import type { Props } from '@theme/DocPage/Layout/Sidebar/ExpandButton';

// import styles from './styles.module.css';

import clsx from 'clsx';
import { IconRight } from '@arco-design/web-react/icon';

export default function DocPageLayoutSidebarExpandButton({ toggleSidebar }: Props): JSX.Element {
  return (
    <div
      // className={styles.expandButton}
      className='expand-sidebar-btn dino-collapse-sidebar-btn'
      title={translate({
        id: 'theme.docs.sidebar.expandButtonTitle',
        message: 'Expand sidebar',
        description: 'The ARIA label and title attribute for expand button of doc sidebar',
      })}
      aria-label={translate({
        id: 'theme.docs.sidebar.expandButtonAriaLabel',
        message: 'Expand sidebar',
        description: 'The ARIA label and title attribute for expand button of doc sidebar',
      })}
      tabIndex={0}
      role='button'
      onKeyDown={toggleSidebar}
      onClick={toggleSidebar}
    >
      {/* <IconArrow className={styles.expandButtonIcon} /> */}

      <IconRight className='expand-sidebar-btn-icon' />
    </div>
  );
}

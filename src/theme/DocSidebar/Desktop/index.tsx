/**
 * @description 桌面端侧边栏
 *
 * @代码修改内容 ✅ <Logo /> 组件添加一个父容器 div，修改样式
 */

import React from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import type { Props } from '@theme/DocSidebar/Desktop';

import styles from './styles.module.scss';

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden
      )}
    >
      {/* {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />} */}

      {hideOnScroll && (
        <div className={styles.sidebarLogoBox}>
          <Logo tabIndex={-1} className={styles.sidebarLogo} />
        </div>
      )}

      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);

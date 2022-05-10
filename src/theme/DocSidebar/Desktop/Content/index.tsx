/**
 * @description 桌面端侧边栏 - 菜单内容
 *
 * @代码修改内容 ✅ 新增 dino-menu-nav 类名，注释掉了 showAnnouncementBar 相关代码
 */

import React, { useState } from 'react';
import clsx from 'clsx';
import { ThemeClassNames, useAnnouncementBar, useScrollPosition } from '@docusaurus/theme-common';
import DocSidebarItems from '@theme/DocSidebarItems';
import type { Props } from '@theme/DocSidebar/Desktop/Content';

import styles from './styles.module.scss';

function useShowAnnouncementBar() {
  const { isActive } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

  useScrollPosition(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive]
  );
  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({ path, sidebar, className }: Props): JSX.Element {
  const showAnnouncementBar = useShowAnnouncementBar();

  return (
    <nav
      className={clsx(
        'menu thin-scrollbar dino-menu-nav',
        styles.menu,
        // showAnnouncementBar && styles.menuWithAnnouncementBar,
        className
      )}
    >
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
    </nav>
  );
}

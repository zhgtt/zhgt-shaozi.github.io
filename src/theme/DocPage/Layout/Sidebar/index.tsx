/**
 * @description 文档布局 - 侧边栏
 *
 * @代码修改内容 ✅ <ExpandButton /> 组件添加一个父容器 div，修改样式
 */

import React, { type ReactNode, useState, useCallback } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDocsSidebar } from '@docusaurus/theme-common/internal';
import { useLocation } from '@docusaurus/router';
import DocSidebar from '@theme/DocSidebar';
import ExpandButton from '@theme/DocPage/Layout/Sidebar/ExpandButton';
import type { Props } from '@theme/DocPage/Layout/Sidebar';

import styles from './index.module.scss';

function ResetOnSidebarChange({ children }: { children: ReactNode }) {
  const sidebar = useDocsSidebar();
  return <React.Fragment key={sidebar?.name ?? 'noSidebar'}>{children}</React.Fragment>;
}

export default function DocPageLayoutSidebar({
  sidebar,
  hiddenSidebarContainer,
  setHiddenSidebarContainer,
}: Props): JSX.Element {
  const { pathname } = useLocation();

  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    setHiddenSidebarContainer((value) => !value);
  }, [setHiddenSidebarContainer, hiddenSidebar]);

  return (
    <aside
      className={clsx(
        ThemeClassNames.docs.docSidebarContainer,
        styles.docSidebarContainer,
        hiddenSidebarContainer && styles.docSidebarContainerHidden
      )}
      onTransitionEnd={(e) => {
        if (!e.currentTarget.classList.contains(styles.docSidebarContainer!)) {
          return;
        }

        if (hiddenSidebarContainer) {
          setHiddenSidebar(true);
        }
      }}
    >
      <ResetOnSidebarChange>
        <DocSidebar
          sidebar={sidebar}
          path={pathname}
          onCollapse={toggleSidebar}
          isHidden={hiddenSidebar}
        />
      </ResetOnSidebarChange>

      {/* {hiddenSidebar && <ExpandButton toggleSidebar={toggleSidebar} />} */}

      {hiddenSidebar && (
        <div className={styles.ExpandSidebarBg}>
          <ExpandButton toggleSidebar={toggleSidebar} />
        </div>
      )}
    </aside>
  );
}

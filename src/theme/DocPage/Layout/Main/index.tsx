/**
 * @description 文档布局 - 正文内容
 *
 * @代码修改内容 ✅ 在 <main> 中新增 <Footer /> 组件，添加底部区域
 */

import React from 'react';
import clsx from 'clsx';
import { useDocsSidebar } from '@docusaurus/theme-common/internal';
import Footer from '@theme/Footer';
import type { Props } from '@theme/DocPage/Layout/Main';

import styles from './index.module.scss';

export default function DocPageLayoutMain({
  hiddenSidebarContainer,
  children,
}: Props): JSX.Element {
  const sidebar = useDocsSidebar();
  return (
    <main
      className={clsx(
        styles.docMainContainer,
        (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced
      )}
    >
      <div
        className={clsx(
          'container padding-top--md padding-bottom--lg',
          styles.docItemWrapper,
          hiddenSidebarContainer && styles.docItemWrapperEnhanced
        )}
      >
        {children}
      </div>
      <Footer />
    </main>
  );
}

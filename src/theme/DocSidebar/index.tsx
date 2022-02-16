import React, { useState } from 'react';
import clsx from 'clsx';
import {
  useThemeConfig,
  useAnnouncementBar,
  MobileSecondaryMenuFiller,
  type MobileSecondaryMenuComponent,
  ThemeClassNames,
  useScrollPosition,
  useWindowSize,
} from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import DocSidebarItems from '@theme/DocSidebarItems';
import type { Props } from '@theme/DocSidebar';

import styles from './styles.module.scss';

import HideableSidebarButton from '../HideableSidebarButton';

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

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  const showAnnouncementBar = useShowAnnouncementBar();
  const {
    navbar: { hideOnScroll },
    hideableSidebar,
  } = useThemeConfig();

  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.sidebarWithHideableNavbar]: hideOnScroll,
        [styles.sidebarHidden]: isHidden,
      })}
    >
      {hideOnScroll && (
        <div className={styles.sidebarLogoBox}>
          <Logo tabIndex={-1} className={styles.sidebarLogo} />
        </div>
      )}
      <nav
        className={clsx('menu thin-scrollbar dino-menu-nav', styles.menu, {
          // [styles.menuWithAnnouncementBar]: showAnnouncementBar,
        })}
      >
        <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
          <DocSidebarItems items={sidebar} activePath={path} level={1} />
        </ul>
      </nav>
      {hideableSidebar && <HideableSidebarButton onClick={onCollapse} />}
    </div>
  );
}

// eslint-disable-next-line react/function-component-definition
const DocSidebarMobileSecondaryMenu: MobileSecondaryMenuComponent<Props> = ({
  toggleSidebar,
  sidebar,
  path,
}) => (
  <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
    <DocSidebarItems
      items={sidebar}
      activePath={path}
      onItemClick={(item) => {
        // Mobile sidebar should only be closed if the category has a link
        if (item.type === 'category' && item.href) {
          toggleSidebar();
        }
        if (item.type === 'link') {
          toggleSidebar();
        }
      }}
      level={1}
    />
  </ul>
);

function DocSidebarMobile(props: Props) {
  return <MobileSecondaryMenuFiller component={DocSidebarMobileSecondaryMenu} props={props} />;
}

const DocSidebarDesktopMemo = React.memo(DocSidebarDesktop);
const DocSidebarMobileMemo = React.memo(DocSidebarMobile);

export default function DocSidebar(props: Props): JSX.Element {
  const windowSize = useWindowSize();

  // Desktop sidebar visible on hydration: need SSR rendering
  const shouldRenderSidebarDesktop = windowSize === 'desktop' || windowSize === 'ssr';

  // Mobile sidebar not visible on hydration: can avoid SSR rendering
  const shouldRenderSidebarMobile = windowSize === 'mobile';

  return (
    <>
      {shouldRenderSidebarDesktop && <DocSidebarDesktopMemo {...props} />}
      {shouldRenderSidebarMobile && <DocSidebarMobileMemo {...props} />}
    </>
  );
}

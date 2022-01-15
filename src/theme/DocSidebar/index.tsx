import React, { useState } from 'react';
import clsx from 'clsx';
import {
  useThemeConfig,
  // useAnnouncementBar,
  MobileSecondaryMenuFiller,
  MobileSecondaryMenuComponent,
  ThemeClassNames,
  // useScrollPosition,
} from '@docusaurus/theme-common';
import useWindowSize from '@theme/hooks/useWindowSize';
import Logo from '@theme/Logo';
// import IconArrow from '@theme/IconArrow';
// import { translate } from '@docusaurus/Translate';
import { DocSidebarItems } from '@theme/DocSidebarItem';
import type { Props } from '@theme/DocSidebar';

import HideableSidebarButton from '../HideableSidebarButton';

import './styles.scss';

// function useShowAnnouncementBar() {
//   const { isActive } = useAnnouncementBar();
//   const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

//   useScrollPosition(
//     ({ scrollY }) => {
//       if (isActive) {
//         setShowAnnouncementBar(scrollY === 0);
//       }
//     },
//     [isActive]
//   );
//   return isActive && showAnnouncementBar;
// }

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  // const showAnnouncementBar = useShowAnnouncementBar();  // 收起按钮在底部时，对 nav 的样式进行调整
  const {
    navbar: { hideOnScroll }, // 页面滚动时是否收起顶部导航条
    hideableSidebar, // 是否显示收起菜单按钮
  } = useThemeConfig();

  return (
    <div
      className={clsx('dino-menu-sidebar', {
        ['sidebarWithHideableNavbar']: hideOnScroll,
        ['sidebarHidden']: isHidden,
      })}
    >
      {hideOnScroll && (
        <div className='sidebarLogo-box'>
          <Logo tabIndex={-1} className='sidebarLogo' />
        </div>
      )}
      <nav className={clsx('thin-scrollbar dino-menu-nav')}>
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

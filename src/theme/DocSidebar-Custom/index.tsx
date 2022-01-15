/**
 * @theme Doc 文档侧边菜单栏组件
 * @description 将 web 模式下的菜单改为由 arco-design 的 Menu 组件封装，mobile 模式下的菜单依然保持原组件不变
 */

import React, { useState, useEffect, memo } from 'react';
import clsx from 'clsx';
import {
  useThemeConfig, // TODO 需要记录，获取 docusaurus.config 中 themeConfig 的配置项
  useAnnouncementBar, // TODO 需要记录，获取顶部公告条的 hook，由 isActive 和 close() 组成，isActive 表示是否显示
  MobileSecondaryMenuFiller,
  MobileSecondaryMenuComponent,
  ThemeClassNames,
  useScrollPosition, // TODO 需要记录，获取滚动区间的 hook
  isSamePath, // TODO 路径地址对比，用来判断是否为当前地址
  usePrevious,
  Collapsible,
  useCollapsible, // TODO 对 collapsible 的处理 hook
} from '@docusaurus/theme-common';
import useWindowSize from '@theme/hooks/useWindowSize'; // TODO 需要记录，获取窗口状态的 hook
import Logo from '@theme/Logo'; // TODO 需要记录，logo 组件
import { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link'; // TODO 需要记录
import isInternalUrl from '@docusaurus/isInternalUrl'; // TODO 需要记录，判断链接是内链(true)/外链(false)
import IconExternalLink from '@theme/IconExternalLink'; // TODO 需要记录，外链图标
import IconArrow from '@theme/IconArrow'; // TODO 需要记录，双箭头图标
import { DocSidebarItems } from '@theme/DocSidebarItem';

import type { Props as DocSidebarProps } from '@theme/DocSidebar';
import type { Props as DocSidebarItemProps, DocSidebarItemsProps } from '@theme/DocSidebarItem';
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
  PropSidebarItem,
} from '@docusaurus/plugin-content-docs-types';

import { Menu, Button } from '@arco-design/web-react';
import { isEmpty } from 'lodash'; // 判断是否为空值

import styles from './styles.module.scss';

/**
 * @description ⚠️ 判断当前菜单是否和当前页面相对应
 */
const isActiveSidebarItem = (item: DocSidebarItemProps['item'], activePath: string): boolean => {
  if (item.type === 'link') {
    return isSamePath(item.href, activePath);
  }
  if (item.type === 'category') {
    return item.items.some((subItem) => isActiveSidebarItem(subItem, activePath));
  }
  return false;
};

// 隐藏侧边栏按钮组件
function HideableSidebarButton({ onClick }: { onClick: React.MouseEventHandler }) {
  return (
    <Button shape='round' className={styles['arco-menu-collapse-btn']}>
      {'<'}
    </Button>
    // <button
    //   type='button'
    //   title={translate({
    //     id: 'theme.docs.sidebar.collapseButtonTitle',
    //     message: 'Collapse sidebar',
    //     description: 'The title attribute for collapse button of doc sidebar',
    //   })}
    //   aria-label={translate({
    //     id: 'theme.docs.sidebar.collapseButtonAriaLabel',
    //     message: 'Collapse sidebar',
    //     description: 'The title attribute for collapse button of doc sidebar',
    //   })}
    //   className={clsx('button button--secondary button--outline', styles.collapseSidebarButton)}
    //   onClick={onClick}
    // >
    //   <IconArrow className={styles.collapseSidebarButtonIcon} />
    // </button>
  );
}

// web 模式下菜单组件
const DocSidebarDesktop: React.FC<DocSidebarProps> = (props) => {
  const { path, sidebar, onCollapse, isHidden } = props;
  console.log('sidebar: ', sidebar);
  // console.log('path: ', path);

  const {
    navbar: { hideOnScroll }, // 页面滚动时是否收起顶部导航条
    hideableSidebar, // 是否显示收起菜单按钮
  } = useThemeConfig();

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]); // 选中的菜单项 key
  const [openKeys, setOpenKeys] = useState<string[]>([]); // 展开的子菜单项 key

  React.useEffect(() => {
    if (isEmpty(sidebar)) return;
    // TODO 需要处理三级菜单的问题，collapsed 为 false 时，将对应的 label 存入到 openKeys 中
    setOpenKeys(() => {
      return sidebar
        .filter((item) => item.type === 'category' && !item.collapsed)
        .map((org) => org.label);
    });
    setSelectedKeys([path]);
  }, []);

  const DocSidebarItemsLoop = React.useCallback((items: PropSidebarItem[]) => {
    return items.map((item) => DocSidebarItem(item));
  }, []);

  const DocSidebarItem = (item: PropSidebarItem) => {
    switch (item.type) {
      case 'category':
        if (isEmpty(item.items)) return null;
        return DocSidebarItemCategory(item);

      case 'link':
      default:
        return DocSidebarItemLink(item);
    }
  };

  // 层级菜单组件
  const DocSidebarItemCategory = (item: PropSidebarItemCategory) => {
    const { label, items } = item;
    return (
      <Menu.SubMenu title={label} key={label}>
        {DocSidebarItemsLoop(items)}
      </Menu.SubMenu>
    );
  };

  // link 菜单组件
  const DocSidebarItemLink = (item: PropSidebarItemLink) => {
    const { label, href } = item;
    const isActive = isActiveSidebarItem(item, path);
    return (
      <Menu.Item title={label} key={href}>
        <Link
          aria-current={isActive ? 'page' : undefined}
          className={styles['arco-menu-link']}
          to={href}
        >
          {isInternalUrl(href) ? (
            label
          ) : (
            <span>
              {label}
              <IconExternalLink />
            </span>
          )}
        </Link>
      </Menu.Item>
    );
  };

  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.sidebarWithHideableNavbar]: hideOnScroll,
        [styles.sidebarHidden]: isHidden, // 是否隐藏菜单
      })}
    >
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <nav className={clsx('thin-scrollbar', styles.menu)}>
        <Menu
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onClickMenuItem={(key) => setSelectedKeys([key])}
          onClickSubMenu={(_key, openKeys) => setOpenKeys([...openKeys])}
          style={{ width: 284, paddingBottom: 24 }}
        >
          {DocSidebarItemsLoop(sidebar as PropSidebarItem[])}
        </Menu>
      </nav>
      {hideableSidebar && <HideableSidebarButton onClick={onCollapse} />}
    </div>
  );
};

// 📱 移动端模式下的菜单组件（保持原组件不变）
const DocSidebarMobileSecondaryMenu: MobileSecondaryMenuComponent<DocSidebarProps> = ({
  toggleSidebar,
  sidebar,
  path,
}) => {
  return (
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
      <DocSidebarItems
        items={sidebar}
        activePath={path}
        onItemClick={() => toggleSidebar()} // 移动端的事件触发
        level={1}
      />
    </ul>
  );
};

function DocSidebarMobile(props: DocSidebarProps) {
  return <MobileSecondaryMenuFiller component={DocSidebarMobileSecondaryMenu} props={props} />;
}

// Component
const DocSidebarDesktopMemo = React.memo(DocSidebarDesktop);
const DocSidebarMobileMemo = React.memo(DocSidebarMobile);

export default function DocSidebar(props: DocSidebarProps): JSX.Element {
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

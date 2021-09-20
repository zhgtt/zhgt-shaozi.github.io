import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/BlogSidebar';
import { translate } from '@docusaurus/Translate';

import styles from './styles.module.scss';

const BlogSidebar = ({ sidebar }: Props): JSX.Element | null => {
  if (sidebar.items.length === 0) {
    return null;
  }
  return (
    <nav
      className={clsx('overflow-y-auto sticky thin-scrollbar', styles.sidebar)}
      aria-label={translate({
        id: 'theme.blog.sidebar.navAriaLabel',
        message: '博客帖子侧栏导航',
        description: '',
      })}
    >
      <h4 className='mb-4'>{sidebar.title}</h4>
      <ul className='text-sm'>
        {sidebar.items.map((item) => {
          return (
            <li key={item.permalink} className='mt-3'>
              <Link
                isNavLink
                to={item.permalink}
                className={styles.sidebarItemLink}
                activeClassName={styles.sidebarItemLinkActive}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BlogSidebar;

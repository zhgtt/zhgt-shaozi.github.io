/**
 * @description 博客标签列表组件
 */

import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { Tag } from '@arco-design/web-react';
import IconFont from '@site/src/components/IconFont';
import styles from './styles.module.scss';

interface BlogTagsListProps {
  tags: readonly { readonly label: string; readonly permalink: string }[];
}

const BlogTagsList: React.FC<BlogTagsListProps> = (props) => {
  const { tags } = props;

  if (!tags.length) return null;

  return (
    <div className='flex my-6'>
      {tags.map(({ label, permalink: tagPermalink }) => (
        <Tag key={tagPermalink} className={clsx('mr-2 paper-border-5', styles.dinoTag)}>
          <Link to={tagPermalink}>
            <IconFont type='icon-dino-biaoqian' className='mr-1' />
            {label}
          </Link>
        </Tag>
      ))}
    </div>
  );
};

export default BlogTagsList;

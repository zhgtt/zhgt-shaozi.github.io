/**
 * @BlogTagsList - 博客标签列表组件
 */

import React from 'react';

import Link from '@docusaurus/Link';

import clsx from 'clsx';
import { Tag } from 'antd';
import { TagsTwoTone } from '@ant-design/icons';

import styles from './styles.module.scss';

interface BlogTagsListProps {
  tags: readonly { readonly label: string; readonly permalink: string }[];
}

const BlogTagsList: React.FC<BlogTagsListProps> = (props) => {
  const { tags } = props;

  if (!tags.length) return null;

  return (
    <div className='flex items-center my-6'>
      <TagsTwoTone className='mr-2' twoToneColor='#8d949e' />
      {tags.map(({ label, permalink: tagPermalink }) => (
        <Tag key={tagPermalink} className='border-transparent paper-border-5 bg-primary'>
          <Link to={tagPermalink}>{label}</Link>
        </Tag>
      ))}
    </div>
  );
};

export default BlogTagsList;

import React from 'react';
import clsx from 'clsx';
import { Tag } from 'antd';
import { TagsTwoTone } from '@ant-design/icons';
import Link from '@docusaurus/Link';

import styles from './styles.module.scss';

export interface TagsListProps {
  tags: readonly { readonly label: string; readonly permalink: string }[];
}

const TagsList: React.FC<TagsListProps> = (props) => {
  const { tags } = props;

  if (!tags.length) return null;

  return (
    <div className='flex items-center my-lg'>
      {/* <TagsOutlined className='margin-right--sm' twoToneColor='#eb2f96' /> */}
      <TagsTwoTone className='mr-sm' twoToneColor='#8d949e' />
      {tags.map(({ label, permalink: tagPermalink }) => (
        <Tag key={tagPermalink} className='border-transparent paper-border-5 bg-primary'>
          <Link to={tagPermalink} className='font-bold'>
            {label}
          </Link>
        </Tag>
      ))}
    </div>
  );
};

export default TagsList;

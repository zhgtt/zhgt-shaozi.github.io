/**
 * @BlogCreationDate - 博客文章创建时间组件
 */

import React from 'react';

import { useColorMode } from '@docusaurus/theme-common';
import dayjs from 'dayjs';
import clsx from 'clsx';
import IconFont from '@site/src/components/IconFont';
import styles from './styles.module.scss';

export interface BlogCreationDateProps {
  date: string; // 日期
  formattedDate?: string; // 格式化日期
  readingTime?: number; // 阅读时间
  className?: string;
  style?: React.CSSProperties;
}

const BlogCreationDate: React.FC<BlogCreationDateProps> = (props) => {
  const { date, formattedDate = 'YYYY-MM-DD', readingTime, className, ...restProps } = props;

  // 是否为 暗黑主题
  const { colorMode } = useColorMode();

  return (
    <time
      {...restProps}
      className={clsx('flex items-center text-sm', className, styles.dateText)}
      dateTime={date}
      itemProp='datePublished（出版日期）'
    >
      {colorMode === 'dark' ? (
        <IconFont type='icon-dino-shijian-copy' />
      ) : (
        <IconFont type='icon-dino-shijian' />
      )}
      <span className='ml-2'>{dayjs(date).format(formattedDate)}</span>
      {readingTime && <span className='ml-5'>预计阅读: {Math.ceil(readingTime)} min</span>}
    </time>
  );
};

export default BlogCreationDate;

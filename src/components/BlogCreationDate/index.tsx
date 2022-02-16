/**
 * @BlogCreationDate - 博客文章创建时间组件
 */

import React, { useContext } from 'react';

import { usePluralForm, useColorMode } from '@docusaurus/theme-common';
import Translate, { translate } from '@docusaurus/Translate'; // 翻译组件
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

// 创建时间组件
// const useReadingTimePlural = () => {
//   const { selectMessage } = usePluralForm();
//   console.log('selectMessage: ', selectMessage);
//   return (readingTimeFloat) => {
//     const readingTime = Math.ceil(readingTimeFloat);
//     return selectMessage(
//       readingTime,
//       translate(
//         {
//           id: 'theme.blog.post.readingTime.plurals',
//           description:
//             'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
//           message: 'One min read|{readingTime} min read',
//         },
//         { readingTime }
//       )
//     );
//   };
// };

const BlogCreationDate: React.FC<BlogCreationDateProps> = (props) => {
  const { date, formattedDate = 'YYYY·MM·DD', readingTime, className, ...restProps } = props;

  // 是否为 暗黑主题
  const { isDarkTheme } = useColorMode();

  // const readingTimePlural = useReadingTimePlural();

  return (
    <time
      {...restProps}
      className={clsx('flex items-center text-sm', className, styles.dateText)}
      dateTime={date}
      itemProp='datePublished（出版日期）'
    >
      {isDarkTheme ? (
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

/**
 * @description - 博客内容
 *
 * 笔记：
 *  * @Typescript 笔记：
 *
 * React.FC - FC 是 FunctionComponent 的简写，该类型定义了一些默认属性，如 children 等
 * defaultProps - 对 props 进行解构，在解构对象中对 props 的属性设置默认值
 *
 * T & P - 交叉类型，将多个类型合并为一个类型，复用性强
 * T | P - 联合类型，取值为 多种类型中的一种类型
 * Partial<T> - 将一个类型内的属性全部转换为 可选 属性
 * Omit<T, Key | Key2> - 将 T 类型中的 Key 和 Key2 属性剔除，组成一个新的类型
 * [T, T1][number] - 索引类型，将该数组中的值解构合并成 联合类型
 *
 * keyof T - 类似于 Objcet.keys，使用 keyof 遍历一个类型 T（可以是 enum 类型），获取 T 上所有的 public（公共）属性，再结合 typeof 可组成 联合类型（例：keyof typeof ENUM）
 * P in Keys - 使用 in 遍历联合类型 keys，将值赋给 P
 *
 * @<article> 标签：语义化标签，定义独立的文本内容，主要用于博客文章，新闻故事，帖子等，有利于 SEO
 * @<strong> 标签：语义化标签，字体加粗，强调内容，比 <b> 标签更利于 SEO 检索
 * @<time> 标签：语义化标签，定义日期或时间，@datetime 是其属性，定义其日期时间
 * @itemProp 属性：语义化属性，描述标签的功能，用于 seo 优化搜索引擎
 * @itemScope 属性：语义化属性，是一个 bool 类型，定义了一个与元数据关联的数据项，用于 seo 优化搜索引擎
 * @itemType 属性：语义化属性，通常表示一个地址，用于 seo 优化搜索引擎
 *
 *
 * @Props 属性
 *
 * @children - 文章 markdown 内容（与源码不同，仅来自于 BlogListPage 组件）
 * @metadata - 文章信息数据（作者，链接，标签等）
 * @truncated - 文章是否有摘要
 * @assets - 静态文件（作者图片，封面等）
 * @frontMatter - 文章抬头信息（作者信息，头像地址等）
 * @isBlogPostPage - 是否为文章内容页面，boolean 类型，默认为 false（源码中额外传递的属性）
 * @... 其他自定义属性
 *
 *
 * @metadata 属性
 *
 * @date - 文章创建时间
 * @formattedDate - 文章格式化时间
 * @permalink - 文章链接地址
 * @tags - 文章标签
 * @title - 文章标题
 * @readingTime - 文章预计阅读时间
 * @authors - 文章作者信息
 * @editUrl - 文章编辑地址
 * @nextItem - 下一篇文章信息（路由，名称等）
 * @prevItem - 上一篇文章信息（路由，名称等）
 * @...
 */

// import { tuple } from '@site/src/utils/type';

// 随机 lottie 的方向
// enum DirectionTypes {
//   left,
//   right,
// }
// type DirectionType = keyof typeof DirectionTypes;
// 或
// const DirectionTypes = tuple('left', 'right');
// type DirectionType = typeof DirectionTypes[number];

// <Link to='/blog/archive' className='absolute top-1/2 left-0 -translate-y-1/2'>
// 博客时光馆
// </Link>

import React from 'react';

import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { usePluralForm } from '@docusaurus/theme-common';
import { blogPostContainerID } from '@docusaurus/utils-common';
import MDXContent from '@theme/MDXContent'; // markdown 摘要内容
import EditThisPage from '@theme/EditThisPage'; // 编辑页面
import type { Props } from '@theme/BlogPostItem';
import TagsListInline from '@theme/TagsListInline'; // 标签组件
import BlogPostAuthors from '@theme/BlogPostAuthors'; // 作者组件
import BackToTopButton from '@theme/BackToTopButton'; // 平滑滚动到顶部组件
import clsx from 'clsx';

import { Button, Divider } from '@arco-design/web-react';
import BlogTagsList from '@site/src/components/BlogTagsList';
import BlogCreationDate from '@site/src/components/BlogCreationDate';
import IconFont from '@site/src/components/IconFont';

import styles from './styles.module.scss';

// 阅读时长
function useReadingTimePlural() {
  const { selectMessage } = usePluralForm();
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        { readingTime }
      )
    );
  };
}

export default function BlogPostItem(props: Props): JSX.Element {
  const readingTimePlural = useReadingTimePlural();
  const { withBaseUrl } = useBaseUrlUtils();
  const { children, frontMatter, assets, metadata, truncated, isBlogPostPage = false } = props;
  const { date, formattedDate, permalink, tags, readingTime, title, editUrl, authors } = metadata;

  const image = assets.image ?? frontMatter.image;
  const truncatedPost = !isBlogPostPage && truncated; // 判断是否显示 阅读更多 按钮
  const tagsExists = tags.length > 0; // 判断是否有 标签
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2'; // 标题

  return (
    <article
      className={!isBlogPostPage && 'mb-16'}
      itemProp='blogPost'
      itemScope
      itemType='http://schema.org/BlogPosting'
    >
      {isBlogPostPage && <BackToTopButton />}

      <header>
        {/* 标题 */}
        <TitleHeading className={styles.blogPostTitle} itemProp='headline'>
          {isBlogPostPage ? (
            title
          ) : (
            <Link itemProp='url' to={permalink}>
              {title}
            </Link>
          )}
        </TitleHeading>
        {/* 创建日期 - 阅读时长 */}
        <BlogCreationDate date={date} readingTime={readingTime} className='text-sm my-5' />
        {/* <div className={clsx(styles.blogPostData, 'margin-vert--md')}>
          <time dateTime={date} itemProp='datePublished'>
            {formattedDate}
          </time>
          {typeof readingTime !== 'undefined' && (
            <>
              {' · '}
              {readingTimePlural(readingTime)}
            </>
          )}
        </div> */}
        {/* 作者 */}
        <div className='mb-4'>
          <BlogPostAuthors authors={authors} assets={assets} />
        </div>
      </header>

      {image && <meta itemProp='image' content={withBaseUrl(image, { absolute: true })} />}

      <div
        id={isBlogPostPage ? blogPostContainerID : undefined}
        className='markdown'
        itemProp='articleBody'
      >
        <MDXContent>{children}</MDXContent>
      </div>

      {(tagsExists || truncated) && (
        <footer
          className={clsx('row docusaurus-mt-lg', isBlogPostPage && styles.blogPostDetailsFull)}
        >
          {/* 标签 */}
          {tagsExists && (
            <div className={clsx('col', { 'col--9': truncatedPost })}>
              {/* <BlogTagsList tags={tags} /> */}
              <TagsListInline tags={tags} />
            </div>
          )}

          {/* 编辑页面 */}
          {isBlogPostPage && editUrl && (
            <div className='col margin-top--sm'>
              <EditThisPage editUrl={editUrl} />
            </div>
          )}

          {truncatedPost && (
            <div
              className={clsx('col text-right', {
                'col--3': tagsExists,
              })}
            >
              {/* <Button type='primary' aria-label={`继续阅读更多 ${title} 的内容`}>
                <Link to={metadata.permalink} className={clsx('full', styles.btnLink)}>
                  阅读更多 <IconFont type='icon-dino-yuedu' className='ml-1' />
                </Link>
              </Button> */}
              <Link
                to={metadata.permalink}
                aria-label={translate(
                  {
                    message: 'Read more about {title}',
                    id: 'theme.blog.post.readMoreLabel',
                    description: 'The ARIA label for the link to full blog posts from excerpts',
                  },
                  { title }
                )}
              >
                <b>
                  <Translate
                    id='theme.blog.post.readMore'
                    description='The label used in blog post item excerpts to link to full blog posts'
                  >
                    阅读更多
                  </Translate>
                </b>
              </Link>
            </div>
          )}
        </footer>
      )}

      <Divider className='arco-divider-dashed' />
    </article>
  );
}

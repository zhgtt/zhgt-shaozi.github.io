/**
 * BlogPostItem - 自定义 blog 列表页面中的每一个项 blog 组件
 *
 * 笔记：
 * article 标签：HTML5 新增标签，定义独立的文本内容，主要用于博客文章，新闻故事，帖子等，有利于 SEO
 */

import React from 'react';

import type { Props } from '@theme/BlogPostItem';

import Translate, { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import Seo from '@theme/Seo';
import EditThisPage from '@theme/EditThisPage';
import MDXComponents from '@theme/MDXComponents';
import { MDXProvider } from '@mdx-js/react';

import clsx from 'clsx';
import * as dayjs from 'dayjs';

import Card from '@site/src/components/Card';

import styles from './styles.module.scss';

// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
  const { selectMessage } = usePluralForm();
  return (readingTimeFloat) => {
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

const BlogPostItem = (props: Props): JSX.Element => {
  const readingTimePlural = useReadingTimePlural();
  //   console.log('readingTimePlural: ', readingTimePlural);
  const { children, frontMatter, metadata, truncated, isBlogPostPage = false } = props;
  const { date, formattedDate, permalink, tags, readingTime, title, editUrl } = metadata;
  const { author, image, keywords } = frontMatter;

  const authorURL = frontMatter.author_url || frontMatter.authorURL;
  const authorTitle = frontMatter.author_title || frontMatter.authorTitle;
  const authorImageURL = frontMatter.author_image_url || frontMatter.authorImageURL;

  const renderPostHeader = () => {
    return (
      <header>
        <h2 className={styles.blogPostTitle}>
          <Link to={permalink}>{title}</Link>
        </h2>
        <div className={clsx(styles.blogPostData, 'margin-vert--md')}>
          <time dateTime={date}>{formattedDate}</time>

          {readingTime && (
            <>
              {' · '}
              {readingTimePlural(readingTime)}
            </>
          )}
        </div>
        <div className='avatar margin-vert--md'>
          {authorImageURL && (
            <Link className='avatar__photo-link avatar__photo' href={authorURL}>
              <img src={authorImageURL} alt={author} />
            </Link>
          )}
          <div className='avatar__intro'>
            {author && (
              <>
                <div className='avatar__name'>
                  <Link href={authorURL}>{author}</Link>
                </div>
                <small className='avatar__subtitle'>{authorTitle}</small>
              </>
            )}
          </div>
        </div>
      </header>
    );
  };

  return (
    <>
      {/* <Seo {...{ keywords, image }} /> */}

      <article className='margin-bottom--xl'>
        <Card>
          {/* blog 标题 */}
          <h3 className={styles.blogPostTitle}>
            <Link to={permalink}>{title}</Link>
          </h3>

          {/* blog 创建时间 */}
          <div className={clsx(styles.blogPostData, 'margin-vert--md')}>
            <time dateTime={date}>{formattedDate}</time>
            {readingTime && (
              <>
                {' · '}
                {readingTimePlural(readingTime)}
              </>
            )}
          </div>

          {/* blog 内容 */}
          <div className='markdown'>
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>
          </div>

          {(tags.length > 0 || truncated) && (
            <footer
              className={clsx('row docusaurus-mt-lg', {
                [styles.blogPostDetailsFull]: isBlogPostPage,
              })}
            >
              {tags.length > 0 && (
                <div className='col'>
                  <b>
                    <Translate
                      id='theme.tags.tagsListLabel'
                      description='The label alongside a tag list'
                    >
                      Tags:
                    </Translate>
                  </b>
                  {tags.map(({ label, permalink: tagPermalink }) => (
                    <Link key={tagPermalink} className='margin-horiz--sm' to={tagPermalink}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}

              {/* {isBlogPostPage && editUrl && (
                <div className='col margin-top--sm'>
                  <EditThisPage editUrl={editUrl} />
                </div>
              )} */}

              <div className='col text--right'>
                <Link to={metadata.permalink} aria-label={`Read more about ${title}`}>
                  <b>
                    <Translate
                      id='theme.blog.post.readMore'
                      description='The label used in blog post item excerpts to link to full blog posts'
                    >
                      继续阅读
                    </Translate>
                  </b>
                </Link>
              </div>
            </footer>
          )}
        </Card>
      </article>
    </>
  );
};

export default BlogPostItem;

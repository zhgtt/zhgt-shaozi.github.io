/**
 * BlogPostPage - 自定义 blog 内容页面
 */

import React from 'react';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import { ThemeClassNames } from '@docusaurus/theme-common';

import { Tag } from 'antd';

function BlogPostPage(props) {
  const { content: BlogPostContents, sidebar } = props;
  const { frontMatter, metadata } = BlogPostContents;
  const { title, description, nextItem, prevItem } = metadata;
  const { hide_table_of_contents: hideTableOfContents } = frontMatter;

  return (
    <BlogLayout
      title={title}
      description={description}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogPostPage}
      sidebar={sidebar}
      toc={!hideTableOfContents && BlogPostContents.toc ? BlogPostContents.toc : undefined}
    >
      <BlogPostItem frontMatter={frontMatter} metadata={metadata} isBlogPostPage>
        <BlogPostContents />
      </BlogPostItem>
      {(nextItem || prevItem) && <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />}
    </BlogLayout>
  );
}

export default BlogPostPage;

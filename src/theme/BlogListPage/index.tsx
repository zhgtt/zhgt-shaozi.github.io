/**
 * @BlogListPage - 自定义 blog 列表页面
 *
 * src/theme 下定义一个和 @theme 同名的主题组件，引入 @theme 主题组件时，会优先引入本地文件 src/theme 下的主题组件，用来代替原 @theme 主题组件
 *
 * @Props 属性
 *
 * @metadata - 博客信息数据（博客描述，博客标题等）
 * @items - 博客文章列表
 * @sidebar - 侧边栏内容
 * @...
 */

import React from 'react';

import type { Props } from '@theme/BlogListPage';
import Layout from '@theme/Layout';
// import BlogSidebar from '@theme/BlogSidebar'; // blog 侧边栏组件
// import BlogPostItem from '@theme/BlogPostItem'; // blog 列表页面中每一项 blog 组件
import BlogPostItem from '../BlogPostItem';
import BlogListPaginator from '@theme/BlogListPaginator'; // blog 列表分页器组件
import { ThemeClassNames } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'; // docusaurus 配置参数

import clsx from 'clsx';
import { tuple } from '@site/src/utils/type';
import styles from './styles.module.scss';

// 随机 lottie 的方向
// enum DirectionTypes {
//   left,
//   right,
// }
// type DirectionType = keyof typeof DirectionTypes;
const DirectionTypes = tuple('left', 'right');
type DirectionType = typeof DirectionTypes[number];

const randomDirectionFun = (): DirectionType => {
  const len = DirectionTypes.length;
  const result = DirectionTypes[Math.floor(Math.random() * len)] as DirectionType;
  return result;
};

const BlogListPage = (props: Props): JSX.Element => {
  // console.log('BlogListPage -- Props: ', props);

  const { metadata, items, sidebar } = props;
  const { blogDescription, blogTitle, permalink } = metadata;
  const { siteConfig } = useDocusaurusContext();

  // const isBlogOnlyMode = permalink === '/';
  // const title = isBlogOnlyMode ? siteConfig.title : blogTitle;

  return (
    <Layout
      // title={title}
      description={blogDescription}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogListPage}
      searchMetadatas={{ tag: 'blog_posts_list' }}
    >
      <main className='container text-center'>
        <h1 className='mt-8'>全部文章</h1>
        <div className={clsx('my-6', styles.switchBlogView)}>切换视图（TODO）</div>

        <div className='text-left'>
          {items.map(({ content: BlogPostContent }, index) => (
            <BlogPostItem
              key={BlogPostContent.metadata.permalink}
              frontMatter={BlogPostContent.frontMatter} // blog 信息
              metadata={BlogPostContent.metadata} // blog 元数据，内容
              truncated={BlogPostContent.metadata.truncated} // 是否有摘要内容
              assets={BlogPostContent.assets}
              lottieDirection={randomDirectionFun()}
            >
              <BlogPostContent />
            </BlogPostItem>
          ))}
        </div>
      </main>

      {/* 分页器 */}
      <BlogListPaginator metadata={metadata} />
    </Layout>
  );
};

export default BlogListPage;

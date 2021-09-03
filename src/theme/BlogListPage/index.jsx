/**
 * BlogListPage - 自定义 blog 列表页面
 *
 * src/theme 下定义一个和 @theme 同名的主题组件，引入 @theme 主题组件时，会优先引入本地文件 src/theme 下的主题组件，用来代替原 @theme 主题组件
 */
import React from 'react';

import Layout from '@theme/Layout';
import BlogLayout from '@theme/BlogLayout'; // blog 页面布局
import BlogSidebar from '@theme/BlogSidebar'; // blog 侧边栏组件
import BlogPostItem from '@theme/BlogPostItem'; // blog 列表页面中每一项 blog 组件
import BlogListPaginator from '@theme/BlogListPaginator'; // blog 列表分页器组件
import BlogPostPage from '@theme/BlogPostPage'; // blog 内容页面
import BlogPostPaginator from '@theme/BlogPostPaginator'; // blog 内容分页器组件

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import clsx from 'clsx';
import styles from './styles.module.scss';

// 随机 lottie 的方向
const randomDirectionFun = () => {
  const array = ['left', 'right'];
  return array[Math.floor(Math.random() * array.length)];
};

const BlogListPage = (props) => {
  // console.log('props: ', props);

  const { metadata, items, sidebar } = props;
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout pageClassName=''>
      <main className='container p-sm text-center'>
        <h1 className='m-lg'>全部文章 😑</h1>
        <div className={clsx('mb-md', styles.switchBlogView)}>切换视图（TODO）</div>

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

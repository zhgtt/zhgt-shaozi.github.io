/**
 * BlogListPage - 自定义 blog 列表页面
 *
 * src/theme 下定义一个和 @theme 同名的主题组件，引入 @theme 主题组件时，会优先引入 src/theme 下的主题组件，用来代替原 @theme 主题组件
 */
import React from 'react';

import type { Props } from '@theme/BlogListPage';

import Layout from '@theme/Layout';
import BlogLayout from '@theme/BlogLayout'; // blog 页面布局
import BlogSidebar from '@theme/BlogSidebar'; // blog 侧边栏组件
import BlogPostItem from '@theme/BlogPostItem'; // blog 列表页面中每一项 blog 组件
import BlogListPaginator from '@theme/BlogListPaginator'; // blog 列表分页器组件
import BlogPostPage from '@theme/BlogPostPage'; // blog 内容页面
import BlogPostPaginator from '@theme/BlogPostPaginator'; // blog 内容分页器组件

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import clsx from 'clsx';

import Button from '@site/src/components/Button';

import styles from './styles.module.scss';

const BlogListPage = (props: Props): JSX.Element => {
  console.log('props: ', props);

  const { metadata, items, sidebar } = props;
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout pageClassName=''>
      <main className={clsx('container padding-vert--sm', styles.blogListPage)}>
        <h1>全部文章 😑</h1>
        <div className={styles.switchBlogView}>切换视图（TODO）</div>

        <div>
          <Button>按钮</Button>
          <Button type='primary'>按钮</Button>
          <Button type='secondary'>按钮</Button>
          <Button type='success'>按钮</Button>
          <Button type='warning'>按钮</Button>
          <Button type='danger'>按钮</Button>
          <Button type='muted'>按钮</Button>
        </div>
        <br />
        <br />

        <div>
          <Button size='large' outline>
            按钮
          </Button>
          <Button size='small'>按钮</Button>
          <Button block>按钮</Button>
        </div>

        <br />
        <br />

        <Button outline>按钮</Button>
        <Button type='primary' outline>
          按钮
        </Button>
        <Button type='secondary' outline>
          按钮
        </Button>
        <Button type='success' outline>
          按钮
        </Button>
        <Button type='warning' outline>
          按钮
        </Button>
        <Button type='danger' outline>
          按钮
        </Button>
        <Button type='muted' outline>
          按钮
        </Button>

        <br />
        <br />

        <Button disabled>按钮</Button>
        <Button type='primary' disabled>
          按钮
        </Button>
        <Button type='secondary' disabled>
          按钮
        </Button>
        <Button type='success' disabled>
          按钮
        </Button>
        <Button type='warning' disabled>
          按钮
        </Button>
        <Button type='danger' disabled>
          按钮
        </Button>
        <Button type='muted' disabled>
          按钮
        </Button>

        <div className={styles.blogList}>
          {items.map(({ content: BlogPostContent }, index) => (
            <BlogPostItem
              key={BlogPostContent.metadata.permalink}
              frontMatter={BlogPostContent.frontMatter} // blog 信息
              metadata={BlogPostContent.metadata} // blog 元数据，内容
              truncated={BlogPostContent.metadata.truncated} // 是否有摘要内容
              assets={BlogPostContent.assets}
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

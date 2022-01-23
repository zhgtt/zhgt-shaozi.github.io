/**
 * @BlogPostItem - 自定义 blog 列表页面中的每一个项 blog 组件
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

import React from 'react';

import type { Props } from '@theme/BlogPostItem';
import Translate from '@docusaurus/Translate'; // 翻译组件
import Link from '@docusaurus/Link';
import MDXComponents from '@theme/MDXComponents'; // markdown 摘要内容
import { MDXProvider } from '@mdx-js/react'; // markdown 组件

import clsx from 'clsx';
import Lottie from 'react-lottie';
import { Grid, Card, Button, Divider } from '@arco-design/web-react';

import BlogTagsList from '@site/src/components/BlogTagsList';
import BlogCreationDate from '@site/src/components/BlogCreationDate';
import IconFont from '@site/src/components/IconFont';
import { randomLottieFun } from '@site/src/utils/lotties';
import styles from './styles.module.scss';

const Row = Grid.Row;
const Col = Grid.Col;

interface ExtraBlogPostItemProps {
  lottieDirection?: 'left' | 'right';
}

type BlogPostItemProps = Props & ExtraBlogPostItemProps;

const LeftLayout = { xxl: 8, xl: 7, lg: 6, md: 0, sm: 0, xs: 0 };
const RightLayout = { xxl: 16, xl: 17, lg: 18, md: 24, sm: 24, xs: 24 };

const BlogPostItem = (props: BlogPostItemProps): JSX.Element => {
  // console.log('BlogPostItem -- Props: ', props);

  const { children, metadata, truncated, lottieDirection } = props;

  const { date, permalink, tags, title } = metadata;

  return (
    <Card className={clsx('mb-16', styles.dinoCard)} bodyStyle={{ padding: '1.5rem' }} hoverable>
      <Row justify='space-between' gutter={16}>
        {/* lottie 动图 */}
        <Col {...LeftLayout} order={lottieDirection === 'left' ? 1 : 2}>
          <div>
            <Lottie
              options={{
                loop: true, // 是否循环
                autoplay: true, // 是否自动播放
                renderer: 'svg', // 渲染动画的方式
                animationData: randomLottieFun(), // 数据源
              }}
              // width={286}
              height={256}
              speed={1} // 动画播放的速度
              isPaused={false} // 是否暂停动画
              isStopped={false} //是否停止动画（动画回到起点）
            />
          </div>
        </Col>
        {/* 内容 */}
        <Col {...RightLayout} order={lottieDirection === 'left' ? 2 : 1}>
          <article
            className='flex flex-col justify-between h-full'
            itemProp='blogPost（博客内容）'
            itemScope
            itemType='http://schema.org/BlogPosting'
            style={{ minHeight: 256 }}
          >
            <main>
              <h2 itemProp='headline（大字标题）'>
                <Link to={permalink} className={clsx('color-inherit', styles.titleLink)}>
                  {title}
                </Link>
              </h2>
              <BlogTagsList tags={tags} />
              {/* markdown 摘要/部分内容 */}
              {truncated && (
                <div className='markdown mt-6' itemProp='articleBody（文章内容）'>
                  <MDXProvider components={MDXComponents}>{children}</MDXProvider>
                </div>
              )}
            </main>

            <footer className='mt-16'>
              <div className={lottieDirection === 'left' ? 'text-right' : 'text-left'}>
                <Button type='primary' aria-label={`继续阅读更多 ${title} 的内容`}>
                  <Link to={permalink} className={clsx('full', styles.btnLink)}>
                    继续阅读 <IconFont type='icon-dino-yuedu' className='ml-1' />
                  </Link>
                </Button>
              </div>
              {/* 分割线 */}
              <Divider
                className={styles.dinoDivider}
                orientation={lottieDirection}
                style={{ marginBottom: 0 }}
              >
                <BlogCreationDate date={date} className='text-base' />
              </Divider>
            </footer>
          </article>
        </Col>
      </Row>
    </Card>
  );
};

export default BlogPostItem;

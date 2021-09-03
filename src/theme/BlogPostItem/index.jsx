/**
 * BlogPostItem - 自定义 blog 列表页面中的每一个项 blog 组件
 *
 * 笔记：
 * <article> 标签：语义化标签，定义独立的文本内容，主要用于博客文章，新闻故事，帖子等，有利于 SEO
 * <strong> 标签：语义化标签，字体加粗，强调内容，比 <b> 标签更利于 SEO 检索
 *
 * BlogPostItem Props 参数：
 * @isBlogPostPage - 是否文章内容页面
 */

import React, { useContext } from 'react';

import Translate, { translate } from '@docusaurus/Translate'; // 翻译组件
// import { usePluralForm } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
// import Seo from '@theme/Seo';
// import EditThisPage from '@theme/EditThisPage';
import MDXComponents from '@theme/MDXComponents';
import ThemeContext from '@theme/ThemeContext';
import { MDXProvider } from '@mdx-js/react';

import clsx from 'clsx';
import dayjs from 'dayjs';
import Lottie from 'react-lottie'; // react 版 lottie - 加载 json 格式的动画
import { Row, Col, Divider } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

import { randomLottieFun } from '@site/src/utils/lotties';
import PaperCard from '@site/src/components/PaperCard';
import PaperButton from '@site/src/components/PaperButton';
import TagsList from '@site/src/components/TagsList';
import styles from './styles.module.scss';

// 取自 iconfont 官网的图标
const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_2788953_29qq7h55nke.js'],
});

const LeftLayout = { xxl: 8, xl: 7, lg: 6, md: 0, xs: 0 };
const RightLayout = { xxl: 16, xl: 17, lg: 18, md: 24, xs: 24 };

const BlogPostItem = (props) => {
  console.log('props: ', props);

  // 是否为 暗黑主题
  const theme = useContext(ThemeContext);
  const { isDarkTheme } = theme;

  const { children, metadata, lottieDirection } = props;
  const { date, permalink, tags, title } = metadata;

  return (
    <>
      {/* <Seo {...{ keywords, image }} /> */}

      <PaperCard className='mb-xl' bodyStyle={{ padding: '2rem' }}>
        <Row justify='space-between' gutter={16}>
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
          <Col {...RightLayout} order={lottieDirection === 'left' ? 2 : 1}>
            <article className='flex flex-col justify-between h-full'>
              <main>
                <h1>
                  <Link to={permalink} className='color-inherit hover-color-inherit'>
                    {title}
                  </Link>
                </h1>
                <TagsList tags={tags} />
                {/* markdown 内容 */}
                <div className='markdown mt-lg'>
                  <MDXProvider components={MDXComponents}>{children}</MDXProvider>
                </div>
              </main>

              <footer className='mt-xl'>
                <div className={lottieDirection === 'left' ? 'text-right' : 'text-left'}>
                  <PaperButton
                    isLink
                    to={metadata.permalink}
                    type='primary'
                    outline
                    aria-label={`继续阅读更多 ${title} 的内容`}
                  >
                    <Translate description='read more'>继续阅读</Translate>
                  </PaperButton>
                </div>
                <Divider dashed orientation={lottieDirection} style={{ marginBottom: 0 }}>
                  <time dateTime={date}>
                    {isDarkTheme ? (
                      <IconFont type='icon-dino-shijian-copy' />
                    ) : (
                      <IconFont type='icon-dino-shijian' />
                    )}
                    <span className='ml-sm'>{dayjs(date).format('YYYY·MM·DD')}</span>
                  </time>
                </Divider>
              </footer>
            </article>
          </Col>
        </Row>
      </PaperCard>
    </>
  );
};

export default BlogPostItem;

import React, { useState } from 'react';
import clsx from 'clsx'; // 合并 className 的插件
import Lottie from 'react-lottie'; // react 版 lottie - 加载 json 格式的动画
import { Button } from 'antd';

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'; // 获取 .docusaurus.config 配置上下文内容

import HomepageFeatures from '../components/HomepageFeatures';
import styles from './index.module.scss';
import dinoAnimation from '@site/static/img/Dino.lottie2.json';

const Homepage = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { siteConfig } = useDocusaurusContext();
  console.log('siteConfig: ', siteConfig);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description='描述；基于 Docusaurus 2 开发的个人博客网站.'
    >
      <header className={styles['dino-banner']}>
        <div className={styles['dino-contained-content']}>
          <div className={styles['dino-box']}>
            <Lottie
              options={{
                loop: true, // 是否循环
                autoplay: true, // 是否自动播放
                renderer: 'svg', // 渲染动画的方式
                animationData: dinoAnimation, // 数据源
              }}
              width={286}
              height={256}
              speed={1} // 动画播放的速度
              isPaused={false} // 是否暂停动画
              isStopped={false} //是否停止动画（动画回到起点）
            />
          </div>
          <h1>起个什么名ne？</h1>
          <p>就随便写写。。。🐶 至死是少年啊！反正身体这么好，今天也继续笑下去吧。。。😁</p>
        </div>
      </header>
      <main>
        <div className={styles['main-']}></div>
      </main>
    </Layout>
  );
};

export default Homepage;

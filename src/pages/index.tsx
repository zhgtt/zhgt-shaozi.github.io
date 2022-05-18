import React, { useState } from 'react';

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'; // 获取 .docusaurus.config 配置上下文内容
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx'; // 合并 className 的插件
import Lottie from 'react-lottie'; // react 版 lottie - 加载 json 格式的动画
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';
import { Button, Menu } from '@arco-design/web-react';
import axios from 'axios';

import { Lottie_Dashboard } from '@site/src/utils/lotties';
import styles from './styles.module.scss';

const Homepage = () => {
  const { siteConfig } = useDocusaurusContext();
  console.log('siteConfig: ', siteConfig);
  console.log('useColorMode: ', useColorMode);

  const handleClick = () => {
    axios.get('https://getman.cn/mock/route/to/demo').then((response) => {
      console.log(response);
    });
  };

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description='描述；基于 Docusaurus 2 开发的个人博客网站.'
    >
      <main>
        <div>
          <Lottie
            options={{
              loop: true, // 是否循环
              autoplay: true, // 是否自动播放
              renderer: 'svg', // 渲染动画的方式
              animationData: Lottie_Dashboard, // 数据源
            }}
            // width={700}
            height={365}
            speed={1} // 动画播放的速度
            isPaused={false} // 是否暂停动画
            isStopped={false} //是否停止动画（动画回到起点）
          />
        </div>

        <div className={styles.box}>
          <div className={styles.content}>安静圣诞节</div>
          <div className={styles.content}>安静圣诞节sdsds</div>
          <div className={styles.content}>安静圣诞节爱神的箭as的哈安静圣诞节爱神</div>
          <div className={styles.content}>安静圣诞节爱神的箭as的哈</div>
          <div className={styles.content}>安静圣诞节爱神的箭as的哈</div>
        </div>

        <Button onClick={handleClick}>按钮</Button>
      </main>
    </Layout>
  );
};

export default Homepage;

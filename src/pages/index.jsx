import React, { useState } from 'react';

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'; // 获取 .docusaurus.config 配置上下文内容
import clsx from 'clsx'; // 合并 className 的插件
import Lottie from 'react-lottie'; // react 版 lottie - 加载 json 格式的动画
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import { Button, Menu } from '@arco-design/web-react';

import { Lottie_Girl } from '@site/src/utils/lotties';
import styles from './index.module.scss';

const img = require('../../static/img/docusaurus.png');
const textContent = {
  codeExample: `
import React from 'react'; 
import {Header} from './Header';
  
const WelcomeScreen = () => (
    <View>
      <Header title='Welcome to React Native' />
      <Text style={heading}>Step One</Text>
      <Text>Edit App.js to change this screen and turn it into your app.</Text>
      <Text style={heading}>See Your Changes</Text>
    </View>
);
  `,
};

const Homepage = () => {
  const { siteConfig } = useDocusaurusContext();
  console.log('siteConfig: ', siteConfig);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description='描述；基于 Docusaurus 2 开发的个人博客网站.'
    >
      <main className='text-center'>
        <div>
          <Lottie
            options={{
              loop: true, // 是否循环
              autoplay: true, // 是否自动播放
              renderer: 'svg', // 渲染动画的方式
              animationData: Lottie_Girl, // 数据源
            }}
            // width={700}
            height={365}
            speed={1} // 动画播放的速度
            isPaused={false} // 是否暂停动画
            isStopped={false} //是否停止动画（动画回到起点）
          />
        </div>
        <Button type='primary'>按钮</Button>
        <Menu>
          <Menu.SubMenu key='我' title='哈哈'>
            <Menu.Item key='0_1'>都是我的</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key='你' title='呵呵'>
            <Menu.Item key='0_1'>都是我的</Menu.Item>
          </Menu.SubMenu>
        </Menu>
        <h1 className='my-3'>Dino</h1>
        <svg
          class='icon'
          viewBox='0 0 1024 1024'
          xmlns='http://www.w3.org/2000/svg'
          width='200'
          height='200'
        >
          <path
            d='M384 512l192 192 29.866667-29.866667-162.133334-162.133333 162.133334-162.133333-29.866667-29.866667L384 512z'
            fill='#f00'
          ></path>
        </svg>
        <p className='text-lg'>就随便写写。。。反正身体这么好，今天也继续笑下去吧。。。😁</p>
        <CodeBlock language='jsx' style={{ textAlign: 'left' }}>
          {textContent.codeExample}
        </CodeBlock>
      </main>
    </Layout>
  );
};

export default Homepage;

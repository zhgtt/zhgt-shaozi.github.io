import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';

import Lottie from 'react-lottie';
import { Row, Col } from 'antd';
import { random404ErrorFun } from '@site/src/utils/lotties';

function NotFound(): JSX.Element {
  return (
    <Layout
      title={translate({
        id: 'theme.NotFound.title',
        message: 'Page Not Found（找不到页面）', // 当前页面的 title
      })}
    >
      <main className='container mt-20 mb-20'>
        <Row justify='center' align='middle' gutter={22}>
          <Col lg={13} md={12} sm={20} xs={24}>
            <Lottie
              options={{ renderer: 'svg', animationData: random404ErrorFun() }}
              height={400}
            />
          </Col>
          <Col lg={11} md={12} sm={20} xs={24}>
            <p className='mt-4'>🌝 抱歉！你访问的页面可能迷路了，或者像你一样丢失了自我！</p>
            <p>
              请返回 <Link to='/'>首页</Link> 重新找找吧！
            </p>
          </Col>
        </Row>
      </main>
    </Layout>
  );
}

export default NotFound;

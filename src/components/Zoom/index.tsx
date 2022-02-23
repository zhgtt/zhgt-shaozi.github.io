/**
 * @Component 图片放大的组件
 */

import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import BasicZoom from 'react-medium-image-zoom'; // react 图片放大插件（暂未安装）
import 'react-medium-image-zoom/dist/styles.css';

const Zoom = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { isDarkTheme } = useColorMode();
  return (
    <BasicZoom
      overlayBgColorEnd={isDarkTheme ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)'}
    >
      {children}
    </BasicZoom>
  );
};

export default Zoom;

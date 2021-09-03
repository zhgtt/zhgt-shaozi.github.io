import React from 'react';
import clsx from 'clsx';

import './styles.scss';

export interface CardProps {
  title?: React.ReactNode;
  footerContent?: React.ReactNode; // 底部内容
  extra?: React.ReactNode; // 头部右上角内容
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  hoverable?: boolean; // 鼠标移过时是否可浮起
  bodyStyle?: React.CSSProperties; // card-body 样式
  bodyClassName?: string;
  headStyle?: React.CSSProperties; // card-head 样式
  // bordered?: boolean // 是否显示边框
  // cover?: React.ReactNode // 封面
}

const PaperCard: React.FC<CardProps> = (props) => {
  const {
    children,
    title,
    footerContent,
    extra,
    className,
    hoverable = true,
    headStyle,
    bodyStyle,
    bodyClassName,
    ...restProps
  } = props;

  const classes = clsx('paper-card', { 'paper-card-hover': hoverable }, className);

  return (
    <div className={classes} {...restProps}>
      {title && (
        <div className='paper-card-head' style={headStyle}>
          <div className='paper-card-head-title'>{title}</div>
          {extra && <div className='paper-card-head-extra'>{extra}</div>}
        </div>
      )}
      <div className={clsx('paper-card-body', bodyClassName)} style={bodyStyle}>
        {children}
      </div>
      {footerContent && <div className='paper-card-footer'>{footerContent}</div>}
    </div>
  );
};

export default PaperCard;

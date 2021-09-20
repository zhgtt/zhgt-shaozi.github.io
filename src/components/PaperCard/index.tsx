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
  bordered?: boolean; // 是否显示边框
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
    bordered = false,
    ...restProps
  } = props;

  const classes = clsx(
    'paper-card w-full transition-all rounded-base',
    { 'border-2 border-solid': bordered },
    { 'paper-card-hover': hoverable },
    className
  );

  const commonClasses = 'px-6 py-4 bg-opacity-5';

  return (
    <div className={classes} {...restProps}>
      {title && (
        <div
          className={clsx(
            commonClasses,
            'flex justify-between items-center border-b-2 border-b-solid'
          )}
          style={headStyle}
        >
          <div className='text-bold text-xl'>{title}</div>
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div className={clsx('p-6', bodyClassName)} style={bodyStyle}>
        {children}
      </div>
      {footerContent && (
        <div className={clsx(commonClasses, 'border-t-2 border-t-solid')}>{footerContent}</div>
      )}
    </div>
  );
};

export default PaperCard;

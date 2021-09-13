/**
 * button 组件 - 部分代码取自 antd 源码
 */
import React from 'react';
import clsx from 'clsx';

import type { LinkProps } from '@docusaurus/Link';
import Link from '@docusaurus/Link';

import { tuple } from '@site/src/utils/type';

const ButtonTypes = tuple('primary', 'secondary', 'success', 'warning', 'danger', 'muted');
type ButtonType = typeof ButtonTypes[number];
const ButtonSizeTypes = tuple('small', 'large');
type ButtonSizeType = typeof ButtonSizeTypes[number];
// const ButtonShapes = tuple('circle', 'round');
// type ButtonShape = typeof ButtonShapes[number];
// 约定 button 的 form 类型
// const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
// type ButtonHTMLType = typeof ButtonHTMLTypes[number];

interface BaseButtonProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  type?: ButtonType; // button type
  size?: ButtonSizeType; // button size
  // shape?: ButtonShape; // button 形状
  // loading?: boolean; // 是否为加载按钮
  block?: boolean; // 是否为块状元素
  outline?: boolean; // 是否背景为白色样式
  isLink?: boolean; // 是否为 Link 标签
}

// 合并 button 标签原生属性
type NativeButtonProps = {
  // htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type' | 'onClick'>;

// 合并 a 标签原生属性
// type AnchorButtonProps = {
//   href: string;
//   target?: string;
//   onClick?: React.MouseEventHandler<HTMLElement>;
// } & BaseButtonProps &
//   Omit<React.AnchorHTMLAttributes<HTMLElement>, 'type' | 'onClick'>;

// 将所有类型下的属性转换为 可选 属性
type ButtonProps = Partial<NativeButtonProps & LinkProps>;

const PaperButton: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    type,
    size,
    block = false,
    outline = false,
    isLink = false,
    to,
    href,
    ...restProps
  } = props;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick, disabled } = props;
    if (disabled) {
      e.preventDefault(); // 禁止默认行为
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  const classes = clsx(
    'border-2 border-solid paper-btn cursor-pointer text-center inline-block transition-all',
    'paper-border',
    {
      [`paper-btn-${size}`]: size,
      [`paper-btn-${type}`]: type,
      'paper-btn-block': block,
      [`paper-btn-${type}-outline`]: outline && type,
    },
    className
  );

  if (isLink && (to || href)) {
    return (
      <Link {...restProps} to={to} href={href} className={classes} onClick={handleClick}>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button {...restProps} className={classes} onClick={handleClick}>
      <span>{children}</span>
    </button>
  );
};

export default PaperButton;

/**
 * button 组件 - 部分代码取自 antd 源码
 *
 * @Typescript 笔记：
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
 * keyof T - 类似于 Objcet.keys，使用 keyof 遍历一个类型 T，获取 T 上所有的 public（公共）属性，并组成 联合类型
 * P in Keys - 使用 in 遍历联合类型 keys，将值赋给 P
 */
import React from 'react';
import clsx from 'clsx';

import type { LinkProps } from '@docusaurus/Link';
import Link from '@docusaurus/Link';

import { tuple } from '@site/src/utils/type';
import './styles.scss';

const ButtonTypes = tuple(
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'muted'
);
type ButtonType = typeof ButtonTypes[number];
const ButtonSizeTypes = tuple('default', 'small', 'large');
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
    className,
    'border-2 border-solid paper-border paper-btn',
    {
      [`paper-btn-${size}`]: size && size !== 'default',
      [`paper-btn-${type}`]: type && type !== 'default',
      'paper-btn-block': block,
      [`paper-btn-${type}-outline`]: outline && type && type !== 'default',
    }
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

import React, { ReactNode } from 'react';
import clsx from 'clsx';

import './styles.scss';

interface CardProps {
  title?: string | ReactNode;
  footerContent?: string | ReactNode;
  extra?: string | ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, footerContent, extra, className }) => {
  return (
    <div className={clsx('paper-card', className)}>
      {title && (
        <div className='paper-card-head'>
          <div className='paper-card-head-title'>{title}</div>
          {extra && <div className='paper-card-head-extra'>{extra}</div>}
        </div>
      )}
      <div className='paper-card-body'>{children}</div>
      {footerContent && <div className='paper-card-footer'>{footerContent}</div>}
    </div>
  );
};

export default Card;

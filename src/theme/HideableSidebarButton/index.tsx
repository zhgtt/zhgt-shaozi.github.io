import React from 'react';
import clsx from 'clsx';
// import IconArrow from '@theme/IconArrow';
// import { translate } from '@docusaurus/Translate';
import { IconRight, IconLeft } from '@arco-design/web-react/icon';

import './styles.scss';

interface IProps {
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  title?: string;
  direction?: 'left' | 'right';
}

const HideableSidebarButton: React.FC<IProps> = (props) => {
  const { onClick, onKeyDown, title = 'Collapse sidebar', direction = 'left' } = props;

  return (
    <div
      title={title}
      aria-label={title}
      className='collapseSidebarButton'
      onClick={onClick}
      onKeyDown={onKeyDown}
      role='button'
      tabIndex={0}
    >
      {direction === 'left' && <IconLeft className='collapseSidebarButtonIcon' />}
      {direction === 'right' && <IconRight className='collapseSidebarButtonIcon' />}
    </div>
  );
};

export default HideableSidebarButton;

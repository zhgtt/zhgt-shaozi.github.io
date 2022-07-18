/**
 * @description 平滑滚动到顶部
 */

import React from 'react';
import { translate } from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useBackToTopButton } from '@docusaurus/theme-common/internal';
import clsx from 'clsx';
import styles from './styles.module.scss';

const BackToTopButton = (): JSX.Element => {
  const { shown, scrollToTop } = useBackToTopButton({ threshold: 300 });

  return (
    <button
      aria-label={translate({
        id: 'theme.BackToTopButton.buttonAriaLabel',
        message: 'Scroll back to top(滚动回到顶部)',
        description: 'The ARIA label for the back to top button',
      })}
      // className={clsx(
      //   'clean-btn',
      //   ThemeClassNames.common.backToTopButton,
      //   styles.backToTopButton,
      //   shown && styles.backToTopButtonShow,
      // )}
      className={clsx(
        'fixed z-200 opacity-0 paper-border-circle transition-all cursor-pointer',
        styles.backToTopButton,
        shown && styles.backToTopButtonShow
      )}
      type='button'
      onClick={scrollToTop}
    >
      <span className='text-xl text-bold' style={{ lineHeight: 1 }}>
        ^
      </span>
    </button>
  );
};

export default BackToTopButton;

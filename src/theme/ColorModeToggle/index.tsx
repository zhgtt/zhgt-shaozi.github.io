/**
 * @description 日间 / 暗黑 主题模式切换 按钮
 *
 * @代码修改内容 ✅ 新增 useEffect，监听 value 主题值的变化，来适配 arco-design 的夜间主题
 */

import React, { useEffect } from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { translate } from '@docusaurus/Translate';
import IconLightMode from '@theme/IconLightMode';
import IconDarkMode from '@theme/IconDarkMode';
import type { Props } from '@theme/ColorModeToggle';

import styles from './styles.module.scss';

function ColorModeToggle({ className, value, onChange }: Props): JSX.Element {
  const isBrowser = useIsBrowser();

  const title = translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the navbar color mode toggle',
    },
    {
      mode:
        value === 'dark'
          ? translate({
              message: 'dark mode',
              id: 'theme.colorToggle.ariaLabel.mode.dark',
              description: 'The name for the dark color mode',
            })
          : translate({
              message: 'light mode',
              id: 'theme.colorToggle.ariaLabel.mode.light',
              description: 'The name for the light color mode',
            }),
    }
  );

  useEffect(() => {
    if (value === 'dark') {
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      document.body.removeAttribute('arco-theme');
    }
  }, [value]);

  return (
    <div className={clsx(styles.toggle, className)}>
      <button
        className={clsx(
          'clean-btn',
          styles.toggleButton,
          !isBrowser && styles.toggleButtonDisabled
        )}
        type='button'
        onClick={() => onChange(value === 'dark' ? 'light' : 'dark')}
        disabled={!isBrowser}
        title={title}
        aria-label={title}
      >
        <IconLightMode className={clsx(styles.toggleIcon, styles.lightToggleIcon)} />
        <IconDarkMode className={clsx(styles.toggleIcon, styles.darkToggleIcon)} />
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);

import React, { useRef, useState } from 'react';
import { translate } from '@docusaurus/Translate';
import { ThemeClassNames, useScrollPosition, useLocationChange } from '@docusaurus/theme-common';
import clsx from 'clsx';
import styles from './styles.module.scss';

const threshold = 300;

const SupportsNativeSmoothScrolling = false;
// const SupportsNativeSmoothScrolling = ExecutionEnvironment.canUseDOM && 'scrollBehavior' in document.documentElement.style;

type CancelScrollTop = () => void;

function smoothScrollTopNative(): CancelScrollTop {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return () => {};
}

function smoothScrollTopPolyfill(): CancelScrollTop {
  let raf: number | null = null;
  function rafRecursion() {
    const currentScroll = document.documentElement.scrollTop;
    if (currentScroll > 0) {
      raf = requestAnimationFrame(rafRecursion);
      window.scrollTo(0, Math.floor(currentScroll * 0.85));
    }
  }
  rafRecursion();

  return () => raf && cancelAnimationFrame(raf);
}

type UseSmoothScrollTopReturn = {
  smoothScrollTop: () => void;
  cancelScrollToTop: CancelScrollTop;
};

function useSmoothScrollToTop(): UseSmoothScrollTopReturn {
  const lastCancelRef = useRef<CancelScrollTop | null>(null);

  function smoothScrollTop(): void {
    lastCancelRef.current = SupportsNativeSmoothScrolling
      ? smoothScrollTopNative()
      : smoothScrollTopPolyfill();
  }

  return {
    smoothScrollTop,
    cancelScrollToTop: () => lastCancelRef.current?.(),
  };
}

const BackToTopButton = (): JSX.Element => {
  const [show, setShow] = useState(false);
  const isFocusedAnchor = useRef(false);
  const { smoothScrollTop, cancelScrollToTop } = useSmoothScrollToTop();

  useScrollPosition(({ scrollY: scrollTop }, lastPosition) => {
    const lastScrollTop = lastPosition?.scrollY;

    if (!lastScrollTop) {
      return;
    }

    if (isFocusedAnchor.current) {
      isFocusedAnchor.current = false;
      return;
    }

    const isScrollingUp = scrollTop < lastScrollTop;

    if (!isScrollingUp) {
      cancelScrollToTop();
    }

    if (scrollTop < threshold) {
      setShow(false);
      return;
    }

    if (isScrollingUp) {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      if (scrollTop + windowHeight < documentHeight) {
        setShow(true);
      }
    } else {
      setShow(false);
    }
  });

  useLocationChange((locationChangeEvent) => {
    if (locationChangeEvent.location.hash) {
      isFocusedAnchor.current = true;
      setShow(false);
    }
  });

  return (
    <button
      aria-label={translate({
        id: 'theme.BackToTopButton.buttonAriaLabel',
        message: 'Scroll back to top(滚动回到顶部)',
        description: 'The ARIA label for the back to top button',
      })}
      className={clsx(
        'fixed z-200 opacity-0 paper-border-circle transition-all cursor-pointer',
        styles.backToTopButton,
        {
          [styles.backToTopButtonShow]: show,
        }
      )}
      type='button'
      onClick={() => smoothScrollTop()}
    >
      <span className='text-xl text-bold' style={{ lineHeight: 1 }}>
        ^
      </span>
      {/* <svg viewBox='0 0 24 24' width='20'>
          <path d='M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z' fill='currentColor' />
        </svg> */}
    </button>
  );
};

export default BackToTopButton;

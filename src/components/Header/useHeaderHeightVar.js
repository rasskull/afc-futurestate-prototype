import { useEffect, useRef } from 'react';

// Measures the header wrapper's real rendered height (which changes across
// breakpoints and the is-scrolled shrink transition) and mirrors it onto
// :root as --site-header-height, so other pages can size scroll offsets
// against the header without guessing a fixed pixel value. Same pattern as
// DonationSummaryPanel's --donation-panel-peek.
export function useHeaderHeightVar() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver((entries) => {
      const height = entries[0].borderBoxSize?.[0]?.blockSize ?? entries[0].contentRect.height;
      document.documentElement.style.setProperty('--site-header-height', `${height}px`);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--site-header-height');
    };
  }, []);

  return wrapperRef;
}

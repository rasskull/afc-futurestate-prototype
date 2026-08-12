import { useEffect, useState } from 'react';

const SHRINK_ON = 12;
const SHRINK_OFF = 4;

export function useHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 980px)');
    let scrolled = false;
    let ticking = false;

    function update() {
      ticking = false;
      if (!desktopQuery.matches) {
        if (scrolled) {
          scrolled = false;
          setIsScrolled(false);
        }
        return;
      }
      const y = window.scrollY;
      if (!scrolled && y > SHRINK_ON) {
        scrolled = true;
        setIsScrolled(true);
      } else if (scrolled && y < SHRINK_OFF) {
        scrolled = false;
        setIsScrolled(false);
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    desktopQuery.addEventListener('change', update);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      desktopQuery.removeEventListener('change', update);
    };
  }, []);

  return isScrolled;
}

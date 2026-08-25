import { useEffect } from 'react';

/**
 * Hook that enables smooth anchor scrolling for all internal links.
 *
 * Intercepts clicks on anchors with hash hrefs and scrolls to the
 * target element smoothly. Falls back to native behavior if the
 * target is missing.
 */
function useSmoothScroll(): void {
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent): void => {
      const target = event.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#')) {
        return;
      }

      const destination = document.querySelector(href);
      if (!destination) {
        return;
      }

      event.preventDefault();

      const nav = document.querySelector('.hero__nav');
      const navHeight = nav ? nav.getBoundingClientRect().height : 0;
      const offset = Math.max(navHeight + 16, 72);
      const top =
        destination.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    };

    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);
}

export default useSmoothScroll;

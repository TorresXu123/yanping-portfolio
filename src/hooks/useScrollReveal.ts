import { useEffect, useRef } from 'react';

/**
 * Hook that reveals an element with a fade-in-up animation when it
 * enters the viewport.
 *
 * Uses IntersectionObserver for performance and respects reduced motion
 * preferences by leaving the element visible when motion is disabled.
 *
 * @returns A ref to attach to the target element.
 */
function useScrollReveal<T extends HTMLElement>(): React.RefObject<T> {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      element.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return elementRef;
}

export default useScrollReveal;

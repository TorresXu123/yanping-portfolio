import { useEffect, useState } from 'react';

/**
 * Hook that tracks which section is currently at the viewport center.
 *
 * Uses a passive scroll listener and picks the last section whose top edge is
 * at or above the viewport center. This avoids the edge cases of
 * IntersectionObserver root margins around full-height sections and gives a
 * stable "home" highlight when the page is at the top.
 *
 * @param sectionIds Ordered list of section IDs to track.
 * @returns The ID of the section currently considered active.
 */
function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    if (sectionIds.length === 0) {
      return undefined;
    }

    const updateActive = () => {
      const scrollY = window.scrollY;
      const firstId = sectionIds[0];
      const firstElement = firstId ? document.getElementById(firstId) : null;
      const topThreshold = firstElement ? firstElement.offsetHeight / 3 : 0;

      // When the page is near the top, always highlight the first section
      // so the "home" nav item stays active on initial load and when scrolled
      // back to the top.
      if (scrollY <= topThreshold) {
        setActiveSection(firstId ?? '');
        return;
      }

      const center = scrollY + window.innerHeight / 2;
      let current = firstId;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= center) {
          current = id;
        }
      }

      setActiveSection(current ?? '');
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [sectionIds]);

  return activeSection;
}

export default useActiveSection;

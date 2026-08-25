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
      const center = window.scrollY + window.innerHeight / 2;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= center) {
          current = id;
        }
      }

      setActiveSection(current);
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

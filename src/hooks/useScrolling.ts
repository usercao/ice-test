import { RefObject, useEffect, useState } from 'react';

const useScrolling = (ref: RefObject<HTMLElement>): boolean => {
  const [scrolling, setScrolling] = useState<boolean>(false);

  useEffect(() => {
    const { current } = ref;
    if (current) {
      let scrollingTimeout: number;

      const handleScrollEnd = () => {
        setScrolling(false);
      };

      const handleScroll = () => {
        setScrolling(true);
        clearTimeout(scrollingTimeout);
        scrollingTimeout = window.setTimeout(() => handleScrollEnd(), 150);
      };

      current?.addEventListener('scroll', handleScroll, false);
      return () => {
        current?.removeEventListener('scroll', handleScroll, false);
      };
    }
    return () => {};
  }, [ref]);

  return scrolling;
};

export default useScrolling;

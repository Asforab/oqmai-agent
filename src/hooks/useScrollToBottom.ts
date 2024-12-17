import { useRef, useCallback } from 'react';

export function useScrollToBottom() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      containerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  return { containerRef, scrollToBottom };
}
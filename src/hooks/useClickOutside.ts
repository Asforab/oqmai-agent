import { RefObject, useEffect } from 'react';

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: () => void,
  excludeRefs: RefObject<HTMLElement>[] = []
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      
      if (!ref.current?.contains(target) && 
          !excludeRefs.some(excludeRef => excludeRef.current?.contains(target))) {
        handler();
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, excludeRefs]);
}
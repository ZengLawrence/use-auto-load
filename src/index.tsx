import { useState, useEffect, useRef } from 'react';

const useLoadingState = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const endLoading = () => {
    setIsLoaded(true);
    setIsLoading(false);
  }

  return { isLoading, shouldLoad: !isLoaded && !isLoading, startLoading, endLoading }
}

export const useAutoLoad = (load: () => Promise<void>) => {
  const { isLoading, shouldLoad, startLoading, endLoading } = useLoadingState();
  const timeoutRef = useRef<any>();

  useEffect(() => {
    if (shouldLoad && !isLoading) {
      startLoading();

      timeoutRef.current = setTimeout(() => {
        load().then(() => {
          endLoading();
        });
      });
    }

  }, [isLoading, shouldLoad]);

  // just for clear timeout when unmounted
  useEffect(() => {
    return function cleanUp() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [])

  return { isLoading };
};
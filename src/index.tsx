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
  const timeoutHandler = useRef<any>();

  useEffect(() => {
    if (shouldLoad && !isLoading) {
      startLoading();

      timeoutHandler.current = setTimeout(() => {
        load().then(() => {
          endLoading();
        });
      });
    }

  }, [isLoading, shouldLoad]);

  // just for clear timeout when unmounted
  useEffect(() => {
    return function cleanUp() {
      if (timeoutHandler.current) {
        clearTimeout(timeoutHandler.current);
        timeoutHandler.current = null;
      }
    }
  }, [])

  return { isLoading };
};
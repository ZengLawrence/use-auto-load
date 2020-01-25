import { useState, useEffect } from "react";

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
  const [timeoutHandler, setTimeoutHandler] = useState<any>(null);

  useEffect(() => {
    if (shouldLoad && !isLoading) {
      startLoading();

      const localTimeout = setTimeout(() => {
        load().then(() => {
          endLoading();
        });
      });
      setTimeoutHandler(localTimeout);
    }

    return function cleanUp() {
      if (timeoutHandler) {
        clearTimeout(timeoutHandler);
      }
    }

  }, [isLoading, shouldLoad]);

  return { isLoading };
};
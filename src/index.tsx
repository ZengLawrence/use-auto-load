import { useState, useEffect } from "react";

export const useAutoLoad = (load: () => Promise<void>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeoutHandler, setTimeoutHandler] = useState<any>(null);

  const startLoading = () => setIsLoading(true);
  const endLoading = () => {
    setIsLoaded(true);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!isLoaded && !isLoading) {
      if (!isLoading) {
        startLoading();

        const localTimeout = setTimeout(() => {
          load().then(() => {
            endLoading();
          });
        });
        setTimeoutHandler(localTimeout);
      }
    }

    return function cleanUp() {
      if (timeoutHandler) {
        clearTimeout(timeoutHandler);
      }
    }

  }, [isLoading, isLoaded]);

  return { isLoading };
};
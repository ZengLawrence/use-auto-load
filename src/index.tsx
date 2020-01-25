import { useState, useEffect } from "react";

export const useAutoLoad = (load: () => Promise<void>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeoutHandler, setTimeoutHandler] = useState<any>(null);

  useEffect(() => {
    console.log(`isLoaded: ${isLoaded}, isLoading: ${isLoading}`);
    if (!isLoaded && !isLoading) {
      if (!isLoading) {
        setIsLoading(true);

        const localTimeout = setTimeout(() => {
          load().then(() => {
            setIsLoaded(true);
            setIsLoading(false);
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
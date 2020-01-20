
export const useAutoLoad = (load: <T>() => Promise<T>) => {
  const isLoading = false;

  load();
  return { isLoading };
};
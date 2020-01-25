import { useAutoLoad } from '.'
import { renderHook } from '@testing-library/react-hooks';

describe('test useAutoLoad', () => {
  it('isLoading is initialized to true, after load() function is called, should return false for isLoading', async () => {
    const mockLoadFn = jest.fn();
    mockLoadFn.mockReturnValue(Promise.resolve());

    const { result, wait } = renderHook(() => useAutoLoad(mockLoadFn));
    {
      const { isLoading } = result.current;
      expect(isLoading).toBeTruthy();
    }

    await wait(() => {
      const { isLoading } = result.current;
      return isLoading === false;
    }, {timeout: 500});
    {
      const { isLoading } = result.current;
      expect(isLoading).toBeFalsy();
      expect(mockLoadFn).toBeCalledTimes(1);
    }
  })

})

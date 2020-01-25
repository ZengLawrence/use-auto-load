import { useAutoLoad } from '.'
import { renderHook } from '@testing-library/react-hooks';

describe('test useAutoLoad', () => {
  it('isLoading is initialized to true, after load() function is called, should return false for isLoading', async () => {
    const mockLoadFn = jest.fn();
    mockLoadFn.mockReturnValue(Promise.resolve());

    const { result, waitForNextUpdate } = renderHook(() => useAutoLoad(mockLoadFn));
    {
      const { isLoading } = result.current;
      expect(isLoading).toBeTruthy();
    }

    await waitForNextUpdate();
    {
      const { isLoading } = result.current;
      expect(isLoading).toBeFalsy();
      expect(mockLoadFn).toBeCalledTimes(1);
    }
  })

})

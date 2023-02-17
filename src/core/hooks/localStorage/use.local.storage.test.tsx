import { renderHook } from '@testing-library/react';
import { useLocalStorage } from './use.local.storage';
const localStorageMock = (function () {
    const store: { [key: string]: string } = {};

    return {
        getItem(key: string) {
            return store[key];
        },

        setItem(key: string, value: string) {
            store[key] = value;
        },
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe(`Given useLocalStorage (custom hook)
            render with a virtual component`, () => {
    const { result } = renderHook(() => useLocalStorage());
    describe(`When the api is working`, () => {
        const mockId = '1';
        const mockJson = { data: 'json data' };

        test('Then clicking the btn should call', () => {
            result.current.setItem(mockId, JSON.stringify(mockJson));

            expect(localStorage.getItem(mockId)).toEqual(
                JSON.stringify(mockJson)
            );
        });
    });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useUser } from '../../hooks/user/use.user';
import { mockDefaultExercises } from '../../mocks/default.exercises.mock';
import { mockRoutinesNotEditing } from '../../mocks/routines.mock';
import { createPreloadedState, createStoreMock } from '../../mocks/store.mock';
import { mockEmptyUser, mockUser, userMock } from '../../mocks/user.mock';
import { Firebase } from './firebase';

jest.mock('../../hooks/user/use.user');
const mockHandleLogin = jest.fn();
const mockHandleLogout = jest.fn();
const mockHandleRegister = jest.fn();

describe('App', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when there isnt any user logged in', () => {
        const mockPreloadStateEmptyUser = createPreloadedState(
            mockEmptyUser,
            mockRoutinesNotEditing,
            mockDefaultExercises
        );

        const mockStoreEmptyUser = createStoreMock(mockPreloadStateEmptyUser);

        test('display login button', () => {
            (useUser as jest.Mock).mockReturnValue({
                userState: {
                    user: null,
                },
                handleLogin: mockHandleLogin,
                handleLogout: mockHandleLogout,
                handleRegister: mockHandleRegister,
            });

            render(
                <Provider store={mockStoreEmptyUser}>
                    <Firebase />
                </Provider>,
                { wrapper: MemoryRouter }
            );

            const loginButton = screen.queryByRole('button');
            expect(loginButton).toBeInTheDocument();
            fireEvent.click(loginButton);
            expect(mockHandleLogin).toBeCalled();
        });
    });
    describe('when there is user logged in', () => {
        test('display login button', () => {
            const mockPreloadState = createPreloadedState(
                mockUser,
                mockRoutinesNotEditing,
                mockDefaultExercises
            );
            const mockStore = createStoreMock(mockPreloadState);

            (useUser as jest.Mock).mockReturnValue({
                userState: {
                    user: userMock,
                },
                handleLogin: mockHandleLogin,
                handleLogout: mockHandleLogout,
                handleRegister: mockHandleRegister,
            });

            render(
                <Provider store={mockStore}>
                    <Firebase />
                </Provider>,
                { wrapper: MemoryRouter }
            );

            const logoutButton = screen.queryByRole('button');
            expect(logoutButton).toBeInTheDocument();
            fireEvent.click(logoutButton);
            expect(mockHandleLogout).toBeCalled();
        });
    });
});

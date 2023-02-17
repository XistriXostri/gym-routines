import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useRoutines } from '../../hooks/routines/use.routines';
import { useUser } from '../../hooks/user/use.user';
import { mockDefaultExercises } from '../../mocks/default.exercises.mock';
import {
    mockRoutinesEditing,
    mockRoutinesNotEditing,
} from '../../mocks/routines.mock';
import { createPreloadedState, createStoreMock } from '../../mocks/store.mock';
import { mockHandleEditMode } from '../../mocks/use.routines.mock';
import { mockEmptyUser, mockUser, userMock } from '../../mocks/user.mock';
import { Header } from './header';

jest.mock('../../hooks/user/use.user');
jest.mock('../../hooks/routines/use.routines');

describe('Header', () => {
    describe('when there isnt any user logged in', () => {
        const mockPreloadStateEmptyUser = createPreloadedState(
            mockEmptyUser,
            mockRoutinesNotEditing,
            mockDefaultExercises
        );

        const mockStoreEmptyUser = createStoreMock(mockPreloadStateEmptyUser);

        test('does not display back button', () => {
            (useUser as jest.Mock).mockReturnValue({
                userState: {
                    user: null,
                },
            });

            (useRoutines as jest.Mock).mockReturnValue({
                routinesState: mockRoutinesEditing,
                handleEditMode: mockHandleEditMode,
            });

            render(
                <Provider store={mockStoreEmptyUser}>
                    <Header />
                </Provider>,
                { wrapper: MemoryRouter }
            );
            const backButtonElement = screen.queryByRole('link');
            expect(backButtonElement).toBeNull();
        });
    });
    describe('when press back button', () => {
        const mockPreloadState = createPreloadedState(
            mockUser,
            mockRoutinesNotEditing,
            mockDefaultExercises
        );
        const mockStore = createStoreMock(mockPreloadState);

        test('and edit mode is off', () => {
            (useUser as jest.Mock).mockReturnValue({
                userState: {
                    user: userMock,
                },
            });

            (useRoutines as jest.Mock).mockReturnValue({
                routinesState: mockRoutinesNotEditing,
                handleEditMode: mockHandleEditMode,
            });

            render(
                <Provider store={mockStore}>
                    <Header />
                </Provider>,
                { wrapper: MemoryRouter }
            );

            const backButtonElement = screen.getByRole('link');
            expect(backButtonElement).toBeInTheDocument();
            fireEvent.click(backButtonElement);
            expect(mockHandleEditMode).toHaveBeenCalledTimes(0);
        });
    });

    describe('when the user press back button', () => {
        const mockPreloadState = createPreloadedState(
            mockUser,
            mockRoutinesEditing,
            mockDefaultExercises
        );
        const mockStore = createStoreMock(mockPreloadState);

        test('and edit mode is on', () => {
            (useUser as jest.Mock).mockReturnValue({
                userState: {
                    user: userMock,
                },
            });

            (useRoutines as jest.Mock).mockReturnValue({
                routinesState: mockRoutinesEditing,
                handleEditMode: mockHandleEditMode,
            });

            render(
                <Provider store={mockStore}>
                    <Header />
                </Provider>,
                { wrapper: MemoryRouter }
            );

            const backButtonElement = screen.getByRole('link');
            expect(backButtonElement).toBeInTheDocument();
            fireEvent.click(backButtonElement);
            expect(mockHandleEditMode).toHaveBeenCalled();
        });
    });
});

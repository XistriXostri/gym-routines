import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useRoutines } from '../../hooks/routines/use.routines';
import { useUser } from '../../hooks/user/use.user';
import { mockDefaultExercises } from '../../mocks/default.exercises.mock';
import { mockRoutinesNotEditing } from '../../mocks/routines.mock';
import { createPreloadedState, createStoreMock } from '../../mocks/store.mock';
import {
    mockHandleAddRoutine,
    mockHandleEditMode,
} from '../../mocks/use.routines.mock';
import { mockEmptyUser, mockUser, userMock } from '../../mocks/user.mock';
import HomePage from './home.page';

jest.mock('../../hooks/user/use.user');
jest.mock('../../hooks/routines/use.routines');

describe('HomePage', () => {
    describe('when there isnt any user logged in', () => {
        const mockPreloadStateEmptyUser = createPreloadedState(
            mockEmptyUser,
            mockRoutinesNotEditing,
            mockDefaultExercises
        );

        const mockStoreEmptyUser = createStoreMock(mockPreloadStateEmptyUser);

        test('it renders', () => {
            (useUser as jest.Mock).mockReturnValue({
                userState: {
                    user: null,
                },
            });

            (useRoutines as jest.Mock).mockReturnValue({
                routinesState: mockRoutinesNotEditing,
                handleEditMode: mockHandleEditMode,
                handleAddRoutine: mockHandleAddRoutine,
            });

            render(
                <Provider store={mockStoreEmptyUser}>
                    <HomePage />
                </Provider>,
                { wrapper: MemoryRouter }
            );
            const text = screen.getByText(/Crea/i);
            expect(text).toBeInTheDocument();
        });
    });
    describe('when the user is logged it', () => {
        const mockPreloadState = createPreloadedState(
            mockUser,
            mockRoutinesNotEditing,
            mockDefaultExercises
        );
        const mockStore = createStoreMock(mockPreloadState);

        test('it renders', () => {
            (useUser as jest.Mock).mockReturnValue({
                userState: {
                    user: userMock,
                },
            });

            (useRoutines as jest.Mock).mockReturnValue({
                routinesState: mockRoutinesNotEditing,
                handleEditMode: mockHandleEditMode,
                handleAddRoutine: mockHandleAddRoutine,
            });

            render(
                <Provider store={mockStore}>
                    <HomePage />
                </Provider>,
                { wrapper: MemoryRouter }
            );

            const routineName = screen.getByText('mockRoutinename');
            expect(routineName).toBeInTheDocument();
            const buttons = screen.getAllByRole('button');
            const editButton = buttons[1];
            expect(editButton).toBeInTheDocument();
            fireEvent.click(editButton);
            expect(mockHandleEditMode).toHaveBeenCalled();
            const addRoutineButton = buttons[2];
            expect(addRoutineButton).toBeInTheDocument();
            fireEvent.click(addRoutineButton);
            expect(mockHandleAddRoutine).toHaveBeenCalled();
        });
    });
});

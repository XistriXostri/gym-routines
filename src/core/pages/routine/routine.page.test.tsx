import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useRoutines } from '../../hooks/use.routines';
import { useUser } from '../../hooks/use.user';
import { mockDefaultExercises } from '../../mocks/default.exercises.mock';
import {
    mockRoutinesEditing,
    mockRoutinesNotEditing,
} from '../../mocks/routines.mock';
import { createPreloadedState, createStoreMock } from '../../mocks/store.mock';
import {
    mockHandleAddRoutine,
    mockHandleAddSesion,
    mockHandleEditMode,
} from '../../mocks/use.routines.mock';
import { mockEmptyUser, mockUser, userMock } from '../../mocks/user.mock';
import HomePage from '../home/home.page';
import RoutinePage from './routine.page';

jest.mock('../../hooks/use.routines');

describe('RoutinePage', () => {
    describe('when is not editing', () => {
        const mockPreloadState = createPreloadedState(
            mockUser,
            mockRoutinesNotEditing,
            mockDefaultExercises
        );
        const mockStore = createStoreMock(mockPreloadState);

        test('it renders', () => {
            (useRoutines as jest.Mock).mockReturnValue({
                routinesState: mockRoutinesNotEditing,
                handleEditMode: mockHandleEditMode,
                handleAddSesion: mockHandleAddSesion,
            });

            render(
                <Provider store={mockStore}>
                    <RoutinePage />
                </Provider>,
                { wrapper: MemoryRouter }
            );

            const buttons = screen.getAllByRole('button');
            const editButton = buttons[1];
            expect(editButton).toBeInTheDocument();
            fireEvent.click(editButton);
            expect(mockHandleEditMode).toHaveBeenCalled();
        });
    });

    describe('when it is editing', () => {
        const mockPreloadState = createPreloadedState(
            mockUser,
            mockRoutinesEditing,
            mockDefaultExercises
        );
        const mockStore = createStoreMock(mockPreloadState);

        test('it renders', () => {
            (useRoutines as jest.Mock).mockReturnValue({
                routinesState: mockRoutinesEditing,
                handleEditMode: mockHandleEditMode,
                handleAddSesion: mockHandleAddSesion,
            });

            render(
                <Provider store={mockStore}>
                    <RoutinePage />
                </Provider>,
                { wrapper: MemoryRouter }
            );

            const buttons = screen.getAllByRole('button');
            const addSesionButton = buttons[5];
            expect(addSesionButton).toBeInTheDocument();
            fireEvent.click(addSesionButton);
            expect(mockHandleAddSesion).toHaveBeenCalled();
        });
    });
});

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useRoutines } from '../../hooks/routines/use.routines';
import { mockDefaultExercises } from '../../mocks/default.exercises.mock';
import {
    mockRoutinesEditing,
    mockRoutinesNotEditing,
    mockRoutinesNotEditingWithoutExercises,
} from '../../mocks/routines.mock';
import {
    sesionMock,
    sesionWithoutExercisesMock,
} from '../../mocks/sesion.mock';
import { createPreloadedState, createStoreMock } from '../../mocks/store.mock';
import {
    mockHandleDeleteSesion,
    mockHandleSetCurrentSesion,
    mockHandleUpdateSesion,
} from '../../mocks/use.routines.mock';
import { mockUser } from '../../mocks/user.mock';
import { Sesion } from './sesion';

jest.mock('../../hooks/routines/use.routines');

describe('Sesion', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when is not in edit mode', () => {
        const mockPreloadState = createPreloadedState(
            mockUser,
            mockRoutinesNotEditing,
            mockDefaultExercises
        );
        const mockStore = createStoreMock(mockPreloadState);

        test('it renders', () => {
            (useRoutines as jest.Mock).mockReturnValue({
                routinesState: mockRoutinesNotEditing,
                handleDeleteSesion: mockHandleDeleteSesion,
                handleUpdateSesion: mockHandleUpdateSesion,
                handleSetCurrentSesion: mockHandleSetCurrentSesion,
            });

            render(
                <Provider store={mockStore}>
                    <Sesion sesion={sesionMock} />
                </Provider>,
                { wrapper: MemoryRouter }
            );

            const text = screen.getByText('mockSesionName');
            expect(text).toBeInTheDocument();
        });
    });

    describe('when it is in edit mode', () => {
        const mockPreloadState = createPreloadedState(
            mockUser,
            mockRoutinesEditing,
            mockDefaultExercises
        );
        const mockStore = createStoreMock(mockPreloadState);

        test('it renders', async () => {
            (useRoutines as jest.Mock).mockReturnValue({
                routinesState: mockRoutinesEditing,
                handleDeleteSesion: mockHandleDeleteSesion,
                handleUpdateSesion: mockHandleUpdateSesion,
                handleSetCurrentSesion: mockHandleSetCurrentSesion,
            });

            render(
                <Provider store={mockStore}>
                    <Sesion sesion={sesionMock} />
                </Provider>,
                { wrapper: MemoryRouter }
            );

            const buttons = screen.getAllByRole('button');
            const deleteButton = buttons[0];
            expect(deleteButton).toBeInTheDocument();
            fireEvent.click(deleteButton);
            expect(mockHandleDeleteSesion).toHaveBeenCalled();

            const addExerciseButton = screen.getByTestId('addExercise');
            expect(addExerciseButton).toBeInTheDocument();
            fireEvent.click(addExerciseButton);
            expect(mockHandleSetCurrentSesion).toHaveBeenCalled();

            const textbox = screen.getByTestId('sesionName');
            expect(textbox).toBeInTheDocument();
            userEvent.type(textbox, 'e');
            expect(mockHandleUpdateSesion).toHaveBeenCalled();

            const exerciseName = screen.getByText('mockExerciseName');
            expect(exerciseName).toBeInTheDocument();
        });
    });
    describe('when it doesnt have any exercise', () => {
        const mockPreloadState = createPreloadedState(
            mockUser,
            mockRoutinesNotEditingWithoutExercises,
            mockDefaultExercises
        );
        const mockStore = createStoreMock(mockPreloadState);

        test('it renders', () => {
            (useRoutines as jest.Mock).mockReturnValue({
                routinesState: mockRoutinesNotEditingWithoutExercises,
                handleDeleteSesion: mockHandleDeleteSesion,
                handleUpdateSesion: mockHandleUpdateSesion,
                handleSetCurrentSesion: mockHandleSetCurrentSesion,
            });

            render(
                <Provider store={mockStore}>
                    <Sesion sesion={sesionWithoutExercisesMock} />
                </Provider>,
                { wrapper: MemoryRouter }
            );
            const text = screen.getByTestId('noExerciesLabel');
            expect(text).toBeInTheDocument();
        });
    });
});

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useRoutines } from '../../hooks/routines/use.routines';
import { mockDefaultExercises } from '../../mocks/default.exercises.mock';
import { exerciseMock } from '../../mocks/exercise.mock';
import {
    mockRoutinesEditing,
    mockRoutinesNotEditing,
} from '../../mocks/routines.mock';
import { sesionMock } from '../../mocks/sesion.mock';
import { createPreloadedState, createStoreMock } from '../../mocks/store.mock';
import {
    mockHandleDeleteExercise,
    mockHandleUpdateExercise,
} from '../../mocks/use.routines.mock';
import { mockUser } from '../../mocks/user.mock';
import { Exercise } from './exercise';

jest.mock('../../hooks/routines/use.routines');

describe('Exercise', () => {
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
                handleUpdateExercise: mockHandleUpdateExercise,
                handleDeleteExercise: mockHandleDeleteExercise,
            });

            render(
                <Provider store={mockStore}>
                    <Exercise exercise={exerciseMock} sesion={sesionMock} />
                </Provider>,
                { wrapper: MemoryRouter }
            );

            const text = screen.getByText('mockExerciseName');
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

        test('it renders', () => {
            (useRoutines as jest.Mock).mockReturnValue({
                routinesState: mockRoutinesEditing,
                handleUpdateExercise: mockHandleUpdateExercise,
                handleDeleteExercise: mockHandleDeleteExercise,
            });

            render(
                <Provider store={mockStore}>
                    <Exercise exercise={exerciseMock} sesion={sesionMock} />
                </Provider>,
                { wrapper: MemoryRouter }
            );

            const textbox = screen.getByTestId('series');
            expect(textbox).toBeInTheDocument();
            userEvent.type(textbox, 'e');
            expect(mockHandleUpdateExercise).toHaveBeenCalled();

            const deleteButton = screen.getByRole('button');
            expect(deleteButton).toBeInTheDocument();
            fireEvent.click(deleteButton);
            expect(mockHandleDeleteExercise).toHaveBeenCalled();
        });
    });
});

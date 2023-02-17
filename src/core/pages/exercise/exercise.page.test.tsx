import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useDefaultExercises } from '../../hooks/use.exercises';
import { useRoutines } from '../../hooks/use.routines';
import {
    mockDefaultExercises,
    mockDefaultExercisesWithFilter,
} from '../../mocks/default.exercises.mock';
import { mockRoutinesEditing } from '../../mocks/routines.mock';
import { createPreloadedState, createStoreMock } from '../../mocks/store.mock';
import { mockHandleAddExercise } from '../../mocks/use.routines.mock';
import { mockUser } from '../../mocks/user.mock';
import ExercisePage from './exercise.page';

jest.mock('../../hooks/use.routines');
jest.mock('../../hooks/use.exercises');

const mockHandleLoad = jest.fn();

describe('Exercise page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when the filter is off', () => {
        const mockPreloadState = createPreloadedState(
            mockUser,
            mockRoutinesEditing,
            mockDefaultExercises
        );
        const mockStore = createStoreMock(mockPreloadState);

        test('it renders', () => {
            (useRoutines as jest.Mock).mockReturnValue({
                handleAddExercise: mockHandleAddExercise,
            });

            (useDefaultExercises as jest.Mock).mockReturnValue({
                defaultExercisesState: mockDefaultExercises,
                handleLoad: mockHandleLoad,
            });

            render(
                <Provider store={mockStore}>
                    <ExercisePage />
                </Provider>,
                { wrapper: MemoryRouter }
            );

            const defaultExercises = screen.getAllByRole('link');
            expect(defaultExercises[0]).toBeInTheDocument();
        });
    });

    describe('when the filter is used', () => {
        const mockPreloadState = createPreloadedState(
            mockUser,
            mockRoutinesEditing,
            mockDefaultExercisesWithFilter
        );
        const mockStore = createStoreMock(mockPreloadState);

        test('it renders', () => {
            (useRoutines as jest.Mock).mockReturnValue({
                handleAddExercise: mockHandleAddExercise,
            });

            (useDefaultExercises as jest.Mock).mockReturnValue({
                defaultExercisesState: mockDefaultExercisesWithFilter,
                handleLoad: mockHandleLoad,
            });

            render(
                <Provider store={mockStore}>
                    <ExercisePage />
                </Provider>,
                { wrapper: MemoryRouter }
            );

            const defaultExercise = screen.getByRole('link');
            expect(defaultExercise).toBeInTheDocument();
            const button = screen.getAllByRole('button');
            expect(button[1]).toBeInTheDocument();
            fireEvent.click(button[1]);
            expect(mockHandleAddExercise).toHaveBeenCalled();
        });
    });
});

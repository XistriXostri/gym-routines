import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Routine } from './routine';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createPreloadedState, createStoreMock } from '../../mocks/store.mock';
import { mockUser } from '../../mocks/user.mock';
import {
    mockRoutinesEditing,
    mockRoutinesNotEditing,
    routineMock,
} from '../../mocks/routines.mock';
import { mockDefaultExercises } from '../../mocks/default.exercises.mock';
import userEvent from '@testing-library/user-event';
import { useRoutines } from '../../hooks/routines/use.routines';

jest.mock('../../hooks/routines/use.routines');

describe('Routine', () => {
    const mockHandleDeleteRoutine = jest.fn();
    const mockHandleUpdateRoutine = jest.fn();
    const mockHandleSetCurrentRoutine = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Renders content with the correct name', () => {
        const preloadState = createPreloadedState(
            mockUser,
            mockRoutinesNotEditing,
            mockDefaultExercises
        );
        const mockStore = createStoreMock(preloadState);

        (useRoutines as jest.Mock).mockReturnValue({
            routinesState: mockRoutinesNotEditing,
            handleSetCurrentRoutine: mockHandleSetCurrentRoutine,
        });

        render(
            <Provider store={mockStore}>
                <Routine routine={routineMock} />
            </Provider>,
            { wrapper: MemoryRouter }
        );
        const routineLink = screen.getByRole('link');
        expect(routineLink).toBeInTheDocument();
        const routineButton = screen.getByRole('button');
        expect(routineButton).toHaveTextContent('mockRoutinename');
        fireEvent.click(routineButton);
        expect(mockHandleSetCurrentRoutine).toHaveBeenCalled();
        //Para imprimir lo que renderiza:
        //screen.debug();
    });

    test('When is editing Routines shows inputs and delete button', () => {
        const preloadState = createPreloadedState(
            mockUser,
            mockRoutinesEditing,
            mockDefaultExercises
        );

        const mockStore = createStoreMock(preloadState);

        (useRoutines as jest.Mock).mockReturnValue({
            handleDeleteRoutine: mockHandleDeleteRoutine,
            handleUpdateRoutine: mockHandleUpdateRoutine,
            routinesState: mockRoutinesEditing,
        });

        render(
            <Provider store={mockStore}>
                <Routine routine={routineMock} />
            </Provider>,
            { wrapper: MemoryRouter }
        );

        const DeleteImg = screen.getByAltText('delete');
        const TextInput = screen.getByRole('textbox');
        expect(DeleteImg).toBeInTheDocument();
        expect(TextInput).toBeInTheDocument();
    });

    test('when use buttons and inputs', async () => {
        const preloadState = createPreloadedState(
            mockUser,
            mockRoutinesEditing,
            mockDefaultExercises
        );
        const mockStore = createStoreMock(preloadState);

        (useRoutines as jest.Mock).mockReturnValue({
            handleDeleteRoutine: mockHandleDeleteRoutine,
            handleUpdateRoutine: mockHandleUpdateRoutine,
            routinesState: mockRoutinesEditing,
        });

        render(
            <Provider store={mockStore}>
                <Routine routine={routineMock} />
            </Provider>,
            { wrapper: MemoryRouter }
        );

        const deleteButton = screen.getByRole('button');
        expect(deleteButton).toBeInTheDocument();

        fireEvent.click(deleteButton);
        expect(mockHandleDeleteRoutine).toHaveBeenCalled();

        const texbox = screen.getByTestId('routineName');
        expect(texbox).toBeInTheDocument();
        userEvent.type(texbox, 'e');
        expect(mockHandleUpdateRoutine).toHaveBeenCalled();
    });
});

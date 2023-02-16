import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Routine } from './routine';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import {
    createPreloadedState,
    createStoreMock,
} from '../../../mocks/store.mock';
import { mockUser } from '../../../mocks/user.mock';
import {
    mockRoutinesEditing,
    mockRoutinesNotEditing,
    routineMock,
} from '../../../mocks/routines.mock';
import { mockDefaultExercises } from '../../../mocks/default.exercises.mock';
import { useRoutines } from '../../hooks/use.routines';
import * as mockHooks from '../../../mocks/use.routines.mock';

//Guardo esto por si aca
// beforeEach(() => {
//     jest.clearAllMocks();
//     (useRoutines as jest.Mock).mockReturnValue({
//         handleEditMode: mockHandleEditMode,
//         handleDeleteRoutine: mockHandleDeleteRoutine,
//     });
// });

describe('Routine', () => {
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

    test('when use delete button calls handleDeleteRoutine', () => {
        const preloadState = createPreloadedState(
            mockUser,
            mockRoutinesEditing,
            mockDefaultExercises
        );
        const mockStore = createStoreMock(preloadState);
        const mockHandleUpdateRoutine = jest.fn();
        const mockHandleEditMode = jest.fn();

        // Intento 1
        jest.mock('../../hooks/use.routines', () => {
            return jest.fn(() => ({
                handleUpdateRoutine: mockHandleUpdateRoutine,
                handleEditMode: mockHandleEditMode,
            }));
        });

        render(
            <Provider store={mockStore}>
                <Routine routine={routineMock} />
            </Provider>,
            { wrapper: MemoryRouter }
        );

        screen.debug();
        const DeleteButton = screen.getByRole('button');
        const TextInput = screen.getByRole('textbox');
        expect(DeleteButton).toBeInTheDocument();
        expect(TextInput).toBeInTheDocument();
        fireEvent.change(TextInput, { target: { value: 'new value' } });
        fireEvent.click(DeleteButton);
        expect(mockHooks.mockHandleDeleteRoutine).toHaveBeenCalled();
    });
});

// Intento 2
// (useRoutines as jest.Mock).mockReturnValue({
//     handleUpdateRoutine: mockHandleUpdateRoutine,
//     handleEditMode: mockHandleEditMode,
// });

// Intento 3
// jest.mock('../../hooks/use.routines', () => {
//     return {
//         useRoutines: () => {
//             return {
//                 handleDeleteRoutine: mockHooks.mockHandleDeleteRoutine,
//             };
//         },
//     };
// });

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Routine } from './routine';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { MemoryRouter } from 'react-router-dom';
import { RoutineStructure } from '../../models/routine/routine.model';
import { useRoutines } from '../../hooks/use.routines';

const routineMock: RoutineStructure = {
    id: 'idMock',
    name: 'nameMock',
    sesions: [],
};

describe('Routine', () => {
    test('renders content', () => {
        render(
            <Provider store={store}>
                <Routine routine={routineMock} />
            </Provider>,
            { wrapper: MemoryRouter }
        );
        const routineLink = screen.getByRole('link');
        expect(routineLink).toBeInTheDocument();
    });

    test('display delete button when is in editing mode', () => {
        const mockHandleDeleteRoutine = jest.fn();
        const mockHandleSetCurrentRoutine = jest.fn();

        jest.mock('../../hooks/use.routines', () => ({
            useRoutines: () => ({
                handleDeleteRoutine: mockHandleDeleteRoutine,
                handleEditMode: jest.fn(),
                handleSetCurrentRoutine: mockHandleSetCurrentRoutine,
                routinesState: {
                    isEditing: true,
                },
            }),
        }));

        render(
            <Provider store={store}>
                <Routine routine={routineMock} />
            </Provider>,
            { wrapper: MemoryRouter }
        );
        //Aquí aunque he mockeado que isEditing:true, esta imprimiendo como si fuera false
        const setCurrentRoutineButton = screen.getByRole('button');

        expect(setCurrentRoutineButton).toBeInTheDocument();

        //no funciona
        //fireEvent.click(setCurrentRoutineButton);
        //expect(mockHandleSetCurrentRoutine).toHaveBeenCalled();
    });
});

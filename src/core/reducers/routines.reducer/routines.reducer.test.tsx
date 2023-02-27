import {
    mockRoutinesNotEditing,
    mockRoutinesNotEditingWithoutRoutines,
    routineMock,
    routineMock2,
    routineUpdatedMock,
} from '../../mocks/routines.mock';
import { RoutineStructure } from '../../models/routine/routine.model';
import { SesionStructure } from '../../models/sesion/sesion';
import { routineActionTypes } from '../action.types';
import {
    InitialRoutinesState,
    initialState,
    routinesReducer,
} from './routines.reducer';

describe('Given the function routinesReducer', () => {
    let action: {
        type: string;
        payload: RoutineStructure | RoutineStructure['id'];
    };
    let state: {
        routines: Array<RoutineStructure>;
        currentRoutine: RoutineStructure | null;
        currentSesion: SesionStructure | null;
        isEditing: boolean;
    };

    describe('When the action is routinesLoad', () => {
        beforeEach(() => {
            action = {
                type: routineActionTypes.load,
                payload: routineMock,
            };

            state = {
                routines: [],
                currentRoutine: null,
                currentSesion: null,
                isEditing: false,
            };
        });

        test('Then the returned state should be the action payload', () => {
            const result = routinesReducer(state, action);
            expect(result).toEqual({ ...state, routines: action.payload });
        });
    });

    describe('When the action is routinesAdd', () => {
        beforeEach(() => {
            action = {
                type: routineActionTypes.add,
                payload: routineMock,
            };

            state = {
                routines: [],
                currentRoutine: null,
                currentSesion: null,
                isEditing: false,
            };
        });

        test('Then the returned state should be the action payload', () => {
            const result = routinesReducer(state, action);
            expect(result).toEqual({ ...state, routines: [action.payload] });
        });
    });
    describe('When the action is routinesUpdate', () => {
        beforeEach(() => {
            action = {
                type: routineActionTypes.update,
                payload: routineUpdatedMock,
            };

            state = {
                routines: [routineMock],
                currentRoutine: null,
                currentSesion: null,
                isEditing: false,
            };
        });

        test('Then the returned state should be the action payload', () => {
            const result = routinesReducer(state, action);
            expect(result).toEqual({ ...state, routines: [action.payload] });
        });
    });
});

import { RoutineStructure } from '../models/routine/routine.model';
import { InitialRoutinesState } from '../reducers/routines.reducer/routines.reducer';
import { sesionMock, sesionWithoutExercisesMock } from './sesion.mock';

export const routineMock: RoutineStructure = {
    id: 'mockRoutineId',
    name: 'mockRoutinename',
    sesions: [sesionMock],
};

export const routineUpdatedMock: RoutineStructure = {
    id: 'mockRoutineId',
    name: 'mockRoutinenameUpdated',
    sesions: [sesionMock],
};
export const routineMock2: RoutineStructure = {
    id: 'mockRoutineId2',
    name: 'mockRoutinename2',
    sesions: [sesionMock],
};

export const routineWithoutExercisesMock: RoutineStructure = {
    id: 'mockRoutineId',
    name: 'mockRoutinename',
    sesions: [sesionWithoutExercisesMock],
};

export const mockRoutinesNotEditing: InitialRoutinesState = {
    routines: [routineMock],
    currentRoutine: routineMock,
    currentSesion: sesionMock,
    isEditing: false,
};

export const mockRoutinesEditing: InitialRoutinesState = {
    routines: [routineMock],
    currentRoutine: routineMock,
    currentSesion: sesionMock,
    isEditing: true,
};

export const mockRoutinesNotEditingWithoutExercises: InitialRoutinesState = {
    routines: [routineWithoutExercisesMock],
    currentRoutine: routineWithoutExercisesMock,
    currentSesion: sesionWithoutExercisesMock,
    isEditing: false,
};

export const mockRoutinesNotEditingWithoutRoutines: InitialRoutinesState = {
    routines: [],
    currentRoutine: routineMock,
    currentSesion: sesionMock,
    isEditing: false,
};

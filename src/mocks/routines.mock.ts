import { RoutineStructure } from '../core/models/routine/routine.model';
import { InitialRoutinesState } from '../core/reducers/routines.reducer';

export const routineMock: RoutineStructure = {
    id: 'mockRoutineId',
    name: 'mockRoutinename',
    sesions: [],
};

export const mockRoutinesNotEditing: InitialRoutinesState = {
    routines: [routineMock],
    currentRoutine: null,
    currentSesion: null,
    isEditing: false,
};

export const mockRoutinesEditing: InitialRoutinesState = {
    routines: [routineMock],
    currentRoutine: null,
    currentSesion: null,
    isEditing: true,
};

// Saving for later
// useRoutines: () => ({
//     routinesState: mockRoutinesEditing,
//     handleAddRoutine: mockHooks.mockHandleAddRoutine,
//     handleDeleteRoutine: mockHooks.mockHandleDeleteRoutine,
//     handleUpdateRoutine: mockHooks.mockHandleUpdateRoutine,
//     handleEditMode: mockHooks.mockHandleEditMode,
//     handleSetCurrentRoutine: mockHooks.mockHandleSetCurrentRoutine,
//     handleAddSesion: mockHooks.mockHandleAddSesion,
//     handleUpdateSesion: mockHooks.mockHandleUpdateSesion,
//     handleDeleteSesion: mockHooks.mockHandleDeleteSesion,
//     handleSetCurrentSesion: mockHooks.mockHandleSetCurrentSesion,
//     handleAddExercise: mockHooks.mockHandleAddExercise,
//     handleUpdateExercise: mockHooks.mockHandleUpdateExercise,
//     handleDeleteExercise: mockHooks.mockHandleDeleteExercise,
// });

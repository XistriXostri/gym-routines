import { configureStore } from '@reduxjs/toolkit';
import {
    defaultExerciseReducer,
    InitialDefaultExercisesState,
} from '../reducers/default.exercises.reducer';
import {
    InitialRoutinesState,
    routinesReducer,
} from '../reducers/routines.reducer';
import { InitialUserState, userReducer } from '../reducers/user.reducer';
import { RootState } from '../store/store';

export const createStoreMock = (preloadedState: Partial<RootState>) => {
    const mockStore = configureStore({
        reducer: {
            user: userReducer,
            routines: routinesReducer,
            defaultExercises: defaultExerciseReducer,
        },
        preloadedState,
    });

    return mockStore;
};

export const createPreloadedState = (
    mockUser: InitialUserState,
    mockRoutines: InitialRoutinesState,
    mockDefaultExercises: InitialDefaultExercisesState
) => {
    const preloadedState: Partial<RootState> = {
        user: mockUser,
        routines: mockRoutines,
        defaultExercises: mockDefaultExercises,
    };

    return preloadedState;
};

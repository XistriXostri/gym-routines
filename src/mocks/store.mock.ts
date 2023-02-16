import { configureStore } from '@reduxjs/toolkit';
import {
    defaultExerciseReducer,
    InitialDefaultExercisesState,
} from '../core/reducers/default.exercises.reducer';
import {
    InitialRoutinesState,
    routinesReducer,
} from '../core/reducers/routines.reducer';
import { InitialUserState, userReducer } from '../core/reducers/user.reducer';
import { RootState } from '../core/store/store';

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

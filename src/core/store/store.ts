import { configureStore } from '@reduxjs/toolkit';
import { defaultExerciseReducer } from '../reducers/default.exercises.reducer';
import { routinesReducer } from '../reducers/routines.reducer/routines.reducer';
import { userReducer } from '../reducers/user.reducer';

export const store = configureStore({
    reducer: {
        user: userReducer,
        routines: routinesReducer,
        defaultExercises: defaultExerciseReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;

import { DefaultExerciseStructure } from '../models/exercise/exercise';
import { createReducer } from '@reduxjs/toolkit';
import {
    defaultExerciseLoadCreator,
    defaultExerciseRemoveFilterCreator,
    defaultExerciseSetFilterCreator,
} from './action.creators';

export type InitialDefaultExercisesState = {
    defaultExercises: Array<DefaultExerciseStructure>;
    defaultExercisesFiltereds: Array<DefaultExerciseStructure>;
};

const initialState: InitialDefaultExercisesState = {
    defaultExercises: [],
    defaultExercisesFiltereds: [],
};

export const defaultExerciseReducer = createReducer(initialState, (builder) => {
    builder.addCase(defaultExerciseLoadCreator, (state, action) => ({
        ...state,
        defaultExercises: action.payload,
    }));
    builder.addCase(defaultExerciseSetFilterCreator, (state, action) => ({
        ...state,
        defaultExercisesFiltereds: state.defaultExercises.filter(
            (exercise) => exercise.muscle === action.payload
        ),
    }));
    builder.addCase(defaultExerciseRemoveFilterCreator, (state) => ({
        ...state,
        defaultExercisesFiltereds: [],
    }));

    builder.addDefaultCase((state, action) => state);
});

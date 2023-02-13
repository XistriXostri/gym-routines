import { createReducer } from '@reduxjs/toolkit';
import { RoutineStructure } from '../models/routine/routine.model';
import {
    routinesAddCreator,
    routinesDeleteCreator,
    routinesEditModeCreator,
    routinesLoadCreator,
    routinesRemoveCurrentCreator,
    routinesSetCurrentCreator,
    routinesUpdateCreator,
} from './action.creators';

type InitialRoutinesState = {
    routines: Array<RoutineStructure>;
    currentRoutine: RoutineStructure | null;
    isEditing: boolean;
};

const initialState: InitialRoutinesState = {
    routines: [],
    currentRoutine: null,
    isEditing: false,
};

export const routinesReducer = createReducer(initialState, (builder) => {
    builder.addCase(routinesLoadCreator, (state, action) => ({
        ...state,
        routines: action.payload,
    }));
    builder.addCase(routinesAddCreator, (state, action) => {
        if (!state.routines) return { ...state, routines: [action.payload] };
        return { ...state, routines: state.routines.concat(action.payload) };
    });

    builder.addCase(routinesUpdateCreator, (state, action) => ({
        ...state,
        routines: state.routines.map((routine) =>
            routine.id === action.payload.id ? action.payload : routine
        ),
    }));
    builder.addCase(routinesDeleteCreator, (state, action) => ({
        ...state,
        routines: state.routines.filter(
            (routine) => routine.id !== action.payload
        ),
    }));
    builder.addCase(routinesSetCurrentCreator, (state, action) => ({
        ...state,
        currentRoutine: action.payload,
    }));
    builder.addCase(routinesRemoveCurrentCreator, (state) => ({
        ...state,
        currentRoutine: null,
    }));
    builder.addCase(routinesEditModeCreator, (state) => ({
        ...state,
        isEditing: !state.isEditing,
    }));

    builder.addDefaultCase((state, action) => state);
});

import { createReducer } from '@reduxjs/toolkit';
import { RoutineStructure } from '../models/routine/routine.model';
import { SesionStructure } from '../models/sesion/sesion';
import {
    routinesAddCreator,
    routinesDeleteCreator,
    routinesEditModeCreator,
    routinesLoadCreator,
    routinesRemoveCurrentCreator,
    routinesSetCurrentCreator,
    routinesUpdateCreator,
    sesionAddCreator,
    sesionDeleteCreator,
    sesionSetCurrentCreator,
    sesionUpdateCreator,
} from './action.creators';

type InitialRoutinesState = {
    routines: Array<RoutineStructure>;
    currentRoutine: RoutineStructure | null;
    currentSesion: SesionStructure | null;
    isEditing: boolean;
};

const initialState: InitialRoutinesState = {
    routines: [],
    currentRoutine: null,
    currentSesion: null,
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
    builder.addCase(sesionAddCreator, (state, action) => {
        const currentRoutine = state.routines.find(
            (routine) => routine.id === state.currentRoutine?.id
        );

        if (!currentRoutine) return state;

        let updatedRoutine: RoutineStructure = currentRoutine;

        if (!currentRoutine.sesions) {
            updatedRoutine = {
                ...currentRoutine,
                sesions: [action.payload],
            };
        } else {
            updatedRoutine = {
                ...currentRoutine,
                sesions: [...currentRoutine.sesions, action.payload],
            };
        }
        return {
            ...state,
            routines: state.routines.map((routine) =>
                routine.id === currentRoutine.id ? updatedRoutine : routine
            ),
            currentRoutine: updatedRoutine,
        };
    });
    builder.addCase(sesionUpdateCreator, (state, action) => {
        const currentRoutine = state.routines.find(
            (routine) => routine.id === state.currentRoutine?.id
        );

        if (!currentRoutine) return state;

        const newSesions = currentRoutine.sesions.map((sesion) =>
            sesion.id === action.payload.id ? action.payload : sesion
        );
        let updatedRoutine: RoutineStructure = currentRoutine;

        updatedRoutine = { ...currentRoutine, sesions: newSesions };

        const prueba = updatedRoutine;
        return {
            ...state,
            routines: state.routines.map((routine) =>
                routine.id === currentRoutine.id ? prueba : routine
            ),
            currentRoutine: prueba,
        };
    });
    builder.addCase(sesionDeleteCreator, (state, action) => {
        const currentRoutine = state.routines.find(
            (routine) => routine.id === state.currentRoutine?.id
        );

        if (!currentRoutine) return state;

        const newSesions = currentRoutine.sesions.filter(
            (sesion) => sesion.id !== action.payload
        );
        let updatedRoutine: RoutineStructure = currentRoutine;

        updatedRoutine = { ...currentRoutine, sesions: newSesions };
        return {
            ...state,
            routines: state.routines.map((routine) =>
                routine.id === currentRoutine.id ? updatedRoutine : routine
            ),
            currentRoutine: updatedRoutine,
        };
    });

    builder.addCase(sesionSetCurrentCreator, (state, action) => ({
        ...state,
        currentSesion: action.payload,
    }));

    builder.addDefaultCase((state, action) => state);
});

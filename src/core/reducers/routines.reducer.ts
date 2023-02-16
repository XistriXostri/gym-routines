import { createReducer } from '@reduxjs/toolkit';
import { createExerciseFromDefaultExercise } from '../models/exercise/exercise.factory';
import { RoutineStructure } from '../models/routine/routine.model';
import { SesionStructure } from '../models/sesion/sesion';
import {
    exerciseAddCreator,
    exerciseDeleteCreator,
    exerciseUpdateCreator,
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

export type InitialRoutinesState = {
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

        return {
            ...state,
            routines: state.routines.map((routine) =>
                routine.id === currentRoutine.id ? updatedRoutine : routine
            ),
            currentRoutine: updatedRoutine,
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

    builder.addCase(exerciseAddCreator, (state, action) => {
        const newExercise = createExerciseFromDefaultExercise(action.payload);

        const currentRoutine = state.routines.find(
            (routine) => routine.id === state.currentRoutine?.id
        );
        if (!currentRoutine) return state;

        const currentSesion = currentRoutine.sesions.find(
            (sesion) => sesion.id === state.currentSesion?.id
        );

        if (!currentSesion) return state;

        let updatedSesion: SesionStructure = currentSesion;

        if (!currentSesion.exercises) {
            updatedSesion = {
                ...currentSesion,
                exercises: [newExercise],
            };
        } else {
            updatedSesion = {
                ...currentSesion,
                exercises: [...currentSesion.exercises, newExercise],
            };
        }

        const updatedRoutine = {
            ...currentRoutine,
            sesions: currentRoutine.sesions.map((sesion) =>
                sesion.id === currentSesion.id ? updatedSesion : sesion
            ),
        };

        return {
            ...state,
            routines: state.routines.map((routine) =>
                routine.id === currentRoutine.id ? updatedRoutine : routine
            ),
            currentRoutine: updatedRoutine,
        };
    });

    builder.addCase(exerciseUpdateCreator, (state, action) => {
        const currentRoutine = state.routines.find(
            (routine) => routine.id === state.currentRoutine?.id
        );
        if (!currentRoutine) return state;

        const currentSesion = currentRoutine.sesions.find(
            (sesion) => sesion.id === action.payload.sesion.id
        ) as SesionStructure;

        if (!currentSesion) return state;

        const newExercises = currentSesion.exercises.map((exercise) =>
            exercise.id === action.payload.exercise.id
                ? action.payload.exercise
                : exercise
        );

        const updatedSesion = { ...currentSesion, exercises: newExercises };

        const updatedRoutine = {
            ...currentRoutine,
            sesions: currentRoutine.sesions.map((sesion) =>
                sesion.id === currentSesion.id ? updatedSesion : sesion
            ),
        };

        return {
            ...state,
            routines: state.routines.map((routine) =>
                routine.id === currentRoutine.id ? updatedRoutine : routine
            ),
            currentRoutine: updatedRoutine,
        };
    });

    builder.addCase(exerciseDeleteCreator, (state, action) => {
        const currentRoutine = state.routines.find(
            (routine) => routine.id === state.currentRoutine?.id
        );
        if (!currentRoutine) return state;

        const currentSesion = currentRoutine.sesions.find(
            (sesion) => sesion.id === action.payload.sesion.id
        ) as SesionStructure;

        if (!currentSesion) return state;

        const newExercises = currentSesion.exercises.filter(
            (exercise) => exercise.id !== action.payload.exercise.id
        );

        const updatedSesion = { ...currentSesion, exercises: newExercises };

        const updatedRoutine = {
            ...currentRoutine,
            sesions: currentRoutine.sesions.map((sesion) =>
                sesion.id === currentSesion.id ? updatedSesion : sesion
            ),
        };

        return {
            ...state,
            routines: state.routines.map((routine) =>
                routine.id === currentRoutine.id ? updatedRoutine : routine
            ),
            currentRoutine: updatedRoutine,
        };
    });

    builder.addDefaultCase((state, action) => state);
});

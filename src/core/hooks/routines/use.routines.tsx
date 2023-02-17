import { useDispatch, useSelector } from 'react-redux';
import { RoutineStructure } from '../../models/routine/routine.model';
import { createNewRoutine } from '../../models/routine/routine.factory';
import {
    exerciseAddCreator,
    exerciseDeleteCreator,
    exerciseUpdateCreator,
    routinesAddCreator,
    routinesDeleteCreator,
    routinesEditModeCreator,
    routinesSetCurrentCreator,
    routinesUpdateCreator,
    sesionAddCreator,
    sesionDeleteCreator,
    sesionSetCurrentCreator,
    sesionUpdateCreator,
} from '../../reducers/action.creators';
import { RootState } from '../../store/store';
import { dataBase } from '../../../config';
import { ref, set } from 'firebase/database';
import { useCallback, useEffect } from 'react';
import { Sesion, SesionStructure } from '../../models/sesion/sesion';
import {
    DefaultExerciseStructure,
    ExerciseStructure,
} from '../../models/exercise/exercise';

export function useRoutines() {
    const userId = useSelector((state: RootState) => state.user.user?.id);
    const routinesState = useSelector((state: RootState) => state.routines);

    const dispatch = useDispatch();

    const handleAddRoutine = () => {
        const newRoutine = createNewRoutine();
        dispatch(routinesAddCreator(newRoutine));
        dispatch(routinesSetCurrentCreator(newRoutine));
    };

    const handleDeleteRoutine = (id: RoutineStructure['id']) => {
        debugger;
        dispatch(routinesDeleteCreator(id));
    };

    const handleUpdateRoutine = (routine: RoutineStructure) => {
        dispatch(routinesUpdateCreator(routine));
    };

    const handleEditMode = () => {
        dispatch(routinesEditModeCreator());
    };

    const handleSetCurrentRoutine = (routine: RoutineStructure) => {
        dispatch(routinesSetCurrentCreator(routine));
    };

    const handleUpdateRoutinesOnDatabase = useCallback(() => {
        if (!routinesState.routines) return;
        if (!routinesState.routines.length) return;
        const userReference = ref(dataBase, 'users/' + userId + '/routines/');
        set(userReference, routinesState.routines);
    }, [userId, routinesState.routines]);

    const handleAddSesion = () => {
        const newSesion = new Sesion([]);
        dispatch(sesionAddCreator(newSesion));
    };

    const handleUpdateSesion = (sesion: SesionStructure) => {
        dispatch(sesionUpdateCreator(sesion));
    };

    const handleDeleteSesion = (id: SesionStructure['id']) => {
        dispatch(sesionDeleteCreator(id));
    };

    const handleSetCurrentSesion = (sesion: SesionStructure) => {
        dispatch(sesionSetCurrentCreator(sesion));
    };

    const handleAddExercise = (exercise: DefaultExerciseStructure) => {
        dispatch(exerciseAddCreator(exercise));
    };

    const handleUpdateExercise = (
        exercise: ExerciseStructure,
        sesion: SesionStructure
    ) => {
        dispatch(exerciseUpdateCreator({ exercise, sesion }));
    };

    const handleDeleteExercise = (
        exercise: ExerciseStructure,
        sesion: SesionStructure
    ) => {
        dispatch(exerciseDeleteCreator({ exercise, sesion }));
    };
    useEffect(() => {
        handleUpdateRoutinesOnDatabase();
    }, [routinesState, handleUpdateRoutinesOnDatabase]);

    return {
        routinesState,
        handleAddRoutine,
        handleDeleteRoutine,
        handleUpdateRoutine,
        handleEditMode,
        handleSetCurrentRoutine,
        handleAddSesion,
        handleUpdateSesion,
        handleDeleteSesion,
        handleSetCurrentSesion,
        handleAddExercise,
        handleUpdateExercise,
        handleDeleteExercise,
    };
}

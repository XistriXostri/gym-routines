import { useDispatch, useSelector } from 'react-redux';
import { RoutineStructure } from '../models/routine/routine.model';
import { createNewRoutine } from '../models/routine/routine.factory';
import {
    routinesAddCreator,
    routinesDeleteCreator,
    routinesEditModeCreator,
    routinesSetCurrentCreator,
    routinesUpdateCreator,
    sesionAddCreator,
    sesionDeleteCreator,
    sesionUpdateCreator,
} from '../reducers/action.creators';
import { RootState } from '../store/store';
import { dataBase } from '../../config';
import { ref, set } from 'firebase/database';
import { useCallback, useEffect } from 'react';
import { Sesion, SesionStructure } from '../models/sesion/sesion';

export function useRoutines() {
    //const repoRoutines = useMemo(() => new RoutinesRepository(), []);

    const userId = useSelector((state: RootState) => state.user.user?.id);
    const routinesState = useSelector((state: RootState) => state.routines);

    const dispatch = useDispatch();

    const handleAddRoutine = () => {
        const newRoutine = createNewRoutine();
        dispatch(routinesAddCreator(newRoutine));
        dispatch(routinesSetCurrentCreator(newRoutine));
    };

    const handleDeleteRoutine = (id: RoutineStructure['id']) => {
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
        //TODO: aqui tengo un problema en el que actualiza la BD antes de actualizar la rutina
        //TODO: esto lo podria solucionar con un isLoading
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
    };
}

import { useDispatch, useSelector } from 'react-redux';
import { RoutineStructure } from '../models/routine/routine.model';
import { createNewRoutine } from '../models/routine/routine.factory';
import {
    routinesAddCreator,
    routinesDeleteCreator,
    routinesEditModeCreator,
    routinesSetCurrentCreator,
    routinesUpdateCreator,
} from '../reducers/action.creators';
import { RootState } from '../store/store';
import { dataBase } from '../../config';
import { ref, set } from 'firebase/database';
import { useCallback, useEffect } from 'react';

export function useRoutines() {
    //const repoRoutines = useMemo(() => new RoutinesRepository(), []);

    const userId = useSelector((state: RootState) => state.user.user?.id);
    const routinesState = useSelector((state: RootState) => state.routines);

    const dispatch = useDispatch();

    const handleAddRoutine = async () => {
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

    const handleUpdateRoutinesOnDatabase = useCallback(() => {
        if (!routinesState.routines) return;

        //TODO: esto lo podria solucionar con un isLoading
        if (!routinesState.routines.length) return;
        const userReference = ref(dataBase, 'users/' + userId + '/routines/');
        set(userReference, routinesState.routines);
    }, [userId, routinesState.routines]);

    useEffect(() => {
        handleUpdateRoutinesOnDatabase();
    }, [routinesState, handleUpdateRoutinesOnDatabase]);

    return {
        routinesState,
        handleAddRoutine,
        handleDeleteRoutine,
        handleUpdateRoutine,
        handleEditMode,
    };
}

import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    defaultExerciseLoadCreator,
    defaultExerciseRemoveFilterCreator,
    defaultExerciseSetFilterCreator,
} from '../reducers/action.creators';
import { ExerciseRepo } from '../services/repository/repo.exercises';
import { RootState } from '../store/store';

export function useDefaultExercises() {
    const repo = useMemo(() => new ExerciseRepo(), []);

    const defaultExercisesState = useSelector(
        (state: RootState) => state.defaultExercises
    );
    const dispatch = useDispatch();

    const handleLoad = useCallback(async () => {
        try {
            const exercises = await repo.load();
            dispatch(defaultExerciseLoadCreator(exercises));
        } catch (error) {
            console.log(error as Error);
        }
    }, [repo, dispatch]);

    const handleUpdateFilter = (muscle: string) => {
        dispatch(defaultExerciseSetFilterCreator(muscle));
    };

    const handleRemoveFilter = () => {
        dispatch(defaultExerciseRemoveFilterCreator());
    };

    return {
        defaultExercisesState,
        handleLoad,
        handleUpdateFilter,
        handleRemoveFilter,
    };
}

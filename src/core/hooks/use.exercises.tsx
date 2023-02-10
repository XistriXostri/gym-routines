import { useCallback, useMemo, useState } from 'react';
import { DefaultExerciseStructure } from '../models/exercise/exercise';
import { ExerciseRepo } from '../services/repository/repo.exercises';

export function useExercises() {
    const repo = useMemo(() => new ExerciseRepo(), []);

    const initialStateExercises: Array<DefaultExerciseStructure> = [];
    const initialStateExercisesFiltered: Array<DefaultExerciseStructure> = [];

    const [exercises, setExercises] = useState(initialStateExercises);
    const [exercisesFiltered, setExercisesFiltered] = useState(
        initialStateExercisesFiltered
    );
    const handleLoad = useCallback(async () => {
        try {
            const exercises = await repo.load();
            setExercises(exercises);
            console.log('LOAD EXERCISES');
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo]);

    const handleUpdateFilter = (muscle: string) => {
        const exercisesFiltered = exercises.filter(
            (exercise) => exercise.muscle === muscle
        );
        setExercisesFiltered(exercisesFiltered);
    };

    const handleRemoveFilter = () => {
        setExercisesFiltered(initialStateExercisesFiltered);
    };

    const handleError = (error: Error) => {
        console.log(error.message);
    };

    return {
        exercises,
        handleLoad,
        handleUpdateFilter,
        exercisesFiltered,
        handleRemoveFilter,
    };
}

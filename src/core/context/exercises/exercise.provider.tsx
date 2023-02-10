import { useMemo } from 'react';
import { useExercises } from '../../hooks/use.exercises';
import { ExerciseContext } from './exercise.context';

export function ExerciseContextProvider({
    children,
}: {
    children: JSX.Element;
}) {
    const {
        exercises,
        handleLoad,
        handleUpdateFilter,
        exercisesFiltered,
        handleRemoveFilter,
    } = useExercises();

    const context = useMemo(
        () => ({
            exercises,
            handleLoad,
            handleUpdateFilter,
            exercisesFiltered,
            handleRemoveFilter,
        }),
        [
            exercises,
            handleLoad,
            handleUpdateFilter,
            exercisesFiltered,
            handleRemoveFilter,
        ]
    );

    return (
        <ExerciseContext.Provider value={context}>
            {children}
        </ExerciseContext.Provider>
    );
}

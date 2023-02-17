import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter } from '../../components/filter/filter';
import { generateId } from '../../helpers/generate-id';
import { useDefaultExercises } from '../../hooks/exercises/use.exercises';
import { useRoutines } from '../../hooks/routines/use.routines';
import { DefaultExerciseStructure } from '../../models/exercise/exercise';

export default function ExercisePage() {
    const { handleAddExercise } = useRoutines();
    const { defaultExercisesState, handleLoad } = useDefaultExercises();

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    const Exercises = (exercises: Array<DefaultExerciseStructure>) => {
        return exercises.map((exercise) => (
            <li key={generateId()} className="defaultExercise">
                <Link to="/routine">
                    <span
                        role="button"
                        onClick={() => handleAddExercise(exercise)}
                    >
                        <img
                            src={exercise.img}
                            alt={exercise.name}
                            className="defaultExercise__img"
                        />
                    </span>
                </Link>
            </li>
        ));
    };

    return (
        <div className="exercisepage page">
            <div className="filter">
                <Filter></Filter>
            </div>
            <ul className="defaultExercise__list">
                {defaultExercisesState.defaultExercisesFiltereds.length
                    ? Exercises(defaultExercisesState.defaultExercisesFiltereds)
                    : Exercises(defaultExercisesState.defaultExercises)}
            </ul>
        </div>
    );
}

import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter } from '../../components/filter/filter';
import { ExerciseContext } from '../../context/exercises/exercise.context';
import { generateId } from '../../helpers/generate-id';
import { useRoutines } from '../../hooks/use.routines';
import { DefaultExerciseStructure } from '../../models/exercise/exercise';

export default function ExercisePage() {
    const { exercises, handleLoad, exercisesFiltered } =
        useContext(ExerciseContext);
    const { handleAddExercise } = useRoutines();

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
                {exercisesFiltered.length
                    ? Exercises(exercisesFiltered)
                    : Exercises(exercises)}
            </ul>
        </div>
    );
}

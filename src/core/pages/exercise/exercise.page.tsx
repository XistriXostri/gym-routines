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
            <div key={generateId()}>
                <Link to="/routine">
                    <span
                        role="button"
                        onClick={() => handleAddExercise(exercise)}
                    >
                        <p>{exercise.name}</p>
                        <img src={exercise.img} alt={exercise.name} />
                    </span>
                </Link>
            </div>
        ));
    };

    return (
        <>
            <h2 className="page__title">Exercises</h2>
            <hr className="bar"></hr>
            <div>
                <Filter></Filter>
            </div>
            <div>
                {exercisesFiltered.length
                    ? Exercises(exercisesFiltered)
                    : Exercises(exercises)}
            </div>
        </>
    );
}

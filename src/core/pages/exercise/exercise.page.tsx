import { useContext, useEffect } from 'react';
import { Filter } from '../../components/filter/filter';
import { ExerciseContext } from '../../context/exercises/exercise.context';
import { generateId } from '../../helpers/generate-id';
import { DefaultExerciseStructure } from '../../models/exercise/exercise';

export default function ExercisePage() {
    const { exercises, handleLoad, exercisesFiltered } =
        useContext(ExerciseContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    const Exercises = (exercises: Array<DefaultExerciseStructure>) => {
        return exercises.map((exercise) => (
            <div key={generateId()}>
                <span role="button">
                    <p>{exercise.name}</p>
                    <img src={exercise.img} alt={exercise.name} />
                </span>
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

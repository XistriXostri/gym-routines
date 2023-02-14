import { SyntheticEvent } from 'react';
import { ExerciseStructure } from '../../models/exercise/exercise';
import { SesionStructure } from '../../models/sesion/sesion';
import { useRoutines } from '../../hooks/use.routines';

export function Exercise({
    exercise,
    sesion,
}: {
    exercise: ExerciseStructure;
    sesion: SesionStructure;
}) {
    const { routinesState, handleUpdateExercise, handleDeleteExercise } =
        useRoutines();

    const showExercise = () => (
        <>
            <p>{exercise?.name}</p>
            <p>
                {exercise.series}x{exercise.repetitions}
            </p>
        </>
    );

    const handleInput = (event: SyntheticEvent) => {
        const element = event.target as HTMLFormElement;
        handleUpdateExercise(
            { ...exercise, [element.name]: element.value },
            sesion
        );
    };

    const editExercise = () => {
        return (
            <>
                <p>{exercise.name}</p>
                <p>{exercise.muscle}</p>
                {!routinesState.isEditing ? (
                    <p>
                        {exercise.series}x{exercise.repetitions}
                    </p>
                ) : (
                    <p>
                        <input
                            type="text"
                            name="series"
                            id="series"
                            value={exercise.series}
                            onInput={handleInput}
                        />
                        x
                        <input
                            type="text"
                            name="repetitions"
                            id="repetitions"
                            value={exercise.repetitions}
                            onInput={handleInput}
                        />
                        <button
                            onClick={() =>
                                handleDeleteExercise(exercise, sesion)
                            }
                        >
                            X
                        </button>
                    </p>
                )}
            </>
        );
    };

    return <li>{routinesState.isEditing ? editExercise() : showExercise()}</li>;
}

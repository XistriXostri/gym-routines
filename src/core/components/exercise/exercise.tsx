import { SyntheticEvent } from 'react';
import { useRoutines } from '../../hooks/routines/use.routines';
import { ExerciseStructure } from '../../models/exercise/exercise';
import { SesionStructure } from '../../models/sesion/sesion';

export function Exercise({
    exercise,
    sesion,
}: {
    exercise: ExerciseStructure;
    sesion: SesionStructure;
}) {
    const { routinesState, handleUpdateExercise, handleDeleteExercise } =
        useRoutines();

    const handleInput = (event: SyntheticEvent) => {
        const element = event.target as HTMLFormElement;
        handleUpdateExercise(
            { ...exercise, [element.name]: element.value },
            sesion
        );
    };

    return (
        <li>
            <div>
                <div className="exercise__img">
                    <img
                        src={exercise.img}
                        alt={exercise.name}
                        className="exercise__img"
                    />
                </div>
                <div className="exercise__info">
                    <p>{exercise.name}</p>
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
                                data-testid="series"
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
                                className="button__delete"
                                onClick={() =>
                                    handleDeleteExercise(exercise, sesion)
                                }
                            >
                                <img
                                    src="./assets/action-icons/delete-black.svg"
                                    alt="delete"
                                />
                            </button>
                        </p>
                    )}
                </div>
            </div>
            <hr />
        </li>
    );
}

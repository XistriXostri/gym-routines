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
            <div>
                <div className="exercise__img">
                    <img
                        src={exercise.img}
                        alt={exercise.name}
                        className="exercise__img"
                    />
                </div>
                <div className="exercise__info">
                    <p>{exercise?.name}</p>
                    <p>
                        {exercise.series}x{exercise.repetitions}
                    </p>
                </div>
            </div>
            <hr />
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
            </>
        );
    };

    return <li>{routinesState.isEditing ? editExercise() : showExercise()}</li>;
}

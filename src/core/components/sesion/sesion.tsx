import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { useRoutines } from '../../hooks/use.routines';
import { SesionStructure } from '../../models/sesion/sesion';
import { Exercise } from '../exercise/exercise';

export function Sesion({ sesion }: { sesion: SesionStructure }) {
    const {
        handleDeleteSesion,
        routinesState,
        handleUpdateSesion,
        handleSetCurrentSesion,
    } = useRoutines();

    const handleInput = (event: SyntheticEvent) => {
        const element = event.target as HTMLFormElement;
        handleUpdateSesion({ ...sesion, [element.name]: element.value });
    };
    const addExerciseButton = () => {
        return (
            <Link to="/exercise">
                <button onClick={() => handleSetCurrentSesion(sesion)}>
                    Añadir ejercicio
                </button>
            </Link>
        );
    };

    return (
        <li>
            {routinesState.isEditing ? (
                <>
                    <input
                        type="text"
                        name="name"
                        id="sesionName"
                        value={sesion.name}
                        onInput={handleInput}
                    />
                    <button
                        id="delete-sesion"
                        onClick={() => handleDeleteSesion(sesion.id)}
                    >
                        X
                    </button>
                </>
            ) : (
                <>
                    {sesion.name} {sesion.id}{' '}
                </>
            )}
            <ul>
                {sesion.exercises ? (
                    <>
                        {sesion.exercises.map((exercise) => (
                            <Exercise
                                key={exercise.id}
                                exercise={exercise}
                                sesion={sesion}
                            />
                        ))}
                    </>
                ) : (
                    <></>
                )}
                {routinesState.isEditing ? (
                    <li>{addExerciseButton()}</li>
                ) : (
                    <></>
                )}
            </ul>
        </li>
    );
}

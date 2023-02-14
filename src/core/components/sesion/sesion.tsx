import { SyntheticEvent } from 'react';
import { useRoutines } from '../../hooks/use.routines';
import { SesionStructure } from '../../models/sesion/sesion';

export function Sesion({ sesion }: { sesion: SesionStructure }) {
    const { handleDeleteSesion, routinesState, handleUpdateSesion } =
        useRoutines();

    const handleInput = (event: SyntheticEvent) => {
        const element = event.target as HTMLFormElement;
        handleUpdateSesion({ ...sesion, [element.name]: element.value });
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
        </li>
    );
}

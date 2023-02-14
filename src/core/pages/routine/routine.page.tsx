import { SyntheticEvent } from 'react';
import { Sesion } from '../../components/sesion/sesion';
import { useRoutines } from '../../hooks/use.routines';

export default function RoutinePage() {
    const { routinesState, handleEditMode, handleAddSesion } = useRoutines();

    const handleClick = async (event: SyntheticEvent) => {
        const action = (event.target as HTMLElement).id;
        switch (action) {
            case 'add-sesion':
                handleAddSesion();
                console.log('add sesion');
                break;
            case 'edit-sesions':
                handleEditMode();
                break;
        }
    };

    return (
        <>
            <h1>{routinesState.currentRoutine?.name}</h1>
            <hr />
            <button id="edit-sesions" onClick={handleClick}>
                Editar Sesiones
            </button>
            <ul>
                {routinesState.currentRoutine?.sesions ? (
                    <>
                        {routinesState.currentRoutine.sesions.map((sesion) => (
                            <Sesion sesion={sesion} key={sesion.id} />
                        ))}
                    </>
                ) : (
                    <></>
                )}
                {routinesState.isEditing ? (
                    <li>
                        <button id="add-sesion" onClick={handleClick}>
                            Añadir sesion
                        </button>
                    </li>
                ) : (
                    <></>
                )}
            </ul>
        </>
    );
}

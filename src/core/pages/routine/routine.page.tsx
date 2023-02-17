import { SyntheticEvent } from 'react';
import { Sesion } from '../../components/sesion/sesion';
import { useRoutines } from '../../hooks/routines/use.routines';

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
        <div className="routinepage page">
            <div className="routinepage__edit">
                <button className="disabled">Abrir todo</button>
                <button id="edit-sesions" onClick={handleClick}>
                    Editar
                </button>
            </div>
            <ul className="routinepage__list">
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
                        <button
                            id="add-sesion"
                            className="content-box sesion__add"
                            onClick={handleClick}
                        >
                            Añadir sesion
                        </button>
                    </li>
                ) : (
                    <></>
                )}
            </ul>
        </div>
    );
}

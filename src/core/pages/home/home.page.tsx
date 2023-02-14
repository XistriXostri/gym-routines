import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Routine } from '../../components/routine/routine';
import { useRoutines } from '../../hooks/use.routines';
import { useUser } from '../../hooks/use.user';

export default function HomePage() {
    const { userState } = useUser();
    const { routinesState, handleAddRoutine, handleEditMode } = useRoutines();

    const handleClick = async (event: SyntheticEvent) => {
        const action = (event.target as HTMLElement).id;
        switch (action) {
            case 'add-routine':
                handleAddRoutine();
                break;
            case 'edit-routines':
                handleEditMode();
                break;
        }
    };

    return (
        <>
            {userState.user !== null ? (
                <div className="homepage__login">
                    {routinesState.routines ? (
                        <>
                            <h1>Mis rutinas</h1>
                            <button id="edit-routines" onClick={handleClick}>
                                Editar Rutinas
                            </button>
                            <p>Hay {routinesState.routines.length} rutinas</p>
                            <ul>
                                {routinesState.routines.map((routine) => (
                                    <Routine
                                        routine={routine}
                                        key={routine.id}
                                    ></Routine>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <button id="add-routine" onClick={handleClick}>
                            {' '}
                            Crea tu primera rutina
                        </button>
                    )}
                    {routinesState.isEditing ? (
                        <Link to={'/routine'}>
                            <button id="add-routine" onClick={handleClick}>
                                {' '}
                                Crear nueva rutina
                            </button>
                        </Link>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <div className="homepage__logout">
                    <p>
                        Crea tus propias rutinas de entrenamiento personalizadas
                        para lograr tus objetivos de fitness en una página web
                        especializada. Elige entre una variedad de ejercicios y
                        personaliza la duración e intensidad de cada uno para
                        adaptar tu entrenamiento a tus necesidades.
                    </p>
                </div>
            )}
        </>
    );
}

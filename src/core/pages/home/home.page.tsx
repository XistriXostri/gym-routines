import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Routine } from '../../components/routine/routine';
import { useRoutines } from '../../hooks/routines/use.routines';
import { useUser } from '../../hooks/user/use.user';

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
                <div className="homepage__loged page">
                    <ul className="homepage__list">
                        {routinesState.routines ? (
                            <>
                                {routinesState.routines.map((routine) => (
                                    <Routine
                                        routine={routine}
                                        key={routine.id}
                                    ></Routine>
                                ))}
                                <li className="content-box">
                                    <button
                                        id="edit-routines"
                                        onClick={handleClick}
                                        className="button"
                                    >
                                        Editar Rutinas
                                    </button>
                                </li>
                            </>
                        ) : (
                            <></>
                        )}
                        <li className="content-box routine__add">
                            <Link to={'/routine'}>
                                <button
                                    id="add-routine"
                                    className="button"
                                    onClick={handleClick}
                                >
                                    {' '}
                                    Crear nueva rutina
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="homepage__not-loged page">
                    <p>
                        Crea tus propias rutinas de entrenamiento personalizadas
                        para lograr tus objetivos de fitness en una p??gina web
                        especializada. Elige entre una variedad de ejercicios y
                        personaliza la duraci??n e intensidad de cada uno para
                        adaptar tu entrenamiento a tus necesidades.
                    </p>
                </div>
            )}
        </>
    );
}

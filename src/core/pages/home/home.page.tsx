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
                <>
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
                </>
            ) : (
                <>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aliquam illo unde fuga iste! Perferendis aut eligendi
                        sit nostrum iste, voluptatibus amet quidem, omnis
                        ducimus veniam doloremque consectetur odio alias fuga!
                    </p>
                </>
            )}
        </>
    );
}

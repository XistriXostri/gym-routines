import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { useRoutines } from '../../hooks/use.routines';
import { RoutineStructure } from '../../models/routine/routine.model';

export function Routine({ routine }: { routine: RoutineStructure }) {
    const {
        routinesState,
        handleDeleteRoutine,
        handleUpdateRoutine,
        handleSetCurrentRoutine,
    } = useRoutines();

    const handleInput = (event: SyntheticEvent) => {
        const element = event.target as HTMLFormElement;
        handleUpdateRoutine({ ...routine, [element.name]: element.value });
    };

    return (
        <>
            {routinesState.isEditing ? (
                <li className="content-box routine">
                    <input
                        type="text"
                        name="name"
                        id="routineName"
                        value={routine.name}
                        onInput={handleInput}
                    />
                    <button
                        className="button__delete"
                        id="delete-routine"
                        onClick={() => handleDeleteRoutine(routine.id)}
                    >
                        <img
                            src="./assets/action-icons/delete.svg"
                            alt="delete"
                        />
                    </button>
                </li>
            ) : (
                <>
                    <Link to={'/routine'}>
                        <li className="content-box routine">
                            <span
                                role="button"
                                onClick={() => handleSetCurrentRoutine(routine)}
                            >
                                {routine.name}
                            </span>
                        </li>
                    </Link>
                </>
            )}
        </>
    );
}

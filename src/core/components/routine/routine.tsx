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
        <li className="content-box routine">
            {routinesState.isEditing ? (
                <>
                    <input
                        type="text"
                        name="name"
                        id="routineName"
                        value={routine.name}
                        onInput={handleInput}
                    />
                    <button
                        id="delete-routine"
                        onClick={() => handleDeleteRoutine(routine.id)}
                    >
                        X
                    </button>
                </>
            ) : (
                <>
                    <Link to={'/routine'}>
                        <span
                            role="button"
                            onClick={() => handleSetCurrentRoutine(routine)}
                        >
                            {routine.name}
                        </span>
                    </Link>
                </>
            )}
        </li>
    );
}

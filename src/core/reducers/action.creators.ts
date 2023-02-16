import { createAction } from '@reduxjs/toolkit';
import {
    DefaultExerciseStructure,
    ExerciseStructure,
} from '../models/exercise/exercise';
import { RoutineStructure } from '../models/routine/routine.model';
import { SesionStructure } from '../models/sesion/sesion';
import { UserStructure } from '../models/user/user';
import {
    defaultExerciseActionType,
    exerciseActionTypes,
    routineActionTypes,
    sesionActionTypes,
    userActionTypes,
} from './action.types';

export type ExercisePayload = {
    exercise: ExerciseStructure;
    sesion: SesionStructure;
};

export const userSetCreator = createAction<UserStructure>(userActionTypes.set);

export const userRemoveCreator = createAction(userActionTypes.remove);

export const routinesLoadCreator = createAction<Array<RoutineStructure>>(
    routineActionTypes.load
);

export const routinesAddCreator = createAction<RoutineStructure>(
    routineActionTypes.add
);

export const routinesUpdateCreator = createAction<RoutineStructure>(
    routineActionTypes.update
);

export const routinesDeleteCreator = createAction<RoutineStructure['id']>(
    routineActionTypes.delete
);

export const routinesSetCurrentCreator = createAction<RoutineStructure>(
    routineActionTypes.setCurrent
);

export const routinesRemoveCurrentCreator = createAction(
    routineActionTypes.removeCurrent
);

export const routinesEditModeCreator = createAction(
    routineActionTypes.editMode
);

export const sesionAddCreator = createAction<SesionStructure>(
    sesionActionTypes.add
);

export const sesionUpdateCreator = createAction<SesionStructure>(
    sesionActionTypes.update
);

export const sesionDeleteCreator = createAction<SesionStructure['id']>(
    sesionActionTypes.delete
);

export const sesionSetCurrentCreator = createAction<SesionStructure>(
    sesionActionTypes.setCurrent
);

export const exerciseAddCreator = createAction<DefaultExerciseStructure>(
    exerciseActionTypes.add
);

export const exerciseUpdateCreator = createAction<ExercisePayload>(
    exerciseActionTypes.update
);

export const exerciseDeleteCreator = createAction<ExercisePayload>(
    exerciseActionTypes.delete
);

export const defaultExerciseLoadCreator = createAction<
    Array<DefaultExerciseStructure>
>(defaultExerciseActionType.load);

export const defaultExerciseSetFilterCreator = createAction<
    DefaultExerciseStructure['muscle']
>(defaultExerciseActionType.setFilter);

export const defaultExerciseRemoveFilterCreator = createAction(
    defaultExerciseActionType.removeFilter
);

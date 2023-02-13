import { createAction } from '@reduxjs/toolkit';
import { RoutineStructure } from '../models/routine/routine';
import { UserStructure } from '../models/user/user';
import { routineActionTypes, userActionTypes } from './action.types';

export const userSetCreator = createAction<UserStructure>(userActionTypes.set);

export const userRemoveCreator = createAction(userActionTypes.remove);

export const userLoadRoutinesCreator = createAction<UserStructure['routines']>(
    userActionTypes.loadRoutines
);

export const userAddRoutineCreator = createAction<RoutineStructure['id']>(
    userActionTypes.addRoutine
);

export const userDeleteRoutineCreator = createAction<RoutineStructure['id']>(
    userActionTypes.deleteRoutine
);

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

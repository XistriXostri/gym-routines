import { createAction } from '@reduxjs/toolkit';
import { RoutineStructure } from '../models/routine/routine';
import { UserStructure } from '../models/user/user';
import { userActionTypes } from './action.types';

export const userSetCreator = createAction<UserStructure>(userActionTypes.set);

export const userRemoveCreator = createAction(userActionTypes.remove);

export const userLoadRoutines = createAction<UserStructure['routines']>(
    userActionTypes.loadRoutines
);

export const userAddRoutine = createAction<RoutineStructure['id']>(
    userActionTypes.addRoutine
);

export const userDeleteRoutine = createAction<RoutineStructure['id']>(
    userActionTypes.deleteRoutine
);

import { createAction } from '@reduxjs/toolkit';
import { RoutineStructure } from '../models/routine/routine.model';
import { SesionStructure } from '../models/sesion/sesion';
import { UserStructure } from '../models/user/user';
import {
    routineActionTypes,
    sesionActionTypes,
    userActionTypes,
} from './action.types';

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

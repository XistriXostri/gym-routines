import { createReducer } from '@reduxjs/toolkit';
import { UserStructure } from '../models/user/user';
import {
    userAddRoutine,
    userDeleteRoutine,
    userLoadRoutines,
    userRemoveCreator,
    userSetCreator,
} from './action.creators';

type InitialUserState = {
    user: UserStructure | null;
};

const initialState: InitialUserState = {
    user: null,
};

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(userSetCreator, (state, action) => ({
        ...state,
        user: action.payload,
    }));
    builder.addCase(userRemoveCreator, (state) => ({
        ...state,
        user: null,
    }));
    builder.addCase(userLoadRoutines, (state, action) => {
        if (state.user) state.user.routines = action.payload;
        return state;
    });
    builder.addCase(userAddRoutine, (state, action) => {
        if (state.user) {
            if (!state.user.routines) {
                state.user.routines = [];
            }
            state.user.routines = state.user.routines.concat(action.payload);
        }
        return state;
    });
    builder.addCase(userDeleteRoutine, (state, action) => {
        if (state.user)
            state.user.routines = state.user.routines.filter(
                (id) => id !== action.payload
            );
        return state;
    });

    builder.addDefaultCase((state, action) => state);
});

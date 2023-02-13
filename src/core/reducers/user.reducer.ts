import { createReducer } from '@reduxjs/toolkit';
import { UserStructure } from '../models/user/user';
import { userRemoveCreator, userSetCreator } from './action.creators';

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

    builder.addDefaultCase((state, action) => state);
});

import { InitialUserState } from '../core/reducers/user.reducer';

export const usermock = {
    id: 'mockUserId',
    name: 'mockUserName',
    photo: 'mockUserPhoto',
    email: 'mockUserEmail',
};
export const mockEmptyUser: InitialUserState = { user: null };
export const mockUser: InitialUserState = { user: usermock };

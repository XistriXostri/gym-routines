import { InitialUserState } from '../reducers/user.reducer';

export const userMock = {
    id: 'mockUserId',
    name: 'mockUserName',
    photo: 'mockUserPhoto',
    email: 'mockUserEmail',
};
export const mockEmptyUser: InitialUserState = { user: null };
export const mockUser: InitialUserState = { user: userMock };

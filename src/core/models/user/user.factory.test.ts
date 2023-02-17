import { User, UserStructureOnDatabase } from './user';
import {
    createEmptyUser,
    createUserFromDatabase,
    createUserFromGoogleUser,
} from './user.factory';

describe('Given createRoutineFromDatabase factory', () => {
    test('It should instantiate a User', () => {
        const mockName = 'mockName';
        const mockId = 'mockId';
        const mockPhoto = 'mockPhoto';
        const mockEmail = 'mockEmail';
        const user = {
            uid: mockId,
            displayName: mockName,
            photoURL: mockPhoto,
            email: mockEmail,
        };

        const result = createUserFromGoogleUser(user);
        expect(result).toBeInstanceOf(User);
    });
});

describe('Given createUserFromDatabase factory', () => {
    test('It should instantiate a User', () => {
        const mockName = 'mockName';
        const mockId = 'mockId';
        const mockPhoto = 'mockPhoto';
        const mockEmail = 'mockEmail';
        const data: UserStructureOnDatabase = {
            username: mockName,
            photo: mockPhoto,
            email: mockEmail,
            routines: [],
        };

        const result = createUserFromDatabase(data, mockId);
        expect(result).toBeInstanceOf(User);
    });
});

describe('Given createEmptyUser factory', () => {
    test('It should instantiate a User', () => {
        const result = createEmptyUser();
        expect(result).toBeInstanceOf(User);
    });
});

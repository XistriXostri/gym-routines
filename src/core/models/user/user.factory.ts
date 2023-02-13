import { User, UserStructure, UserStructureWithoutId } from './user';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createUserFromGoogleUser(user: any): User {
    const { uid: id, displayName: name, photoURL: photo, email } = user;
    return new User(id, name, photo, email, []);
}

export function createUserFromDatabase(
    data: UserStructureWithoutId,
    uid: UserStructure['id']
): User {
    const { username: name, email, photo, routines } = data;
    return new User(uid, name, photo, email, routines);
}

export function createEmptyUser(): User {
    return new User('', '', '', '', []);
}

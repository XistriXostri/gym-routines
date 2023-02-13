import { auth } from '../../config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import {
    createUserFromDatabase,
    createUserFromGoogleUser,
} from '../models/user/user.factory';
import { useMemo } from 'react';
import { UsersRepository } from '../services/repository/repo.user';
import { UserStructure, UserStructureWithoutId } from '../models/user/user';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    userAddRoutineCreator,
    userDeleteRoutineCreator,
    userLoadRoutinesCreator,
    userRemoveCreator,
    userSetCreator,
} from '../reducers/action.creators';
import { RoutineStructure } from '../models/routine/routine';

export type LoginData = { user: UserStructure; token: string };
export function useUser() {
    const repoUsers = useMemo(() => new UsersRepository(), []);

    const userState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();

        const userCredentials = await signInWithPopup(auth, provider);
        const { user } = userCredentials;

        //Para conseguir el token
        //const token = await user.getIdToken();

        const userFromLogin = createUserFromGoogleUser(user);
        dispatch(userSetCreator(userFromLogin));

        return userFromLogin;
    };

    const handleLogout = () => {
        signOut(auth);
        dispatch(userRemoveCreator());
    };

    //TODO: fix non-serializable value alert

    const handleRegister = async (userData: UserStructure) => {
        repoUsers
            .load(userData.id)
            .then((data) => {
                if (data === null) {
                    repoUsers.register(userData);
                    return;
                }
                const userDataLoaded = createUserFromDatabase(
                    data as UserStructureWithoutId,
                    userData.id
                );

                const userRoutines = userDataLoaded.routines;

                dispatch(userLoadRoutinesCreator(userRoutines));
                console.log('handleLogin:', userDataLoaded);
            })
            .catch((error) => console.log(error));
    };

    const handleAddRoutine = (id: RoutineStructure['id']) => {
        dispatch(userAddRoutineCreator(id));
        repoUsers.update(userState.user as UserStructure);
    };

    const handleDeleteRoutine = (id: RoutineStructure['id']) => {
        dispatch(userDeleteRoutineCreator(id));
        repoUsers.update(userState.user as UserStructure);
    };

    return {
        handleRegister,
        handleLogin,
        handleLogout,
        handleAddRoutine,
        handleDeleteRoutine,
        userState,
    };
}

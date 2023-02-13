import { auth } from '../../config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import {
    createUserFromDatabase,
    createUserFromGoogleUser,
} from '../models/user/user.factory';
import { useMemo } from 'react';
import { UsersRepository } from '../services/repository/repo.user';
import { UserStructure, UserStructureOnDatabase } from '../models/user/user';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    routinesLoadCreator,
    userRemoveCreator,
    userSetCreator,
} from '../reducers/action.creators';

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
        dispatch(routinesLoadCreator([]));
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

                const userDatafromDataBase = data as UserStructureOnDatabase;

                //TODO: creo que esto se puede quitar
                const userDataLoaded = createUserFromDatabase(
                    userDatafromDataBase,
                    userData.id
                );
                console.log('handleLogin:', userDataLoaded);

                const routines = userDatafromDataBase.routines;
                dispatch(routinesLoadCreator(routines));
            })
            .catch((error) => console.log(error));
    };

    return {
        handleRegister,
        handleLogin,
        handleLogout,
        userState,
    };
}

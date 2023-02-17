import { auth } from '../../../config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import {
    createUserFromDatabase,
    createUserFromGoogleUser,
} from '../../models/user/user.factory';
import { useEffect, useMemo } from 'react';
import { UsersRepository } from '../../services/repository/repo.user';
import { UserStructure, UserStructureOnDatabase } from '../../models/user/user';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    routinesLoadCreator,
    userRemoveCreator,
    userSetCreator,
} from '../../reducers/action.creators';
import { useLocalStorage } from '../localStorage/use.local.storage';

export type LoginData = { user: UserStructure; token: string };
export function useUser() {
    const repoUsers = useMemo(() => new UsersRepository(), []);

    const { getItem, setItem } = useLocalStorage();

    useEffect(() => {
        const user = getItem('user');
        if (user) {
            dispatch(userSetCreator(JSON.parse(user)));
            handleRegister(JSON.parse(user));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const userState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();

        const userCredentials = await signInWithPopup(auth, provider);
        const user = userCredentials.user;
        const userFromLogin = createUserFromGoogleUser(user);
        dispatch(userSetCreator(userFromLogin));
        setItem('user', JSON.stringify(userFromLogin));

        return userFromLogin;
    };

    const handleLogout = () => {
        signOut(auth);
        dispatch(userRemoveCreator());
        dispatch(routinesLoadCreator([]));
        setItem('user', '');
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

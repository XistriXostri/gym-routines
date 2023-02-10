import { onValue, ref, set } from 'firebase/database';
import { dataBase } from '../../../config';
import { userStructure } from '../../models/user/user';

export class UserRepository {
    database;
    reference;
    constructor() {
        this.database = dataBase;
        this.reference = ref(this.database, 'users/');
    }

    load(uid: userStructure['id']) {
        const promise = new Promise((resolve, reject) => {
            const userReference = ref(dataBase, 'users/' + uid);
            onValue(
                userReference,
                (snapshot) => {
                    const data = snapshot.val();
                    resolve(data);
                },
                {
                    onlyOnce: true,
                }
            );
        });
        return promise;
    }

    register(userData: userStructure) {
        const userReference = ref(dataBase, 'users/' + userData.id);
        set(userReference, {
            username: userData.name,
            email: userData.email,
            photo: userData.photo,
            routines: [],
        });
    }

    update(userData: userStructure) {
        const userReference = ref(dataBase, 'users/' + userData.id);
        set(userReference, {
            username: userData.name,
            email: userData.email,
            photo: userData.photo,
            routines: userData.routines,
        });
    }
}

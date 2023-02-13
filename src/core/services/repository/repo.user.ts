import { onValue, ref, set } from 'firebase/database';
import { dataBase } from '../../../config';
import { UserStructure } from '../../models/user/user';

export class UsersRepository {
    database;
    reference;
    constructor() {
        this.database = dataBase;
        this.reference = ref(this.database, 'users/');
    }

    load(uid: UserStructure['id']) {
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

    register(userData: UserStructure) {
        const userReference = ref(dataBase, 'users/' + userData.id);
        set(userReference, {
            username: userData.name,
            email: userData.email,
            photo: userData.photo,
            routines: [],
        });
    }

    //TODO: se puede quitar?
    // update(userData: UserStructure) {
    //     const userReference = ref(
    //         dataBase,
    //         'users/' + userData.id + '/routines/'
    //     );
    //     set(userReference, userData.routines);
    // }
}

import { onValue, ref, set } from 'firebase/database';
import { dataBase } from '../../../config';
import { RoutineStructure } from '../../models/routine/routine';

export class RoutinesRepository {
    database;
    reference;
    constructor() {
        this.database = dataBase;
        this.reference = ref(this.database, 'routines/');
    }

    load(id: RoutineStructure['id']) {
        const promise = new Promise((resolve, reject) => {
            const userReference = ref(dataBase, 'routines/' + id);
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

    add(routine: RoutineStructure) {
        const userReference = ref(dataBase, 'routines/' + routine.id);
        set(userReference, routine);
    }

    delete(id: RoutineStructure['id']) {
        const userReference = ref(dataBase, 'routines/' + id);
        set(userReference, '');
    }
}

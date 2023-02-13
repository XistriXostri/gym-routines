import { RoutineStructure } from '../routine/routine';

export type UserStructure = {
    id: string;
    name: string;
    photo: string;
    email: string;
    routines: Array<RoutineStructure['id']>;
};

export class User implements UserStructure {
    constructor(
        public id: string,
        public name: string,
        public photo: string,
        public email: string,
        public routines: Array<RoutineStructure['id']>
    ) {}
}

export type UserStructureWithoutId = {
    username: string;
    photo: string;
    email: string;
    routines: Array<RoutineStructure['id']>;
};

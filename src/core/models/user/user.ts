import { RoutineStructure } from '../routine/routine.model';

export type UserStructure = {
    id: string;
    name: string;
    photo: string;
    email: string;
};

export class User implements UserStructure {
    constructor(
        public id: string,
        public name: string,
        public photo: string,
        public email: string
    ) {}
}

export type UserStructureWithoutId = {
    username: string;
    photo: string;
    email: string;
};

export type UserStructureOnDatabase = UserStructureWithoutId & {
    routines: Array<RoutineStructure>;
};

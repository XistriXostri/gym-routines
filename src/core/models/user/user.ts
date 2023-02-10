import { RoutineStructure } from '../routine/routine';

export type userStructure = {
    id: string;
    name: string;
    photo: string;
    email: string;
    routines: Array<RoutineStructure['id']>;
};

export class User implements userStructure {
    constructor(
        public id: string,
        public name: string,
        public photo: string,
        public email: string,
        public routines: Array<RoutineStructure['id']>
    ) {}
}

export type userStructureWithoutId = {
    username: string;
    photo: string;
    email: string;
    routines: Array<RoutineStructure['id']>;
};

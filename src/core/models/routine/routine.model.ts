import { SesionStructure } from '../sesion/sesion';

export type RoutineStructure = {
    id: string;
    name: string;
    sesions: Array<SesionStructure>;
};

export type RoutineStructureWithoutId = {
    name: string;
    sesions: Array<SesionStructure>;
};

export class Routine implements RoutineStructure {
    constructor(
        public id: string,
        public name: string,
        public sesions: Array<SesionStructure>
    ) {}
}

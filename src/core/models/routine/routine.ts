import { SesionStructure } from '../sesion/sesion';
import { generateId } from '../../helpers/generate-id';

export type RoutineStructure = {
    id: string;
    name: string;
    sesions: Array<SesionStructure['id']>;
};

export class Routine implements RoutineStructure {
    public id: string;
    public name: string;

    constructor(public sesions: Array<SesionStructure['id']>) {
        this.id = generateId();
        this.name = 'Nueva rutina';
    }
}

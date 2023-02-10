import { sesionStructure } from '../sesion/sesion';
import { generateId } from '../../helpers/generate-id';

export type RoutineStructure = {
    id: string;
    name: string;
    sesions: Array<sesionStructure['id']>;
};

export class Routine implements RoutineStructure {
    public id: string;
    public name: string;

    constructor(public sesions: Array<sesionStructure['id']>) {
        this.id = generateId();
        this.name = 'Nueva rutina';
    }
}

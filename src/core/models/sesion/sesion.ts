import { generateId } from '../../helpers/generate-id';
import { ExerciseStructure } from '../exercise/exercise';

export type SesionStructure = {
    id: string;
    name: string;
    exercises: Array<ExerciseStructure['id']>;
};

export class Sesion implements SesionStructure {
    public id: string;
    public name: string;
    constructor(public exercises: Array<ExerciseStructure['id']>) {
        this.id = generateId();
        this.name = 'Sesion';
    }
}

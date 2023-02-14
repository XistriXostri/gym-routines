import { generateId } from '../../helpers/generate-id';
import { ExerciseStructure } from '../exercise/exercise';

export type SesionStructure = {
    id: string;
    name: string;
    exercises: Array<ExerciseStructure>;
};

export class Sesion implements SesionStructure {
    public id: string;
    public name: string;
    constructor(public exercises: Array<ExerciseStructure>) {
        this.id = generateId();
        this.name = 'Sesion';
    }
}

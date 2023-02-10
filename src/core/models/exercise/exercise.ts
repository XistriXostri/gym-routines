import { generateId } from '../../helpers/generate-id';

export type DefaultExerciseStructure = {
    name: string;
    muscle: string;
    img: string;
};

export type ExerciseStructure = {
    id: string;
    name: string;
    muscle: string;
    img: string;
    repetitions: number;
    series: number;
};

export class Exercise implements ExerciseStructure {
    public id: string;
    public repetitions: number;
    public series: number;

    constructor(
        public name: string,
        public muscle: string,
        public img: string
    ) {
        this.repetitions = 0;
        this.series = 0;
        this.id = generateId();
    }
}

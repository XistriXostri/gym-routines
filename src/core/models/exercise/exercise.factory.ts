import {
    DefaultExerciseStructure,
    Exercise,
    ExerciseStructure,
} from './exercise';

export function createExerciseFromDefaultExercise(
    DefaultExercise: DefaultExerciseStructure
): ExerciseStructure {
    const { name, muscle, img } = DefaultExercise;
    return new Exercise(name, muscle, img);
}

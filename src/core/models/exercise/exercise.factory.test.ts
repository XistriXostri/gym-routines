import { Exercise } from './exercise';
import { createExerciseFromDefaultExercise } from './exercise.factory';

describe('Given createExerciseFromDefaultExercise factory', () => {
    test('It should instantiate a Exercise', () => {
        const mockName = 'mockName';
        const mockMuscle = 'mockMuscle';
        const mockImg = 'mockImg';
        const mockDefaultExercise = {
            name: mockName,
            muscle: mockMuscle,
            img: mockImg,
        };

        const result = createExerciseFromDefaultExercise(mockDefaultExercise);
        expect(result).toBeInstanceOf(Exercise);
    });
});

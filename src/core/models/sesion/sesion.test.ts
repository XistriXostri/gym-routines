import { ExerciseStructure } from '../exercise/exercise';
import { Sesion } from './sesion';

describe('Given sesion constructor', () => {
    test('It should instantiate a Sesion', () => {
        const mockExercises: Array<ExerciseStructure> = [];

        const result = new Sesion(mockExercises);
        expect(result).toBeInstanceOf(Sesion);
    });
});

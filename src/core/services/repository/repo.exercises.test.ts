import { mockDefaultExercisesFromApi } from '../../mocks/default.exercises.mock';
import { DefaultExerciseStructure } from '../../models/exercise/exercise';
import { ExerciseRepo } from './repo.exercises';

describe('Given a Exercises Repo', () => {
    const repo = new ExerciseRepo();

    const mockData: Array<DefaultExerciseStructure> = [];

    test('Then we can instantiate it', () => {
        expect(repo).toBeInstanceOf(ExerciseRepo);
    });

    describe('When we use load method', () => {
        // test('Then we received the tasks contents in the repo', async () => {
        //     const data = await repo.load();
        //     expect(global.fetch).toHaveBeenCalled();
        //     expect(data).toEqual(mockDefaultExercisesFromApi);
        // });
        test('Then if there are NO DATA, we received a rejected promise', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.load();
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
});

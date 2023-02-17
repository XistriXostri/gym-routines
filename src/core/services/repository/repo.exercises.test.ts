import { ExerciseRepo } from './repo.exercises';

describe('Given a Exercises Repo', () => {
    const repo = new ExerciseRepo();

    test('Then we can instantiate it', () => {
        expect(repo).toBeInstanceOf(ExerciseRepo);
    });

    describe('When we use load method', () => {
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

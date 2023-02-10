import { DefaultExerciseStructure } from '../../models/exercise/exercise';

export class ExerciseRepo {
    constructor(
        private url = 'https://my-json-server.typicode.com/XistriXostri/API/exercises'
    ) {}

    async load(): Promise<DefaultExerciseStructure[]> {
        const resp = await fetch(this.url, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'bTp7sLd1nIqXLjnSMqw24w==x7N6NgR7tq4KCEuC',
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
}

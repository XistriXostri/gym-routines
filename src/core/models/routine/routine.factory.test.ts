import { SesionStructure } from '../sesion/sesion';
import { createNewRoutine, createRoutineFromDatabase } from './routine.factory';
import {
    Routine,
    RoutineStructure,
    RoutineStructureWithoutId,
} from './routine.model';

describe('Given createRoutineFromDatabase factory', () => {
    test('It should instantiate a Routine', () => {
        const mockName = 'mockName';
        const mockSesions: Array<SesionStructure> = [];
        const mockId: RoutineStructure['id'] = 'mockId';

        const mockData: RoutineStructureWithoutId = {
            name: mockName,
            sesions: mockSesions,
        };

        const result = createRoutineFromDatabase(mockData, mockId);
        expect(result).toBeInstanceOf(Routine);
    });
});

describe('Given createNewRoutine factory', () => {
    test('It should instantiate a Routine', () => {
        const result = createNewRoutine();
        expect(result).toBeInstanceOf(Routine);
    });
});

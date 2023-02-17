import { SesionStructure } from '../models/sesion/sesion';
import { exerciseMock } from './exercise.mock';

export const sesionMock: SesionStructure = {
    id: 'mockSesionId',
    name: 'mockSesionName',
    exercises: [exerciseMock],
};

export const sesionWithoutExercisesMock: SesionStructure = {
    id: 'mockSesionId',
    name: 'mockSesionName',
    exercises: [],
};

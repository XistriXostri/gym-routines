import { generateId } from '../../helpers/generate-id';
import { SesionStructure } from '../sesion/sesion';
import {
    Routine,
    RoutineStructure,
    RoutineStructureWithoutId,
} from './routine.model';

export function createRoutineFromDatabase(
    data: RoutineStructureWithoutId,
    id: RoutineStructure['id']
): Routine {
    const { name, sesions } = data;
    return new Routine(id, name, sesions);
}

export function createNewRoutine(): Routine {
    const id = generateId();
    const name = 'Nueva Rutina';
    const sesions: Array<SesionStructure['id']> = [];
    return new Routine(id, name, sesions);
}

/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { DefaultExerciseStructure } from '../../models/exercise/exercise';

export type ExerciseContextStructure = {
    exercises: Array<DefaultExerciseStructure>;
    handleLoad: () => void;
    handleUpdateFilter: (muscle: string) => void;
    exercisesFiltered: Array<DefaultExerciseStructure>;
    handleRemoveFilter: () => void;
};

const initialContext: ExerciseContextStructure = {
    exercises: [],
    handleLoad: async () => {},
    handleUpdateFilter: (muscle: string) => {},
    exercisesFiltered: [],
    handleRemoveFilter: () => {},
};

export const ExerciseContext = createContext(initialContext);

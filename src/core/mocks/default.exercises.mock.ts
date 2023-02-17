import { DefaultExerciseStructure } from '../models/exercise/exercise';
import { InitialDefaultExercisesState } from '../reducers/default.exercises.reducer';

const mockDefaultExercise1: DefaultExerciseStructure = {
    name: 'mockDefaultExerciseName1',
    muscle: 'mockDefaultExerciseMuscle1',
    img: 'mockDefaultExerciseImg1',
};

const mockDefaultExercise2: DefaultExerciseStructure = {
    name: 'mockDefaultExerciseName2',
    muscle: 'mockDefaultExerciseMuscle2',
    img: 'mockDefaultExerciseImg2',
};
export const mockDefaultExercises: InitialDefaultExercisesState = {
    defaultExercises: [mockDefaultExercise1, mockDefaultExercise2],
    defaultExercisesFiltereds: [],
};

export const mockDefaultExercisesWithFilter: InitialDefaultExercisesState = {
    defaultExercises: [mockDefaultExercise1, mockDefaultExercise2],
    defaultExercisesFiltereds: [mockDefaultExercise1],
};

export const mockDefaultExercisesFromApi = {
    exercises: [
        {
            name: 'Curl biceps',
            muscle: 'biceps',
            img: 'https://i.pinimg.com/564x/43/25/35/432535754c7ca743f9a9b9ca6df13799.jpg',
        },
        {
            name: 'Curl biceps inclinado',
            muscle: 'biceps',
            img: 'https://i.pinimg.com/564x/30/66/29/30662977c2628f8e0c98cb1059881e8c.jpg',
        },
        {
            name: 'Curl biceps bar',
            muscle: 'biceps',
            img: 'https://i.pinimg.com/564x/2c/2b/50/2c2b507c1da4fb73037bb24f1c4fa681.jpg',
        },
        {
            name: 'Overhead triceps',
            muscle: 'triceps',
            img: 'https://i.pinimg.com/564x/a4/00/ae/a400ae28a90bd3ebca08b87cb13ad193.jpg',
        },
        {
            name: 'Fondos',
            muscle: 'triceps',
            img: 'https://i.pinimg.com/564x/7d/15/e9/7d15e9b33ca3db4be0b2ad450d63b38f.jpg',
        },
        {
            name: 'Pull de triceps con cuerna',
            muscle: 'triceps',
            img: 'https://i.pinimg.com/564x/f4/15/ad/f415addde261dd1841652e74bcee1e97.jpg',
        },
        {
            name: 'Remo con barra',
            muscle: 'espalda',
            img: 'https://i.pinimg.com/564x/12/8f/32/128f326670f0fbaf6cc3d55bfb113b02.jpg',
        },
        {
            name: 'Dominada de espalda',
            muscle: 'espalda',
            img: 'https://i.pinimg.com/564x/4d/cd/4d/4dcd4d387a3551810d3d9f7df146c6a4.jpg',
        },
        {
            name: 'Jalón al pecho',
            muscle: 'espalda',
            img: 'https://i.pinimg.com/564x/87/3a/7a/873a7a686eb1ed45270adab215a03e31.jpg',
        },
        {
            name: 'Remo inclinado con mancuernas',
            muscle: 'espalda',
            img: 'https://i.pinimg.com/564x/d1/55/6c/d1556c3bc60615a677b39a2151a465e7.jpg',
        },
        {
            name: 'Pecho en banco declinado',
            muscle: 'pecho',
            img: 'https://i.pinimg.com/564x/f1/28/17/f12817c0f75881d72a193e2b749049a7.jpg',
        },
        {
            name: 'Mariposa de pecho',
            muscle: 'pecho',
            img: 'https://i.pinimg.com/564x/89/4f/e1/894fe1e53a18ddfabfdeab93e6125dda.jpg',
        },
        {
            name: 'Press banca',
            muscle: 'pecho',
            img: 'https://i.pinimg.com/564x/e0/81/fa/e081fa023888194d574a693e3630ba4a.jpg',
        },
        {
            name: 'Mariposa inclinado',
            muscle: 'pecho',
            img: 'https://i.pinimg.com/564x/b1/23/30/b1233081775c48bfee0d354f3a70e9c7.jpg',
        },
        {
            name: 'Press militar con barra',
            muscle: 'hombro',
            img: 'https://i.pinimg.com/564x/8e/55/bd/8e55bdd13fcb331e8c9c95a151696414.jpg',
        },
        {
            name: 'Press militar con mancuerna',
            muscle: 'hombro',
            img: 'https://i.pinimg.com/564x/0e/21/ea/0e21eaad36e44e667cf8ee825a3e5ded.jpg',
        },
        {
            name: 'Elevaciones laterales con cable',
            muscle: 'hombro',
            img: 'https://i.pinimg.com/564x/dc/6d/c3/dc6dc321d15f6699f5d250dae4c7235c.jpg',
        },
        {
            name: 'Peso muerto rumano',
            muscle: 'cuadriceps',
            img: 'https://i.pinimg.com/564x/4c/19/ed/4c19eda5acf62513e42ec51fdcbf4dcf.jpg',
        },
        {
            name: 'Sentadillas con barra',
            muscle: 'cuadriceps',
            img: 'https://i.pinimg.com/564x/3c/ea/f1/3ceaf152802a3ca7c571455d3ec0ef14.jpg',
        },
        {
            name: 'Press de pierna inclinado',
            muscle: 'cuadriceps',
            img: 'https://i.pinimg.com/564x/7d/bb/fb/7dbbfbb5e5387154c67eb76e24ecdf27.jpg',
        },
        {
            name: 'Extensión de pierna',
            muscle: 'cuadriceps',
            img: 'https://i.pinimg.com/564x/a9/92/4e/a9924e1639e2fcc81b7cea66eefa6e3b.jpg',
        },
        {
            name: 'Contracción de pierna',
            muscle: 'cuadriceps',
            img: 'https://i.pinimg.com/564x/14/a8/35/14a8357db676b0704d5548caad0518c1.jpg',
        },
        {
            name: 'gemelo de pie en maquina',
            muscle: 'gemelo',
            img: 'https://i.pinimg.com/564x/73/79/55/7379550a9430dfe0938b30c81f7c41f9.jpg',
        },
        {
            name: 'Gluteo con cable',
            muscle: 'gluteo',
            img: 'https://i.pinimg.com/564x/59/b0/37/59b037b7c95065d8508f624b3498b5aa.jpg',
        },
        {
            name: 'Máquina de hiperextensión inversa',
            muscle: 'gluteo',
            img: 'https://i.pinimg.com/564x/b6/a4/c4/b6a4c4b782bd9bcfecdfba77b630363f.jpg',
        },
        {
            name: 'pull gluteos',
            muscle: 'gluteo',
            img: 'https://i.pinimg.com/564x/1c/d6/6e/1cd66ee05a9e5dda69a064f6e5f1241a.jpg',
        },
        {
            name: 'hit trust',
            muscle: 'gluteo',
            img: 'https://i.pinimg.com/564x/76/bc/1c/76bc1c4fd81064b0cb07dd4478342335.jpg',
        },
        {
            name: 'Abdominales declinado',
            muscle: 'abdominales',
            img: 'https://i.pinimg.com/564x/37/df/a7/37dfa71486e015bd92869cc368daced6.jpg',
        },
        {
            name: 'Elevación de pierna',
            muscle: 'abdominales',
            img: 'https://i.pinimg.com/564x/32/d2/31/32d23193a9aef0dc0632b5f3a969ee94.jpg',
        },
        {
            name: 'Rodillo',
            muscle: 'abdominales',
            img: 'https://i.pinimg.com/564x/48/1f/31/481f31b8ab3357bd1895be1abae0866c.jpg',
        },
    ],
};

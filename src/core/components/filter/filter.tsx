import { useContext } from 'react';
import { ExerciseContext } from '../../context/exercises/exercise.context';

export function Filter() {
    const { handleUpdateFilter, handleRemoveFilter } =
        useContext(ExerciseContext);

    const handleFilter = (event: React.FormEvent<HTMLSelectElement>) => {
        const actualFilterOption = event.currentTarget.value;
        handleUpdateFilter(actualFilterOption);
    };

    //TODO: Simplificar el filtro haciendo que haga un GET filtrando los datos

    const muscleOptions = [
        'biceps',
        'triceps',
        'espalda',
        'pecho',
        'hombro',
        'cuadriceps',
        'gemelo',
        'gluteo',
        'abdominales',
    ];

    return (
        <div className="filter">
            <form>
                <label htmlFor="optionsFilter">
                    Filtrar por:
                    <select
                        id="optionsFilter"
                        name="optionsFilter"
                        onChange={handleFilter}
                    >
                        <option defaultValue="" disabled>
                            Selecciona un musculo
                        </option>
                        {muscleOptions.map((option) => (
                            <option value={option} key={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
            </form>
            <button onClick={handleRemoveFilter}>Quitar filtro</button>
        </div>
    );
}

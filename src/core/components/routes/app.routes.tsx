import { Navigate, Route, Routes } from 'react-router-dom';
import ExercisePage from '../../pages/exercise/exercise.page';
import HomePage from '../../pages/home/home.page';
import RoutinePage from '../../pages/routine/routine.page';

export function AppRoutes() {
    return (
        <Routes>
            <Route path={''} element={<HomePage></HomePage>}></Route>
            <Route path={'/home'} element={<HomePage></HomePage>}></Route>
            <Route
                path={'/routine'}
                element={<RoutinePage></RoutinePage>}
            ></Route>
            <Route
                path={'/exercise'}
                element={<ExercisePage></ExercisePage>}
            ></Route>
            <Route
                path={'*'}
                element={<Navigate to="" replace></Navigate>}
            ></Route>
        </Routes>
    );
}

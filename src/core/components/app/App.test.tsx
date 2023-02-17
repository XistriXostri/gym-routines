import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockDefaultExercises } from '../../mocks/default.exercises.mock';
import { mockRoutinesNotEditing } from '../../mocks/routines.mock';
import { createPreloadedState, createStoreMock } from '../../mocks/store.mock';
import { mockUser } from '../../mocks/user.mock';
import App from './App';

describe('App', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockPreloadState = createPreloadedState(
        mockUser,
        mockRoutinesNotEditing,
        mockDefaultExercises
    );
    const mockStore = createStoreMock(mockPreloadState);

    test('when is not in edit mode', () => {
        render(
            <Provider store={mockStore}>
                <App />
            </Provider>,
            { wrapper: MemoryRouter }
        );

        const backbutton = screen.getByAltText('back');
        expect(backbutton).toBeInTheDocument();
    });
});

import { render, screen } from '@testing-library/react';
import { Header } from './header';

//TODO: tal vez no iba por estos mocks
jest.mock('../../hooks/use.routines', () => ({
    useRoutines: () => ({
        handleEditMode: jest.fn(),
        routinesState: {
            isEditing: false,
        },
    }),
}));

jest.mock('../../hooks/use.user', () => ({
    useUser: () => ({
        userState: {
            user: null,
        },
    }),
}));

describe('Header', () => {
    test('does not display back button when user is not logged in', () => {
        render(<Header />);
        const backButtonElement = screen.queryByRole('link');
        expect(backButtonElement).toBeNull();
    });

    test('displays back button when user is logged in', () => {
        const mockUserState = {
            user: {
                uid: 'mock-user-id',
            },
        };
        jest.mock('../../hooks/use.user', () => ({
            useUser: () => ({
                userState: mockUserState,
            }),
        }));
        render(<Header />);
        const backButtonElement = screen.getByRole('button');
        expect(backButtonElement).toBeInTheDocument();
    });
});

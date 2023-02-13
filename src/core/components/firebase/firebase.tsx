import { SyntheticEvent } from 'react';
import { useUser } from '../../hooks/use.user';

export function Firebase() {
    const { handleLogin, handleLogout, handleRegister, userState } = useUser();

    const handleClick = async (event: SyntheticEvent) => {
        const action = (event.target as HTMLElement).id;
        switch (action) {
            case 'login':
                const loginData = await handleLogin();
                await handleRegister(loginData);
                break;
            case 'logout':
                handleLogout();
                break;
        }
    };

    return (
        <>
            {userState.user ? (
                <>
                    <h1>{userState.user.name}</h1>
                    <button type="button" id="logout" onClick={handleClick}>
                        LogOut
                    </button>
                </>
            ) : (
                <button type="button" id="login" onClick={handleClick}>
                    LogIn
                </button>
            )}
        </>
    );
}

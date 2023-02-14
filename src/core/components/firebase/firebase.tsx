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
                    <span
                        role="button"
                        id="logout"
                        className="firebase__button"
                        onClick={handleClick}
                    >
                        LogOut
                    </span>
                </>
            ) : (
                <span
                    role="button"
                    id="login"
                    className="firebase__button"
                    onClick={handleClick}
                >
                    <img
                        src="./assets/header/login-icon.png"
                        alt="google logo"
                    />
                </span>
            )}
        </>
    );
}

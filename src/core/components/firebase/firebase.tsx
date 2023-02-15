import { useUser } from '../../hooks/use.user';

export function Firebase() {
    const { handleLogin, handleLogout, handleRegister, userState } = useUser();
    const handleClick = async () => {
        if (userState.user) return handleLogout();

        const loginData = await handleLogin();
        await handleRegister(loginData);
    };

    return (
        <>
            {userState.user ? (
                <>
                    <span
                        role="button"
                        id="logout"
                        className="firebase__button"
                        onClick={handleClick}
                    >
                        LogOut
                    </span>
                    <h1>{userState.user.name}</h1>
                </>
            ) : (
                <button
                    type="button"
                    id="login"
                    className="firebase__button"
                    onClick={handleClick}
                >
                    <img
                        src="./assets/header/login-icon.png"
                        alt="google logo"
                    />
                </button>
            )}
        </>
    );
}

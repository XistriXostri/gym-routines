import { useUser } from '../../hooks/user/use.user';

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
                        <h1>{userState.user.name}</h1>

                        <img
                            src="./assets/action-icons/logout.svg"
                            alt="logout"
                        />
                    </span>
                </>
            ) : (
                <button
                    type="button"
                    id="login"
                    className="firebase__button"
                    onClick={handleClick}
                >
                    <img src="./assets/action-icons/login.svg" alt="login" />
                </button>
            )}
        </>
    );
}

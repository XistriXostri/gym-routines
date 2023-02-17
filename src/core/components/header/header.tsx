import { Link } from 'react-router-dom';
import { useRoutines } from '../../hooks/routines/use.routines';
import { useUser } from '../../hooks/user/use.user';
import { Firebase } from '../firebase/firebase';

export function Header() {
    const { handleEditMode, routinesState } = useRoutines();
    const { userState } = useUser();

    const handleBackButton = () => {
        if (routinesState.isEditing) return handleEditMode();
    };

    return (
        <div className={userState.user ? 'header loged' : 'header'}>
            {userState.user ? (
                <Link
                    to="/home"
                    className="header__back"
                    onClick={handleBackButton}
                >
                    <img src="./assets/action-icons/back.svg" alt="back" />
                </Link>
            ) : (
                <></>
            )}

            <Firebase />
        </div>
    );
}

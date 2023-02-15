import { Link } from 'react-router-dom';
import { Firebase } from '../firebase/firebase';

export function Header() {
    return (
        <div className="header">
            <Link to="/home" className="header__back">
                <img src="./assets/action-icons/back.svg" alt="back" />
            </Link>
            <Firebase />
        </div>
    );
}

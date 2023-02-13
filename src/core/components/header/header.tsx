import { Firebase } from '../firebase/firebase';

export function Header() {
    return (
        <div className="header">
            <h1>Rutinas de gimnasio</h1>
            <Firebase />
        </div>
    );
}

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBmPv0q2BnOiA_7u6aWcFdm4e6ome7DGxQ',
    authDomain: 'gymrutines-bb9de.firebaseapp.com',
    projectId: 'gymrutines-bb9de',
    storageBucket: 'gymrutines-bb9de.appspot.com',
    messagingSenderId: '441085649171',
    appId: '1:441085649171:web:6031ed355a137f43227ae6',
    measurementId: 'G-KTG5F5PC80',
    databaseURL:
        'https://gymrutines-bb9de-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(fireBaseApp);
export const dataBase = getDatabase(fireBaseApp);

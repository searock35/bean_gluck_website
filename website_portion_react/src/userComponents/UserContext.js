import {createContext} from 'react';

const defaultUser = {
    username: 'Guest',
    email: '',
    id: '0',
    schoolId: 'Messiah University',
    isAuth: false
}

const UserContext = createContext(defaultUser);

export default UserContext;
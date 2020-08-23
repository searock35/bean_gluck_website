import {createContext} from 'react';
import getDefaultUser from './api/getDefaultUser';


const UserContext = createContext({
    ...getDefaultUser(),
    changeUserContext: undefined
});

export default UserContext;
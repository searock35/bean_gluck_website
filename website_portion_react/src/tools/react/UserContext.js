import {createContext} from 'react';
import getDefaultUser from '../getDefaultUser';


const UserContext = createContext({
    ...getDefaultUser(),
    changeUserContext: undefined
});

export default UserContext;
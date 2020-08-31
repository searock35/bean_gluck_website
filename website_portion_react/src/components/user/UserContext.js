import {createContext} from 'react';
import getDefaultUser from '../common/getDefaultUser';


const UserContext = createContext({
    ...getDefaultUser(),
    changeUserContext: undefined
});

export default UserContext;
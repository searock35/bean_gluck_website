import {createContext} from 'react';
import getDefaultUser from '../getDefaultUser';


// This user context just holds the username for the header, so the header info can be changed from anywhere
const UserContext = createContext({
    ...getDefaultUser().username,
    changeUserContext: undefined
});

export default UserContext;
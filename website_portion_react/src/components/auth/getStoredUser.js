import getTokenFromCookies from "./getTokenFromCookies";
import getDefaultUser from "../common/getDefaultUser";


// PARAMS:
// inputs:
// outputs: -> The user information from the web server
function getStoredUser() {
    
    const refreshToken = getTokenFromCookies();
    //use auth api to grab user info from server, then return the user for the context

    //TESTING PURPOSES: Gather user info from cookies for now, to test cookies
    if(refreshToken === "01220420") {
        return {
            username: 'searock35',
            email: 'searock35@gmail.com',
            userId: '7174190584',
            schoolId: '01220420',
            schoolName: 'Messiah University',
            isAuth: true
        }
    } else {
        return getDefaultUser();
    }
    

}

export default getStoredUser;
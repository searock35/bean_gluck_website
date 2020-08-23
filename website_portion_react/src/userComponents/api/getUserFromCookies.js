import getDefaultUser from "./getDefaultUser";



function getStoredUser() {

    
    //look in cookies for the stored user, and put them in the stored user object
    //TO DO

    //if the user in cookies cannot be found, load default user
    return getDefaultUser();
}

export default getStoredUser;
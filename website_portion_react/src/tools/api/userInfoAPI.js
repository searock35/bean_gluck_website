//gather user information from server
//School Logo, Major, Graduating Year, First/Last name, Home City



class UserInfo {
    constructor(props) {
        //TEMPORARY. Currently used in place of an API to test if the user's key is correct

        //placeholder returned user. In the future, will scrape user info from database using username and password
        this.testUser = {
            firstName: "Corey",
            lastName: "Bean",
            major: "Electrical Engineering",
            gradYear: "2021",
            homeCity: "Reinholds",
            username: "searock35",
        }
    }

    //Make server request for user information. If the server denies, return default user information.
    getUserInfo() {
        return this.testUser;
    }
        
        
}

export default new UserInfo();
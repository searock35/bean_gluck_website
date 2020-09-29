import authAPI from "./authAPI";


class listingRequestAPI {

    //requestInfo: action: ["buy" | "rent"], message: string, userId: string,
    requestListing(requestInfo) {
        const authToken = authAPI.authToken;

        //format data and send correct request to server
        //TODO

        if(authToken === '0') {
            return("false");
        }

        console.log(requestInfo);

        //for now, return true for a success and false for a failure
        return("true");
    }
}

export default new listingRequestAPI();

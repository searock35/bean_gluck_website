
import authAPI from "./authAPI";


class listingRequestAPI {

    constructor() {
        this.testRequestsByListing = [
            {action: "buy", message: "Please let me buy this!", firstName: "Corey", lastName: "Bean", gradYear: "2021", userId: "01220420"},
            {action: "rent", message: "i need this, can you do 15?", firstName: "Scoops", lastName: "Remy", gradYear: "2019", userId: "01220421"},
            {action: "rent", message: "There is no profanity filter, fucker", firstName: "Badly", lastName: "Person", gradYear: "2023", userId: "01220425"},
            {action: "buy", message: "Shut this place down.", firstName: "Cop", lastName: "Bad", gradYear: "2025", userId: "01220333"},


            this.testRequestsByUser = [
                {action: "buy", rentalPrice: "20", sellingPrice: "30", requestId: "0", condition: "Bad", title: "Hunger bores", bookId: "1", firstName: "Corey", lastName: "Bean", gradYear: "2021", userId: "01220420"},
                {action: "rent", rentalPrice: "20", sellingPrice: "30", requestId: "1", condition: "Bad", title: "Hunger bores", bookId: "1", firstName: "Scoops", lastName: "Remy", gradYear: "2019", userId: "01220421"},
                {action: "rent", rentalPrice: "20", sellingPrice: "30", requestId: "2", condition: "Bad", title: "Hunger bores", bookId: "1", firstName: "Badly", lastName: "Person", gradYear: "2023", userId: "01220425"},
                {action: "buy", rentalPrice: "20", sellingPrice: "30", requestId: "3", condition: "Bad", title: "Hunger bores", bookId: "1", firstName: "Cop", lastName: "Bad", gradYear: "2025", userId: "01220333"},
    
            ]
        ]
    }

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

    getRequestsByListing(listingId) {

        return this.testRequestsByListing
    }

    getRequestsByUser(userId) {
        return this.testRequestsByUser
    }
}

export default new listingRequestAPI();

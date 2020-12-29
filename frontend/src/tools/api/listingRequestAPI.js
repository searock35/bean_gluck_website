
import Axios from "axios";
import authAPI from "./authAPI";
import restURL from "./restURL";


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

    /**
     * Post a listing request to the API. 
     * Return the response directly. 
     * 
     * @param {string} listing_id The ID of the listing to be requested
     * @param {string} buyOrRent Whether the user wants to buy or rent the book
     * @param {string} asking_price A value indicating a desired price
     */
    requestListing(listing_id, buyOrRent, asking_price) {


        let requestInfo = {
            listing: `${listing_id}`,
        }

        if (buyOrRent === "buy") requestInfo['purchase_asking_price'] = asking_price;
        else requestInfo['rental_asking_price'] = asking_price;

        return new Promise((resolve, reject) => {
            if (authAPI.authToken === "0") return reject({status: 401})
            Axios.post(restURL + "/requests/", requestInfo, {
                headers: {
                    Authorization: "Token " + authAPI.authToken
                }
            })
                .then((response) => resolve(response))
                .catch((error) => {
                    if (error.response) reject(error.response)
                    else reject({status: 0})
                })
        })
    }

    getRequestsByListing(listingId) {

        return this.testRequestsByListing
    }

    /**
     * Return the requests owned by the logged in user. Returns a list of requests
     * if successful, otherwise a stable error message.
     */
    getRequestsByUser() {
        return new Promise((resolve, reject) => {
            Axios.get(restURL + "/requests/", {
                headers: {
                    Authorization: "Token " + authAPI.authToken
                }
            })
                .then((response) => resolve(response.data))
                .catch((error) => {
                    if (error.response) reject(error.response)
                    else reject({status: 0})
                })
        })
    }
}

export default new listingRequestAPI();

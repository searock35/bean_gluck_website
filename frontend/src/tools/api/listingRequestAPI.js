
import Axios from "axios";
import authAPI from "./authAPI";
import restURL from "./restURL";


class listingRequestAPI {

    /**
     * Post a listing request to the API. 
     * Return the response directly. 
     * 
     * @param {string} listing_id The ID of the listing to be requested
     * @param {string} asking_price A value indicating a desired price
     */
    requestListing(listing_id, asking_price) {


        let requestInfo = {
            listing: `${listing_id}`,
            asking_price: asking_price
        }

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

    /**
     * Get all the requests associated with a listing. Must be the owner of the listing.
     * @param {Number} listingId Determines the listing from which the requests will be retrieved from.
     */
    getRequestsByListing(listingId) {

        return new Promise((resolve, reject) => {
            Axios.get(`${restURL}/listings/${listingId}/requests/`, authAPI.getAuthHeader)
                .then(resolve)
                .catch(err => {
                    if (err.response) reject(err.response)
                    else reject({status: 0})
                })
        })
    }

    /**
     * Return the requests owned by the logged in user. Returns a list of requests
     * if successful, otherwise a stable error message.
     */
    getRequestsByUser() {
        return new Promise((resolve, reject) => {
            Axios.get(`${restURL}/customers/${authAPI.userId}/requests/`, {
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

    /**
     * Post a message to a given request.
     * @param {Number} requestId The Id of the requests that the message is associated with.
     * @param {String} content The string of text for the message.
     * 
     * Returns the direct response, which holds the created message in the data. On failure,
     * returns a stable error.
     */
    postMessage(requestId, content) {
        return new Promise((resolve, reject) => {
            Axios.post(`${restURL}/requests/${requestId}/messages/`, {content: content}, authAPI.getAuthHeader())
            .then(resolve)
            .catch(err => {
                if (err.response) reject(err.response);
                else reject ({status: 0})
            })
        })
    }

    /**
     * Get the messages for a given request.
     * @param {Number} requestId The Id of the request from which the messages will be retrieved from.
     * 
     * Returns the response, which holds in the data the messages. On failure,
     * returns a stable error.
     */
    getMessages(requestId) {
        return new Promise((resolve, reject) => {
            Axios.get(`${restURL}/requests/${requestId}/messages/`, authAPI.getAuthHeader())
            .then(resolve)
            .catch(err => {
                if (err.response) reject(err.response);
                else reject ({status: 0})
            })
        })

    }
}

export default new listingRequestAPI();

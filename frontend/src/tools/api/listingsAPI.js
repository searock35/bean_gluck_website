//Use search string to gather listings from database.
import axios from "axios";
import authAPI from "./authAPI";
import restURL from "./restURL";

class listingsAPI {
    getSchoolListings(book, school) {
        //Use bookId to gather local listings from the database. Return a table with 10 of the listings
        return new Promise((resolve, reject) => {
            axios
                .get(restURL + `/schools/${school}/listings`, {
                    params: { bookId: book },
                })
                .then((listings) => resolve(listings))
                .catch((err) => {
                    if (err.response) reject(err.response);
                    else reject({ status: 0 });
                });
        });
    }

    /**
     * Post a listing based on listing data. Returns the direct response on success, and a stable error on failure.
     */
    postListing(listing) {
        return new Promise((resolve, reject) => {
            axios
                .post(restURL + "/listings/", listing, authAPI.getAuthHeader())
                .then((response) => resolve(response))
                .catch((err) => {
                    if (err.response) reject(err.response);
                    else reject({ status: 0 });
                });
        });
    }

    /**
     * Post a listing search for the book. If user is authenticated, will post the user Id with the data as well.
     * Returns the direct response on success, returns a stable error on failure.
     * @param {Number} bookId The ID of the book the search was for
     * @param {Number} schoolId the ID of the school related to the search
     */
    postListingSearch(bookId, schoolId) {

        return new Promise((resolve, reject) => {
            axios
                .post(
                    restURL + "/listing-search/",
                    { book: bookId, school: schoolId },
                    authAPI.getAuthHeader()
                )
                .then((response) => resolve(response))
                .catch((err) => {
                    if (err.response) reject(err.response);
                    else reject({ status: 0 });
                });
        });
    }


    getLocalListings(book, school) {
        return new Promise((resolve, reject) => {
            axios
                .get(restURL + "/listings/local", {
                    params: {
                        bookId: book,
                        schoolId: school,
                    },
                })
                .then((listings) => resolve(listings))
                .catch((err) => {
                    if (err.response) reject(err.response);
                    else reject({ status: 0 });
                });
        });
    }

    /**
     * Return all the listings posted by an individual user.
     * @param {number} userId
     */
    getListingsByUser(userId) {
        return new Promise((resolve, reject) => {
            axios
                .get(restURL + "/listings/", {
                    params: { userId: userId },
                })
                .then((response) => {
                    return resolve(response.data);
                })
                .catch((err) => {
                    if (err.response) reject(err.response);
                    else reject({ status: 0 });
                });
        });
    }
}

export default new listingsAPI();

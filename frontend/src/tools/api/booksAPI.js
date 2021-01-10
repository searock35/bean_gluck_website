import axios from "axios";
import authAPI from "./authAPI";
import restURL from "./restURL";

//API class that will manage book search engine. Will recieve the current search entry as
//input and return the list of matches.

//Book object: {title, author, edition, id, amount}

class BooksAPI {
    //TEMPORARY PLACEHOLDER FOR API IMPLEMENTATION
    constructor() {
        this.booksArray = [
            {
                title: "Madagascar Unlimited",
                author: "Randall",
                edition: "8th",
                id: "1",
                isbn: "1",
            },
            {
                title: "Django Unhinged",
                author: "Corey",
                edition: "8th",
                id: "2",
                amount: 5,
                isbn: "2",
            },
            {
                title: "Django 2",
                author: "Corey",
                edition: "8th",
                id: "3",
                isbn: "3",
            },
            {
                title: "Esperanza Rising",
                author: "Mr. Horning",
                edition: "8th",
                id: "4",
                isbn: "4",
            },
            {
                title: "Hunger Games",
                author: "JK Rowling",
                edition: "8th",
                id: "5",
                isbn: "5",
            },
            {
                title: "Kryptonite Sucks",
                author: "Superman",
                edition: "8th",
                id: "6",
                isbn: "6",
            },
        ];
    }

    getTestArray() {
        return this.booksArray;
    }

    /**
     * Searches web API for books based on search. Returns list of book info if successful,
     * returns stable error if unsuccessful.
     * @param {string} searchString
     */
    getAutoComplete(searchString) {
        return new Promise((resolve, reject) => {
            axios
                .get(restURL + "/books/search", {
                    params: {
                        search: searchString,
                    },
                })

                .then((response) => resolve(response.data))
                .catch((error) => {
                    if (error.response) reject(error.response);
                    else reject({ status: 0 });
                });
        });
    }

    /**
     * Get a book based on an ID value. Returns the book if successful, an error message if unsuccessful.
     * @param {Number} id
     */
    getBookFromId(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${restURL}/books/${id}/`)
                .then((response) => resolve(response.data))
                .catch((err) => {
                    if (err.response) reject(err.response);
                    else reject({ status: 0 });
                });
        });
    }

    /**
     * Post a book based on its information. Returns the direct response if success, if not returns a stable error
     * @param {Object} bookInfo {title: String, subtitle: String, authors: [{first_name: String, middle_initial: Char, last_name: String}], isbn: String, is_custom: Bool}
     */
    postBook(bookInfo) {
        return new Promise((resolve, reject) => {
            axios
                .post(restURL + "/books/", bookInfo, {
                    headers: {
                        Authorization: "Token " + authAPI.authToken,
                    },
                })
                .then((response) => resolve(response))
                .catch((err) => {
                    if (err.response) reject(err.response);
                    else reject({ status: 0 });
                });
        });
    }
}

export default new BooksAPI();

//Use search string to gather listings from database.
import axios from 'axios';
import restURL from './restURL'
//Listing information to be listed: { firstName, lastName, condition, rentalPrice, sellingPrice }

class listingsAPI {

    //create fake listings to simulate API
    constructor() {
        this.testListingsSchool = [
            {owner: { first_name: "Corey", last_name: "Bean" }, condition: "Good", rentalPrice: "20$", purchase_price: "30$", id: "1"},
            {owner: { first_name: "Corey", last_name: "Bean" }, condition: "Terrible", rentalPrice: "5$", purchase_price: "12$", id: "2"},
            {owner: { first_name: "Corey", last_name: "Bean" }, condition: "Great", rentalPrice: "30$", purchase_price: "60$", id: "3"},
            {owner: { first_name: "Corey", last_name: "Bean" }, condition: "OK", rentalPrice: "20$", purchase_price: "30$", id: "4"},
            {owner: { first_name: "Corey", last_name: "Bean" }, condition: "Brand New", rentalPrice: "50$", purchase_price: "90$", id: "5"},
        ]
    }

    getSchoolListings(book, school) {
        //Use bookId to gather local listings from the database. Return a table with 10 of the listings
        return new Promise((resolve, reject) => {
            axios.get(restURL + '/listings-school', {
                params: {bookId: book,
                schoolId: school}
            })
                .then(listings => resolve(listings))
                .catch(err => reject(err))

        })
                
    }

    getLocalListings(book) {

        return new Promise((resolve, reject) => {
            axios.get(restURL + '/listings-local', {
                params: { bookId: book }
            })
                .then(listings => resolve(listings))
                .catch(err => reject(err))

        })
    }

    getListingsByUser(userId) {
        return(this.testUserListings)
    }
}

export default new listingsAPI();

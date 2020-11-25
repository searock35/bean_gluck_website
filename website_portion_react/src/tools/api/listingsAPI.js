//Use search string to gather listings from database.
import axios from 'axios';

//Listing information to be listed: { firstName, lastName, condition, rentalPrice, sellingPrice }

class listingsAPI {

    //create fake listings to simulate API
    constructor() {
        this.testListingsSchool = [
            {firstName: "Corey", lastName: "Bean", condition: "Good", rentalPrice: "20$", sellingPrice: "30$", listingId: "1"},
            {firstName: "Cassandra", lastName: "Bean", condition: "Terrible", rentalPrice: "5$", sellingPrice: "12$", listingId: "2"},
            {firstName: "Caleb", lastName: "Bean", condition: "Great", rentalPrice: "30$", sellingPrice: "60$", listingId: "3"},
            {firstName: "John", lastName: "Lennon", condition: "OK", rentalPrice: "20$", sellingPrice: "30$", listingId: "4"},
            {firstName: "Sally", lastName: "Bridgewell", condition: "Brand New", rentalPrice: "50$", sellingPrice: "90$", listingId: "5"},
        ]

        this.testUserListings = [
            {title: "Bridge to nowhere", bookId: "8", condition: "Good", rentalPrice: "20", sellingPrice: "30", listingId: "1", requests: "2"},
            {title: "Ender's Legal Fees", bookId: "812", condition: "Terrible", rentalPrice: "5", sellingPrice: "12", listingId: "2", requests: "4"}
        ]
    }

    getSchoolListings(bookId, schoolId) {
        //Use bookId to gather local listings from the database. Return a table with 10 of the listings
        let ret = [];

        axios.get('localhost:8080/api/listings/?bookId={bookId}&schoolId={schoolId}')
            .then(listings => ret = listings)
            .catch(err => ret = this.testListingsSchool)

        return(ret);
    }

    getLocalListings(bookId, userId) {

        return(this.testListingsSchool)
    }

    getListingsByUser(userId) {
        return(this.testUserListings)
    }
}

export default new listingsAPI();

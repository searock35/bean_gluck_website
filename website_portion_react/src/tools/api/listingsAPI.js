//Use search string to gather listings from database.

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
    }

    getSchoolListings(bookId, userId) {
        //Use bookId to gather local listings from the database. Return a table with 10 of the listings
        return(this.testListingsSchool);
    }

    getLocalListings(bookId, userId) {

        return(this.testListingsSchool)
    }
}

export default new listingsAPI();

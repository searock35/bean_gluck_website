import axios from 'axios'
import restURL from './restURL'

//API class that will manage book search engine. Will recieve the current search entry as
//input and return the list of matches.

//Book object: {title, author, edition, id, amount}

class BooksAPI {
    
    //TEMPORARY PLACEHOLDER FOR API IMPLEMENTATION
    constructor() {
        this.booksArray = [
            { title: "Madagascar Unlimited", author: "Randall", edition: "8th", id: "1", isbn: "1" },
            { title: "Django Unhinged", author: "Corey", edition: "8th", id: "2", amount: 5, isbn: "2"},
            { title: "Django 2", author: "Corey", edition: "8th", id: "3", isbn: "3" },
            { title: "Esperanza Rising", author: "Mr. Horning", edition: "8th", id: "4", isbn: "4"},
            { title: "Hunger Games", author: "JK Rowling", edition: "8th", id: "5", isbn: "5" },
            { title: "Kryptonite Sucks", author: "Superman", edition: "8th", id: "6", isbn: "6" },
        ]
    }

    getTestArray() {
        return(this.booksArray);
    } 

    //NEEDS API IMPLEMENTATION
    getAutoComplete(searchString) {

        return new Promise((resolve, reject) => {
            axios.get(restURL + '/search?search_string=' + searchString)
            
                .then( (response) => {
                    // console.log('adjusting ret value', response.data[0])
                    resolve(this.booksArray);

                }, 
                (error) => {
                    reject(this.booksArray);
                    //STILL A BUG FEATURE
                });
    
        })
   }

    //NEEDS API IMPLEMENTATION.
    getBookFromId(id) {
        let defaultBook = {title: "Book not recognized.", author: "Unknown", edition: "Unknown", id: {id}}
        this.booksArray.forEach((book) => {
            if ( book.id === id ) {
                defaultBook = book;
            }
        })  
        return defaultBook;  
    }

}


export default new BooksAPI();
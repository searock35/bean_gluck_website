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

    getAutoComplete(searchString) {

        return new Promise((resolve, reject) => {
            axios.get(restURL + '/books/search', {
                params: {
                    search: searchString
                }
            })
            
                .then((response) => resolve(response.data)) 
                .catch((error) => {
                    console.log("REJECTED");
                    reject(this.booksArray);
                    //STILL A BUG FEATURE
                });
    
        })
   }

    getBookFromId(id) {
        return new Promise((resolve, reject) => {
            axios.get(restURL + '/books/' + id)
                .then((response) => resolve(response.data))
                .catch((err) => reject(err))
        })
    }

}


export default new BooksAPI();
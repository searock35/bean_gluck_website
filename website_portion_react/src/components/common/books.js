
//API class that will manage book search engine. Will recieve the current search entry as
//input and return the list of matches.

class BooksAPI {
    

    getAutoComplete(searchString) {

        console.log("search string", searchString);

        const booksArray = [
            { title: "Madagascar Unlimited", author: "Randall", edition: "8th", id: "1" },
            { title: "Django Unhinged", author: "Corey", edition: "8th", id: "2", amount: 5},
            { title: "Django 2", author: "Corey", edition: "8th", id: "3" },
            { title: "Esperanza Rising", author: "Mr. Horning", edition: "8th", id: "4" },
            { title: "Hunger Games", author: "JK Rowling", edition: "8th", id: "5" },
            { title: "Kryptonite Sucks", author: "Superman", edition: "8th", id: "6" },
        ]

        if(searchString==='') return [];
        return booksArray;
    }

}


export default new BooksAPI();
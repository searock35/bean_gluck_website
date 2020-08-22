import React from 'react';
import auth from '../api/auth';
import './style/HomeStyle.css';
import { Link } from 'react-router-dom';



class Home extends React.Component {
    constructor(props) {
        super(props);

        this.clearSearch = this.clearSearch.bind(this);
        this.onChangeSearchText = this.onChangeSearchText.bind(this);
        this.updateBookSelection = this.updateBookSelection.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.loadBookSelection = this.loadBookSelection.bind(this);
        // this.updateBookSelection = this.updateBookSelection.bind(this);

        //Set up initial state for book list under search bar and the text in the search bar. Will need to eventually add lifecycle methods to this class to free up space
        this.state = {
            bookList: [
                { title: "Madagascar Unlimited", author: "Randall", edition: "8th", id: "1" },
                { title: "Django Unhinged", author: "Corey", edition: "8th", id: "2" },
                { title: "Django 2", author: "Corey", edition: "8th", id: "3" },
                { title: "Esperanza Rising", author: "Mr. Horning", edition: "8th", id: "4" },
                { title: "Hunger Games", author: "JK Rowling", edition: "8th", id: "5" },
                { title: "Kryptonite Sucks", author: "Superman", edition: "8th", id: "6" },
            ],

            searchText: 'Enter book ISBN, Title, Author'
        };
    }



    loadBookSelection(e) {
        console.log(e.target)
    }

    clearSearch() {
        this.setState({searchText: ''});
    }

    onChangeSearchText(e) {
        console.log(e.target.value);
        this.setState({searchText: e.target.value});
        if(e.target.value==="") {
            //make bookDropDown visible in future
            document.getElementsByClassName("bookDropDown")[0].classList.add("invisible");
            // e.target.removeClass("invisible");
        } else {
            document.getElementsByClassName("bookDropDown")[0].classList.remove("invisible");
        }
        this.updateBookSelection();
    }

    updateBookSelection() {
        //to do
        //GET information from book using /search/search_text (need to replace spaces with underscores probably)
        //Set state of books using search results from database
    }

    onSubmit() {
        console.log("Form submitted");
        // window.location("localhost:3000/search");
        //need to handle if the user clicks on an item on the book list
    }

    MakeBookDropDown(props) {

        const allBooks = props.books.map((book) => 
        <li className="bookListing" key={book.id}><b>Title: {book.title}</b>
            <ul className="bookInfo">
                <li className="author">Author: {book.author}</li>
                <li className="edition">Edition: {book.edition}</li>
            </ul>
        </li>
        )
        return(<ul>{allBooks}</ul>);
    }

    render() {
        return (
            <div className="container">
                <Link to="/login">Login page</Link>
                <button onClick={() => console.log(auth.isAuth())}>Am i authenticated?</button>
                <h2>Your one stop shop for buying and selling books, <em>on campus!</em></h2>

                <form onSubmit={this.onSubmit}>
                    <div id="book_search_bar" className="form-group"><label>Book Title/ISBN:</label>
                        <input 
                            id="mainSearch"
                            className="form-control form-control-lg"
                            value={this.state.searchText}
                            name="name"
                            type="text"
                            onClick={this.clearSearch}
                            onChange={this.onChangeSearchText}
                        />
                    </div>
                    <div className="form-group invisible bookDropDown">
                        <this.MakeBookDropDown books={this.state.bookList} />
                    </div>
                    <div className="form-group">
                        Select your school:
                        <select name="school_select">
                                <option value="messiah">Messiah University</option>
                                <option value="penn_state">Penn State University</option>
                            </select>
                        <input defaultChecked="checked" name="local" type="checkbox" value="daily" /> Include Local Searches <br />
                        <input id="form_submission" type="submit" value="Search" />
                    </div>
                </form>

            </div>

        )
    }
}

export default Home;
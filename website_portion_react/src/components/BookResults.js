import React from 'react';


function Book(props) {
    return(
        <li>Title: {props.bookInfo.book} Author: {props.bookInfo.author}</li>
    )
};

class BookResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = [
            {book: "Madagascar Unlimited", author: "Randall"},
            {book: "Django Unhinged", author: "Corey"}
        ];
    }



    render() {
        return(
        
            this.state.map((info) => 
            <Book bookInfo={info}></Book>)

    

            
        )
    }
};
export default BookResults;
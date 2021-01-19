import React, { useState } from 'react';
import BookDropDown from '../home/components/BookDropDown';

const defaultSearchString = "Search by ISBN, Title, etc."

/** The searchbar for the navbar, which takes just a schoolId so the links work properly. */
const NavbarSearch = ({schoolId}) => {
    const handleSearchClick = () => {
        console.log("attempted search")
    }

    const [searchString, setSearchString] = useState("");



    return (
        <div className="navbar-search">
           <div className="navbar-search-button theme-background" onClick={handleSearchClick}>
               <img src="https://via.placeholder.com/20x19" alt="Search Hourglass"/>
           </div>
           <div className="form-block">
               <input type="text" className="navbar-search-field" maxLength="256" placeholder={defaultSearchString} value={searchString} onChange={(e) => setSearchString(e.target.value)}/>
           </div>
           <BookDropDown searchString={searchString} className="navbar" defaultSearchString={defaultSearchString} schoolId={schoolId} />
        </div>
    );
}

export default NavbarSearch;

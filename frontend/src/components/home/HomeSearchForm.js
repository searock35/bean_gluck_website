import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import BookDropDown from "./components/BookDropDown";

const defaultSearchString = "Enter book ISBN, Title, Author";

function HomeSearchForm({schoolId}) {
    const [searchString, setSearchString] = useState();
    const [warningModal, setWarningModal] = useState();

    const onSearchSubmit = () => {
        setWarningModal("Dedicated page for book search not yet implemented. Please use the options in the book dropdown to create or find books.")
    };




    return (
        <div className="home-search-form">
            <Modal show={!!warningModal} onHide={()=> setWarningModal()}>
                <Modal.Header>
                    <Modal.Title>Warning...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {warningModal}
                </Modal.Body>
            </Modal>
            <div className="home-search-bar">
                <div className="home-search-button theme-background" onClick={onSearchSubmit}>
                    <img
                        src="https://via.placeholder.com/60"
                        alt="Search Glass"
                    />
                </div>
                <input
                    className="home-search-input"
                    type="text"
                    value={searchString}
                    autoFocus={true}
                    onChange={(e) => setSearchString(e.target.value)}
                    placeholder={defaultSearchString}
                />
            </div>
            <BookDropDown
                className="home"
                searchString={searchString}
                defaultSearchString={defaultSearchString}
                schoolId={schoolId}
                forceHide={false}
            />
            <div className="home-search-dropdown"></div>
        </div>
    );
}

export default HomeSearchForm;

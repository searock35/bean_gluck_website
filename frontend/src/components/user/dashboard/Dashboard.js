import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../../tools/react/UserContext';
import './Dashboard.css';
import { Button } from 'react-bootstrap';
import listingsAPI from '../../../tools/api/listingsAPI';
import listingRequestAPI from '../../../tools/api/listingRequestAPI';
import DetailedListing from './components/DetailedListing';
import DetailedRequest from './components/DetailedRequest';
import { useHistory } from 'react-router-dom';


function ListingsBox(props) {
    let userListings = <h1>Loading...</h1>
    if (props.listings && !props.listings.status) {
        userListings = props.listings.map((listing) => (<li key={listing.id}><DetailedListing {...listing} /></li>));
    }

    return (
        <div className="scroll-containers listings-box">
            <h1>My Listings</h1>
            <ul>
                {userListings}
            </ul>
        </div>
    )
}

function RequestsBox(props) {
    let userRequests = <h1>Loading...</h1>
    if (props.requests && !props.requests.status) {
        userRequests = props.requests.map((request) => (<li key={request.id}><DetailedRequest {...request} /></li>));
    }


    return (
        <div className="scroll-containers requests-box">
            <h1>Requests</h1>
            <ul>
                {userRequests}
            </ul>
        </div>
    )
}

function UserInfo() {
    const history = useHistory();
    const userInfo = useContext(UserContext);
    const editRedirect = () => history.push("./" + userInfo.username + "/edit");

    return (
        <div className="user-info">
            <ul>
                <li>Name: {userInfo.first_name} {userInfo.last_name}</li>
                <li>Major: {userInfo.majors[0]}</li>
                <li>Graduating Year: {userInfo.grad_year}</li>
                <li>Home City: {userInfo.home_city} <Button onClick={editRedirect}>Edit</Button></li>

            </ul>
        </div>
    )
}

function Dashboard() {

    const currentUser = useContext(UserContext);
    const [listings, setListings] = useState()
    const [requests, setRequests] = useState();


    useEffect(() => {
        let isMounted = true;
        listingsAPI.getListingsByUser(currentUser.user_id)
            .then(listings => isMounted && setListings(listings))
            .catch(err => isMounted && setListings(err))

        listingRequestAPI.getRequestsByUser(currentUser.user_id)
            .then(requests => isMounted && setRequests(requests))
            .catch(err => isMounted && setRequests(err))

    }, [currentUser]);

    return (
        <div>
            <div className="page-heading">
                <h1>Dashboard for {currentUser.username}</h1>
                <UserInfo></UserInfo>

            </div>

            <div className="user-lists">
                <ListingsBox listings={listings}></ListingsBox>
                <RequestsBox requests={requests}></RequestsBox>
            </div>
        </div>
    )
}

export default Dashboard;
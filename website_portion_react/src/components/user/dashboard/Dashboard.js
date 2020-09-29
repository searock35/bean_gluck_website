import React, { useContext } from 'react';
import UserContext from '../../../tools/react/UserContext';
import './Dashboard.css';
import UserInfoAPI from '../../../tools/api/userInfoAPI';
import { Button } from 'react-bootstrap';
import listingsAPI from '../../../tools/api/listingsAPI';
import listingRequestAPI from '../../../tools/api/listingRequestAPI';
import Listing from './components/Listing';
import OutgoingRequest from './components/OutgoingRequest';


function ListingsBox(props) {
    const data = listingsAPI.getListingsByUser(props.userId)
    const userListings = data.map((value) => (<li key={value.listingId}><Listing {...value} /></li>));
    return(
        <div className="listings-box">
            <h1>My Listings</h1>
            <ul>
                {userListings}
            </ul>
        </div>
    )
}

function RequestsBox(props) {
    const data = listingRequestAPI.getRequestsByUser(props.userId);
    const userRequests = data.map((value) => (<li key={value.requestId}><OutgoingRequest {...value} /></li>));

    return(
        <div className="requests-box">
            <h1>Outgoing Requests</h1>
            <ul>
                {userRequests}
            </ul>
        </div>
    )
}

function UserInfo() {
    const userInfo = UserInfoAPI.getUserInfo();
    

    return(
        <div className="user-info">
            <ul>
                <li>Name: {userInfo.firstName} {userInfo.lastName}</li>
                <li>Major: {userInfo.major}</li>
                <li>Graduating Year: {userInfo.gradYear}</li>
                <li>Home City: {userInfo.homeCity} <Button href={"./" + userInfo.username + "/edit"}>Edit</Button></li>
            
            </ul>
        </div>
    )
}

function Dashboard() {
    
    const currentUser = useContext(UserContext);

    return (
        <div>
            <div className="page-heading">
                <h1>Dashboard for {currentUser.username}</h1>
                <UserInfo></UserInfo>

            </div>
            
            <div className="user-lists">
                <ListingsBox userId={currentUser.userId}></ListingsBox>
                <RequestsBox userId={currentUser.userId}></RequestsBox>
            </div>
        </div>
    )
}

export default Dashboard;
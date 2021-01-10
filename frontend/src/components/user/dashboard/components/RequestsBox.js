import React, { useEffect, useState } from "react";
import listingRequestAPI from "../../../../tools/api/listingRequestAPI";
import DetailedRequest from "./DetailedRequest";
import "./styles/RequestsBox.css"

function ListingRequests({unreadDictionary}) {
    const [requests, setRequests] = useState([]);
    const [activeRequest, setActiveRequest] = useState(0);

    useEffect(() => {
        let isMounted = true;

        listingRequestAPI
            .getRequestsByUser()
            .then((requests) => isMounted && setRequests(requests))
            .catch((err) => console.log(err));

        return () => (isMounted = false);
    }, []);
    console.log(unreadDictionary)

    let renderedRequests = requests.map((request) => (
        <li key={request.id}>
            <DetailedRequest
                context="request"
                unreadMessages={unreadDictionary[request.id]}
                request={request}
                active={activeRequest === request.id}
                setActive={(isActive) => {
                    isActive
                        ? setActiveRequest(request.id)
                        : setActiveRequest(0);
                }}
            />
        </li>
    ));

    return (
        <div className="scroll-container requests-container">
            <h2>My Listing Requests - {requests.length}</h2>
            <ul>{renderedRequests}</ul>
        </div>
    );
}

export default ListingRequests;

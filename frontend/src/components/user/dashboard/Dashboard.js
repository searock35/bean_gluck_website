import React, { useEffect, useState } from "react";
import ListingsBox from "./components/ListingsBox";
import RequestsBox from "./components/RequestsBox";
import UserInfo from "./components/UserInfo/UserInfo";
import restURL from "../../../tools/api/restURL";
import authAPI from "../../../tools/api/authAPI";
import axios from 'axios';

import "./Dashboard.css";

function Dashboard() {
    const [unreadRequestsDictionary, setUnreadRequestDictionary] = useState({})

    useEffect(() => {
        let isMounted = true;

        axios.get(`${restURL}/customers/${authAPI.userId}/unread-notifications/`, authAPI.getAuthHeader())
            .then(response => isMounted && setUnreadRequestDictionary(response.data))
            .catch(console.log)
        
        return () => isMounted = false

    }, [])

    return (
        <div className="user-dashboard">
            <UserInfo />

            <ListingsBox />
            <RequestsBox unreadDictionary={unreadRequestsDictionary}/>
        </div>
    );
}

export default Dashboard;

import React, { useEffect, useState, useRef } from "react";
import listingRequestAPI from "../../../../tools/api/listingRequestAPI";
import Message from "./Message";

import "./styles/MessengerPopup.css"
/**
 * Renders a button that will display a series of messages given some basic info.
 * @param {Object} request The full request object for which the messages are for
 * @param {Number} userId The ID of the user that is viewing the messages
 * @param {Boolean} active Whether this message window is open or not
 * @param {Boolean} setActive Handler to set this window to active/inactive
 */
const MessengerPopup = ({ request, userId, active, setActive }) => {
    const [messages, setMessages] = useState([]);
    const intervalRef = useRef();
    const [error, setError] = useState();
    const [messageQueue, setMessageQueue] = useState([]);
    const [newMessage, setNewMessage] = useState({content: "", state:"null-state", stateDetail:"Uploading...", dateTime: ""});

    useEffect(() => {
        let isMounted = true;

        const getMessages = () => {
            listingRequestAPI
                .getMessages(request.id)
                .then((response) => isMounted && setMessages(response.data))
                .catch((err) => {
                    console.log(err);
                    isMounted && setError(err.status);
                });
        };

        if (active) {
            getMessages()
            intervalRef.current = setInterval(getMessages, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        
        return () => isMounted = false;
    }, [active, request.id]);

    const textChangeHandler = (e) => {
        e.preventDefault();
        setNewMessage({...newMessage, content: e.target.value})

    }

    const submitMessageHandler = () => {
        let newMessageQueue = messageQueue.concat();
        let index = newMessageQueue.push(newMessage) - 1;
        setMessageQueue(newMessageQueue);

        listingRequestAPI.postMessage(request.id, newMessage.content)
            .then(response => {
                let newMessages = messages.concat()
                newMessages.push(response.data)
                setMessages(newMessages)
                setMessageQueue(messageQueue.concat().splice(index, 1)) 

            })
    }

    // handle unmount
    useEffect(() => {
        // const intervalId = intervalRef.current;
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    console.log(userId)
    return (
        <div className="messenger-container">
            {/* {active && (
                <div className="messenger-popup-container">
                    <ul className="message-list">
                        {messages.map((message) => (
                            <li className={(message.owner.id === userId) ? "user-message" : "peer-message"}><Message content={message.content} state={(message.seen) ? "seen" : "uploaded"}/></li>
                        ))}
                        {messageQueue.map((message) => (
                            <li><Message {...message}/></li>
                        ))}
                    </ul>
                    <p onClick={() => setActive(false)}>Close Me!</p>

                    <input type="text" onChange={textChangeHandler} value={newMessage.content} onKeyDown={(e) => {if (e.key === "Enter") submitMessageHandler()}}/>
                    <button onClick={submitMessageHandler}>Send</button>
                </div>
            )} */}
            
            <div className="messenger-popup-container" hidden={!active}>
                <ul className="message-list">
                    {messages.map((message) => {
                        console.log(message.owner.id);
                        return (<li className={(message.owner.id === userId) ? "user-message" : "peer-message"}><Message content={message.content} state={(message.seen) ? "seen" : "uploaded"}/></li>)
                    })}
                    {messageQueue.map((message) => (
                        <li><Message {...message}/></li>
                    ))}
                </ul>
                <p onClick={() => setActive(false)}>Close Me!</p>

                <input type="text" onChange={textChangeHandler} value={newMessage.content} onKeyDown={(e) => {if (e.key === "Enter") submitMessageHandler()}}/>
                <button onClick={submitMessageHandler}>Send</button>
            </div>
        </div>
    );
};



export default MessengerPopup;

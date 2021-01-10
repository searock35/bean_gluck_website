import React, { useState } from 'react';

/**
 * A message that has an additional state, dateTime, and stateDetail.
 * @param {String} content The message string/body 
 * @param {String} state The state, being "sent", "error", or "seen"
 * @param {String} stateDetail Additional message to be displayed on click to supplement state.
 * @param {Date} dateTime The date and time that the message was sent.
 */
const Message = ({content, state, stateDetail, dateTime}) => {

    const [detailState, setDetailState] = useState(false);

    const onClickHandler = () => {
        setDetailState(!detailState)
    }

    let stateClass = "null-state"
    switch (state) {
        case "sent":
            stateClass = "sent-state";
            break;
        
        case "error":
            stateClass = "error-state"
            break;
        
        case "seen":
            stateClass = "seen-state"
            break;

        default:
            stateClass = "null-state"

            
    }
    return (
        <div className="messenger-message">
            <p>
            {content} 
            </p>
            <div className={stateClass}>{state}</div>
            <div className="messenger-message-detail" hidden={!detailState}>
                <p>{stateDetail}</p>
            </div>
        </div>
    );
}

export default Message;

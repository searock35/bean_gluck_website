import axios from 'axios';
import authAPI from './authAPI';
import restURL from './restURL';

class messageAPI {

    /**
     * 
     * @param {Number} requestId The ID of the request the message is for
     * @param {String} content The message contents.
     * Returns the direct response with posting data on success, a stable error on failure.
     */
    postMessage(requestId, content) {
        return new Promise((resolve, reject) => {
            axios.post(`${restURL}/requests/${requestId}/messages/`, {content: content}, authAPI.getAuthHeader())
            .then(resolve)
            .catch(err => {
                if (err.response) reject(err.response)
                else reject({status: 0})
            })
        })


    }
}







export default new messageAPI()
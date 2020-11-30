//Use search string to gather listings from database.
import axios from 'axios';
import restURL from './restURL'

//Listing information to be listed: { firstName, lastName, condition, rentalPrice, sellingPrice }

class generalAPI {

    getSchoolsBasic() {

        return new Promise((resolve, reject) => {
            axios.get(restURL + '/school-list-basic')
                .then(response => resolve(response.data))
                .catch(err => reject(err)) 
        })
    }
}

export default new generalAPI();

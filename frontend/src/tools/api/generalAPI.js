//Use search string to gather listings from database.
import axios from "axios";
import restURL from "./restURL";
import authAPI from "./authAPI";

//Listing information to be listed: { firstName, lastName, condition, rentalPrice, sellingPrice }

class generalAPI {
    getSchoolsBasic() {
        return new Promise((resolve, reject) => {
            axios
                .get(restURL + "/schools/basic/")
                .then((response) => resolve(response.data))
                .catch((err) => reject(err));
        });
    }

    postNotificationRequest(bookId, schoolId) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    restURL + "/notification-requests/",
                    { book: bookId, school: schoolId },
                    authAPI.getAuthHeader()
                )
                .then((response) => resolve(response))
                .catch((err) => {
                    if (err.response) reject(err.response);
                    else reject({ status: 0 });
                });
        });
    }

    getEditionSting(edition) {
        switch (edition) {
            case 1:
                return ("1st") 
            case 2:
                return "2nd"
            case 3:
                return "3rd";
            default:
                return `${edition}th`
        }
    }
}

export default new generalAPI();

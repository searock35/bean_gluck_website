# API Functionality Request
- Listings: given bookId and schoolId, find listings for user at that school and locally
- Auth: given username and password, return JWT token so user's browser can post listings on user's behalf
- Booksearch: given search string, return limited (~12) book options
- **All auth:**
- Logout: given JWT token and logout request, make JWT token obsolete on API side
- User Info: given JWT token and user info request, return stored user data to client
- IsAuth: given JWT token, verify that the token has not expired yet and return true/false
- Register: given registration information (firstName, lastName, email, password (len 8 -32), school) register user in database, return JWT token

import Cookies from 'universal-cookie';



//PARAMS:
//inputs:
//outputs: -> the authtoken/refresh token stored in the cookies
function getTokenFromCookies() {
    
    const cookies = new Cookies();

    cookies.set('authToken', 'Pacman', {
        httpOnly: true,
        path: '/user',
    });

    console.log(cookies.get('myCat')); // Pacman

    //cookies.get('authToken');
    
    const authToken = "01220420";

    //for testing purposes, return a fake authtoken
    return authToken;
}

export default getTokenFromCookies;
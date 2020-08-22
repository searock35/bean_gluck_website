


function getStoredUser() {
    const defaultUser = {
        username: 'Guest',
        email: '',
        id: '0',
        schoolId: '01220420',
        isAuth: false
    };
    
    const storedUser = {
        ...defaultUser,
        isAuth: false
    };

    return storedUser;
}

export default getStoredUser();
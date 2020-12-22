const defaultColorPrimary = '#0a173d';
const defaultColorSecondary = '#75888f';

const defaultUser = {
    username: 'Guest',
    email: '',
    majors: [
        'Book Selling'
    ],
    grad_year: 2020,
    home_city: "Book City",
    user_id: 0,
    school_id: 0,
    school_name: 'Text Trader University',
    school_primary_color: defaultColorPrimary,
    school_secondary_color: defaultColorSecondary,
    isAuth: false
};

const getDefaultUser = () => defaultUser;

export default getDefaultUser;




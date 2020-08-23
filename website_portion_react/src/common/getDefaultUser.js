const defaultColorPrimary = '#0a173d';
const defaultColorSecondary = '#75888f';

const defaultUser = {
    username: 'Guest',
    email: '',
    userId: '0',
    schoolId: '01220420',
    schoolName: 'Text Trader University',
    schoolColorPrimary: defaultColorPrimary,
    schoolColorSecondary: defaultColorSecondary,
    isAuth: false
};

const getDefaultUser = () => defaultUser;

export default getDefaultUser;




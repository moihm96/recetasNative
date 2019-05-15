import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    USER_UPDATE, USER_CREATE, LOG_OUT
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    userName:'',
    sexo:''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_CREATE:
            return {...INITIAL_STATE, user: action.payload}
        case USER_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed.', password: '', loading: false };
        case LOG_OUT:
            console.log('Sign Out success')
            return {...state,...INITIAL_STATE, user: action.payload};
        default:
            return state;
    }
};

import {
    USER_UPDATE,
    USER_CREATE, UPDATE_USER, GET_GENERO, USER_CREATE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    displayName:'',
    email: '',
    password: '',
    photoURL:'',
    genero:'',
    error:'',
    user:null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {...state, INITIAL_STATE, user: action.payload};
        case GET_GENERO:
            return {...state, genero:action.payload}
        case USER_CREATE:
            return {INITIAL_STATE, user:action.payload};
        case USER_CREATE_FAIL:
            return {INITIAL_STATE, error:action.payload};
        case USER_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};

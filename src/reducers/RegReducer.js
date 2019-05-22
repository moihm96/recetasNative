import {
    USER_UPDATE,
    USER_CREATE, UPDATE_USER
} from '../actions/types';

const INITIAL_STATE = {
    displayName:'',
    email: '',
    password: '',
    sexo:'',
    photoURL:''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_CREATE:
            return INITIAL_STATE;
        case USER_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};

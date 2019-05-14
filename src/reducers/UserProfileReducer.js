import {FETCH_USER_SUCCESS} from "../actions/types";

const INITIAL_STATE = {
    userDetails:null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, userDetails: action.payload };
        default:
           return state
    }
}
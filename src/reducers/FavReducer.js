import {ADD_TO_FAVORITES, DELETE_FAVORITES, FETCH_FAVORITES} from "../actions/types";

const INITIAL_STATE={}

export default (state= INITIAL_STATE, action) =>{
    switch (action.type) {
        case ADD_TO_FAVORITES:
            return INITIAL_STATE;
        case DELETE_FAVORITES:
            return INITIAL_STATE;
        case FETCH_FAVORITES:
            return action.payload;
        default:
            return state;
    }
}
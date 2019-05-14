import {FETCH_ALL_RECIPES_SUCCESS} from "../actions/types";

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_RECIPES_SUCCESS:
            //console.log(action)
            return action.payload
        default:
            return state
    }
}
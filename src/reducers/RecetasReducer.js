import { FETCH_OWN_RECIPES} from "../actions/types";

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_OWN_RECIPES:
            return action.payload
        default:
            return state
    }
}
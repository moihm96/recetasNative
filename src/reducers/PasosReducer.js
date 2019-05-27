import {SET_PASO} from "../actions/types";

const INITIAL_STATE = {
    pasos:[]
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PASO:
            return {
                ...state,
                pasos: state.pasos.concat(action.payload)
            };
        default:
            return state;
    }
}
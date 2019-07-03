import {} from "../actions/types";
import {SET_COMENTARIOS} from "../actions/types";
import {FETCH_COMENTARIOS} from "../actions/types";
import {SET_PUNTUACION} from "../actions/types";

const INITIAL_STATE = {
    puntuacion:0,
    comentarios:[],
    haveComment:true
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_COMENTARIOS:
            //console.log(action)
            return { ...state, haveComment: action.payload };
        case FETCH_COMENTARIOS:
            return { ...state, comentarios: action.payload };
        case SET_PUNTUACION:
            return { ...state, puntuacion: action.payload };
        default:
            return state
    }
}
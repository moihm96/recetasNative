import {SET_PASO} from "./types";

export const setPaso = (paso) =>{
    return{
        type: SET_PASO,
        payload: paso
    }
}
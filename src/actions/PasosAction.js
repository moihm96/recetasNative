import {SET_PASO, SET_PASOs} from "./types";

export const setPaso = (paso) =>{
    return{
        type: SET_PASO,
        payload: paso
    }
}
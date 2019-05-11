import * as firebase from 'firebase'
import {ADD_TO_FAVORITES, DELETE_FAVORITES, FETCH_FAVORITES} from "./types";

export const fecthFav = (id) =>{

    return (dispatch) => {
        return firebase.database().ref(`/user/${id}/favorites`)
            .on('value',snapshot =>{
                dispatch({type: FETCH_FAVORITES, payload: snapshot.val()})
            })
    }
}
export const addFav =(recipe,id) => {

    return (dispatch) => {
        return firebase.database().ref(`/user/${id}/favorites`).child(`${recipe.uid}`).set(recipe)
            .then(() =>{
                dispatch({type : ADD_TO_FAVORITES} );
            });
    }
}

export const deleteFav = (uid,id) => {
    return (dispatch) => {
        return firebase.database().ref(`/user/${id}/favorites/${uid}`)
            .remove()
            .then(()=>{
                dispatch({type: DELETE_FAVORITES})
            });
    }
}
import {FETCH_OWN_RECIPES} from "./types";
import * as firebase from 'firebase'
export const fetchRecipes = (id) => {
    return (dispatch) => {
        return firebase.database().ref(`/user/${id}/recetas`)
            .on('value',snapshot =>{
                dispatch({type: FETCH_OWN_RECIPES, payload: snapshot.val()})
            })
    }
}
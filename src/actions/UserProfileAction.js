import {FETCH_USER_SUCCESS} from "./types";
import * as firebase from 'firebase'

export const userFetch = () => {
    const {currentUser} = firebase.auth();
    console.log(currentUser)

    if(currentUser){
        return (dispatch) => {
            firebase.database().ref(`/user/${currentUser.uid}/details`)
                .on('value', snapshot => {
                    dispatch({ type: FETCH_USER_SUCCESS, payload: snapshot.val() });
                });
        };
    }else{
        return (dispatch => {
            dispatch({type: FETCH_USER_SUCCESS, payload: null})
        })
    }
};


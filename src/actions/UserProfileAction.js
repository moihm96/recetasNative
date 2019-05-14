import {FETCH_USER_SUCCESS} from "./types";
import * as firebase from 'firebase'
import {Actions} from "react-native-router-flux";

export const userFetch = (id) => {

        return (dispatch) => {
            firebase.database().ref(`/user/${id}/details`)
                .on('value', snapshot => {
                    dispatch({ type: FETCH_USER_SUCCESS, payload: snapshot.val() });
                    Actions.usersRecetas();
                });
        };
};


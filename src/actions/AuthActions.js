import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER, LOG_OUT
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }, election) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user, election))
            .catch(() => loginUserFail(dispatch));
    };
};


const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
    Actions.register()
};

const loginUserSuccess = (dispatch, user, election) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    switch(election) {
        case 1:
            Actions.favoritos()
            break;
        case 2:
            Actions.addRecetas()
            break;
        case 3:
            Actions.ownRecetas()
            break
        default:
        Actions.userRecetas()
    }
};

export const signOut = () =>{
    return(dispatch) =>{
        firebase.auth().signOut().then(() =>{
            dispatch({
                type: LOG_OUT,
                payload: null
            })
            Actions.usersRecetas();
        });
    }
}

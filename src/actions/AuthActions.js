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

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password).then(
            (user) =>{ loginUserSuccess(dispatch, user)}
        ).catch(
            (error) => {
                let errorCode= error.code
                loginUserFail(dispatch, errorCode)
            }
        )
    };
};


const loginUserFail = (dispatch, error) => {
    switch (error) {
        case 'auth/invalid-email':
            return dispatch({
                type:LOGIN_USER_FAIL,
                payload:'El email no es correcto'
            })
        case 'auth/user-not-found':
            return dispatch({
                type:LOGIN_USER_FAIL,
                payload:'El usuario no existe'
            })
        case 'auth/wrong-password':
            return dispatch({
                type:LOGIN_USER_FAIL,
                payload:'La contraseña es incorrecta'
            })
        default:
            return dispatch({
                type: LOGIN_USER_FAIL,
                payload: 'No se ha podido autenticar'
            })

    }
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    Actions.usersRecetas()


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

import {FETCH_OWN_RECIPES, GET_GENERO, USER_CREATE, USER_CREATE_FAIL, USER_UPDATE} from "./types";
import * as firebase from 'firebase';
import {Actions} from "react-native-router-flux";

export const userUpdate = ({prop,value}) =>{
    return{
        type: USER_UPDATE,
        payload: {prop,value}
    }
}

export const createUser =({userName,email,password,genero, photoUrl}) => {
    return(dispatch) =>{

        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then( user => {
                firebase.database().ref(`/user/${user.uid}`).set({genero})
               user.updateProfile({
                   displayName:userName,
                   photoURL:photoUrl,
               }).then(() =>{
                   dispatch({
                       type: USER_CREATE,
                       payload: user
                   });
                   Actions.usersRecetas();
               })

            }).catch((error)=>{
                console.log(error)
                let errorCode = error.code
                dispatch({
                    type: USER_CREATE_FAIL,
                    payload: errorCode
                })
        })
    }

}

export const getGenero = (uid) =>{
    return(dispatch) =>{
        firebase.database().ref(`/user/${uid}/genero`)
            .on('value',snapshot =>{
            dispatch({type: GET_GENERO, payload: snapshot.val()})
        })

    }
}

export const updateUser = (user,uid,displayName,email,genero,photoURL) =>{
    return(dispatch) =>{
        user.updateEmail(email).then(()=>{
            user.updateProfile({
                displayName:displayName,
                photoURL:photoURL
            }).then(()=>{
                firebase.database().ref(`user/${uid}/genero`).set(genero).then(
                    console.log("Se ha añadido el genero")
                ).then( ()=>{
                    dispatch({
                        type: USER_CREATE,
                        payload: user
                    });
                    Actions.showPerfil();
                })
            })
        })
    }

}
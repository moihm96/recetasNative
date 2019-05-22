import { USER_CREATE, USER_UPDATE} from "./types";
import * as firebase from 'firebase';
import {Actions} from "react-native-router-flux";

export const userUpdate = ({prop,value}) =>{
    return{
        type: USER_UPDATE,
        payload: {prop,value}
    }
}

export const createUser =({userName,email,password,sexo, photoUrl}) => {
    return(dispatch) =>{

        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then( user => {
               user.updateProfile({
                   displayName:userName,
                   photoURL:photoUrl,
                   sexo:sexo
               }).then(() =>{
                   dispatch({
                       type: USER_CREATE,
                       payload: user
                   });
                   Actions.usersRecetas();
               })

            })
    }

}

export const updateUser = ({uid,userName,email,password,sexo, photoUrl}) =>{

}
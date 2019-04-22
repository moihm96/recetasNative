import {USER_CREATE, USER_UPDATE} from "./types";
import * as firebase from 'firebase';
import {Actions} from "react-native-router-flux";

export const userUpdate = ({prop,value}) =>{
    return{
        type: USER_UPDATE,
        payload: {prop,value}
    }
}

export const createUser =({userName,email,password,sexo}) => {
    return(dispatch) =>{

        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then( user => {
                firebase.database().ref("/user/"+user.uid+"/details/").set({userName,email,password,sexo})
                    .then(()=>{
                        dispatch({type: USER_CREATE})
                        Actions.usersRecetas({type: 'reset'});
                    })
            })
    }

}
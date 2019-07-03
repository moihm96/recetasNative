import * as firebase from 'firebase'
import {FETCH_COMENTARIOS, SET_COMENTARIOS, SET_PUNTOS, SET_PUNTUACION} from "./types";
import _ from "lodash";

export const setComentarios = (userId,recetaId, displayName, titulo, comentarios) =>{
    console.log(userId,recetaId, displayName, titulo, comentarios)
    return (dispatch) => {
        firebase.database().ref(`/user/${userId}/recetas/${recetaId}/comentarios/`).push({displayName,titulo,comentarios}).then(
            dispatch({
                type:{SET_COMENTARIOS},
                payload:true
            })
        )
    }
}

export const fetchComentarios = (userId, recetaId) => {
    return (dispatch) => {
        firebase.database().ref(`/user/${userId}/recetas/${recetaId}/comentarios/`).on('value', snapshot =>{
            let data = snapshot.val()

            dispatch({
                type: FETCH_COMENTARIOS,
                payload: data
            })
        })
    }

}

export const setPuntos = (userId, recetaId,rating) => {
    return (dispatch) =>{
        //${rating}
        let res=0
        firebase.database().ref(`/user/${userId}/recetas/${recetaId}/puntos/${rating}`).on('value', snapshot=>{
            console.log(snapshot.val())
            res = snapshot.val() + 1
        })
        switch (rating) {
            case 1:
                firebase.database().ref(`/user/${userId}/recetas/${recetaId}/puntos/`).update({1:res})
                break;
            case 2:
                firebase.database().ref(`/user/${userId}/recetas/${recetaId}/puntos/`).update({2:res})
                break;
            case 3:
                firebase.database().ref(`/user/${userId}/recetas/${recetaId}/puntos/`).update({3:res})
                break;
            case 4:
                firebase.database().ref(`/user/${userId}/recetas/${recetaId}/puntos/`).update({4:res})
                break;
            case 5:
                firebase.database().ref(`/user/${userId}/recetas/${recetaId}/puntos/`).update({5:res})
                break;
            default:
                console.log("No esta bien")

        }
        dispatch({
            type:SET_PUNTUACION,
            payload:res
        })
    }
}

export const setPuntuacion = (userId, recetaId) => {
    return (dispatch) =>{
        let res=0
        let puntos=0

        for (let i = 1; i <6 ; i++) {
            firebase.database().ref(`/user/${userId}/recetas/${recetaId}/puntos/${i}`).on('value', snapshot=>{
                res += snapshot.val()
                puntos += i*snapshot.val()
            })
        }
        let puntuacion=0
        if(res>0){
            puntuacion= puntos/res
        }

        firebase.database().ref(`/user/${userId}/recetas/${recetaId}`).update({puntuacion}).then(()=>{
          dispatch({
              type:SET_PUNTUACION,
              payload:puntuacion
          })
        })
    }
}
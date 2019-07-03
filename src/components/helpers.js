import * as firebase from 'firebase'
import React from "react";

export default class Helpers{
    static pushReceta(userId,titulo,autor,entradilla,tiempo,dificultad,numPerson,ingredientes,pasos,categoria,pais,puntos){
        let puntuacion=0
        let userNamePath= "/user/"+userId+"/recetas/"
        return firebase.database().ref(userNamePath).push({userId, titulo,autor,entradilla,tiempo,dificultad,numPerson,ingredientes,pasos,categoria,pais,puntos, puntuacion}).key
    }

    static setReceta(recetaId,userId,titulo,autor,entradilla,tiempo,dificultad,numPerson,ingredientes,pasos,categoria,pais){
        let userNamePath= "/user/"+userId+"/recetas/"+recetaId
        return firebase.database().ref(userNamePath).update({titulo,autor,entradilla,tiempo,dificultad,numPerson,ingredientes,pasos,categoria,pais})
    }


    static setImageUrl(userId,titulo,imageUrl){
        console.log(userId,titulo,imageUrl)
        let userNamePath= "/user/"+userId+"/recetas/"+titulo
        return firebase.database().ref(userNamePath).update({imageUrl})
    }
    static setAvatarUrl(userId,titulo,avatarUrl){
        console.log(userId,titulo,avatarUrl)
        let userNamePath= "/user/"+userId+"/recetas/"+titulo
        return firebase.database().ref(userNamePath).update({avatarUrl})
    }

    static setPaso(userId,titulo,index,imagen){
        let userNamePath= "/user/"+userId+"/recetas/"+titulo+"/pasos/"+index
        return firebase.database().ref(userNamePath).update({imagen})
    }

}
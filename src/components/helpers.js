import * as firebase from 'firebase'
import React from "react";

export default class Helpers{
    static setReceta(userId,titulo,autor,entradilla,tiempo,dificultad,numPerson,ingredientes,pasos){
        let userNamePath= "/user/"+userId+"/recetas/"
        return firebase.database().ref(userNamePath).push({titulo,autor,entradilla,tiempo,dificultad,numPerson,ingredientes,pasos}).key

    }
    static setImageUrl(userId,titulo,imageUrl){
        let userNamePath= "/user/"+userId+"/recetas/"+titulo
        return firebase.database().ref(userNamePath).update({imageUrl})
    }
    static setAvatarUrl(userId,titulo,avatarUrl){
        let userNamePath= "/user/"+userId+"/recetas/"+titulo
        return firebase.database().ref(userNamePath).update({avatarUrl})
    }
    static setPaso(userId,titulo,index,imagen){
        let userNamePath= "/user/"+userId+"/recetas/"+titulo+"/pasos/"+index
        return firebase.database().ref(userNamePath).update({imagen})
    }

}
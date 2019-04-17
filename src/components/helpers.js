import * as firebase from 'firebase'
import React from "react";

export default class Helpers{
    static setReceta(userId,titulo,autor,entradilla,tiempo,dificultad,numPerson,ingredientes,pasos){
        let userNamePath= "/user/"+userId+"/recetas/"+titulo
        return firebase.database().ref(userNamePath).set({titulo,autor,entradilla,tiempo,dificultad,numPerson,ingredientes,pasos})
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

    static setRecetaTitulo(userId, titulo){
        let userNamePath= "/user/"+userId+"/recetas"+"/avatarUrl"
        return firebase.database().ref(userNamePath).push({titulo})
    }
    static setRecetaAutor(userId, autor){
        let userNamePath= "/user/"+userId+"/recetas"
        return firebase.database().ref(userNamePath).push({autor})
    }
    static setRecetaEntradilla(userId, entradilla){
        let userNamePath= "/user/"+userId+"/recetas"
        return firebase.database().ref(userNamePath).push({entradilla})
    }
    static setRecetaTiempo(userId, time){
        let userNamePath= "/user/"+userId+"/recetas"
        return firebase.database().ref(userNamePath).push({time})
    }
    static setRecetaDificultad(userId, dificultad){
        let userNamePath= "/user/"+userId+"/recetas"
        return firebase.database().ref(userNamePath).push({dificultad})
    }
    static setRecetaAvatarsource(userId, avatarSourceUrl){
        let userNamePath= "/user/"+userId+"/recetas"
        return firebase.database().ref(userNamePath).push({avatarSourceUrl})
    }
    static setRecetaImageUrl(userId, imagenUrl){
        let userNamePath= "/user/"+userId+"/recetas"
        return firebase.database().ref(userNamePath).push({imagenUrl})
    }
    static setRecetaNumPersonas(userId, numPersonas){
        let userNamePath= "/user/"+userId+"/recetas/Ingredientes/numPersonas"
        return firebase.database().ref(userNamePath).push(numPersonas)
    }
    static setRecetaIngredientes(userId, ingredientes){
        let userNamePath= "/user/"+userId+"/recetas/Ingredientes/ingredientes"
        return firebase.database().ref(userNamePath).push(ingredientes)
    }
    static setRecetaPasos(userId, pasos){
        pasos.map((data,i)=>{
            let userNamePath= "/user/"+userId+"/recetas/Preparacion/"+data.id
            return firebase.database().ref(userNamePath).push(data)
        })
    }

}
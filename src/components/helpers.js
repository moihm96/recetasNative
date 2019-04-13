import * as firebase from 'firebase'
import {Text, View} from "./addPreparation";
import React from "react";

class Helpers{
    static setRecetaTitulo(userId, titulo){
        let userNamePath= "/user/"+userId+"recetas/titulo"
        return firebase.database().ref(userNamePath).set(titulo)
    }
    static setRecetaAutor(userId, autor){
        let userNamePath= "/user/"+userId+"recetas/autor"
        return firebase.database().ref(userNamePath).set(autor)
    }
    static setRecetaEntradilla(userId, entradilla){
        let userNamePath= "/user/"+userId+"recetas/entradilla"
        return firebase.database().ref(userNamePath).set(entradilla)
    }
    static setRecetaTiempo(userId, time){
        let userNamePath= "/user/"+userId+"recetas/time"
        return firebase.database().ref(userNamePath).set(time)
    }
    static setRecetaDificultad(userId, dificultad){
        let userNamePath= "/user/"+userId+"recetas/dificultad"
        return firebase.database().ref(userNamePath).set(dificultad)
    }
    static setRecetaAvatarsource(userId, avatarSourceUrl){
        let userNamePath= "/user/"+userId+"recetas/avatar"
        return firebase.database().ref(userNamePath).set(avatarSourceUrl)
    }
    static setRecetaAvatarsource(userId, imagenUrl){
        let userNamePath= "/user/"+userId+"recetas/imagenUrl"
        return firebase.database().ref(userNamePath).set(imagenUrl)
    }
    static setRecetaNumPersonas(userId, numPersonas){
        let userNamePath= "/user/"+userId+"recetas/Ingredientes/numPersonas"
        return firebase.database().ref(userNamePath).set(numPersonas)
    }
    static setRecetaIngredientes(userId, ingredientes){
        let userNamePath= "/user/"+userId+"recetas/Ingredientes/ingredientes"
        return firebase.database().ref(userNamePath).set(ingredientes)
    }
    static setRecetaPasos(userId, pasos){
        pasos.map((data,i)=>{
            let userNamePath= "/user/"+userId+"recetas/Preparacion/"+data.id
            return firebase.database().ref(userNamePath).set(data)
        })
    }

}
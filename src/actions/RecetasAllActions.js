import * as firebase from "firebase";
import _ from 'lodash'
import {FETCH_ALL_RECIPES_SUCCESS} from "./types";

export const allRecipesFetch = () => {
    return (dispatch) => {

        firebase.database().ref(`/user/`)
            .on('value', snapshot => {
                let data = snapshot.val()
                console.log(data)
                let arrayOfRecipes = []
                for (let key in data){

                    let recipes = data[key].recetas
                    //console.log(recipes)
                    let allRecipes = _.map( recipes,(val,uid)=>{
                        return {...val,uid}
                    })
                    for (let prop in allRecipes){
                        //console.log(recipes[prop])
                        arrayOfRecipes.push(allRecipes[prop])
                    }
                }
                //console.log(arrayOfRecipes)
                dispatch({ type: FETCH_ALL_RECIPES_SUCCESS, payload: arrayOfRecipes });

            });
    };
}

/**let arrayOfRecipes={}
if(data){
    for (let key in data){
        let obj = data[key]
        //console.log(obj.recetas)
        arrayOfRecipes[key]= obj.recetas
    }
}*/
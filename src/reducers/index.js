import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer"
import RegReducer from "./RegReducer";
import UserReducer from './UserProfileReducer'
import AllRecipes from './RecetasAllReducer'
import FavRecipes from './FavReducer'
import OwnRecipes from './RecetasReducer'
import PasosReducer from './PasosReducer'
import OpcionesReducer from './OpcionesReducer'

export default combineReducers({
    auth:AuthReducer,
    regForm:RegReducer,
    userDetails: UserReducer,
    allRecipes:AllRecipes,
    favRecipes : FavRecipes,
    ownRecipes: OwnRecipes,
    paso: PasosReducer,
    opcion:OpcionesReducer
})
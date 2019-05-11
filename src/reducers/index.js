import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer"
import RegReducer from "./RegReducer";
import UserReducer from './UserProfileReducer'
import AllRecipes from './RecetasReducer'
import FavRecipes from './FavReducer'

export default combineReducers({
    auth:AuthReducer,
    regForm:RegReducer,
    DataUser: UserReducer,
    allRecipes:AllRecipes,
    favRecipes : FavRecipes
})
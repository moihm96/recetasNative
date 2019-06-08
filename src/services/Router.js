import Launch from '../container/ui/Launch'
import StartView from '../container/ui/Start'
import Register from '../container/ui/RegForm'
import React from 'react'
import { Router, Scene, Actions, Stack} from 'react-native-router-flux'
import Header from '../container/ui/Header'
import Menu from '../container/ui/sideMenu'
import Favoritos from '../container/ui/Favoritos'
import ownRecetas from '../container/ui/misRecetas'
import userRecetas from '../container/ui/userRecetas'
import addRecetas from '../components/AddRecipe/addRecetas'
import addIngr from '../components/AddRecipe/AddIngredientes'
import addPreparation from '../components/AddRecipe/addPreparation'
import showReceta from "../container/ui/showReceta"
import showPerfil from "../container/ui/showPerfil"
import addPaso from '../components/AddRecipe/addPaso'
import modReceta from '../components/modRecipe/modReceta'
import modIngredients from '../components/modRecipe/modIngredients'
import modPreparation from '../components/modRecipe/modPreparation'
import modPaso from '../components/modRecipe/modPaso'
import modAddPaso from '../components/modRecipe/modAddPaso'


import {StyleSheet} from 'react-native'
const Routes = () => (
    <Router backAndroidHandler={onBackAndroid}>

        <Scene key = "root"
               navBar={Header}>
            <Scene
                key = 'app'
                drawer
                drawerWidth={300}
                contentComponent={Menu}
                hideNavBar
            >
                <Scene
                    key = "launch"
                    component = {Launch}
                    initial = {true}
                    panHandlers={null}
                    hideNavBar={true}
                     />
                <Stack key="Login">
                    <Scene  key="startView"
                            component={StartView}
                    />
                    <Scene  key="register"
                            component={Register}
                            hideNavBar={true}
                    />
                    <Scene  key="showPerfil"
                            component={showPerfil}
                    />
                </Stack>

            <Stack key="recetas">
                <Scene
                    key="favoritos"
                    component={Favoritos}
                    hideNavBar={true}
                />

                <Scene
                    key="usersRecetas"
                    component={userRecetas}
                    hideNavBar={true}
                />
                <Scene
                    key="ownRecetas"
                    component={ownRecetas}
                    hideNavBar={true}
                />
                    <Scene
                        key="addRecetas"
                        component={addRecetas}
                    />
                    <Scene
                        key="addPreparation"
                        component={addPreparation}
                    />
                    <Scene
                        key="addIngr"
                        component={addIngr}
                    />
                    <Scene
                        key="addPaso"
                        component={addPaso}
                    />


                    <Scene
                        key="modReceta"
                        component={modReceta}
                    />
                    <Scene
                        key="modIngredients"
                        component={modIngredients}
                    />
                    <Scene
                        key="modPreparation"
                        component={modPreparation}
                    />
                    <Scene
                        key="modPaso"
                        component={modPaso}
                    />

                    <Scene
                        key="modAddPaso"
                        component={modAddPaso}
                    />

                <Scene
                    key="showReceta"
                    component={showReceta}
                />
            </Stack>
            </Scene>

        </Scene>

    </Router>
)
const onBackAndroid = () => {
     Actions.pop();
     return true;
};
const styles=StyleSheet.create({

})
export default Routes

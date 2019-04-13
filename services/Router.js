import Launch from '../src/components/Launch'
import StartView from '../src/components/Start'
import Register from '../src/components/RegForm'
import React from 'react'
import { Router, Scene, Actions, Stack} from 'react-native-router-flux'
import Header from '../src/components/Header'
import Menu from '../src/components/sideMenu'
import Favoritos from '../src/container/ui/Favoritos'
import ownRecetas from '../src/container/ui/ownRecetas'
import userRecetas from '../src/container/ui/userRecetas'
import addRecetas from '../src/components/addRecetas'
import addIngr from '../src/components/AddIngredientes'
import addPreparation from '../src/components/addPreparation'
import showReceta from "../src/components/showReceta"
import {StyleSheet} from 'react-native'
const Routes = () => (
    <Router backAndroidHandler={onBackAndroid}>

        <Scene key = "root"
               navBar={Header}
               navigationBarStyle={styles.navBarStyle}
               drawer
               drawerWidth={300}
               contentComponent={Menu}>
                <Scene
                    key = "launch"
                    component = {Launch}
                    initial = {true}
                    panHandlers={null}
                    hideNavBar={true}
                     />
                <Scene  key="startView"
                        component={StartView}
                        />
                <Scene  key="register"
                        component={Register}
                        hideNavBar={true}
                        />

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
                    key="showReceta"
                    component={showReceta}
                />
            </Stack>

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

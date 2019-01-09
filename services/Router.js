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
import addReceta from '../src/components/addRecetas'
import {StyleSheet} from 'react-native'
import {heightPercentageToDP, widthPercentageToDP} from "../src/auxiliar/ScreenDimension";
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
                    onEnter={Actions.currentScene} />
                <Scene  key="startView"
                        component={StartView}
                        onEnter={Actions.currentScene}/>
                <Scene  key="register"
                        component={Register}
                        hideNavBar={true}
                        onEnter={Actions.currentScene}/>
                <Scene
                    key="favoritos"
                    component={Favoritos}
                    onEnter={Actions.currentScene}/>
                <Scene
                    key="addRecetas"
                    component={addReceta}
                    onEnter={Actions.currentScene}/>
                <Scene
                    key="usersRecetas"
                    component={userRecetas}
                    onEnter={Actions.currentScene}/>
                <Scene
                    key="ownRecetas"
                    component={ownRecetas}
                    onEnter={Actions.currentScene}/>
        </Scene>

    </Router>
)
const onBackAndroid = () => {
    return Actions.pop();
};
const styles=StyleSheet.create({

})
export default Routes

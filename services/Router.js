import Launch from '../components/Launch'
import StartView from '../components/Start'
import Register from '../components/RegForm'
import React from 'react'
import { Router, Scene, Actions} from 'react-native-router-flux'
import Header from '../components/Header'
import Menu from '../components/sideMenu'
import Favoritos from '../container/ui/Favoritos'
import ownRecetas from '../container/ui/ownRecetas'
import userRecetas from '../container/ui/userRecetas'
import addReceta from '../components/addRecetas'
const Routes = () => (
    <Router navBar={Header}>
        <Scene key = "root"
               drawer
               drawerWidth={300}
               contentComponent={Menu}>
                <Scene
                    key = "launch"
                    component = {Launch}
                    initial = {true}
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
export default Routes
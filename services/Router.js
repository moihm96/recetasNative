import Launch from '../components/Launch'
import StartView from '../components/Start'
import Register from '../components/RegForm'
import React from 'react'
import { Router, Scene, Actions} from 'react-native-router-flux'
import Header from '../components/Header'
import Menu from '../components/sideMenu'
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
        </Scene>

    </Router>
)
export default Routes
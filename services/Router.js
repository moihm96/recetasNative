import Launch from '../components/Launch'
import StartView from '../components/Start'
import React from 'react'
import { Router, Scene, Actions } from 'react-native-router-flux'

const Routes = () => (
    <Router>
        <Scene key = "root">
                <Scene
                    key = "launch"
                    component = {Launch}
                    initial = {true}
                    panHandlers={null}
                    hideNavBar={true}
                    onEnter={Actions.currentScene} />

                <Scene  key="StartView"
                        component={StartView}
                        hideNavBar={true}
                        onEnter={Actions.currentScene}/>
        </Scene>

    </Router>
)
export default Routes
import React, { Component } from 'react';
import Routes from './services/Router';
import * as firebase from "firebase";
import {Provider} from "react-redux";
import {createStore,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import reducers from './src/reducers'
console.ignoredYellowBox = ['Warning: Each', "Warning: Failed prop type","Warning: Failed child context type"];
class App extends Component {
    componentWillMount() {
        const config={
            apiKey: "AIzaSyBOI8LwWP-1VRLNMicdecjNanQIIQmK0EU",
            authDomain: "react-native-a2f5d.firebaseapp.com",
            databaseURL: "https://react-native-a2f5d.firebaseio.com",
            projectId: "react-native-a2f5d",
            storageBucket: "react-native-a2f5d.appspot.com",
            messagingSenderId: "41761192519"
        }
        firebase.initializeApp(config);
        console.log(firebase)
    }

    render() {
        const store= createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        )
    }
}



export default App
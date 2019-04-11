import React, { Component } from 'react';
import * as firebase from "firebase";
import Routes from './services/Router';
import {createStore,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk"
import {Provider} from "react-redux"
import reducers from "./Reducers"
class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: "AIzaSyBOI8LwWP-1VRLNMicdecjNanQIIQmK0EU",
            authDomain: "react-native-a2f5d.firebaseapp.com",
            databaseURL: "https://react-native-a2f5d.firebaseio.com",
            projectId: "react-native-a2f5d",
            storageBucket: "react-native-a2f5d.appspot.com",
            messagingSenderId: "41761192519"
        };
        firebase.initializeApp(config);
        console.log(firebase)
}

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Routes/>
            </Provider>
        )
    }
}
export default App
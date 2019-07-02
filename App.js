import React, { Component } from 'react';
import Routes from './src/services/Router';
import * as firebase from 'firebase';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import reducers from './src/reducers'

class App extends Component {
    componentWillMount() {
        console.disableYellowBox='true';
        const config={
            apiKey: "AIzaSyDNdibPjDi-HD-CjlBiJHNDRKDxAz4wTns",
            authDomain: "recetas-de-la-abuela.firebaseapp.com",
            databaseURL: "https://recetas-de-la-abuela.firebaseio.com",
            projectId: "recetas-de-la-abuela",
            storageBucket: "recetas-de-la-abuela.appspot.com",
            messagingSenderId: "79187296356",
            appId: "1:79187296356:web:1ef522887ffd53d0"
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
import React, { Component } from 'react';
import {StyleSheet, Text, View,Image } from 'react-native';
import abuela from '../../img/abuela.jpg'
import { widthPercentageToDP, heightPercentageToDP } from '../../auxiliar/ScreenDimension'
import { Actions } from 'react-native-router-flux';

export default class Launch extends Component {
    render() {
        return (
            <View style={styles.imageContainer} >
                <Image style={styles.image} source={abuela}/>
            </View>
        );
    }
    componentDidMount(){
        setTimeout(() => {
            startApp();
        }, 2000)
    }
}

function startApp() {
    Actions.usersRecetas()
}

const styles = StyleSheet.create({
    imageContainer:{
        flex: 1,
        alignItems: 'stretch'
    },
    image:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});
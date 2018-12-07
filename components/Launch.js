import React, { Component } from 'react';
import {StyleSheet, Text, View,Image } from 'react-native';
import abuela from '../img/abuela.jpg'
import { widthPercentageToDP, heightPercentageToDP } from '../auxiliar/ScreenDimension'
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
        }, 5000)
    }
}

function startApp() {
    Actions.reset('StartView')
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
    },
    titleReceipt:{
        textAlign:'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,

    },
    imageLogo: {
        height: heightPercentageToDP('40%'),
        width: widthPercentageToDP('70%')
    },
    imageFinal: {
        height: heightPercentageToDP('30%'),
        width: widthPercentageToDP('100%'),
        flex: 1,
        resizeMode: 'contain',
        marginTop: heightPercentageToDP('10%')
    },
    textVersion: {
        flex:1,
        justifyContent:"flex-end"
    },
    vistaEstilo:{
        backgroundColor: 'white',
        flex: 1,
    },
    centerElement: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    vistaCabecera:{
        backgroundColor: 'yellow',
        flex: 0.7,
    }
});
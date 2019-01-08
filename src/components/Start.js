import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    KeyboardAvoidingView
} from 'react-native';
import LoginForm from './LoginForm'
import { widthPercentageToDP, heightPercentageToDP } from '../auxiliar/ScreenDimension'
import sopa from '../img/sopera.jpg'
import comida from '../img/comida.jpg'
import Header from './Header'
export default class Start extends Component{

    render(){
        return(
            <KeyboardAvoidingView style ={styles.container}>
                <View style ={styles.logoContainer}>
                    <Text style={styles.title}>Inicia Sesión</Text>
                    <Image
                         style = {styles.logo}
                        source={ comida }/>
                </View>
                <View style = {styles.formContainer}>
                    <LoginForm/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    logo:{
        width: widthPercentageToDP("85"),
        height: heightPercentageToDP("25"),
        marginTop: 10
    },
    logoContainer:{
        flex:1.4,
        alignItems: 'center',
        flexGrow:1,
        justifyContent: 'center',
        marginTop: heightPercentageToDP('10%'),
    },
    formContainer:{
        flex:2
    },
    title:{
        color:'black',
        fontSize: 20
    }
});
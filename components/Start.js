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

export default class Start extends Component{

    render(){
        return(
            <KeyboardAvoidingView style ={styles.container}>
                <View style ={styles.logoContainer}>
                    <Text style={styles.title}>Inicia Sesión</Text>
                    <Image
                         style = {styles.logo}
                        source={ sopa }/>
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
        backgroundColor:'white'
    },
    logo:{
        width: 200,
        height: 200,
        marginTop: 30
    },
    logoContainer:{
        flex:0.3,
        alignItems: 'center',
        flexGrow:1,
        justifyContent: 'center',
        marginTop: heightPercentageToDP('5%')
    },
    formContainer:{
        flex:0.7
    },
    title:{
        color:'black',
        fontSize: 20
    }
});
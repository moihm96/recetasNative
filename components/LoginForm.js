import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';

import { widthPercentageToDP, heightPercentageToDP } from '../auxiliar/ScreenDimension'

export default class LoginForm extends Component{
    render(){
        return(
            <KeyboardAvoidingView style = {styles.container}>
                <TextInput
                    placeholder="username or email"
                    style={ styles.input}
                />
                <TextInput
                    secureTextEntry={true}
                    placeholder="password"
                    style={ styles.input}
                />
                <TouchableOpacity style={ styles.buttonContainer1}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.buttonContainer2}>
                    <Text style={styles.buttonText}>No Registrado</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>


        );
    }
}

const styles = StyleSheet.create({
   container:{
       padding:20,
       marginTop: heightPercentageToDP('10%')
   },
    input:{
       height: 40,
       backgroundColor:'yellow',
        marginBottom: 15,
        color:'black',
        paddingHorizontal: 10
    },
    buttonContainer1:{
       marginTop: heightPercentageToDP('10%'),
       backgroundColor: 'rgb(255,216,0)',
        paddingVertical: 10
    },
    buttonContainer2:{
        marginTop: heightPercentageToDP('1%'),
        backgroundColor: 'white' ,
        paddingVertical: 10
    },
    buttonText: {
       textAlign: 'center',
        color:'black',
        fontSize:20,
        fontWeight: '700'
    }
});
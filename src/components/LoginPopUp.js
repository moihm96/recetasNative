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
import { Actions } from 'react-native-router-flux';
export default class LoginForm extends Component{
    onRegister = () => {
        Actions.register();
    }
    render(){
        return(
            <KeyboardAvoidingView style = {styles.container}>
                <Text>Iniciar Sesion</Text>
                <TextInput
                    placeholder="username or email"
                    style={ styles.input}
                />
                <TextInput
                    secureTextEntry={true}
                    placeholder="password"
                    style={ styles.input}
                />
                <TouchableOpacity>
                    <Text style={styles.buttonPassword}>¿No recuerdas la contraseña?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.buttonContainer1}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity   onPress={this.onRegister} style={ styles.buttonContainer2}>
                    <Text style={styles.buttonText}>No Registrado</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        marginTop: heightPercentageToDP('3%'),
        backgroundColor:'white'
    },
    input:{
        height: 40,
        backgroundColor:'white',
        marginBottom: 15,
        color:'black',
        paddingHorizontal: 10
    },
    buttonPassword:{
        textAlign:'right',
        color:'rgb(208,166,0)'
    },
    buttonContainer1:{
        marginTop: heightPercentageToDP('5%'),
        backgroundColor: 'rgb(255,216,0)',
        paddingVertical: 10,
        borderRadius:7
    },
    buttonContainer2:{
        marginTop: heightPercentageToDP('1%'),
        backgroundColor: 'rgb(251,237,157)',
        paddingVertical: 10,
        borderRadius:7
    },
    buttonText: {
        textAlign: 'center',
        color:'black',
        fontSize:20,
        fontWeight: '700'
    }
});
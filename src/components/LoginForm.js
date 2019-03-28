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
import {Buttons} from "./Buttons"
import { widthPercentageToDP, heightPercentageToDP } from '../auxiliar/ScreenDimension'
import { Actions } from 'react-native-router-flux';
export default class LoginForm extends Component{
    onRegister = () => {
        Actions.register();
    }
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
                <TouchableOpacity>
                    <Text style={styles.buttonPassword}>¿No recuerdas la contraseña?</Text>
                </TouchableOpacity>

                <Buttons
                    text1={"Entrar"}
                    text2={"Registrarse"}
                    onPress2={this.onRegister}
                />
            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
   container:{
       padding:20,
       marginTop: heightPercentageToDP('3%')
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

});
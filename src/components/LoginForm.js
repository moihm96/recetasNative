import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {Buttons} from "./Buttons"
import { widthPercentageToDP, heightPercentageToDP } from '../auxiliar/ScreenDimension'
import { Actions } from 'react-native-router-flux';
import {emailChanged,passwordChanged,loginUser} from "../actions/AuthActions";
import {userFetch} from "../actions/UserProfileAction";
import {connect} from "react-redux";
import * as firebase from 'firebase'
class LoginForm extends Component{
    onRegister = () => {
        Actions.register();
    }
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password }, this.props.election);

    }
    onUser(modal){
        this.props.onUser(modal)
    }
    renderButton(){
        console.log(this.props.loading)
        this.onUser(this.props.modal)
        if(this.props.loading){
            return(
                <View style={styles.spinnerStyle}>
                    <ActivityIndicator size={"large"}/>
                </View>
            )
        }
        return(
            <View>
                <TouchableOpacity>
                    <Text style={styles.buttonPassword}>¿No recuerdas la contraseña?</Text>
                </TouchableOpacity>

                <Buttons
                    text1={"Entrar"}
                    text2={"Registrarse"}
                    onPress2={this.onRegister}
                    onPress1={this.onButtonPress.bind(this)}
                />
            </View>
        )
    }

    render(){
        return(
            <KeyboardAvoidingView style = {styles.container}>
                <TextInput
                    placeholder="username or email"
                    style={ styles.input}
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                />
                <TextInput
                    secureTextEntry={true}
                    placeholder="password"
                    style={ styles.input}
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                />
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
                <View>{this.renderButton()}</View>
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
        marginBottom: 7,
        color:'black',
        paddingHorizontal: 10
    },
    buttonPassword:{
        textAlign:'right',
        color:'rgb(208,166,0)'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, user, modal } = auth;

    return { email, password, error, loading, user , modal};
};

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser, userFetch
})(LoginForm);

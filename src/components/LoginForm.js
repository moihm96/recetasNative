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

        this.props.loginUser({ email, password });

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
                <Buttons
                    text1={"Entrar"}
                    text2={"No registrado"}
                    onPress2={this.onRegister}
                    onPress1={this.onButtonPress.bind(this)}
                />
            </View>
        )
    }
    _nextPass = () =>{
        this._password && this._password.focus()
    }

    render(){
        return(
            <KeyboardAvoidingView style = {styles.container}>
                    <TextInput
                        placeholder="Nombre de usuario o correo"
                        placeholderTextColor='grey'
                        style={ styles.input}
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                        keyboardType={'email-address'}
                        returnKeyType="next"
                        onSubmitEditing={this._nextPass}
                    />
                    <TextInput
                        placeholderTextColor='grey'
                        secureTextEntry={true}
                        placeholder="Contraseña"
                        style={ styles.input}
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                        ref={ref => this._password = ref}
                        returnKeyType="send"
                        onSubmitEditing={this.onButtonPress.bind(this)}
                    />
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.buttonPassword}>¿No recuerdas la contraseña?</Text>
                    </TouchableOpacity>
                <View>{this.renderButton()}</View>
            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
   container:{
       backgroundColor:'white',
       padding:widthPercentageToDP(5),
       marginTop: heightPercentageToDP('1%')
   },
    input:{
       borderBottomWidth:1,
        borderBottomColor:'grey',
       height: heightPercentageToDP(6),
       backgroundColor:'white',
        marginBottom: heightPercentageToDP(0.1),
        color:'black',
        //paddingHorizontal: widthPercentageToDP(5)
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

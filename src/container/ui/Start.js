import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import LoginForm from '../../components/LoginForm'
import { widthPercentageToDP, heightPercentageToDP } from '../../auxiliar/ScreenDimension'
import comida from '../../img/comida.jpg'
export default class Start extends Component{
    onUser = (isUser) =>{
        console.log(isUser)
    }

    render(){
        return(
            <KeyboardAvoidingView style ={styles.container}>
                <ScrollView>
                    <View style ={styles.logoContainer}>
                        <Text style={styles.title}>Inicia Sesión</Text>
                        <Image
                            style = {styles.logo}
                            source={ comida }/>
                    </View>
                    <View style = {styles.formContainer}>
                        <LoginForm
                            onUser={this.onUser}
                            election={0}
                        />
                    </View>
                </ScrollView>
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
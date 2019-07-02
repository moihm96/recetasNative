import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    ImageBackground
} from 'react-native';
import fondo from '../../img/fondo.png'
import LoginForm from '../../components/LoginForm'
import { widthPercentageToDP, heightPercentageToDP } from '../../auxiliar/ScreenDimension'
import comida from '../../img/comida.jpg'
export default class Start extends Component{
    constructor(props){
        super(props)
        this.state={
            modal: false
        }
    }
    onUser = (isUser) =>{
        this.setState({
            modal:isUser
        })
    }

    render(){
        return(
            <KeyboardAvoidingView style={{flex:1, backgroundColor:"white"}}>
                <ScrollView>
                    <ImageBackground source={fondo}style={{flex:1,backgroundColor: "white" }}>
                        <View style ={styles.logoContainer}>
                            <Text style={styles.title}>Inicia Sesión</Text>
                            <Image
                                style = {styles.logo}
                                source={ comida }/>
                        </View>
                        <View style = {styles.formContainer}>
                            <LoginForm
                                onUser={this.onUser}
                            />
                        </View>
                    </ImageBackground>
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
        marginTop: heightPercentageToDP(1)
    },
    logoContainer:{
        backgroundColor:'white',
        flex:1.4,
        alignItems: 'center',
        flexGrow:1,
        justifyContent: 'center',
        marginTop: heightPercentageToDP('5%'),
    },
    formContainer:{
        backgroundColor:'white',
        flex:2
    },
    title:{
        color:'black',
        fontSize: 20
    }
});
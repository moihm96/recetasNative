import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Picker,
    Text,
    KeyboardAvoidingView,
    TextInput, TouchableOpacity
} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP} from "../auxiliar/ScreenDimension";
import { Actions } from 'react-native-router-flux';
import SelectInput from 'react-native-select-input-ios'
let arrayEmpty=["Cualquiera"]
let sexos=["Cualquiera","Hombre","Mujer"]
let sexo=arrayEmpty[0]
export default class RegForm extends Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            userName:"",
            arraySexo:sexos,
            sexo:sexo

        };
    }
    pickerSexo(){
        let array = []
        this.state.arraySexo.map((data, i) => {
            array.push({value:data, label: data})
        });
        return(array)
    }
    updateSexo = (sexo) => {
        this.setState({ sexo: sexo })
    }
    onBack(){
        Actions.startView()
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.texTitle}>Registrarse</Text>
                </View>
                <KeyboardAvoidingView style={styles.regInput}>
                    <TextInput
                        placeholder="Nombre de usuario"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        style={ styles.input}
                        onChangeText={(userName) => this.setState({userName})}
                        value={this.state.userName}
                    />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        style={ styles.input}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        keyboardType={'email-address'}
                    />

                    <TextInput
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        style={ styles.input}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />

                    <TextInput
                        secureTextEntry={true}
                        placeholder="Repite la contraseña"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        style={ styles.input}
                    />
                    <View style={styles.sexoStyle}>
                        <Text style={styles.textSexo}>Sexo</Text>
                        <SelectInput
                            style={styles.textInputStyle}
                            options = {this.pickerSexo()}
                            value = {this.state.sexo}
                            onSubmitEditing = {(value) => this.setState({sexo: value})}
                        />
                    </View>
                    <TouchableOpacity onPress={this.onBack} style={ styles.buttonContainer2}>
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   container:{
       flex:1,
       backgroundColor: 'white',
       padding:20,

   },
    title:{
        alignItems:'center',
        justifyContent: 'center',
    },

    regInput:{
        marginTop:  heightPercentageToDP('5%')
    },
    containerSexo:{
        justifyContent: 'space-between',
        flexDirection:'row'
    },
    textSexo:{
        color:'rgba(44, 62, 80,1.0)',
    },
    buttonContainer2:{
        backgroundColor: 'rgb(255,216,0)',
        paddingVertical: 10,
        marginTop: heightPercentageToDP('5%'),
        borderRadius:10
    },
    pickerSexo:{
        color:'rgba(44, 62, 80,1.0)',
    },
    texTitle:{
        color:'rgba(44, 62, 80,1.0)',
        fontSize: 20,
    },
    input:{
        backgroundColor:'white',
        marginBottom:15,
        color:'rgba(44, 62, 80,1.0)',
        borderBottomWidth: 1,
        borderColor:'grey'
    },


    buttonText: {
        textAlign: 'center',
        color:'rgba(44, 62, 80,1.0)',
        fontSize:20,
        fontWeight: '700'
    },
    textInputStyle: {
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
        flex:0.65,
        marginBottom: 2
    },
    sexoStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        borderColor:'grey'
    }
});
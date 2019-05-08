import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Picker,
    Text,
    KeyboardAvoidingView,
    TextInput, TouchableOpacity
} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP} from "../../auxiliar/ScreenDimension";
import { Actions } from 'react-native-router-flux';
import SelectInput from 'react-native-select-input-ios'
let arrayEmpty=["Cualquiera"]
let sexos=["Cualquiera","Hombre","Mujer"]
let sexo=arrayEmpty[0]
import {userUpdate, createUser} from "../../actions/RegActions";
import {connect} from 'react-redux';

 class RegForm extends Component{
    pickerSexo(){
        let array = []
        sexos.map((data, i) => {
            array.push({value:data, label: data})
        });
        return(array)
    }
    onButtonPress(){
       const {userName,email,password,sexo} = this.props;

       this.props.createUser({userName,email,password,sexo: sexo || 'Hombre'});

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
                        onChangeText={value => this.props.userUpdate({ prop: 'userName', value })}
                        value={this.props.userName}
                    />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        style={ styles.input}
                        onChangeText={value => this.props.userUpdate({ prop: 'email', value })}
                        value={this.props.email}
                        keyboardType={'email-address'}
                    />

                    <TextInput
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        style={ styles.input}
                        onChangeText={value => this.props.userUpdate({ prop: 'password', value })}
                        value={this.props.password}
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
                            value = {this.props.sexo}
                            onSubmitEditing = {value => this.props.userUpdate({ prop: 'sexo', value })}
                        />
                    </View>
                    <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={ styles.buttonContainer2}>
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


 const mapStateToProps = (state) => {
    const { userName,email,password,sexo } = state.regForm;

    return { userName,email,password,sexo };
};

export default connect(mapStateToProps, {
    userUpdate, createUser
})(RegForm);
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Picker,
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import {Avatar} from "react-native-elements";
import {heightPercentageToDP, widthPercentageToDP} from "../../auxiliar/ScreenDimension";
import { Actions } from 'react-native-router-flux';
import SelectInput from 'react-native-select-input-ios'
let arrayEmpty=["Cualquiera"]
let sexos=["Cualquiera","Hombre","Mujer"]
let sexo=arrayEmpty[0]
import {userUpdate, createUser} from "../../actions/RegActions";
import {connect} from 'react-redux';
import ImagePicker from "react-native-image-picker";
import * as firebase from "firebase";
import RNFetchBlob from "rn-fetch-blob";
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const options={
    title: 'Elige foto de perfil',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}
const uploadImage = (uri, mine = 'image/jpg') => {
    console.log("Ha entrado a firebase storage")
    console.log(uri)
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS ==='ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
        const imageRef = firebase.storage().ref('Profile').child(uri)
        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, {type: `${mine};BASE64`})
            })
            .then((blob) =>{
                uploadBlob = blob
                return imageRef.put(blob, {contentType: mine })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

 class RegForm extends Component{
    constructor(props){
        super(props)
        this.state={
            avatarPrincipal:'',
            repeatPassword:'',
            error: ''

        }
    }
     openCamera=()=>{
         ImagePicker.showImagePicker(options, (response) => {
             console.log('Response = ', response);

             if (response.didCancel) {
                 console.log('User cancelled image picker');
             }
             else if (response.error) {
                 console.log('Image Picker Error: ', response.error);
             }

             else {
                 // You can also display the image using data:
                 // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                 //this.props.userUpdate({prop:'photoURL', value: response.uri})
                 //console.log(this.props.photoURL)
                 uploadImage(response.uri).then(
                     (responseData) => {
                         this.props.userUpdate({prop:'photoURL', value: responseData})
                     }
                 )

             }
         });
     }
    pickerSexo(){
        let array = []
        sexos.map((data, i) => {
            array.push({value:data, label: data})
        });
        return(array)
    }
    onButtonPress(){
        console.log(this.props.photoURL)
        if(this.props.error && this.props.password === this.state.repeatPassword){
            this.setState({
                repeatPassword:''
            })
        }
        if(this.props.password !== this.state.repeatPassword){
            this.setState({
                error:'Las contraseñas no coinciden'
            })
            return;
        }

        const {displayName,email,password,genero, photoURL} = this.props;

        this.props.createUser({displayName,email,password,genero: genero || 'Hombre', photoURL});
    }
     _nextEmail = () =>{
         this._email && this._email.focus()
     }
     _pass = () =>{
         this._password && this._password.focus()
     }
     _nextPass = () =>{
         this._repeatPassword && this._repeatPassword.focus()
     }

     showError(){
        if(this.props.error){
            if(this.props.error === 'auth/email-already-in-use'){
                return(
                    <View>
                        <Text style={styles.errorTextStyle}>
                            El correo ya esta en uso
                        </Text>
                    </View>
                )
            } else if(this.props.error === 'auth/invalid-email'){
                return(
                    <View>
                        <Text style={styles.errorTextStyle}>
                            El correo no es válido
                        </Text>
                    </View>
                )
            }else if(this.props.error === 'auth/weak-password'){
                return(
                    <View>
                        <Text style={styles.errorTextStyle}>
                            La contraseña no es válida, mínimo 6 carácteres
                        </Text>
                    </View>
                )
            }
        }
     }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.texTitle}>Registrarse</Text>
                </View>

                <KeyboardAvoidingView style={styles.regInput}>
                    <TouchableOpacity onPress={this.openCamera} style={{alignItems:'center', marginTop:heightPercentageToDP(2)}}>
                        <Text>Foto de perfil</Text>
                        <Avatar
                            rounded
                            size={"medium"}
                            source={{uri:this.props.photoURL}}
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Nombre de usuario"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        style={ styles.input}
                        onChangeText={value => this.props.userUpdate({ prop: 'displayName', value })}
                        value={this.props.displayName}
                        returnKeyType="next"
                        onSubmitEditing={this._nextEmail}
                    />
                    <TextInput
                        ref={ref => this._email = ref}
                        placeholder="Email"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        style={ styles.input}
                        onChangeText={value => this.props.userUpdate({ prop: 'email', value })}
                        value={this.props.email}
                        keyboardType={'email-address'}
                        returnKeyType="next"
                        onSubmitEditing={this._pass}
                    />

                    <TextInput
                        ref={ref => this._password = ref}
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        style={ styles.input}
                        onChangeText={value => this.props.userUpdate({ prop: 'password', value })}
                        value={this.props.password}
                        returnKeyType="next"
                        onSubmitEditing={this._nextPass}
                    />

                    <TextInput
                        ref={ref => this._repeatPassword = ref}
                        secureTextEntry={true}
                        placeholder="Repite la contraseña"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        style={ styles.input}
                        onChangeText={(repeatPassword) => this.setState({repeatPassword})}
                        value={this.state.repeatPassword}
                    />

                    <View style={styles.sexoStyle}>
                        <Text style={styles.textSexo}>Género</Text>
                        <SelectInput
                            style={styles.textInputStyle}
                            options = {this.pickerSexo()}
                            value = {this.props.genero}
                            onSubmitEditing = {value => this.props.userUpdate({ prop: 'genero', value })}
                        />
                    </View>

                    {this.showError()}
                    <Text style={styles.errorTextStyle}>
                        {this.state.error}
                    </Text>
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
    },
    errorTextStyle: {
       marginTop:heightPercentageToDP(1),
        fontSize: heightPercentageToDP(2.5),
        alignSelf: 'center',
        color: 'red'
    },
});


 const mapStateToProps = (state) => {
    const { displayName,email,password,genero, photoURL, error } = state.regForm;

    return { displayName,email,password,genero , photoURL, error};
};

export default connect(mapStateToProps, {
    userUpdate, createUser
})(RegForm);
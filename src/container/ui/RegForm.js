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
const uploadImage = (uri, imageName, mine = 'image/jpg') => {
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS ==='ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
        const imageRef = firebase.storage().ref('image').child(imageName)
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
            avatarPrincipal:''

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
                 this.props.userUpdate({prop:'photoUrl', value: response.uri})
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
       const {displayName,email,password,genero, photoUrl} = this.props;

       this.props.createUser({displayName,email,password,genero: genero || 'Hombre', photoUrl});

    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.texTitle}>Registrarse</Text>
                </View>

                <KeyboardAvoidingView style={styles.regInput}>
                    <TouchableOpacity onPress={this.openCamera} style={{alignItems:'center'}}>
                        <Text>Foto de perfil</Text>
                        <Avatar
                            rounded
                            size={"medium"}
                            source={{uri:this.props.photoUrl}}
                        />
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Nombre de usuario"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        style={ styles.input}
                        onChangeText={value => this.props.userUpdate({ prop: 'displayName', value })}
                        value={this.props.displayName}
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
                        <Text style={styles.textSexo}>Género</Text>
                        <SelectInput
                            style={styles.textInputStyle}
                            options = {this.pickerSexo()}
                            value = {this.props.genero}
                            onSubmitEditing = {value => this.props.userUpdate({ prop: 'genero', value })}
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
    const { displayName,email,password,genero, photoUrl } = state.regForm;

    return { displayName,email,password,genero , photoUrl};
};

export default connect(mapStateToProps, {
    userUpdate, createUser
})(RegForm);
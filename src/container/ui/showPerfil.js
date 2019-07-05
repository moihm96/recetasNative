import React,{Component} from 'react'
import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput,
    StyleSheet, Platform
} from 'react-native'
import {connect} from 'react-redux'
import {signOut} from '../../actions/AuthActions'
import {userUpdate,updateUser} from "../../actions/RegActions";
import _ from 'lodash'
import {Avatar} from "react-native-elements";
import SelectInput from "react-native-select-input-ios";
import {heightPercentageToDP} from "../../auxiliar/ScreenDimension";
let arrayEmpty=["Cualquiera"]
let sexos=["Cualquiera","Hombre","Mujer"]
let sexo=arrayEmpty[0]
import {getGenero} from "../../actions/RegActions";
import {Buttons} from "../../components/Buttons";
import {Actions} from "react-native-router-flux";
import RNFetchBlob from "rn-fetch-blob";
import * as firebase from "firebase";
import ImagePicker from "react-native-image-picker";
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const options={
    title: 'Elige foto de perfil',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}
const uploadImage = (uri,displayName, mine = 'image/jpg') => {
    console.log("Ha entrado a firebase storage")
    console.log(displayName)
    console.log(uri)
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS ==='ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
        const imageRef = firebase.storage().ref('Profile').child(displayName)
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
class showPerfil extends Component{
    constructor(props){
        super(props)
        this.state={
            displayName: "",
            email: "",
            photoURL: "",
            genero: ""
        }
    }

    componentWillMount() {
        console.log(this.props)
        if(this.props.user){
            this.props.getGenero(this.props.user.uid)
            setTimeout(() => {
                this.setState({
                    displayName: this.props.user.displayName,
                    email: this.props.user.email,
                    photoURL: this.props.user.photoURL,
                    genero: this.props.genero
                })
            }, 500)
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


               this.setState({
                   photoURL:response.uri
               })

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
    saveForm(){
        uploadImage(this.state.photoURL, this.state.email).then(
            (responseData) => {
                this.setState({
                    photoURL:responseData
                })
            }
        )
        const {displayName,email,genero,photoURL} = this.state
        const {user} = this.props
        const {uid} = this.props.user

        this.props.updateUser(user,uid,displayName,email,genero,photoURL)
    }
    _nextEmail = () =>{
        this._email && this._email.focus()
    }

    render(){
        return(
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.regInput}>
                    <TouchableOpacity onPress={this.openCamera} style={{alignItems:'center'}}>
                        <Text>Foto de perfil</Text>
                        <Avatar
                            rounded
                            size={"medium"}
                            source={{uri:this.state.photoURL}}
                        />
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Nombre de usuario"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        style={ styles.input}
                        onChangeText={value => this.setState({
                            displayName:value
                        })}
                        value={this.state.displayName}
                        returnKeyType="next"
                        onSubmitEditing={this._nextEmail}
                    />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        style={ styles.input}
                        onChangeText={value => this.setState({
                            email:value
                        })}
                        value={this.state.email}
                        keyboardType={'email-address'}
                        ref={ref => this._email = ref}
                    />

                    <View style={styles.sexoStyle}>
                        <Text style={styles.textSexo}>Género</Text>
                        <SelectInput
                            style={styles.textInputStyle}
                            options = {this.pickerSexo()}
                            value = {this.state.genero}
                            onSubmitEditing = {value => this.setState({
                                genero:value
                            })}
                        />
                    </View>
                    <Buttons
                        text1={"Guardar"}
                        text2={"Salir"}
                        onPress1={this.saveForm.bind(this)}
                        onPress2={()=> this.props.signOut()}
                    />
                </KeyboardAvoidingView>
            </View>
        )
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
const mapStateToProps = state =>{
    const { user } = state.auth;
    const {genero} = state.regForm;
    const {displayName, email, photoURL} = state.regForm;

    return { user, genero, displayName, email, photoURL};

}
export default connect(mapStateToProps, {
    signOut,
    updateUser,
    getGenero
})(showPerfil)
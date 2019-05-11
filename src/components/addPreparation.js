import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    Platform,
    YellowBox,
    Alert
} from 'react-native'
import fondo from "../img/fondo.png"
import {Buttons} from "./Buttons";
import {Actions} from "react-native-router-flux";
import ImagePicker from "react-native-image-picker";
import add from "../img/Add.png";
const options={
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}
let pasosAux=[];
import Helpers from "./helpers"
import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

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
export default class addPreparation extends Component{
    constructor(props){
        super(props)
        this.state={
            pasos:[],
            title: "",
            imagePaso:"",
            descripcion:"",
            id:"",
            uid:"",
            imagen:"",
            avatar:""

        }
    }
    async componentWillMount(){
        try {
            let user = await firebase.auth().currentUser;
            this.setState({
                uid: user.uid
            })
        } catch (error) {
            console.log(error)
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
                    imagePaso: response.uri,
                });
            }
        });
    }
    onAdd(){
        /**pasosAux.titulo.push(this.state.title.toString() );
         pasosAux.imagen.push(this.state.imagePaso);
         pasosAux.descr.push(this.state.descripcion.toString());
         pasosAux.pid.push(this.state.id);*/
        pasosAux.titulo= this.state.title;
        pasosAux.imagen= this.state.imagePaso;
        pasosAux.descr= this.state.descripcion;
        pasosAux.pid= this.state.id;;
        this.state.pasos.push(pasosAux);
        console.log(this.state.pasos)
        pasosAux=[]

        this.setState({
            title: "",
            imagePaso:"",
            descripcion:"",
            id:"",
        })
    }
    renderPasos(){
        if(this.state.pasos){
            return this.state.pasos.map((data,i)=>{
                return(
                    <View key={i}>
                        <Text>{data.titulo}</Text>
                    </View>
                )
            })
        }
    }
    saveForm(){
        if(this.state.uid){
            try {
                /**this.props.title ? Helpers.setRecetaTitulo(this.state.uid,this.props.title) : null
                this.props.autor ? Helpers.setRecetaAutor(this.state.uid,this.props.autor) : null
                this.props.entradilla ? Helpers.setRecetaEntradilla(this.state.uid,this.props.entradilla) : null
                this.props.time ? Helpers.setRecetaTiempo(this.state.uid,this.props.time) : null
                this.props.dificultad ? Helpers.setRecetaDificultad(this.state.uid,this.props.dificultad) : null
                this.props.person ? Helpers.setRecetaNumPersonas(this.state.uid,this.props.person) : null
                this.props.ingredients ? Helpers.setRecetaIngredientes(this.state.uid,this.props.ingredients) : null
                this.state.pasos ? Helpers.setRecetaPasos(this.state.uid, this.state.pasos) :null
                this.props.imagenPrincipal ?
                    uploadImage(this.props.imagenPrincipal, `${this.state.uid}.jpg`)
                        .then((responseData) => {
                            Helpers.setRecetaImageUrl(this.state.uid, responseData)
                        })
                        .done()
                    : null
                this.props.avatarSource ?
                    uploadImage(this.props.avatarSource, `${this.state.uid}.jpg`)
                        .then((responseData) => {
                            Helpers.setRecetaAvatarsource(this.state.uid, responseData)
                        })
                        .done()
                    : null

                Actions.usersRecetas()*/
                this.props.imagenPrincipal ?
                    uploadImage(this.props.imagenPrincipal, `imagen${this.state.uid}.jpg`)
                        .then((responseData) => {
                            Helpers.setImageUrl(this.state.uid,uid_recetas,responseData)
                        })
                        .done()
                    : null
                this.props.avatarSource ?
                    uploadImage(this.props.avatarSource, `avatar${this.state.uid}.jpg`)
                        .then((responseData) => {
                            Helpers.setAvatarUrl(this.state.uid,uid_recetas,responseData)
                        })
                        .done()
                    : null

                this.state.pasos.map((data, index) => {
                    if(data.imagen){
                        uploadImage(data.imagen,`${data.titulo}.jpg`)
                            .then((responseData)=>{
                                Helpers.setPaso(this.state.uid,uid_recetas,index,responseData)
                            })
                    }
                });

                let uid_recetas = Helpers.setReceta(
                    this.state.uid,
                    this.props.title,
                    this.props.autor,
                    this.props.entradilla,
                    this.props.time,
                    this.props.dificultad,
                    this.props.person,
                    this.props.ingredients,
                    this.state.pasos
                )
                Alert.alert("Recetas", "Receta creada con éxito")

                Actions.usersRecetas()

            } catch (error){
                console.log(error)
            }
        }

    }


    render(){
        return(
            <ImageBackground source={fondo} style={styles.container}>
                <ScrollView>
                    <Text style={styles.nuevaText}>Preparacion</Text>
                    <View style={styles.vista}>
                        <TextInput
                            placeholder="Titulo del paso"
                            style={styles.input}
                            placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                            onChangeText={(title) => this.setState({title})}
                            value={this.state.title}
                        />
                        <TextInput
                            placeholder="Numero del paso"
                            style={styles.input}
                            placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                            onChangeText={(id) => this.setState({id})}
                            value={this.state.id}
                        />
                        <TextInput
                            placeholder="Descripcion del paso"
                            placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                            style={styles.input}
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(descripcion) => this.setState({descripcion})}
                            value={this.state.descripcion}
                        />
                        <TouchableOpacity onPress={this.openCamera}>
                            <Text>Foto del paso</Text>
                        </TouchableOpacity>
                        <Image
                            style={{width:100, height:100}}
                            source={{uri:this.state.imagePaso}}
                        />
                        <View style={styles.listStyle}>
                            <Text>Añadir paso</Text>
                            <TouchableOpacity onPress={() => this.onAdd()}>
                                <Image
                                    style={styles.imageStyle}
                                    source={add}
                                />
                            </TouchableOpacity>

                        </View>
                        {this.renderPasos()}
                        <View style={{padding: 20}}>
                            <Buttons
                                text1={"Guardar"}
                                text2={"Atrás"}
                                onPress2={()=> Actions.pop()}
                                onPress1={this.saveForm.bind(this)}
                            />
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white",
    },
    nuevaText:{
        fontFamily:'Allura-Regular',
        fontSize:32
    },
    vista:{
        backgroundColor:"white",
        padding: 15
    },
    listStyle:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        borderBottomWidth: 1,
        borderColor:'grey'
    },
    textStyle:{
        color:'black',
        fontSize: 15
    },
    imageStyle:{
        width: 20,
        height: 20
    },
});
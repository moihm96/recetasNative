import React, {Component} from 'react'

import{
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    Alert,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    Dimensions
} from 'react-native'
import {Buttons} from "../Buttons";
import fondo from "../../img/fondo.png"
import fotoPrincipal from '../../img/fotoPrincipal.png'
import add from '../../img/Add.png'
import {Actions} from "react-native-router-flux";
import Helpers from '../helpers'
import {connect} from "react-redux"
import * as firebase from 'firebase'
import RNFetchBlob from 'rn-fetch-blob'
import {heightPercentageToDP, widthPercentageToDP} from "../../auxiliar/ScreenDimension";
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (UserID,recetaId, uri, imageName, mine = 'image/jpg') => {
    console.log("Ha entrado a firebase storage")
    console.log(uri)
    console.log(imageName)
    let finalResponse=recetaId.concat("/".concat(imageName))
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS ==='ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
        const imageRef= firebase.storage().ref(`${UserID}`).child(finalResponse)
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
class modPreparation extends Component{
    componentWillMount() {
        console.log(this.props.categoria,
            this.props.pais)
        this.setState({
            pasos:this.props.pasos
        })
    }
    constructor(props){
        super(props)
        this.state={
            pasos:[]
        }
    }


    saveForm(){
        if(this.props.user){
            try {

                this.props.imageUrl && (this.props.imageUrl.localeCompare(this.props.imageAux) !== 0) ?
                    uploadImage(this.props.user.uid,this.props.uid_receta,this.props.imageUrl, `imagen${this.props.titulo}.jpg`)
                        .then((responseData) => {
                            Helpers.setImageUrl(this.props.user.uid,this.props.uid_receta,responseData)
                        })
                        .done()
                    : () => console.log(this.props.imageUrl)

                this.props.avatarUrl && (this.props.avatarUrl.localeCompare(this.props.avatarAux) !== 0) ?
                    uploadImage(this.props.user.uid,this.props.uid_receta,this.props.avatarUrl, `avatar${this.props.titulo}.jpg`)
                        .then((responseData) => {
                            Helpers.setAvatarUrl(this.props.user.uid,this.props.uid_receta,responseData)
                        })
                        .done()
                    : ()=> console.log(this.props.avatarUrl)

                this.state.pasos.map((data, index) => {
                    if(data.imagen){
                        uploadImage(this.props.user.uid,this.props.uid_receta,data.imagen,`${data.titulo}.jpg`)
                            .then((responseData)=>{
                                Helpers.setPaso(this.props.user.uid,this.props.uid_receta,index,responseData)
                            })
                    }
                });


                  Helpers.setReceta(
                    this.props.uid_receta,
                    this.props.user.uid,
                    this.props.titulo,
                    this.props.autor,
                    this.props.entradilla,
                    this.props.tiempo,
                    this.props.dificultad,
                    this.props.numPerson,
                    this.props.ingredientes,
                    this.state.pasos,
                      this.props.categoria,
                      this.props.pais

                )

                Alert.alert("Recetas", "Receta modificada con éxito")

                Actions.usersRecetas()

            }catch (e) {
                console.log(e)
            }

        }
    }
    onAddPaso =() =>{
        Actions.modAddPaso({
            uid_receta:this.props.uid_receta,
            titulo: this.props.titulo ,
            autor: this.props.autor,
            entradilla: this.props.entradilla,
            tiempo: this.props.tiempo,
            dificultad:this.props.dificultad,
            imageUrl: this.props.imageUrl,
            avatarUrl: this.props.avatarUrl,
            ingredientes:this.props.ingredientes,
            numPerson: this.props.numPerson,
            pasos:this.state.pasos,
            avatarAux:this.props.avatarAux,
            imageAux:this.props.imageAux,
            categoria:this.props.categoria,
            pais:this.props.pais
        });
    }

    modPaso = (item)  =>{
        Actions.modPaso({
            uid_receta:this.props.uid_receta,
            titulo: this.props.titulo ,
            autor: this.props.autor,
            entradilla: this.props.entradilla,
            tiempo: this.props.tiempo,
            dificultad:this.props.dificultad,
            imageUrl: this.props.imageUrl,
            avatarUrl: this.props.avatarUrl,
            ingredientes:this.props.ingredientes,
            numPerson: this.props.numPerson,
            pasos:this.state.pasos,
            paso:item,
            avatarAux:this.props.avatarAux,
            imageAux:this.props.imageAux,
            categoria:this.props.categoria,
            pais:this.props.pais
        })
    }



    render(){
        return(
            <ImageBackground source={fondo}style={{flex:1,backgroundColor: "white" }} >
                <ScrollView >
                    <View style={styles.container}>
                        <FlatList
                            style={{marginHorizontal: widthPercentageToDP(1.5)}}
                            key={this.state.pasos.pid}
                            data={this.state.pasos}
                            numColumns={3}
                            columnWrapperStyle={{marginTop: heightPercentageToDP(1.5)}}
                            renderItem={({item}) =>
                                <TouchableOpacity onPress={() => this.modPaso(item)}>
                                    <Image
                                        source={{uri:item.imagen}}
                                        style={{width:widthPercentageToDP(32),  height:heightPercentageToDP(14)}}
                                    />
                                </TouchableOpacity>
                            }
                        />
                        <TouchableOpacity onPress={this.onAddPaso}>
                            <ImageBackground source={fotoPrincipal} style={{marginLeft:widthPercentageToDP(1.5),width:widthPercentageToDP(32), height:heightPercentageToDP(14), alignItems:'center', justifyContent: 'center'}}>
                                <Image
                                    source={add}
                                    style={{width:widthPercentageToDP(5), height:heightPercentageToDP(3)}}
                                />
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingLeft: widthPercentageToDP(15), paddingRight: widthPercentageToDP(15)}}>
                        <Buttons
                            text1={"Guardar todo"}
                            onPress1={this.saveForm.bind(this)}
                            text2={"Atrás"}
                            onPress2={()=>Actions.pop()}
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }

}
const styles= StyleSheet.create({
    container:{
        backgroundColor: "white",
    },

});

const mapStateToProps = state =>{
    const {user} = state.auth;
    //const {pasos} =state.paso;
    return {user}
}
export default connect(mapStateToProps,null)(modPreparation)
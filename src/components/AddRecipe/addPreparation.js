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
let puntos= {
    1:0,
    2:0,
    3:0,
    4:0,
    5:0
}

const uploadImage = (UserID, uri, imageName, mine = 'image/jpg') => {
    console.log("Ha entrado a firebase storage")
    console.log(uri)
    console.log(imageName)
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS ==='ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
        const imageRef= firebase.storage().ref(`${UserID}`).child(imageName)
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
class addPreparation extends Component{
    componentWillMount() {
        console.log(this.props.categoria,
            this.props.pais)
        if(this.props.pasos){
            this.setState({
                pasos:this.props.pasos,

            })
        }

    }
    constructor(props){
        super(props)
        this.state={
            pasos:[],
            puntos:puntos
        }
    }
    saveForm(){
        if(this.props.user){
            console.log(
                this.props.user.uid,
                this.props.title,
                this.props.autor,
                this.props.entradilla,
                this.props.time,
                this.props.dificultad,
                this.props.person,
                this.props.ingredients,
                this.props.pasos);
            try {
                this.props.imagenPrincipal ?
                    uploadImage(this.props.user.uid, this.props.imagenPrincipal, `imagen${this.props.title}.jpg`)
                        .then((responseData) => {
                            Helpers.setImageUrl(this.props.user.uid,uid_recetas,responseData)
                        })
                        .done()
                    : null
                this.props.avatarSource ?
                    uploadImage(this.props.user.uid,this.props.avatarSource, `avatar${this.props.title}.jpg`)
                        .then((responseData) => {
                            Helpers.setAvatarUrl(this.props.user.uid,uid_recetas,responseData)
                        })
                        .done()
                    : null

                this.props.pasos.map((data, index) => {
                    if(data.imagen){
                        uploadImage(this.props.user.uid,data.imagen,`${data.titulo}.jpg`)
                            .then((responseData)=>{
                                Helpers.setPaso(this.props.user.uid,uid_recetas,index,responseData)
                            })
                    }
                });


                let uid_recetas = Helpers.pushReceta(
                    this.props.user.uid,
                    this.props.title,
                    this.props.autor,
                    this.props.entradilla,
                    this.props.time,
                    this.props.dificultad,
                    this.props.person,
                    this.props.ingredients,
                    this.state.pasos,
                    this.props.categoria,
                    this.props.pais,
                    this.state.puntos
                )

                Alert.alert("Recetas", "Receta creada con éxito")

                Actions.usersRecetas()

            }catch (e) {
                console.log(e)
            }

        }
    }
    onAddPaso =() =>{
        Actions.addPaso({
            title:this.props.title,
            autor:this.props.autor,
            entradilla:this.props.entradilla,
            time:this.props.time,
            dificultad:this.props.dificultad,
            person:this.props.person,
            ingredients:this.props.ingredients,
            imagenPrincipal: this.props.imagenPrincipal,
            avatarSource: this.props.avatarSource,
            categoria:this.props.categoria,
            pais:this.props.pais,
            pasos:this.state.pasos
        });
    }

    modPaso = (item)  =>{
        Actions.pasoMod({
            title:this.props.title,
            autor:this.props.autor,
            entradilla:this.props.entradilla,
            time:this.props.time,
            dificultad:this.props.dificultad,
            person:this.props.person,
            ingredients:this.props.ingredients,
            imagenPrincipal: this.props.imagenPrincipal,
            avatarSource: this.props.avatarSource,
            categoria:this.props.categoria,
            pais:this.props.pais,
            pasos:this.state.pasos,
            paso: item
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
    return {user}
}
export default connect(mapStateToProps,null)(addPreparation)
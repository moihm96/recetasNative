import React,{Component} from 'react'

import {
    View,
    ImageBackground,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView
} from 'react-native'
import fondo from "../../img/fondo.png"
import ImagePicker from "react-native-image-picker";
import {Buttons} from "../Buttons";
const options={
    title: 'Añadir foto paso',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}
import {Actions} from "react-native-router-flux";
import {heightPercentageToDP} from "../../auxiliar/ScreenDimension";

class modAddPaso extends Component{
    componentWillMount() {
        if(this.props.pasos){
            this.setState({
                pasos:this.props.pasos
            })
        }
    }

    constructor(props){
        super(props)
        this.state={
            pasos:[],
            paso: {},
            titulo:'',
            imagen:'',
            pid:'',
            descripcion:''

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
                    imagen: response.uri,
                });
            }
        });
    }

    addPaso(){

        this.state.paso.titulo=this.state.titulo
        this.state.paso.imagen=this.state.imagen
        this.state.paso.pid=this.state.pid
        this.state.paso.descripcion=this.state.descripcion
        this.setState({
            titulo:'',
            imagen:'',
            pid:'',
            descripcion:''
        })
        this.state.pasos.push(this.state.paso)
        this.setState({
            paso:{}
        })
        Actions.modPreparation({
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
        })

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
                            onChangeText={(titulo) => this.setState({titulo})}
                            value={this.state.titulo}
                            returnKeyType="Siguiente"
                            onSubmitEditing={this._nextPaso}
                        />
                        <TextInput
                            ref={ref => this._numPaso = ref}
                            returnKeyType="Siguiente"
                            onSubmitEditing={this._nextDescr}
                            placeholder="Numero del paso"
                            style={styles.input}
                            placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                            onChangeText={(pid) => this.setState({pid})}
                            value={this.state.pid}
                        />
                        <TextInput
                            ref={ref => this._descrPaso = ref}
                            returnKeyType="Siguiente"
                            placeholder="Descripcion del paso"
                            placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                            style={styles.input}
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(descripcion) => this.setState({descripcion})}
                            value={this.state.descripcion}
                            onSubmitEditing={this.openCamera}
                            blurOnSubmit={true}
                        />
                        <TouchableOpacity onPress={this.openCamera} style={{marginTop:heightPercentageToDP(3), marginBottom:heightPercentageToDP(1)}}>
                            <Text style={{marginBottom:heightPercentageToDP(1)}}>Foto del paso</Text>
                            <View style={{borderColor:'rgb(210,210,210)',borderWidth:1}}>
                                <Image
                                    style={{height:heightPercentageToDP(15)}}
                                    source={{uri:this.state.imagen}}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingHorizontal: heightPercentageToDP(4)}}>
                        <Buttons
                            text1={"Guardar"}
                            text2={"Atrás"}
                            onPress2={()=>Actions.pop()}
                            onPress1={()=>this.addPaso()}
                        />
                    </View>
                </ScrollView>
            </ImageBackground>

        )
    }
    _nextPaso = () =>{
        this._numPaso && this._numPaso.focus()
    }
    _nextDescr = () =>{
        this._descrPaso && this._descrPaso.focus()
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
    input:{
        borderBottomWidth: 1,
        borderBottomColor:'grey'
    }
});

export default modAddPaso;
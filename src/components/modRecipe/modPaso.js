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
import {connect} from 'react-redux'
import {setPaso} from "../../actions/PasosAction";
import fondo from "../../img/fondo.png"
import ImagePicker from "react-native-image-picker/index";
import {Buttons} from "../Buttons";
const options={
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}
import {Actions} from "react-native-router-flux";

class modPaso extends Component{
    componentWillMount() {
        this.setState({
            paso:this.props.paso,
            pasos:this.props.pasos,
            titulo:this.props.paso.titulo,
            imagen:this.props.paso.imagen,
            pid:this.props.paso.pid,
            descripcion:this.props.paso.descripcion
        })
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
        console.log(
            this.state.pasos,
            this.state.paso,
            this.state.titulo,
            this.state.imagen,
            this.state.pid,
            this.state.descripcion

        )

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
            pasos:this.props.pasos,
            avatarAux:this.props.avatarAux,
            imageAux:this.props.imageAux
        })
    }

    render(){
        return(
            <ImageBackground source={fondo} style={styles.container}>
                <ScrollView>
                    <Text style={styles.nuevaText}>Paso</Text>
                    <View style={styles.vista}>
                        <TextInput
                            placeholder="Titulo del paso"
                            style={styles.input}
                            placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                            onChangeText={(titulo) => this.setState({titulo})}
                            value={this.state.titulo}
                            returnKeyType="next"
                            onSubmitEditing={this._nextPaso}
                        />
                        <TextInput
                            ref={ref => this._numPaso = ref}
                            returnKeyType="next"
                            onSubmitEditing={this._nextDescr}
                            placeholder="Numero del paso"
                            style={styles.input}
                            placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                            onChangeText={(pid) => this.setState({pid})}
                            value={this.state.pid}
                        />
                        <TextInput
                            ref={ref => this._descrPaso = ref}
                            returnKeyType="next"
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
                        <TouchableOpacity onPress={this.openCamera}>
                            <Text>Foto del paso</Text>
                        </TouchableOpacity>
                        <Image
                            style={{width:100, height:100}}
                            source={{uri:this.state.imagen}}
                        />
                        <View style={{padding: 20}}>
                            <Buttons
                                text1={"Guardar"}
                                text2={"Atrás"}
                                onPress2={()=>Actions.pop()}
                                onPress1={()=>this.addPaso()}
                            />
                        </View>
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
});

export default connect(null,{setPaso})(modPaso)
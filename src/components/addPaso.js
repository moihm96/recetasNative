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
import {setPaso} from "../actions/PasosAction";
import fondo from "../img/fondo.png"
import ImagePicker from "react-native-image-picker";
import {Buttons} from "./Buttons";
const options={
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}
import {Actions} from "react-native-router-flux";

class addPaso extends Component{
    constructor(props){
        super(props)
        this.state={
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
        this.props.setPaso(this.state.paso)
        this.setState({
            paso:[]
        })
        Actions.addPreparation({
            title:this.props.title,
            autor:this.props.autor,
            entradilla:this.props.entradilla,
            time:this.props.time,
            dificultad:this.props.dificultad,
            person:this.props.person,
            ingredients:this.props.ingredients,
            imagenPrincipal: this.props.imagenPrincipal,
            avatarSource: this.props.avatarSource
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
                        />
                        <TextInput
                            placeholder="Numero del paso"
                            style={styles.input}
                            placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                            onChangeText={(pid) => this.setState({pid})}
                            value={this.state.pid}
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

export default connect(null,{setPaso})(addPaso)
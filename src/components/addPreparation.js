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
    ScrollView
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
export default class addPreparation extends Component{
    constructor(props){
        super(props)
        this.state={
            pasos:[],
            title: "",
            imagePaso:null,
            descripcion:"",
            id:""

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
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    imagePaso: source,
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
            imagePaso:null,
            descripcion:"",
            id:""
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
                            source={this.state.imagePaso}
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
import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    TouchableHighlight,
    ImageBackground,
    StyleSheet}
    from 'react-native';
import ImagePicker from "react-native-image-picker"
import { Slider } from 'react-native-elements';
import SelectInput from "react-native-select-input-ios";
import foto from "../img/foto.png"
import fotoPrincipal from "../img/fotoPrincipal.png"
import fondo from "../img/fondo.png"
import {KeyboardAvoidingView} from "./LoginForm";
import {heightPercentageToDP} from "../auxiliar/ScreenDimension";
import {Actions} from "react-native-router-flux";
import {Buttons} from "./Buttons"
const options={
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}
let arrayEmpty=["Baja"]
let dif=["Baja","Media","Alta"]
let dificultad=arrayEmpty[0]
export default class addRecetas extends Component {
    constructor(props){
        super(props)
        this.state={
            title: "",
            autor:"",
            entradilla:"",
            time:0,
            arrayDif:dif,
            dificultad:dificultad,
            avatarSource: null
        };
    }
    pickerDif(){
        let array = []
        this.state.arrayDif.map((data, i) => {
            array.push({value:data, label: data})
        });
        return(array)
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
                    avatarSource: source,
                });
            }
        });
    }

    render() {
        return (
            <ImageBackground source={fondo}
                             style={styles.container}
                                            >
                <ScrollView>
                    <Text style={styles.nuevaText}>Nueva Receta</Text>
                    <View style={styles.vista}>
                        <TextInput
                            placeholder="Titulo de la receta"
                            style={styles.input}
                            placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                            onChangeText={(title) => this.setState({title})}
                            value={this.state.title}
                        />


                        <TouchableOpacity onPress={this.openCamera}>
                            <Text>Foto de la cabecera y listados</Text>
                        </TouchableOpacity>
                        <Image
                            style={{width:100, height:100}}
                            source={this.state.avatarSource}
                        />


                        <Text>Foto de mi abuela</Text>

                        <Text>Tiempo de preparación:  {this.state.time} minutos</Text>
                        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                            <Slider
                                maximumValue={150}
                                value={this.state.time}
                                onValueChange={time => this.setState({ time })}
                                thumbTintColor={'rgb(255,216,0)'}
                                step={1}
                            />
                        </View>
                        <View style={styles.difStyle}>
                            <Text >Dificultad</Text>
                            <SelectInput
                                options = {this.pickerDif()}
                                value = {this.state.dificultad}
                                onSubmitEditing = {(value) => this.setState({dificultad: value})}
                                style={styles.input}
                            />
                        </View>
                        <TextInput
                            placeholder="Autor"
                            style={styles.input}
                            placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                            onChangeText={(autor) => this.setState({autor})}
                            value={this.state.autor}
                        />
                        <TextInput
                            placeholder="Entradilla de la receta"
                            placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                            style={styles.input}
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(entradilla) => this.setState({entradilla})}
                            value={this.state.entradilla}
                        />
                    </View>
                    <View style={styles.buttonStyles}>
                        <Buttons
                            onPress1={()=>Actions.addIngr()}
                            onPress2={()=>Actions.pop}
                            text1={"Siguiente"}
                            text2={"Cancelar"}
                        />
                    </View>

                </ScrollView>

            </ImageBackground>
        );
    }
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white",

    },
    vista:{
        backgroundColor:"white",
        flex:1,
        padding: 15
    },
    difStyle:{

    },
    input:{
        borderBottomWidth: 1,
        borderColor:'grey'
    },
    buttonStyles:{
        padding:20
    },
    buttonContainer1:{
        marginTop: heightPercentageToDP('3%'),
        backgroundColor: 'rgb(255,216,0)',
        paddingVertical: 10,
        borderRadius:7
    },
    buttonContainer2:{
        marginTop: heightPercentageToDP('1%'),
        backgroundColor: 'rgb(251,237,157)',
        paddingVertical: 10,
        borderRadius:7
    },
    buttonText: {
        textAlign: 'center',
        color:'black',
        fontSize:20,
        fontWeight: '700'
    },
    nuevaText:{
        fontFamily:'Allura-Regular',
        fontSize:32
    }
});


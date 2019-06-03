import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ImageBackground,
    StyleSheet}
    from 'react-native';
import ImagePicker from "react-native-image-picker"
import {Avatar, Slider} from 'react-native-elements';
import SelectInput from "react-native-select-input-ios";
import foto from "../../img/foto.png"
import fotoPrincipal from "../../img/fotoPrincipal.png"
import fondo from "../../img/fondo.png"
import {heightPercentageToDP, widthPercentageToDP} from "../../auxiliar/ScreenDimension";
import {Actions} from "react-native-router-flux";
import {Buttons} from "../Buttons"
const options={
    title: 'Recetas de la abuela',
    takePhotoButtonTitle: 'Usa tu camara',
    chooseFromLibraryButtonTitle: 'Escoge una foto de la galeria',
}
let dif=["Baja","Media","Alta"]
export default class addRecetas extends Component {
    constructor(props){
        super(props)
        this.state={
            title: "",
            autor:"",
            entradilla:"",
            time:0,
            arrayDif:dif,
            dificultad:"Baja",
            imagenPrincipal:"",
            avatarSource:""
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

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    imagenPrincipal: response.uri,
                });
            }
        });
    }
    openCameraAvatar=()=>{
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
                    avatarSource: response.uri,
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
                            placeholderTextColor={'grey'}
                            onChangeText={(title) => this.setState({title})}
                            value={this.state.title}
                        />


                        <TouchableOpacity onPress={this.openCamera} style={{marginTop:heightPercentageToDP(3), marginBottom:heightPercentageToDP(2)}}>
                            <Text style={{marginBottom:heightPercentageToDP(1)}}>Foto de la cabecera y listados</Text>
                            <View style={{borderColor:'rgb(210,210,210)',borderWidth:1}}>
                                <Image
                                    style={{height:heightPercentageToDP(15)}}
                                    source={{uri:this.state.imagenPrincipal}}
                                />
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.openCameraAvatar} style={{alignItems:'center', marginBottom: heightPercentageToDP(2)}}>
                            <Text>Foto de la abuela</Text>
                            <Avatar
                                source={{uri:this.state.avatarSource}}
                                rounded
                                size={"medium"}
                            />
                        </TouchableOpacity>


                        <Text>Tiempo de preparación:  {this.state.time} minutos</Text>
                        <Slider
                            maximumValue={200}
                            value={this.state.time}
                            onValueChange={time => this.setState({ time })}
                            trackStyle={{borderRadius: 5,borderWidth: 1, borderColor:'grey', height:heightPercentageToDP(1.75)}}
                            thumbStyle={{borderWidth:1, borderColor: 'white', alignItems:'flex-end',height:heightPercentageToDP(3)}}
                            thumbTouchSize={{width: widthPercentageToDP(10), height: heightPercentageToDP(10)}}
                            thumbTintColor={'rgb(255,216,0)'}
                            minimumTrackTintColor={'rgb(255,216,0)'}
                            maximumTrackTintColor={"white"}
                            step={5}
                        />


                        <View style={styles.difStyle}>
                            <Text style={{flex:2}}>Dificultad</Text>
                            <SelectInput
                                options = {this.pickerDif()}
                                value = {this.state.dificultad}
                                onSubmitEditing = {(value) => this.setState({dificultad: value})}
                                style={{flex:2}}
                            />
                        </View>
                        <TextInput
                            placeholder="Autor"
                            style={styles.input}
                            placeholderTextColor={'grey'}
                            onChangeText={(autor) => this.setState({autor})}
                            value={this.state.autor}
                            returnKeyType="Siguiente"
                            onSubmitEditing={this._next}
                        />

                        <TextInput
                            ref={ref=> {this._entradilla = ref}}
                            placeholder={'Entradilla de la receta'}

                            style={styles.input}
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(entradilla) => this.setState({entradilla})}
                            value={this.state.entradilla}
                            returnKeyType="Siguiente"
                            maxLength={200}
                            blurOnSubmit={true}
                            onSubmitEditing={()=>Actions.addIngr({
                                title:this.state.title,
                                autor:this.state.autor,
                                entradilla:this.state.entradilla,
                                time:this.state.time,
                                dificultad:this.state.dificultad,
                                imagenPrincipal:this.state.imagenPrincipal,
                                avatarSource:this.state.avatarSource
                            })}

                        />
                    </View>
                    <View style={styles.buttonStyles}>
                        <Buttons
                            onPress1={()=>Actions.addIngr({
                                title:this.state.title,
                                autor:this.state.autor,
                                entradilla:this.state.entradilla,
                                time:this.state.time,
                                dificultad:this.state.dificultad,
                                imagenPrincipal:this.state.imagenPrincipal,
                                avatarSource:this.state.avatarSource
                            })}
                            onPress2={()=>Actions.pop()}
                            text1={"Siguiente"}
                            text2={"Cancelar"}
                        />
                    </View>

                </ScrollView>

            </ImageBackground>
        );
    }
    _next = () => {
        this._entradilla && this._entradilla.focus()
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
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth: 1,
        borderColor:'rgb(210,210,210)'
    },
    input:{
        borderBottomWidth: 1,
        borderColor:'rgb(210,210,210)'
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


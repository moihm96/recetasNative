import React, {Component} from 'react';
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
import {Avatar, Slider} from 'react-native-elements';
import SelectInput from "react-native-select-input-ios";
import fondo from "../../img/fondo.png"
import {heightPercentageToDP, widthPercentageToDP} from "../../auxiliar/ScreenDimension";
import {Actions} from "react-native-router-flux";
import {Buttons} from "../Buttons"
const options={
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}

let paises=["Cualquiera","España","Cuba","Italia","Etiopía","Venezuela","Brasil","Francia","Filipinas","Marruecos","Sudafrica"]
let dif=["Baja","Media","Alta"]
let categoria=["Todas","Postres","Repostería", "Sopas", "Arroces", "Ensaladas","Carnes","Pescados","Legumbres"]
export default class modReceta extends Component {
    componentWillMount() {
        console.log(this.props.receta)
        this.setState({
            titulo: this.props.receta.titulo ,
            autor: this.props.receta.autor,
            entradilla: this.props.receta.entradilla,
            tiempo: this.props.receta.tiempo,
            arrayDif:dif,
            dificultad:this.props.receta.dificultad,
            categoria:this.props.receta.categoria,
            pais:this.props.receta.pais
        })

        if(this.props.receta.imageUrl){
            this.setState({
                imageUrl: this.props.receta.imageUrl,
                imageAux: this.props.receta.imageUrl,
            })
        }
        if(this.props.receta.avatarUrl){
            this.setState({
                avatarUrl: this.props.receta.avatarUrl,
                avatarAux: this.props.receta.avatarUrl
            })
        }
    }

    constructor(props){
        super(props)
        this.state={
            arrayCat:categoria,
            arrayPais:paises,
            categoria:"Todas",
            pais:"Cualquiera",
            titulo: "",
            autor:"",
            entradilla:"",
            tiempo:0,
            arrayDif:dif,
            dificultad:"Baja",
            imageUrl:"imageUrl",
            avatarUrl:"avatarUrl",
            imageAux:"imageAux",
            avatarAux:"avatarAux"
        };
    }


    pickerDif(){
        let array = []
        this.state.arrayDif.map((data, i) => {
            array.push({value:data, label: data})
        });
        return(array)
    }
    pickerCategoria(){
        let array = []
        this.state.arrayCat.map((data, i) => {
            array.push({value:data, label: data})
        });
        return(array)
    }
    pickerPais(){
        let array = []
        this.state.arrayPais.map((data, i) => {
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
                    imageUrl: response.uri,
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
                    avatarUrl: response.uri,
                });
            }
        });
    }
    timeSet = (tiempo) =>{
        this.setState({ tiempo })
        if(tiempo<50){
            this.setState({dificultad:"Baja"})
        }else if(tiempo>50 && tiempo <90) {
            this.setState({dificultad:"Media"})
        }else if(tiempo>90){
            this.setState({dificultad:"Alta"})
        }

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
                            onChangeText={(titulo) => this.setState({titulo})}
                            value={this.state.titulo}
                            onSubmitEditing={this.openCamera}
                        />


                        <TouchableOpacity onPress={this.openCamera} style={{marginTop:heightPercentageToDP(3), marginBottom:heightPercentageToDP(2)}}>
                            <Text style={{marginBottom:heightPercentageToDP(1)}}>Foto de la cabecera y listados</Text>
                            <View style={{borderColor:'rgb(210,210,210)',borderWidth:1}}>
                                <Image
                                    style={{height:heightPercentageToDP(15)}}
                                    source={{uri:this.state.imageUrl}}
                                />
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.openCameraAvatar} style={{alignItems:'center', marginBottom: heightPercentageToDP(2)}}>
                            <Text>Foto de la abuela</Text>
                            <Avatar
                                source={{uri:this.state.avatarUrl}}
                                rounded
                                size={"medium"}
                            />
                        </TouchableOpacity>


                        <Text>Tiempo de preparación:  {this.state.tiempo} minutos</Text>
                        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                            <Slider
                                maximumValue={150}
                                value={this.state.tiempo}
                                onValueChange={(tiempo) => this.timeSet(tiempo)}
                                trackStyle={{borderRadius: 5,borderWidth: 1, borderColor:'grey', height:heightPercentageToDP(1.75)}}
                                thumbStyle={{borderWidth:1, borderColor: 'white', alignItems:'flex-end',height:heightPercentageToDP(3)}}
                                thumbTouchSize={{width: widthPercentageToDP(10), height: heightPercentageToDP(10)}}
                                thumbTintColor={'rgb(255,216,0)'}
                                minimumTrackTintColor={'rgb(255,216,0)'}
                                maximumTrackTintColor={"white"}
                                step={5}
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
                        <View style={styles.difStyle}>
                            <Text style={{flex:2}}>Pais</Text>
                            <SelectInput
                                options = {this.pickerPais()}
                                value = {this.state.pais}
                                onSubmitEditing = {(value) => this.setState({pais: value})}
                                style={{flex:2}}
                            />
                        </View>
                        <View style={styles.difStyle}>
                            <Text style={{flex:2}}>Categoria</Text>
                            <SelectInput
                                options = {this.pickerCategoria()}
                                value = {this.state.categoria}
                                onSubmitEditing = {(value) => this.setState({categoria: value})}
                                style={{flex:2}}
                            />
                        </View>
                        <TextInput
                            placeholder="Autor"
                            style={styles.input}
                            placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                            onChangeText={(autor) => this.setState({autor})}
                            value={this.state.autor}
                            returnKeyType="next"
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
                            returnKeyType="send"
                            maxLength={200}
                            blurOnSubmit={true}
                            onSubmitEditing={()=>Actions.modIngredients({
                                receta:this.props.receta,
                                titulo: this.state.titulo ,
                                autor: this.state.autor,
                                entradilla: this.state.entradilla,
                                tiempo: this.state.tiempo,
                                dificultad:this.state.dificultad,
                                imageUrl: this.state.imageUrl,
                                avatarUrl: this.state.avatarUrl,
                                imageAux:this.state.imageAux,
                                avatarAux:this.state.avatarAux,
                                categoria:this.state.categoria,
                                pais:this.state.pais
                            })}
                        />
                    </View>
                    <View style={styles.buttonStyles}>
                        <Buttons
                            onPress1={()=>Actions.modIngredients({
                                receta:this.props.receta,
                                titulo: this.state.titulo ,
                                autor: this.state.autor,
                                entradilla: this.state.entradilla,
                                tiempo: this.state.tiempo,
                                dificultad:this.state.dificultad,
                                imageUrl: this.state.imageUrl,
                                avatarUrl: this.state.avatarUrl,
                                imageAux:this.state.imageAux,
                                avatarAux:this.state.avatarAux,
                                categoria:this.state.categoria,
                                pais:this.state.pais
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
    imageContainer:{
        width:100,
        height:100
    },
    avatarStyle:{

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


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
import {heightPercentageToDP, widthPercentageToDP} from "../../auxiliar/ScreenDimension";

class pasoMod extends Component{
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

        Actions.addPreparation({
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
                            text2={"Cancelar"}
                            onPress2={()=>Actions.pop()}
                            onPress1={()=>this.addPaso()}
                        />
                        <TouchableOpacity style={styles.buttonContainer} onPress={this.deletePaso}>
                            <Text style={styles.buttonText}>Eliminar este paso</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>

        )
    }
    deletePaso = () =>{
        console.log(this.state.pasos)
        let pas = [...this.state.pasos]
        let paso = this.state.paso
        console.log(pas)
        console.log(pas,paso)
        for (let i = 0; i < pas.length; i++) {
            if(pas[i].pid === paso.pid){
               console.log("Son iguales",pas[i].pid,paso.pid )
                pas.splice(i,1)
                this.setState({
                    pasos:pas
                })
            }
        }
        console.log(pas)
        //this.del()
        setTimeout(() => {
            this.del();
        }, 1000)
    }

     del(){
        console.log(this.state.pasos)
        Actions.addPreparation({
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
        })
    }
    _nextPaso = () =>{
        this._numPaso && this._numPaso.focus()
    }
    _nextDescr = () =>{
        this._descrPaso && this._descrPaso.focus()
    }
}
const styles= StyleSheet.create({
    buttonText: {
        fontFamily:'Allura-Regular',
        color:'rgb(180,180,180)',
        fontSize:widthPercentageToDP(9)
    },
    buttonContainer:{
        marginTop:heightPercentageToDP(1),
        backgroundColor: 'rgb(80,28,28)',
        paddingVertical: heightPercentageToDP(0.5),
        borderRadius:7,
        alignItems: 'center',
        justifyContent: 'center'
    },
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

export default connect(null,{setPaso})(pasoMod)
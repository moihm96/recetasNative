import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from "../auxiliar/ScreenDimension";
import SelectInput from "react-native-select-input-ios";
let arrayEmpty=["Cualquiera"]
let paises=["Cualquiera","España","Cuba"]
let pais=arrayEmpty[0]
import CheckboxGroup from 'react-native-checkbox-group'
import CheckForm from './CheckboxGroup'
import CheckboxForm from "react-native-checkbox-form";
import {Actions} from "react-native-router-flux";
import IonIcon from 'react-native-vector-icons/Ionicons'
import SearchRecetas from "../container/ui/searchRecetas";
import * as firebase from 'firebase'
import _ from "lodash";
import {FETCH_ALL_RECIPES_SUCCESS} from "../actions/types";
const tipoRecetas=[
    {
        label:"Nuestras Recetas",
        value:"Nuestras Recetas"
    },
    {
        label:"Recetas de usuario",
        value:"Recetas de usuario"
    }
];
const dificultad=[
    {
        label:"Dificil",
        value:"Dificil"
    },
    {
        label:"Media",
        value:"Media"
    },
    {
        label:"Facil",
        value:"Facil"
    }
];
const categoria1=[
    {
        label:"Todas",
        value:"Todas"
    },
    {
        label:"Postres",
        value:"Postres"
    },
    {
        label:"Reposteria",
        value:"Respoteria"
    },
    {
        label:"Sopas",
        value:"Sopas"
    },
    {
        label:"Arroces",
        value:"Arroces"
    },
    {
        label:"Ensaladas",
        value:"Ensaladas"
    },
    {
        label:"Carnes",
        value:"Carnes"
    },
    {
        label:"Pescados",
        value:"Pescados"
    },
    {
        label:"Legumbres",
        value:"Legumbres"
    }
]
const categoria2=[
    {
        label:"Sopas",
        value:"Sopas"
    },
    {
        label:"Arroces",
        value:"Arroces"
    },
    {
        label:"Ensaladas",
        value:"Ensaladas"
    }]
const categoria3=[
    {
        label:"Carnes",
        value:"Carnes"
    },
    {
        label:"Pescados",
        value:"Pescados"
    },
    {
        label:"Legumbres",
        value:"Legumbres"
    }]

class SearchAdvanced extends Component{
    constructor(props){
        super(props)
        this.state={
            palabraBusqueda:"",
            arrayPais:paises,
            pais:pais,
            categoria:[],
            dificultad:"",
            tipoReceta:""
        }
    }
    pickerPais(){
        let array = []
        this.state.arrayPais.map((data, i) => {
            array.push({value:data, label: data})
        });
        return(array)
    }
    changeCategoria = (selected) =>{
        this.setState({
            categoria:selected
        })
        console.log(this.state.categoria)
    }
    onClickSearch(){
        this.props.callback.onClickSearch(false)
    }
    onSearch(){
        /**console.log("Palabra: ", this.state.palabraBusqueda)
        console.log("Pais: ", this.state.pais)
        console.log("Categoria: ", this.state.categoria)
        console.log("Dificultad: ", this.state.dificultad)
        console.log("Tipo de Receta: ", this.state.tipoReceta)
        this.props.callback.onClickSearch(false)
        Actions.searchRecetas({
            palabraBusqueda:this.state.palabraBusqueda,
            pais:this.state.pais,
            categoria:this.state.categoria,
            dificultad:this.state.dificultad,
            tipoReceta:this.state.tipoReceta
        })*/
        let db = firebase.database().ref(`/user/recetas`)
        let recetas = db.on('value', snapshot => {
            let data = snapshot.val()


        })
        console.log(db)

    }
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => this.onClickSearch()} style={{alignItems: 'flex-end'}}>
                        <IonIcon
                            name="ios-close-circle-outline"
                            color="black"
                            size={heightPercentageToDP(3)}
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Palabra de búsqueda"
                        placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                        onChangeText={(value) => this.setState({palabraBusqueda:value})}
                        value={this.state.palabraBusqueda}
                    />

                    <Text style={{fontWeight: 'bold'}} >Pais</Text>
                    <SelectInput
                        options = {this.pickerPais()}
                        value = {this.state.pais}
                        onSubmitEditing = {(value) => this.setState({pais: value})}
                    />
                </View>
                <View style={{flex:2}}>
                    <Text style={{fontWeight: 'bold'}}>Tipo de receta</Text>
                    <CheckForm
                        style={{
                            flex:2, flexDirection: 'row',
                            paddingHorizontal:heightPercentageToDP(3), justifyContent: 'space-between',
                            flexWrap: 'wrap'
                        }}
                        callback={(selected) => this.setState({
                            tipoReceta:selected
                        })}
                        checkboxes={tipoRecetas}
                        iconColor={"white"}
                        iconSize={heightPercentageToDP(3)}
                        checkedIcon="ios-radio-button-on"
                        uncheckedIcon="ios-radio-button-off"
                        labelStyle={{
                            color: '#333',
                            fontSize: heightPercentageToDP(2.25),
                            marginLeft: widthPercentageToDP(1)
                        }}
                        rowStyle={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginRight: widthPercentageToDP(2),
                            marginTop: heightPercentageToDP(3)
                        }}
                    />
                </View>
                <View style={{flex:2}}>
                    <Text style={{fontWeight: 'bold'}}>Dificultad</Text>
                    <CheckForm
                        style={{
                            flex:2, flexDirection: 'row',
                            paddingHorizontal:heightPercentageToDP(3), justifyContent: 'space-between',
                            flexWrap: 'wrap'
                        }}
                        callback={(selected) => this.setState({
                            dificultad:selected
                        })}
                        checkboxes={dificultad}
                        iconColor={"white"}
                        iconSize={heightPercentageToDP(3)}
                        checkedIcon="ios-radio-button-on"
                        uncheckedIcon="ios-radio-button-off"
                        labelStyle={{
                            color: '#333',
                            fontSize: heightPercentageToDP(2.25),
                            marginLeft: widthPercentageToDP(1)
                        }}
                        rowStyle={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginRight: widthPercentageToDP(2),
                            marginTop: heightPercentageToDP(3)
                        }}
                    />
                </View>

                <View style={{flex:4}}>
                    <Text style={{fontWeight: 'bold'}}>Categoria</Text>
                    <CheckForm
                        style={{
                            flex:3, flexDirection: 'row',
                            paddingHorizontal:heightPercentageToDP(3), justifyContent: 'space-between',
                            flexWrap: 'wrap'
                        }}
                        callback={(selected) => this.setState({
                            categoria:selected
                        })}
                        checkboxes={categoria1}
                        iconColor={"white"}
                        iconSize={heightPercentageToDP(3)}
                        checkedIcon="ios-radio-button-on"
                        uncheckedIcon="ios-radio-button-off"
                        labelStyle={{
                            color: '#333',
                            fontSize: heightPercentageToDP(2.25),
                            marginLeft: widthPercentageToDP(1)
                        }}
                        rowStyle={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginRight: widthPercentageToDP(2),
                            marginTop: heightPercentageToDP(3)
                        }}
                    />

                </View>

                <View>
                    <TouchableOpacity  style={ styles.buttonContainer} onPress={()=>this.onSearch()}>
                        <Text style={styles.buttonText}>Buscar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default SearchAdvanced

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgb(255,216,0)',
        height: heightPercentageToDP("80%"),
        padding: 10
    },
    buttonContainer:{
        backgroundColor: "white",
        padding: 10,
        marginLeft:20,
        marginRight:20,
        borderRadius:10,
        marginBottom: 10
    },
    buttonText: {
        textAlign: 'center',
        color:"black",
        fontSize:20,
        fontWeight: '700'
    }
});
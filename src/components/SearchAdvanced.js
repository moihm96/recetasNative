import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from "../auxiliar/ScreenDimension";
import SelectInput from "react-native-select-input-ios";
import CheckboxGroup from 'react-native-checkbox-group'
let arrayEmpty=["Cualquiera"]
let paises=["Cualquiera","España","Cuba"]
let pais=arrayEmpty[0]
const tipoRecetas=[
    {
        label:"Nuestras Recetas",
        value:0
    },
    {
        label:"Recetas de usuario",
        value:1
    }
];


const dificultad=[
    {
        label:"Dificil",
        value:2
    },
    {
        label:"Media",
        value:1
    },
    {
        label:"Facil",
        value:0
    }
];
const categoria1=[
    {
        label:"Todas",
        value:8
    },
    {
        label:"Postres",
        value:0
    },
    {
        label:"Reposteria",
        value:1
    }
]
const categoria2=[
    {
    label:"Sopas",
    value:2
},
    {
        label:"Arroces",
        value:3
    },
    {
        label:"Ensaladas",
        value:4
    }]
const categoria3=[

    {
    label:"Carnes",
    value:5
},
    {
        label:"Pescados",
        value:6
    },
    {
        label:"Legumbres",
        value:7
    }]
class SearchAdvanced extends Component{
    constructor(props){
        super(props)
        this.state={
            palabraBusqueda:"",
            arrayPais:paises,
            pais:pais
        }
    }
    pickerPais(){
        let array = []
        this.state.arrayPais.map((data, i) => {
            array.push({value:data, label: data})
        });
        return(array)
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    placeholder="Palabra de búsqueda"
                    placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                    onChangeText={(palabraBusqueda) => this.setState({palabraBusqueda})}
                    value={this.state.palabraBusqueda}
                />
                <View >
                    <Text >Pais</Text>
                    <SelectInput
                        options = {this.pickerPais()}
                        value = {this.state.pais}
                        onSubmitEditing = {(value) => this.setState({pais: value})}
                    />
                </View>
                <View style={{flex:1}}>
                    <Text>Tipo de recetas</Text>
                    <CheckboxGroup
                        callback={(selected) => { console.log(selected) }}
                        iconColor={"black"}
                        iconSize={22}
                        checkedIcon="ios-checkmark-circle"
                        uncheckedIcon="ios-checkmark-circle-outline"
                        checkboxes={tipoRecetas}
                        labelStyle={{
                            color: '#333',
                            fontSize:15,
                            marginLeft: 2

                        }}
                        rowStyle={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            padding:3
                        }}
                        rowDirection={"row"}
                    />
                </View>


                <View style={{flex:1}}>
                    <Text>Dificultad</Text>
                    <CheckboxGroup

                        callback={(selected) => { console.log(selected) }}
                        iconColor={"black"}
                        iconSize={22}
                        checkedIcon="ios-checkmark-circle"
                        uncheckedIcon="ios-checkmark-circle-outline"
                        checkboxes={dificultad}
                        labelStyle={{
                            color: '#333',
                            fontSize:15,
                            marginLeft: 2

                        }}
                        rowStyle={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            padding:3
                        }}
                        rowDirection={"row"}
                    />

                </View>
                <View style={{flex:1}}>
                    <Text>Categoria</Text>
                    <CheckboxGroup
                        callback={(selected) => { console.log(selected) }}
                        iconColor={"black"}
                        iconSize={22}
                        checkedIcon="ios-checkmark-circle"
                        uncheckedIcon="ios-checkmark-circle-outline"
                        checkboxes={categoria1}
                        labelStyle={{
                            color: '#333',
                            fontSize:15,
                            marginLeft: 2

                        }}
                        rowStyle={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            padding:3
                        }}
                        rowDirection={"row"}
                    />
                    <CheckboxGroup
                        callback={(selected) => { console.log(selected) }}
                        iconColor={"black"}
                        iconSize={22}
                        checkedIcon="ios-checkmark-circle"
                        uncheckedIcon="ios-checkmark-circle-outline"
                        checkboxes={categoria2}
                        labelStyle={{
                            color: '#333',
                            fontSize:15,
                            marginLeft: 2

                        }}
                        rowStyle={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            padding:3
                        }}
                        rowDirection={"row"}
                    />
                    <CheckboxGroup
                        callback={(selected) => { console.log(selected) }}
                        iconColor={"black"}
                        iconSize={22}
                        checkedIcon="ios-checkmark-circle"
                        uncheckedIcon="ios-checkmark-circle-outline"
                        checkboxes={categoria3}
                        labelStyle={{
                            color: '#333',
                            fontSize:15,
                            marginLeft: 2

                        }}
                        rowStyle={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            padding:3
                        }}
                        rowDirection={"row"}
                    />

                </View>

                    <TouchableOpacity  style={ styles.buttonContainer}>
                        <Text style={styles.buttonText}>Buscar</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}
export default SearchAdvanced

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgb(255,216,0)',
        height: heightPercentageToDP("65%"),
        padding: 10
    },
    buttonContainer:{
        backgroundColor: "white",
        padding: 10,
        marginLeft:20,
        marginRight:20,
        borderRadius:10
    },
    buttonText: {
        textAlign: 'center',
        color:"black",
        fontSize:20,
        fontWeight: '700'
    }
});
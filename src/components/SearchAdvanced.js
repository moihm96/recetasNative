import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from "../auxiliar/ScreenDimension";
import SelectInput from "react-native-select-input-ios";
let arrayEmpty=["Cualquiera"]
let paises=["Cualquiera","España","Cuba"]
let pais=arrayEmpty[0]
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
            </View>
        )
    }
}
export default SearchAdvanced

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgb(255,216,0)',
        height: heightPercentageToDP("60%"),
    }
});
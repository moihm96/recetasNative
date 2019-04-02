import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    TextInput,
    FlatList
} from 'react-native'
import fondo from "../img/fondo.png"
import del from "../img/delete.png"
import {Buttons} from "./Buttons"
import add from "../img/Add.png"
import SelectInput from "react-native-select-input-ios";
import {Actions} from "react-native-router-flux";
let arrayEmpty=["0"]
let personas=["0","2","4","6","8"]
let person=arrayEmpty[0]
const ingredientes=[]
var ingredients=[""]
export default class AddIngredientes extends Component{
    constructor(props){
        super(props)
        this.state={
            data:ingredientes,
            arrayPersonas:personas,
            person:person,
            ingrediente:"",
            ingredients:ingredients,
        }
    }
    pickerIngredientes(){
        let array = []
        this.state.arrayPersonas.map((data, i) => {
            array.push({value:data, label: data})
        });
        return(array)
    }
    onAdd(){
        //Adding Items To Array.
        ingredients.push( this.state.ingrediente.toString() );

        this.setState({ingrediente:""})

    }

    parseData(){
        if(this.state.ingredients){
            return this.state.ingredients.map((data,i)=>{
                return(
                    <View key={i}>
                        <Text>{data}</Text>
                    </View>
                )
            })
        }
    }

    render(){
        return(
            <ImageBackground source={fondo}
                             style={styles.container}>
                <View>
                    <Text style={styles.nuevaText}>Ingredientes</Text>
                    <View style={styles.vista}>
                        <Text >Ingredientes para...</Text>
                        <SelectInput
                            options = {this.pickerIngredientes()}
                            value = {this.state.person}
                            onSubmitEditing = {(value) => this.setState({person: value})}
                        />
                        {this.parseData()}
                        <View style={styles.listStyle}>
                            <TextInput
                                placeholder="Añadir ingrediente"
                                placeholderTextColor={'black'}
                                onChangeText={TextInputValue => this.setState({ingrediente : TextInputValue }) }
                                value={this.state.ingrediente}
                                clearButtonMode={"always"}
                            />
                            <TouchableOpacity onPress={() => this.onAdd()}>
                                <Image
                                    style={styles.imageStyle}
                                    source={add}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{padding: 20}}>
                        <Buttons
                            text1={"Siguiente"}
                            text2={"Atrás"}
                            onPress2={()=> Actions.pop}
                        />
                    </View>

                </View>

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
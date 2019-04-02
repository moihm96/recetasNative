import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native'
import fondo from "../img/fondo.png"
import {heightPercentageToDP, widthPercentageToDP} from "../auxiliar/ScreenDimension";
import {Avatar, Icon} from "react-native-elements";
import {AirbnbRating} from "react-native-ratings";

export default class showReceta extends Component{
    constructor(props){
        super(props)
        this.state={
            comentarios:""
        };
    }
    parseData(){
        if(this.props.receta.ingredientes){
            return this.props.receta.ingredientes.map((data,i)=>{
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
            <ImageBackground
                source={fondo}
                style={styles.container}
            >
                <ScrollView>
                    <Text>{this.props.receta.titulo}</Text>
                    <View style={styles.vistaEntrada}>
                        <Image source={this.props.receta.imagen}/>
                        <Avatar rounded={true} source={this.props.receta.avatar}/>
                        <Text>{this.props.receta.entradilla}</Text>
                        <Text>Autor: {this.props.receta.users}</Text>
                    </View>
                    <Text>Ingredientes</Text>
                    <View style={styles.vistaEntrada}>
                        <Text>Para {this.props.receta.personas} personas</Text>
                        {this.parseData()}
                    </View>
                    <Text>Preparacion</Text>
                    <View>

                    </View>
                    <Text>Comparte y opina</Text>
                    <View style={styles.vistaEntrada}>
                        <View>
                            <Text>Puntua nuestra receta</Text>
                            <AirbnbRating
                                count={5}
                                reviews={["Muy facil","Facil","Media","Dificil","Muy dificil"]}
                                defaultRating={5}
                            />
                        </View>
                        <View>
                            <Text>Compartir</Text>
                            <Icon name={"share"}
                            color={'rgb(255,216,0)'}/>
                        </View>
                        <View>
                            <Text>Añadir a favoritos</Text>
                            <Icon name={"favorite"}
                                  color={'rgb(255,216,0)'}/>
                        </View>
                        <View>
                            <Text>Comentarios</Text>
                            <TextInput
                                placeholder="Escribe aquí"
                                placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={(comentarios) => this.setState({comentarios})}
                                value={this.state.comentarios}
                            />
                        </View>
                        <TouchableOpacity  style={ styles.buttonContainer1}>
                            <Text style={styles.buttonText}>He dicho</Text>
                        </TouchableOpacity>
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
    vistaEntrada:{
        backgroundColor:"white",
        flex:1,
        padding: 15
    },
    buttonContainer1:{
        marginTop: heightPercentageToDP('5%'),
        backgroundColor: 'rgb(255,216,0)',
        paddingVertical: 10,
        borderRadius:7
    },
    buttonText: {
        textAlign: 'center',
        color:'black',
        fontSize:20,
        fontWeight: '700'
    }
});
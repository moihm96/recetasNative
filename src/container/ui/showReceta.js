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
import fondo from "../../img/fondo.png"
import {heightPercentageToDP, widthPercentageToDP} from "../../auxiliar/ScreenDimension";
import {Avatar,Icon} from "react-native-elements";
import FontIcon from "react-native-vector-icons/FontAwesome"
import {Rating} from "react-native-ratings";
import Option from "../../components/showRecipe/optionView"
import {Actions} from "react-native-router-flux";
export default class showReceta extends Component{
    constructor(props){
        super(props)
        this.state={
            comentarios:""
        };
    }
    parseIngredientes(){
        if(this.props.receta.ingredientes){
            return this.props.receta.ingredientes.map((data,i)=>{
                return(
                    <View key={i} style={{flexDirection:"row",alignItems:'center'}}>
                        <FontIcon name={"circle"} color={'rgb(255,216,0)'}/>
                        <Text style={{fontSize:17, marginLeft: 10}}>{data}</Text>
                    </View>
                )
            })
        }
    }
    parsePreparacion(){
        if(this.props.receta.pasos){
            return this.props.receta.pasos.map((data,i)=>{
                return(
                    <View key={i} style={{padding: 10}}>
                        <Image  style={styles.imagenStyle}
                                resizeMode={"cover"}
                                source={{uri:data.imagen}}/>
                        <View style={{flexDirection: "row", marginTop: 5}}>
                            <Text style={styles.pasoStyle}>{data.pid}</Text>
                            <View style={{borderLeftWidth:5,
                                borderColor:'rgb(255,216,0)', paddingLeft: 10}}>
                                <Text style={{fontWeight:"bold", fontSize:15}}>{data.titulo}</Text>
                                <Text style={{ fontSize:15}}>{data.descr}</Text>
                            </View>
                        </View>
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
                    <Text style={styles.textSections}>{this.props.receta.titulo}</Text>
                    <View style={styles.vistaEntrada}>
                        <Image  source={{uri:this.props.receta.imageUrl}}
                                style={styles.imagenStyle}
                                resizeMode={"cover"}/>
                        <View style={{justifyContent: "flex-end"}}>
                            <Avatar
                                source={{uri:this.props.receta.avatarUrl}}
                                rounded
                                size={"medium"}
                                containerStyle={styles.avStyle}/>
                        </View>
                        <Option
                            recetas={this.props.receta}
                        />
                        <Text style={{fontWeight:"bold" }}>{this.props.receta.entradilla}</Text>
                        <Text>
                            Autor:
                            <Text style={{fontWeight: 'bold'}}>
                                {this.props.receta.autor}
                            </Text>
                        </Text>
                    </View>
                    <Text style={styles.textSections}>Ingredientes</Text>
                    <View style={styles.vistaEntrada}>
                        <Text style={{color:'rgb(255,216,0)' }}>Para {this.props.receta.numPerson} personas</Text>
                        {this.parseIngredientes()}
                    </View>
                    <Text style={styles.textSections}>Preparacion</Text>
                    <View style={styles.vistaEntrada}>
                        {this.parsePreparacion()}
                    </View>
                    <Text style={styles.textSections}>Comparte y opina</Text>
                    <View style={styles.vistaEntrada}>
                        <View style={styles.vistaEntradaFinal}>
                            <View>
                                <Text style={styles.textofinal}>Puntua</Text>
                                <Rating
                                    imageSize={30}
                                />
                            </View>
                            <View>
                                <Text style={styles.textofinal}>Compartir</Text>
                                <Icon name={"share"}
                                      color={'rgb(255,216,0)'}
                                      size={30}
                                />
                            </View>
                            <View>
                                <Text style={styles.textofinal}>Favoritos</Text>
                                <Icon name={"favorite"}
                                      color={'rgb(255,216,0)'}
                                      size={30}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.textofinal}>Comentarios</Text>
                            <TextInput
                                placeholder="Escribe aquí"
                                placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={(comentarios) => this.setState({comentarios})}
                                value={this.state.comentarios}
                            />
                        </View>
                    </View>
                    <View style={{flex:1,
                        padding: 15}}>
                        <TouchableOpacity  style={ styles.buttonContainer1}>
                            <Text style={styles.buttonText}>He dicho</Text>
                        </TouchableOpacity>
                        <Text style={{flexDirection:"row"}}>
                            Para añadir un comentario debes
                            <Text style={{color:'rgb(255,216,0)'}}onPress={() => Actions.startView()}> inciar sesion</Text>
                            <Text> o </Text>
                            <Text style={{color:'rgb(255,216,0)'}}onPress={() => Actions.register()}>registrarse</Text>
                        </Text>
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
    vistaEntradaFinal:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    textofinal:{
        fontWeight:"bold",
        fontSize:16,
        marginBottom: 10
    },
    imagenStyle:{
        height:heightPercentageToDP("20%"),
        width:widthPercentageToDP("92%"),
    },
    buttonContainer1:{
        marginTop: heightPercentageToDP('2%'),
        backgroundColor: 'rgb(255,216,0)',
        paddingVertical: 10,
        borderRadius:7
    },
    avStyle:{
        borderWidth:2,
        borderColor:'rgb(255,216,0)',
        position: "absolute",
        alignSelf: "center",
    },
    buttonText: {
        textAlign: 'center',
        color:'black',
        fontSize:20,
        fontWeight: '700'
    },
    textSections:{
        fontFamily:'Allura-Regular',
        fontSize:32
    },
    pasoStyle:{
        alignSelf: "center",
        marginRight: 10,
        fontSize:17,
        color:'rgb(255,216,0)',
    }
});
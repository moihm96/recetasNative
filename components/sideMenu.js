import React, {Component} from 'react';

import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Image
} from 'react-native'
let arrayEmpty=["Cualquiera"]
let paises=["Cualquiera","España","Cuba"]
let pais=arrayEmpty[0]
import {Avatar} from 'react-native-elements'
import SelectInput from 'react-native-select-input-ios'
import {heightPercentageToDP,widthPercentageToDP} from "../auxiliar/ScreenDimension";
import fondo from '../img/fondo.png'
import favIcon from '../img/favIcon2.png'
import add from '../img/Add.png'
import imgOur from '../img/imgOur.png'
import imgUser from '../img/imgUser.png'
import abuelita from '../img/coco.jpg'
import Earth from '../img/Earth.png'
export default class sideMenu extends Component{
    constructor(props){
        super(props)

        this.state = {
            arrayPais:paises,
            pais:pais
        };
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
            <ImageBackground source={fondo}
                             style={styles.container}>
                <View style={styles.avatarStyle}>
                    <Avatar
                        source={abuelita}
                        size={"medium"}
                    />
                    <Text>Registrate o inicia sesion</Text>
                    <TouchableWithoutFeedback>
                        <Text>Iniciar Sesion</Text>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.opcionStyle}>
                    <Image source={Earth} style={styles.imageStyle} />
                    <Text style={styles.textMenu}>Pais de la receta</Text>
                </View>
                <View style={styles.paisStyle}>
                    <Text style={styles.textPais}>Pais</Text>
                    <SelectInput
                        style={styles.textInputStyle}
                        options = {this.pickerPais()}
                        value = {this.state.pais}
                        onSubmitEditing = {(value) => this.setState({pais: value})}
                    />
                </View>
                <View style={styles.opcionStyle}>
                    <Image source={favIcon} style={styles.imageStyle}/>
                    <TouchableWithoutFeedback>
                        <Text style={styles.textMenu}>Favoritos</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.opcionStyle}>
                    <Image source={add} style={styles.imageStyle}/>
                    <TouchableWithoutFeedback>
                        <Text style={styles.textMenu}>Añadir Receta</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.opcionStyle}>
                    <Image source={imgUser} style={styles.imageStyle}/>
                    <TouchableWithoutFeedback>
                        <Text style={styles.textMenu}>Recetas de usuario</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.opcionStyle}>
                    <Image source={imgOur} style={styles.imageStyle}/>
                    <TouchableWithoutFeedback>
                        <Text style={styles.textMenu}>Nuestras Recetas</Text>
                    </TouchableWithoutFeedback>
                </View>
            </ImageBackground>
        )

    }
}


styles= StyleSheet.create({
    container:{
        flex:1,
        padding: 20
    },
    avatarStyle:{
        alignItems:'center',
        justifyContent: 'center'
    },
    paisStyle:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    opcionStyle:{
        flexDirection:'row',
        alignItems: 'center',
        height:heightPercentageToDP("10%"),
        //width: widthPercentageToDP("15%")
    },
    textMenu:{
        fontFamily:'Allura-Regular',
        fontSize:32
    },
    imageStyle:{
        resizeMode:'contain',
        marginRight:10,
        width:40,
        height:40
    },
    textInputStyle:{
        marginLeft: widthPercentageToDP('5%'),
        marginRight: widthPercentageToDP('5%'),
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
        marginBottom: heightPercentageToDP('2%'),
        flex:0.65
    },
    textPais:{
        fontSize: 25
    }
});
import React from 'react'
import { widthPercentageToDP, heightPercentageToDP } from '../auxiliar/ScreenDimension'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import fiveStars from "../img/5stars.png";
import reloj from "../img/reloj.png";
import dificilOff from "../img/dificilOff.png";
import imgUser from "../img/imgUser.png";

const optionView = (props)=>{
    const {recetas} = props;
    return(
        <View style={styles.opcionContainerStyle}>
            <View style={styles.opcionStyle}>
                <Image source={fiveStars} style={styles.puntuacionStyle}/>
            </View>
            <View style={styles.opcionStyle}>
                <Image source={reloj} style={styles.tiempoStyle}/>
                <Text>{recetas.tiempo}</Text>
            </View>
            <View style={styles.opcionStyle}>
                <Image source={dificilOff}style={styles.dificultadStyle}/>
                <Text>{recetas.dificultad}</Text>
            </View>
            <View style={styles.opcionStyle}>
                <Image source={imgUser}style={styles.userStyle}/>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    opcionContainerStyle:{
        padding:5,
        backgroundColor:"white",
        height:heightPercentageToDP("7") ,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    opcionStyle:{
        flexDirection:"row",
        alignItems: "center",
    },
    puntuacionStyle:{
        resizeMode:"contain",
        width:widthPercentageToDP("30")
    },
    tiempoStyle:{
        resizeMode:"contain",
        width:widthPercentageToDP("7"),
        marginRight: widthPercentageToDP("2")
    },
    dificultadStyle:{
        resizeMode:"contain",
        width:widthPercentageToDP("7"),
        marginRight: widthPercentageToDP("2")
    },
    userStyle:{
        resizeMode:"contain",
        width:widthPercentageToDP("7"),
        marginRight: widthPercentageToDP("2")
    }
});

export default optionView;
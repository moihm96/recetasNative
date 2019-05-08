import React from 'react';
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
import favOn from "../img/favOn.png";

const recetaView = (props) =>{
    const {receta} =props;
    return(
        <ImageBackground style={styles.imageContainer} source={{uri:receta.imageUrl}}>
            <View style={styles.iconContainerStyle}>
                <Image source={favOn} style={styles.iconStyle}/>
            </View>
            <View style={styles.tituloContainer}>
                <Text style={styles.tituloStyle}>{receta.titulo}</Text>
            </View>
        </ImageBackground>
    )
}
const styles= StyleSheet.create({
    imageContainer: {
        flex:1,
        height:heightPercentageToDP("20"),
    },

    iconContainerStyle:{
        padding:8,
        flexDirection: "row-reverse"
    },
    iconStyle:{
        resizeMode:"contain",
        width: widthPercentageToDP("7"),
        height: heightPercentageToDP("7")
    },
    tituloContainer:{
        paddingTop: heightPercentageToDP("3")
    },
    tituloStyle:{
        fontFamily:'Allura-Regular',
        fontSize:40,
        color:"white"
    },
});
export default recetaView;
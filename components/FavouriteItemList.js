import React from 'react';
import { widthPercentageToDP, heightPercentageToDP } from '../auxiliar/ScreenDimension'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import favOn from '../img/favOn.png'
import favOff from '../img/favOff.png'
import dificilOn from '../img/dificilOn.png'
import medioOn from '../img/medioOn.png'
import facilOn from '../img/facilOn.png'
import dificilOff from '../img/dificilOff.png'
import medioOff from '../img/medioOff.png'
import facilOff from '../img/medioOn.png'
import reloj from '../img/reloj.png'
import fiveStars from '../img/5stars.png'
import fourStars from '../img/4stars.png'
import threeStars from '../img/3stars.png'
import twoStars from '../img/2stars.png'

const FavouriteItemList = (props) =>{
    const {receip} =props;
    return(
        <View>
            <View style={styles.imageContainer}>
                <View style={styles.favStyle}>
                </View>
                <View style={styles.titleStyle}>
                </View>
            </View>
            <View style={styles.opcionStyle}>
            </View>
        </View>
    );
};

const styles= StyleSheet.create({
    imageContainer: {
        height:heightPercentageToDP('19'),
        borderWidth: 1,
        borderColor:'black',

    },
    opcionStyle:{
        height:heightPercentageToDP('6'),
    },
    imageStyle:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    favStyle:{
        flexDirection:'row-reverse',
        flex:1
    },
    favIconStyle:{
        height:'25%',
        width:'10%',
        borderWidth: 1,
        borderColor:'blue'
    },
    titleStyle:{

    },
    textTitleStyle:{

    }
});
export default FavouriteItemList;
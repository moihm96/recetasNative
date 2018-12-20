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
import Receta from './recetaView'
import Option from './optionView'


const FavouriteItemList = (props) =>{
    const {receip} =props;
    return(
        <View style={styles.container}>
            <Receta
                receta={receip}
            />
            <Option
                recetas={receip}
            />

        </View>
    );
};
const styles= StyleSheet.create({
    container:{
        alignItems: 'stretch'
    }
});
export default FavouriteItemList;
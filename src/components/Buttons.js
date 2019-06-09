import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet

} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP} from "../auxiliar/ScreenDimension";

const Buttons =({text1, text2, onPress1, onPress2}) =>{
    return(
        <View>
            <TouchableOpacity onPress={onPress1} style={ styles.buttonContainer1}>
                <Text style={styles.buttonText}>{text1}</Text>
            </TouchableOpacity>
            <TouchableOpacity   onPress={onPress2} style={ styles.buttonContainer2}>
                <Text style={styles.buttonText}>{text2}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles= StyleSheet.create({
    buttonContainer1:{
        marginTop: heightPercentageToDP('5%'),
        backgroundColor: 'rgb(255,216,0)',
        paddingVertical: heightPercentageToDP(0.5),
        borderRadius:7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer2:{
        marginTop: heightPercentageToDP('1%'),
        backgroundColor: 'rgb(251,237,157)',
        paddingVertical: heightPercentageToDP(0.5),
        borderRadius:7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily:'Allura-Regular',
        fontSize:widthPercentageToDP(9)
    }
});

export { Buttons };
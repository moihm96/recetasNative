import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet

} from 'react-native';
import {heightPercentageToDP} from "../auxiliar/ScreenDimension";

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
        paddingVertical: 10,
        borderRadius:7
    },
    buttonContainer2:{
        marginTop: heightPercentageToDP('1%'),
        backgroundColor: 'rgb(251,237,157)',
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

export { Buttons };
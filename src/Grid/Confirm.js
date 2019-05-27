import React from 'react'

import {Text, View, Modal, StyleSheet, TouchableOpacity} from "react-native";
import {Buttons} from "../components/Buttons";
import {heightPercentageToDP, widthPercentageToDP} from "../auxiliar/ScreenDimension";

const Confirm =({children, visible, onAccept, onDecline}) =>{
    return(
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => onDecline}
        >
            <View style={styles.container}>
                <View>
                    <Text style={styles.texto}>{children}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={onAccept} style={styles.acceptStyle}>
                        <Text>SI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDecline} style={styles.declineStyle}>
                        <Text>NO</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )
}

const styles= StyleSheet.create({
    container:{
        backgroundColor:'white',
        marginTop: heightPercentageToDP(30)
    },
    texto:{
        fontSize: heightPercentageToDP(3),
        textAlign: 'center',
        padding: 10
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        padding: 20
    },
    acceptStyle:{
        marginRight:heightPercentageToDP(5),
        backgroundColor: 'rgb(255,216,0)',
        paddingHorizontal: heightPercentageToDP(8),
        paddingVertical:widthPercentageToDP(2),
        borderRadius:7
    },
    declineStyle:{
        backgroundColor: 'rgb(251,237,157)',
        paddingHorizontal: heightPercentageToDP(8),
        paddingVertical:widthPercentageToDP(2),
        borderRadius:7
    }
})

export {Confirm} ;
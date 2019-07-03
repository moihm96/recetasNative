import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    Modal, TouchableOpacity, Image,
    KeyboardAvoidingView
} from 'react-native';
import SearchAdvanced from "./SearchAdvanced";
import SearchAdv from "./SearchAdv";

import {AnimatedModal} from "react-native-modal-animated";
import salida from "../img/exit.png";
import {heightPercentageToDP, widthPercentageToDP} from "../auxiliar/ScreenDimension";
class ModalSearch extends Component{
    constructor(props){
        super(props);
    }
    onClickCancel(){
        this.props.callback.openSearch(false)
    }
    onClickSearch(){
        this.props.callback.openSearch(false)
    }
    render() {


        return (
            <View>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={() => this.onClickCancel()}
                >

                    <KeyboardAvoidingView style={{ flex: 1}}>
                        <SearchAdv
                            callback={this}
                        />
                    </KeyboardAvoidingView>
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        marginTop: heightPercentageToDP(15)
    },
    texto:{
        fontSize: heightPercentageToDP(3.5),
        textAlign: 'center'
    },
    imageStyle:{
        height:heightPercentageToDP(7),
        width:widthPercentageToDP(7)
    },
    buttonStyle:{
        alignItems: 'flex-end',
        padding: 10

    }

})
export default ModalSearch;
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Text,
    TextInput,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';

import Login from "../components/LoginPopUp"
class ModalLogin extends Component{
    constructor(props){
        super(props);
    }
    onClickCancel(){
        this.props.callback.onClickSearch(false)
    }

    render() {
        return (
            <View>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={() => this.onClickCancel()}>
                    <Login/>
                </Modal>
            </View>


        );
    }
}

export default ModalLogin;


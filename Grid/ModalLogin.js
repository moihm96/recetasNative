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

import LoginView from '../components/LoginForm'
class ModalLogin extends Component{
    constructor(props){
        super(props);

        this.state = {
            modalVisible:false,
        }
    }

    render() {
        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    modalvisible={this.state.modalVisible}
                    onRequestClose={() => this.onClickCancel()}>
                    <LoginView/>
                </Modal>
            </View>


        );
    }
}

export default ModalLogin;


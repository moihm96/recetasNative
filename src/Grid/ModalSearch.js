import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    Modal
} from 'react-native';
import SearchAdvanced from "../components/SearchAdvanced";
import SearchAdv from "../components/SearchAdv";

import {AnimatedModal} from "react-native-modal-animated";
class ModalSearch extends Component{
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
                    onRequestClose={() => this.onClickCancel()}
                >
                    <View style={{ flex: 1}}>
                        <SearchAdv/>
                    </View>
                </Modal>
            </View>
        );
    }
}
export default ModalSearch;
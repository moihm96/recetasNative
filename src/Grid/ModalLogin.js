import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Modal,
    TouchableOpacity
} from 'react-native';
import exit from '../img/exit.png'
import LoginForm from "../components/LoginForm";
import {heightPercentageToDP, widthPercentageToDP} from "../auxiliar/ScreenDimension";
import {connect} from 'react-redux'
class ModalLogin extends Component{
    constructor(props){
        super(props);
    }
    onClickCancel(){
        this.props.callback.onClickClose(false)
    }
    onUser= (isUser) =>{
        this.props.callback.onClickClose(isUser)
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
                    <View style={styles.container}>
                        <View>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Image
                                    style={styles.imageStyle}
                                    source={exit}
                                />
                            </TouchableOpacity>
                            <Text style = {styles.texto}>Para poder acceder necesitas iniciar sesión</Text>
                        </View>
                        <LoginForm
                            onUser={this.onUser}
                        />
                    </View>
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
        padding: 7
    }
})
const mapStateToProps = state =>{
    const {user} = state.auth
    return {user}
}
export default connect(mapStateToProps,null)(ModalLogin);
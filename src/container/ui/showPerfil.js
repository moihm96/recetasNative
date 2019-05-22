import React,{Component} from 'react'
import {
    View,
    Text,
    KeyboardAvoidingView
} from 'react-native'
import {connect} from 'react-redux'
import {signOut} from '../../actions/AuthActions'
import {userUpdate,updateUser} from "../../actions/RegActions";
import _ from 'lodash'
class showPerfil extends Component{
    render(){
        return(
            <View></View>
        )
    }
}
const mapStateToProps = state =>{
    const { user } = state.auth;

    return { user};

}
export default connect(mapStateToProps, {
    signOut,
    updateUser,
    userUpdate
})(showPerfil)
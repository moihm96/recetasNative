import React, {Component} from 'react';

import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image
} from 'react-native'
let arrayEmpty=["Cualquiera"]
let paises=["Cualquiera","España","Cuba"]
let pais=arrayEmpty[0]
import {Avatar} from 'react-native-elements'
import SelectInput from 'react-native-select-input-ios'
import {heightPercentageToDP,widthPercentageToDP} from "../../auxiliar/ScreenDimension";
import fondo from '../../img/fondo.png'
import favIcon from '../../img/favOff.png'
import add from '../../img/Add.png'
import imgOur from '../../img/imgOur.png'
import imgUser from '../../img/imgUser.png'
import abuelita from '../../img/coco.jpg'
import Earth from '../../img/Earth.png'
import {Actions} from 'react-native-router-flux'
import {signOut} from '../../actions/AuthActions'
import {connect} from 'react-redux';
import * as firebase from 'firebase/index';
import _ from 'lodash'
import ModalLogin from "../../Grid/ModalLogin";

class sideMenu extends Component{
    constructor(props){
        super(props)

        this.state = {
            arrayPais:paises,
            pais:pais,
            uid:"",
            modalVisible:Boolean(this.props.user),
        };
    }
    pickerPais(){
        let array = []
        this.state.arrayPais.map((data, i) => {
            array.push({value:data, label: data})
        });
        return(array)
    }
    login(){
        if(this.props.user){
            return(
                <View style={styles.avatarStyle}>
                    <Avatar
                        medium
                        source={abuelita}
                        size={80}
                        rounded
                    />
                    <Text style={styles.textRegistrate}>{this.props.user.displayName}</Text>
                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={() => this.props.signOut()}
                    >
                        <Text style={styles.textIniciar}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return(
                <View style={styles.avatarStyle}>
                    <Avatar
                        medium
                        source={abuelita}
                        size={80}
                        rounded
                    />
                    <Text style={styles.textRegistrate}>Registrate o inicia sesion</Text>
                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={() => Actions.startView()}
                    >
                        <Text style={styles.textIniciar}>Inicia Sesion</Text>
                    </TouchableOpacity>
                </View>
            )
        }

    }
    showFavorito(){
        console.log(this.props.user)
        if (this.props.user){
            Actions.favoritos()
        } else {
            this.setState({
                modalVisible:!this.props.user
            })
        }
    }
    onClickClose(isOpen){
        this.setState({modalVisible:isOpen})
    }
    render(){

        return(
            <ImageBackground source={fondo}
                             style={styles.container}>
                <View>{this.login()}</View>
                <ModalLogin
                    modalVisible={this.state.modalVisible}
                    callback={this}
                />

                <View style={styles.opcionStyle}>
                    <Image source={Earth} style={styles.imageStyle} />
                    <Text style={styles.textMenu}>Pais de la receta</Text>
                </View>
                <View style={styles.paisStyle}>
                    <Text style={styles.textPais}>Pais</Text>
                    <SelectInput
                        style={styles.textInputStyle}
                        options = {this.pickerPais()}
                        value = {this.state.pais}
                        onSubmitEditing = {(value) => this.setState({pais: value})}
                    />
                </View>
                <View style={styles.opcionStyle}>
                    <Image source={favIcon} style={styles.imageStyle}/>
                    <TouchableWithoutFeedback onPress={() => this.showFavorito()}>
                        <Text style={styles.textMenu}>Favoritos</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.opcionStyle}>
                    <Image source={add} style={styles.imageStyle}/>
                    <TouchableWithoutFeedback onPress={() => {
                        if (this.props.user){
                            Actions.addRecetas()
                        } else {
                            this.setState({modalVisible:!this.props.user})
                        }
                    }}>
                        <Text style={styles.textMenu}>Añadir Receta</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.opcionStyle}>
                    <Image source={imgUser} style={styles.imageStyle}/>
                    <TouchableWithoutFeedback  onPress={() => Actions.usersRecetas()}>
                        <Text style={styles.textMenu}>Recetas de usuario</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.opcionStyle}>
                    <Image source={imgOur} style={styles.imageStyle}/>
                    <TouchableWithoutFeedback onPress={() => {
                        if (this.props.user){
                            Actions.ownRecetas()
                        } else{
                            this.setState({modalVisible:!this.props.user})
                        }
                    }}>
                        <Text style={styles.textMenu}>Nuestras Recetas</Text>
                    </TouchableWithoutFeedback>
                </View>
            </ImageBackground>
        )

    }
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        padding: 20
    },
    avatarStyle:{
        alignItems:'center',
        justifyContent: 'center'
    },
    paisStyle:{
        flexDirection: 'row',
        justifyContent: 'center',
    },
    opcionStyle:{
        flexDirection:'row',
        alignItems: 'center',
        height:heightPercentageToDP("10%"),
        //width: widthPercentageToDP("15%")
    },
    textMenu:{
        fontFamily:'Allura-Regular',
        fontSize:32
    },
    imageStyle:{
        resizeMode:'contain',
        marginRight:10,
        width:40,
        height:40
    },
    textInputStyle:{
        marginLeft: widthPercentageToDP('5%'),
        marginRight: widthPercentageToDP('5%'),
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
        marginBottom: heightPercentageToDP('2%'),
        flex:0.65
    },
    textPais:{
        fontSize: 25
    },
    buttonContainer:{
        backgroundColor: 'rgb(255,216,0)',
        paddingHorizontal: 50,
        marginTop: 5,
        borderRadius:10
    },
    textIniciar:{
        fontFamily:'Allura-Regular',
        fontSize:26
    },
    textRegistrate:{
        fontSize:16
    }
});
const mapStateToProps = state => {
    const {user} = state.auth
    return{user}
};

export default connect(mapStateToProps,{signOut} )(sideMenu)
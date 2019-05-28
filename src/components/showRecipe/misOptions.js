import React, {Component} from 'react'
import { widthPercentageToDP, heightPercentageToDP } from '../../auxiliar/ScreenDimension'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import fiveStars from "../../img/5stars.png";
import reloj from "../../img/reloj.png";
import dificilOff from "../../img/dificilOff.png";
import imgUser from "../../img/imgUser.png";
import noVisible from '../../img/noVisible.png'
import visible from '../../img/visible.png'
import basura from '../../img/basura.png'
import pencil from '../../img/pencil.png'
import {Rating} from "react-native-elements";
import {AirbnbRating} from "react-native-ratings";

import {connect} from 'react-redux'
import {Confirm} from "../../Grid/Confirm";
import * as firebase from 'firebase'
import {Actions} from "react-native-router-flux";

class misOptions extends Component{

    constructor(props){
        super(props)
        this.state={
            showModal:false
        }
    }


    onAccept(){
        const {recetas} = this.props
        if(this.props.user){
            firebase.database().ref(`/user/${this.props.user.uid}/recetas/${recetas.uid}`).remove()
        }
    }

    onDecline(){
        this.setState({
            showModal:false
        })
    }

    modifyRecipe = () =>{
        Actions.modReceta({
            receta:this.props.recetas
        });
    }
    render(){
        const {recetas} = this.props;
        return(
            <View>
                <View style={styles.opcionContainerStyle}>
                    <View style={styles.opcionStyle}>
                        <Rating
                            type='star'
                            ratingColor='rgb(255,216,0)'
                            ratingBackgroundColor='white'
                            imageSize={20}
                            style={styles.puntuacionStyle}
                            readonly
                            startingValue={recetas.puntuacion}
                        />
                    </View>
                    <View style={styles.opcionStyle}>
                        <Image source={reloj} style={styles.tiempoStyle}/>
                        <Text>{recetas.tiempo}</Text>
                    </View>
                    <View style={styles.opcionStyle}>
                        <Image source={dificilOff}style={styles.dificultadStyle}/>
                        <Text>{recetas.dificultad}</Text>
                    </View>
                    <View style={styles.opcionStyle}>
                        <Image source={imgUser}style={styles.userStyle}/>
                    </View>
                </View>
                <View style={styles.opcionContainerStyle}>
                    <TouchableWithoutFeedback >
                        <View style={styles.opcionStyle}>
                            <Image
                                source={noVisible}
                                style={styles.opcion2Style}
                            />
                            <Text>No visible</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback >
                        <View style={styles.opcionStyle}>
                            <Image
                                source={visible}
                                style={styles.opcion2Style}
                            />
                            <Text style={styles.textStyleVisible}>Visible</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={this.modifyRecipe}>
                        <View style={styles.opcionStyle}>
                            <Image
                                source={pencil}
                                style={styles.opcion2Style}
                            />
                            <Text>Modificar</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback onPress={() => this.setState({ showModal: !this.state.showModal })}>
                        <View style={styles.opcionStyle}>
                            <Image
                                source={basura}
                                style={styles.opcion2Style}
                            />
                            <Text style={styles.textStyleEliminar}>Eliminar</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <Confirm
                        visible={this.state.showModal}
                        onAccept={this.onAccept.bind(this)}
                        onDecline={this.onDecline.bind(this)}
                    >
                        ¿Está seguro de eliminar esta receta?
                    </Confirm>

                </View>
            </View>

        )
    }
}

const styles= StyleSheet.create({
    opcionContainerStyle:{
        padding:5,
        backgroundColor:"white",
        height:heightPercentageToDP("7") ,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    opcionStyle:{
        flexDirection:"row",
        alignItems: "center",
    },
    opcion2Style:{
        resizeMode:"contain",
        width:widthPercentageToDP("6"),
        marginRight: widthPercentageToDP("3")
    },
    textStyleVisible:{
        color:'rgb(255,216,0)',
    },
    textStyleEliminar:{
        color:'rgb(180,28,28)',
    },
    puntuacionStyle:{
        width:widthPercentageToDP("30")
    },
    tiempoStyle:{
        resizeMode:"contain",
        width:widthPercentageToDP("7"),
        marginRight: widthPercentageToDP("2")
    },
    dificultadStyle:{
        resizeMode:"contain",
        width:widthPercentageToDP("7"),
        marginRight: widthPercentageToDP("2")
    },
    userStyle:{
        resizeMode:"contain",
        width:widthPercentageToDP("7"),
        marginRight: widthPercentageToDP("2")
    }
});
const mapStateToProps = (state) =>{
    const {user} = state.auth
    return {user}
}
export default connect(mapStateToProps, null)(misOptions);
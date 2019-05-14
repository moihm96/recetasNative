import React,{Component} from 'react';
import { widthPercentageToDP, heightPercentageToDP } from '../auxiliar/ScreenDimension'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import favOn from "../img/favOn.png";
import favOff from "../img/favOff.png";

import {connect} from 'react-redux';
import {addFav,deleteFav,fecthFav} from "../actions/FavAction";
import * as firebase from "firebase";
import _ from 'lodash'

class recetaView extends Component{

    constructor(props){
        super(props)

        this.state ={
            like: true,
            isFav: false,
            id:''
        };
    }


     async componentWillMount(){
         try {
             let user = await firebase.auth().currentUser;

             this.setState({
                 id: user.uid
             })
         } catch (error) {
             console.log(error)
         }
        this.props.fecthFav(this.state.id);
         for(let i=0; i<this.props.favorites.length;i++){
             if(this.props.favorites[i].uid.localeCompare(this.props.receta.uid)===0){
                 this.setState({
                     isFav:true
                 })
             }
         }
    }

    onFav= (recipe, isActive) => {
        this.setState({
            isFav:isActive
        })

         if(!this.state.isFav){
             this.props.addFav(this.props.receta, this.state.id)
         } else{
             this.props.deleteFav(this.props.receta.uid, this.state.id)
         }
    }
    render(){
        return(
            <ImageBackground style={styles.imageContainer} source={{uri:this.props.receta.imageUrl}}>
                <TouchableOpacity style={styles.iconContainerStyle} onPress={() => this.onFav(this.props.receta, !this.state.isFav)}>
                    <Image
                        source={this.state.isFav ? favOn: favOff}
                        style={styles.iconStyle}

                    />
                </TouchableOpacity>
                <View style={styles.tituloContainer}>
                    <Text style={styles.tituloStyle}>{this.props.receta.titulo}</Text>
                </View>
            </ImageBackground>
        )
    }
}
const styles= StyleSheet.create({
    imageContainer: {
        flex:1,
        height:heightPercentageToDP("20"),
    },

    iconContainerStyle:{
        padding:8,
        flexDirection: "row-reverse"
    },
    iconStyle:{
        resizeMode:"contain",
        width: widthPercentageToDP("7"),
        height: heightPercentageToDP("7")
    },
    tituloContainer:{
        paddingTop: heightPercentageToDP("3")
    },
    tituloStyle:{
        fontFamily:'Allura-Regular',
        fontSize:40,
        color:"white"
    },
});
const mapStateToProps = state => {
    const favorites = _.map(state.favRecipes, (val,uid) => {
        return { ...val,uid};
    });
    return { favorites };
};
export default connect(mapStateToProps,{
    addFav,deleteFav,fecthFav
})(recetaView);
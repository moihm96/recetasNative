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
import Receta from './recetaView'
import Option from './optionView'
import {Actions} from "react-native-router-flux";

class FavouriteItemList extends Component{
    onRowPress(){
        Actions.showReceta({receta:this.props.receip});
    }
    render(){
        return(
            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                <View style={styles.container}>
                    <Receta
                        receta={this.props.receip}
                    />
                    <Option
                        recetas={this.props.receip}
                    />

                </View>
            </TouchableOpacity>
        );
    }
}


const styles= StyleSheet.create({
    container:{
        alignItems: 'stretch'
    }
});
export default FavouriteItemList;
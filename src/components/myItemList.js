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
import MisOptions from './misOptions'
import {Actions} from "react-native-router-flux";

class MyItemList extends Component{
    onRowPress(){
        Actions.showReceta({receta:this.props.receip});
    }

    render(){
        return(
            <View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                        <Receta
                            receta={this.props.receip}
                        />
                    </TouchableOpacity>
                    <MisOptions
                        recetas={this.props.receip}
                    />
                </View>
            </View>
        );
    }
}


const styles= StyleSheet.create({
    container:{
        alignItems: 'stretch'
    }
});
export default MyItemList;
import React,{Component} from 'react'

import {
    View,
    TextInput,
    ImageBackground,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native'
 import cabecera from '../img/cabecera.png'
import {heightPercentageToDP,widthPercentageToDP} from "../auxiliar/ScreenDimension";
import IonIcon from 'react-native-vector-icons/Ionicons'
import { SearchBar } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
class Header extends Component{
    constructor(props){
        super(props)

        this.state ={
            term:''
        };
    }
    openDrawer(){
        Actions.drawerOpen();
    }
    render(){
        return(

            <ImageBackground    source = {cabecera}
                                style={styles.container}>
                <View style={styles.firstStyle}>
                    <TouchableOpacity
                        onPress={()=>this.openDrawer()}
                        style={styles.iconoStyle}>
                        <IonIcon
                            name="ios-menu"
                            color="black"
                            size={35}
                        />
                    </TouchableOpacity>
                    <View style={styles.searchBarStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder={"Buscar"}
                                placeholderTextColor={"black"}
                                onChangeText={term=> this.setState({term})}
                                value={this.state.term}
                            />

                            <TouchableWithoutFeedback>
                                <IonIcon
                                    style={styles.iconSearchStyle}
                                    name="ios-search"
                                    color="black"
                                    size={25}
                                />
                            </TouchableWithoutFeedback>
                    </View>
                </View>


                <View style={styles.secondStyle}>
                    <IonIcon
                        name="ios-arrow-dropdown"
                        color="black"
                    />
                    <TouchableOpacity>
                        <Text>Busqueda avanzada</Text>
                    </TouchableOpacity>
                    <IonIcon
                        name="ios-arrow-dropdown"
                        color="black"
                    />
                </View>

            </ImageBackground>

        )
    }
}

export default Header

const styles = StyleSheet.create({
    container:{
        height:heightPercentageToDP("15"),
        alignSelf:"stretch",
        backgroundColor:'transparent',
        position: "absolute",
        marginBottom: heightPercentageToDP("82"),
        width:widthPercentageToDP("100")
    },


    firstStyle:{
        height: heightPercentageToDP("9"),
        flexDirection:'row',
        alignItems:'center',
        marginBottom: 5
    },
    iconoStyle:{
        width:widthPercentageToDP("15"),
        padding: 15
    },
    searchBarStyle:{
        width:widthPercentageToDP("75"),
        marginLeft:10,
        borderWidth: 2,
        borderColor:"black",
        borderRadius:15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputStyle:{
        width:widthPercentageToDP("60"),
        marginLeft: 10
    },
    iconSearchStyle:{
        width:widthPercentageToDP("20"),
        marginRight: 5
    },
    secondStyle:{
        height: heightPercentageToDP("3"),
        justifyContent: 'center',
        flexDirection:'row',
        alignItems:'center'
    },
})
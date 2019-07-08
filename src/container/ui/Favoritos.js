import React, { Component } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import FavouriteItemList from '../../components/showRecipe/ItemList'
import Header from './Header'
import {heightPercentageToDP, widthPercentageToDP} from "../../auxiliar/ScreenDimension";
import _ from 'lodash'
import {connect} from 'react-redux'
import {fecthFav} from "../../actions/FavAction";
import * as firebase from 'firebase'
class Favoritos extends Component {
     componentWillMount() {
        if(this.props.user){
            this.props.fecthFav(this.props.user.uid);
            //console.log(this.props)

            this.setState({
                data:this.props.favorites
            })
        }

     }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data:nextProps.favorites
        })
    }


    constructor(props){
        super(props);
        this.state={
            data:[],
            text: ''
        }
    }
    filterSearch = (text) =>{
        const newData = this.props.favorites.filter(function(item){
            const itemData = item.titulo.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        if(Array.isArray(newData) && newData.length){

            this.setState({
                data:newData,
                text: text
            })
            return console.log("Hay datos con ese titulo: ", this.state.text)
        }else if(newData.length < 1){
            return (
                Alert.alert(
                    //title
                    'Busqueda de recetas',
                    //body
                    'No existen recetas con ese título',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: true }
                )
            )
        }

    }


    render() {
        return (
            <ScrollView>
                <Header onFilter={this.filterSearch}/>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) =>

                        <FavouriteItemList
                            receip={item}
                        />
                    }
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
});

const mapStateToProps = state => {
    const favorites = _.map(state.favRecipes, (val,uid) => {
        return { ...val,uid};
    });
    const {user} = state.auth
    return { favorites, user };
};
export default connect(mapStateToProps,{fecthFav})(Favoritos)
import React, { Component } from 'react';
import {Alert, FlatList, ScrollView} from 'react-native';
import FavouriteItemList from '../../components/showRecipe/ItemList'
import {recetas} from "../../data/datasource"
import Header from './Header'
import {allRecipesFetch} from "../../actions/RecetasAllActions";
import {connect} from 'react-redux'

class userRecetas extends Component {
    componentWillMount() {
        this.props.allRecipesFetch();

        console.log(this.props.recipes)
        this.setState({
            data: this.props.recipes
        })
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps.recipes)
        this.setState({
            data: nextProps.recipes
        })
    }

    constructor(props){
        super(props);
        this.state={
            data:[],
            text:""
        }
    }
    filterSearch = (text) =>{
        const newData = this.props.recipes.filter(function(item){
            const itemData = item.titulo.toUpperCase()
            const textData = text.toUpperCase()
            console.log(itemData.indexOf(textData))
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

const mapStateToProps = state =>{
    const recipes = state.allRecipes;

    return {recipes}
}

export default connect(mapStateToProps ,{allRecipesFetch})(userRecetas)
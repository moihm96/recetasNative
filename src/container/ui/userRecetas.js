import React, { Component } from 'react';
import {Image, View,Text,FlatList,ScrollView} from 'react-native';
import {recetas} from "../../data/datasource";
import FavouriteItemList from '../../components/FavouriteItemList'
import Header from './Header'
import {allRecipesFetch} from "../../actions/RecetasActions";
import {connect} from 'react-redux'
import _ from 'lodash'

class userRecetas extends Component {
    componentWillMount() {
        this.props.allRecipesFetch();

        /**this.setState({
            data: this.props
        });*/
        console.log(this.props.recipes)
        this.setState({
            data: this.props.recipes
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.recipes)
        this.setState({
            data: nextProps.recipes
        })
    }

    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    filterSearch = (text) =>{
        const newData = this.props.recipes.filter(function(item){
            const itemData = item.titulo.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            data:newData,
            text: text
        })

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
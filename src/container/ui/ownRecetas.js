import React, { Component } from 'react';
import {Image, View,Text,FlatList,ScrollVIew} from 'react-native';
import {recetas} from "../../data/datasource";
import FavouriteItemList from '../../components/FavouriteItemList'
import Header from '../../components/Header'
export default class ownRecetas extends Component {
    constructor(props){
        super(props);
        this.state={
            data:recetas
        }
    }
    filterSearch = (text) =>{
        const newData = recetas.filter(function(item){
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
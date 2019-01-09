import React, { Component } from 'react';
import {Image, View,Text,FlatList} from 'react-native';
import {recetas} from "../../data/datasource";
import FavouriteItemList from '../../components/FavouriteItemList'

export default class ownRecetas extends Component {
    constructor(props){
        super(props);
        this.state={
            data:recetas
        }
    }
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) =>

                        <FavouriteItemList
                            receip={item}
                        />
                    }
                />
            </View>
        );
    }
}
import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    FlatList,
    ImageBackground,
    StyleSheet
} from 'react-native';
import {recetas} from '../../data/datasource'
import FavouriteItemList from '../../components/FavouriteItemList'
export default class Favoritos extends Component {
    constructor(props){
        super(props);
        this.state={
            data:recetas
        }
    }
    render() {
        return (
            <View style={styles.container} >
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

const styles = StyleSheet.create({
    container:{

    },
    imagen:{
        resizeMode: 'contain',
    }
});
import React, { Component } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ScrollView
} from 'react-native';
import {recetas} from '../../data/datasource'
import FavouriteItemList from '../../components/FavouriteItemList'
import Header from './Header'
import {userFetch} from "../../actions/UserProfileAction";
import {connect} from 'react-redux'
import {heightPercentageToDP, widthPercentageToDP} from "../../auxiliar/ScreenDimension";
import _ from 'lodash'
export default class Favoritos extends Component {
    /**async componentWillMount() {
        this.props.userFetch();
        console.log(this.props);
    }*/

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

const styles = StyleSheet.create({
});
/**const mapStateToProps = state => {
    const userProfile = state.user;

    return {userProfile};
}
export default connect(mapStateToProps, {userFetch})(Favoritos)*/
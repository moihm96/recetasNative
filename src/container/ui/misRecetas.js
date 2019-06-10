import React, { Component } from 'react';
import {Image, View, Text, FlatList, ScrollView, Alert} from 'react-native';
import {recetas} from "../../data/datasource";
import MyItemList from '../../components/showRecipe/myItemList'
import Header from './Header'
import _ from 'lodash'
import * as firebase from 'firebase'
import {connect} from 'react-redux'
import {fetchRecipes} from "../../actions/RecetasActions";

class misRecetas extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            text:'',
            id: ''
        }
    }

      componentWillMount() {
        if(this.props.user){
            this.props.fetchRecipes(this.props.user.uid)
            this.setState({
                data:this.props.ownRecipes
            })
        }


    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.ownRecipes
        })
    }


    filterSearch = (text) =>{
        const newData = this.props.ownRecipes.filter(function(item){
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

                        <MyItemList
                            receip={item}
                        />
                    }
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = state =>{
    const ownRecipes = _.map(state.ownRecipes, (val,uid) =>{
        return {...val,uid}
    })
    const {user} = state.auth


    return {ownRecipes, user}
}

export default connect(mapStateToProps,{fetchRecipes})(misRecetas)
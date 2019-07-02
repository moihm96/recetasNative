import React, { Component } from 'react';
import {Alert, FlatList, ScrollView,View} from 'react-native';
import FavouriteItemList from '../../components/showRecipe/ItemList'
import {recetas} from "../../data/datasource"
import Header from './Header'
import {allRecipesFetch} from "../../actions/RecetasAllActions";
import {fetchRecipes} from "../../actions/RecetasActions";
import {connect} from 'react-redux'
import MyItemList from '../../components/showRecipe/myItemList'
import _ from 'lodash'
import ModalLogin from "../../components/ModalLogin";

class searchRecetas extends Component{
    /**
     * pais:this.state.pais,
     categoria:this.state.categoria,
     dificultad:this.state.dificultad,*/
    componentWillMount() {
        if(this.props.tipoReceta){
            this.lookTipo()
            if(this.props.palabraBusqueda){
                setTimeout(() => {
                    this.lookPalabra(this.props.palabraBusqueda);
                }, 500)
                if (this.props.pais !== "Cualquiera") {
                    setTimeout(()=>{
                        this.lookPais(this.props.pais)
                    }, 500)
                }
            }

        }

    }
    onClickClose(isOpen){
        this.setState({modalVisible:isOpen})
    }
    lookTipo(){
            let tipoReceta= this.props.tipoReceta
            for (let i = 0; i < tipoReceta.length; i++) {
                if(tipoReceta[i]==="Nuestras Recetas"){
                    this.props.allRecipesFetch();
                    this.setState({
                        data: this.props.recipes
                    })
                }else if(tipoReceta[i]==="Recetas de usuario"){
                    if(this.props.user){
                        this.props.fetchRecipes(this.props.user.uid)
                        this.setState({
                            data:this.props.ownRecipes
                        })
                    }else{
                        this.setState({
                            modalVisible:!this.props.user
                        })
                    }
                }
            }

    }
    lookPalabra(palabra){
        console.log(palabra)
        console.log(this.state.data)
            const newData = this.state.data.filter(function (item) {
                const itemData = item.titulo.toUpperCase()
                const textData = palabra.toUpperCase()
                console.log(itemData.indexOf(textData))
                return itemData.indexOf(textData) > -1
            })
            if(Array.isArray(newData) && newData.length){
                this.setState({
                    data:newData,
                    text: palabra
                })
                return console.log("Hay datos con ese titulo: ", this.state.text)
            }
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps.recipes)
        this.setState({
            data: nextProps.recipes
        })
    }

    constructor(props){
        super(props)
        this.state={
            modalVisible:false,
            data:[],
            text:'',
            id: ''
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
                <ModalLogin
                    modalVisible={this.state.modalVisible}
                    callback={this}
                />
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
    const ownRecipes = _.map(state.ownRecipes, (val,uid) =>{
        return {...val,uid}
    })
    const {user} = state.auth

    return {recipes, ownRecipes, user}

}

export default connect(mapStateToProps ,{allRecipesFetch,fetchRecipes})(searchRecetas)
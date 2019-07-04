import React, { Component } from 'react';
import {Alert, FlatList, ScrollView,View} from 'react-native';
import FavouriteItemList from '../../components/showRecipe/ItemList'
import {recetas} from "../../data/datasource"
import Header from './Header'
import {allRecipesFetch} from "../../actions/RecetasAllActions";
import {fetchRecipes} from "../../actions/RecetasActions";
import {connect} from 'react-redux'
import _ from 'lodash'
import ModalLogin from "../../components/ModalLogin";

class searchRecetas extends Component{

    componentWillMount() {
        console.log("Palabra: ", this.props.palabraBusqueda)
        console.log("Pais: ", this.props.pais)
        console.log("Categoria: ", this.props.categoria)
        console.log("Dificultad: ", this.props.dificultad)
        console.log("Tipo de Receta: ", this.props.tipoReceta)
        if(this.props.tipoReceta){
            console.log("Hay tipo de receta")
            this.lookTipo()
        }
        /**if(this.props.tipoReceta && this.props.palabraBusqueda){
            console.log(this.state.recipe)
            console.log(this.state.ownRecipe)
            console.log(this.props.palabraBusqueda)
            console.log("Hay tipo palabra")
        }*/
    }
    searchPalabra = () => {
        if(this.props.palabraBusqueda){
            this.lookPalabra(this.props.palabraBusqueda)
        }else{
            this.searchPais(this.state.data)
        }
    }

    searchPais = (data) =>{
        if(this.props.pais !== "Cualquiera"){
            console.log("Pais",data)
            this.lookPais(data, this.props.pais)
        }else{
            this.searchDificultad(this.state.data)
        }
    }
    searchDificultad = (data) =>{
        if(this.props.dificultad){
            console.log("Dificultad",data)
            this.lookDificultad(data,this.props.dificultad)
        }else{
            this.searchCategoria(this.state.data)
        }
    }

    searchCategoria = (data) => {
        if (this.props.categoria.length>0) {
            console.log("Categoria",data)
            this.lookCategoria(data,this.props.categoria)
        }
    }


    onClickClose(isOpen){
        this.setState({modalVisible:isOpen})
    }
    lookTipo(){
            let tipoReceta= this.props.tipoReceta
                if(tipoReceta==="Nuestras Recetas"){
                    this.props.allRecipesFetch();
                    this.setState({
                        data: this.props.recipes,
                        recipe:true
                    }, function () {
                        this.searchPalabra()
                    })
                }else if(tipoReceta==="Recetas de usuario"){
                    if(this.props.user){
                        this.props.fetchRecipes(this.props.user.uid)
                        console.log(this.props.ownRecipes)
                        this.setState({
                            data:this.props.ownRecipes,
                            ownRecipe:true
                        },function () {
                            this.searchPalabra()
                        })
                    }else{
                        this.setState({
                            modalVisible:!this.props.user
                        })
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
                console.log(newData)
                this.setState({
                    data:newData,
                    dataPalabra:newData,
                    text: palabra
                }, function () {
                    this.searchPais(this.state.dataPalabra)
                })
                return console.log("Hay datos con ese titulo: ", this.props.palabraBusqueda)
            }
    }
    lookPais(data, pais){
        console.log(data)
        const newData = data.filter(function (item) {
            const itemData = item.pais.toUpperCase()
            const textData = pais.toUpperCase()
            console.log(itemData.indexOf(textData))
            return itemData.indexOf(textData) > -1
        })
        if(Array.isArray(newData) && newData.length){
            console.log(newData)
            this.setState({
                data:newData,
                dataPais:newData,
                text: pais
            }, function () {
                this.searchDificultad(this.state.dataPais)
            })
            return console.log("Hay datos con ese titulo: ", this.props.pais)
        }else if(newData < 1){
            this.setState({
                data:[]
            })
        }
    }
    lookDificultad(data, dificultad){
        console.log(data)
        const newData = data.filter(function (item) {
            const itemData = item.dificultad.toUpperCase()
            const textData = dificultad.toUpperCase()
            console.log(itemData.indexOf(textData))
            return itemData.indexOf(textData) > -1
        })
        if(Array.isArray(newData) && newData.length){
            console.log(newData)
            this.setState({
                data:newData,
                dataDificultad:newData,
                text: dificultad
            }, function () {
                this.searchCategoria(this.state.dataDificultad)
            })
            return console.log("Hay datos con ese titulo: ", this.props.pais)
        }else if(newData < 1){
            this.setState({
                data:[]
            })
        }
    }

    lookCategoria(data, categoria){
        console.log(data)
        console.log(categoria)
        for (let i = 0; i <categoria.length ; i++) {
            let tipoCategoria = categoria[i]
            console.log(tipoCategoria)
             const newData = data.filter(function (item) {
                const itemData = item.categoria.toUpperCase()
                const textData = tipoCategoria.toUpperCase()
                console.log(itemData.indexOf(textData))
                return itemData.indexOf(textData) > -1
            })
            if(Array.isArray(newData) && newData.length){
                console.log(newData)
                this.setState({
                    data:newData,
                    dataDificultad:newData,
                    text: tipoCategoria
                })
                return console.log("Hay datos con ese titulo: ", this.props.categoria[i])
            }else if(newData < 1){
                this.setState({
                    data:[]
                })
            }
        }

    }

    constructor(props){
        super(props)
        this.state={
            recipe:false,
            ownRecipe:false,
            modalVisible:false,
            data:[],
            text:'',
            id: ''
        }
    }
    filterSearch = (text) =>{
        const newData = this.props.data.filter(function(item){
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
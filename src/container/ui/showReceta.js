import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    StyleSheet,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import fondo from "../../img/fondo.png"
import {heightPercentageToDP, widthPercentageToDP} from "../../auxiliar/ScreenDimension";
import {Avatar,Icon} from "react-native-elements";
import FontIcon from "react-native-vector-icons/FontAwesome"
import {AirbnbRating,Rating } from "react-native-ratings";
import Option from "../../components/showRecipe/optionView"
import {Actions} from "react-native-router-flux";
import IonIcon from "react-native-vector-icons/Ionicons";
import {connect} from 'react-redux';
import {addFav,deleteFav,fecthFav} from "../../actions/FavAction";
import {setComentarios,fetchComentarios,setPuntuacion,setPuntos} from "../../actions/OpcionesActions";
import ModalLogin from "../../components/ModalLogin";
import _ from "lodash";

import Share from 'react-native-share'
class showReceta extends Component{
    componentWillMount() {
        this.props.fetchComentarios(this.props.receta.userId,this.props.receta.uid)
        setTimeout(() => {
            console.log(this.props.comments)
        }, 500)

        if (this.props.user) {
            this.props.fecthFav(this.props.user.uid);
            for (let i = 0; i < this.props.favorites.length; i++) {
                if (this.props.favorites[i].uid.localeCompare(this.props.receta.uid) === 0) {
                    this.setState({
                        isFav: true
                    })
                }
            }
        }
    }

    constructor(props){
        super(props)
        this.state={
            arrayComentarios:[],
            comentarios:"",
            titulo:"",
            modalVisible: false,
            isFav:false,
            result:""
        };
    }
    parseIngredientes(){
        if(this.props.receta.ingredientes){
            return this.props.receta.ingredientes.map((data,i)=>{
                return(
                    <View key={i} style={{flexDirection:"row",alignItems:'center'}}>
                        <FontIcon name={"circle"} color={'rgb(255,216,0)'}/>
                        <Text style={{fontSize:17, marginLeft: 10}}>{data}</Text>
                    </View>
                )
            })
        }
    }
    parsePreparacion(){
        if(this.props.receta.pasos){
            return this.props.receta.pasos.map((data,i)=>{
                return(
                    <View key={i} style={{padding: 10}}>
                        <Image  style={styles.imagenStyle}
                                resizeMode={"cover"}
                                source={{uri:data.imagen}}/>
                        <View style={{flexDirection: "row", marginTop: 5}}>
                            <Text style={styles.pasoStyle}>{data.pid}</Text>
                            <View style={{borderLeftWidth:5,
                                borderColor:'rgb(255,216,0)', paddingLeft: 10}}>
                                <Text style={{fontWeight:"bold", fontSize:15}}>{data.titulo}</Text>
                                <Text style={{ fontSize:15}}>{data.descripcion}</Text>
                            </View>
                        </View>
                    </View>
                )
            })
        }
    }
    ratingCompleted = rating => {
        this.setState({rating})
        setTimeout(() => {
            console.log("Rating is: " + this.state.rating);
        }, 500)
    }
    onClickClose(isOpen){
        this.setState({modalVisible:isOpen})
    }
    onFav= (recipe, isActive) => {
        if(this.props.user){
            this.setState({
                isFav:isActive
            })

            if(!this.state.isFav){
                this.props.addFav(this.props.receta, this.props.user.uid)
            } else{
                this.props.deleteFav(this.props.receta.uid, this.props.user.uid)
            }
        }else{
            this.setState({
                modalVisible:!this.props.user
            })
        }
    }
    _showResult = (result) =>{
        this.setState({result})
    }
    shareOptions={
        message:this.props.receta.titulo,
        url: this.props.receta.imageUrl,

    }
    share = () => {
        if(this.props.user){
            Share.open(this.shareOptions)
        }else{
            this.setState({
                modalVisible:!this.props.user
            })
        }
    }
    finish = () => {
        if(this.props.user){
            this.props.setComentarios(this.props.receta.userId, this.props.receta.uid, this.props.user.displayName, this.state.titulo, this.state.comentarios)
            this.props.setPuntos(this.props.receta.userId, this.props.receta.uid, this.state.rating)
            this.props.setPuntuacion(this.props.receta.userId, this.props.receta.uid)
        }else{
            this.setState({
                modalVisible:!this.props.user
            })
        }
    }
    render(){
        return(
            <ImageBackground
                source={fondo}
                style={styles.container}
            >
                <ScrollView>
                    <View style={{flexDirection:'row'}}>
                        <Feather onPress={()=> Actions.pop()}
                            name="chevron-left"
                            color="black"
                            size={heightPercentageToDP(5)}
                        />
                        <Text style={styles.textSections}>{this.props.receta.titulo}</Text>
                    </View>
                    <View style={styles.vistaEntrada}>
                        <Image  source={{uri:this.props.receta.imageUrl}}
                                style={styles.imagenStyle}
                                resizeMode={"cover"}/>
                        <View style={{justifyContent: "flex-end"}}>
                            <Avatar
                                source={{uri:this.props.receta.avatarUrl}}
                                rounded
                                size={"medium"}
                                containerStyle={styles.avStyle}/>
                        </View>
                        <Option
                            recetas={this.props.receta}
                        />
                        <Text style={{fontWeight:"bold" }}>{this.props.receta.entradilla+ ('<br/>', '\n')}</Text>
                        <Text  >
                            Pais:
                            <Text style={{fontWeight: 'bold'}}>
                                {" " + this.props.receta.pais}
                            </Text>
                        </Text>
                        <Text  >
                            Categoria:
                            <Text style={{fontWeight: 'bold'}}>
                                {" " + this.props.receta.categoria}
                            </Text>
                        </Text>
                        <Text>
                            Autor:
                            <Text style={{fontWeight: 'bold'}}>
                                { " " + this.props.receta.autor}
                            </Text>
                        </Text>
                    </View>
                    <Text style={styles.textSections}>Ingredientes</Text>
                    <View style={styles.vistaEntrada}>
                        <Text style={{color:'rgb(255,216,0)' }}>Para {this.props.receta.numPerson} personas</Text>
                        {this.parseIngredientes()}
                    </View>
                    <Text style={styles.textSections}>Preparacion</Text>
                    <View style={styles.vistaEntrada}>
                        {this.parsePreparacion()}
                    </View>
                    <Text style={styles.textSections}>Comparte y opina</Text>
                    <ModalLogin
                        modalVisible={this.state.modalVisible}
                        callback={this}
                    />
                    <View style={styles.vistaEntrada}>

                        <View>
                            <Text style={{
                                fontWeight:"bold",
                                fontSize:heightPercentageToDP(4),
                                marginBottom:heightPercentageToDP(2)
                            }}>
                                Comentarios</Text>

                            <FlatList
                                key={this.props.comments.uid}
                                data={this.props.comments}
                                renderItem={({item}) =>
                                    <View style={{borderBottomWidth: 2, borderBottomColor:'rgb(255,216,0)'}}>
                                        <Text style={{fontWeight:"bold", fontSize:heightPercentageToDP(2.9)}}>{item.displayName}</Text>
                                        <Text style={{fontWeight:"bold", fontSize:heightPercentageToDP(2.5)}}>{item.titulo}</Text>
                                        <Text style={{ fontSize:heightPercentageToDP(2)}}>{item.comentarios}</Text>
                                    </View>
                                }
                            />
                            <View style={styles.vistaEntradaFinal}>
                                <View>
                                    <Text style={styles.textofinal}>Puntua</Text>
                                    <AirbnbRating
                                        showRating={false}
                                        size={20}
                                        onFinishRating={this.ratingCompleted}
                                    />
                                </View>
                                <TouchableOpacity onPress={this.share}>
                                    <Text style={styles.textofinal}>Compartir</Text>
                                    <Icon name={"share"}
                                          color={'rgb(255,216,0)'}
                                          size={30}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.onFav(this.props.receta, !this.state.isFav)}>
                                    <Text style={styles.textofinal}>Favoritos</Text>
                                    <Icon name={"favorite"}

                                          color={this.state.isFav ? 'red': 'rgb(255,216,0)'}
                                          size={30}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text  style={{
                                fontWeight:"bold",
                                fontSize:heightPercentageToDP(3),
                                marginTop:heightPercentageToDP(2)
                            }}>Añadir comentario</Text>
                                <TextInput
                                    placeholder="Título del comentario"
                                    placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                                    onChangeText={(titulo) => this.setState({titulo})}
                                    value={this.state.titulo}
                                    style={{borderBottomWidth:1}}
                                />


                                <TextInput
                                    placeholder="Escribe aquí"
                                    placeholderTextColor={'rgba(44, 62, 80,1.0)'}
                                    multiline={true}
                                    editable={true}
                                    numberOfLines={3}
                                    onChangeText={(comentarios) => this.setState({comentarios})}
                                    value={this.state.comentarios}
                                    style={{borderBottomWidth:1}}
                                />


                        </View>
                    </View>
                    <View style={{flex:1,
                        padding: 15}}>
                        <TouchableOpacity  style={ styles.buttonContainer1} onPress={this.finish} >
                            <Text style={styles.buttonText}>He dicho</Text>
                        </TouchableOpacity>
                        <Text style={{flexDirection:"row"}}>
                            Para añadir un comentario debes
                            <Text style={{color:'rgb(255,216,0)'}}onPress={() => Actions.startView()}> inciar sesion</Text>
                            <Text> o </Text>
                            <Text style={{color:'rgb(255,216,0)'}}onPress={() => Actions.register()}>registrarse</Text>
                        </Text>
                    </View>

                </ScrollView>
            </ImageBackground>

        )
    }
}
const mapStateToProps = state => {
    const favorites = _.map(state.favRecipes, (val,uid) => {
        return { ...val,uid};
    });
    const {comentarios} = state.opcion
    const comments = _.map(comentarios, (val,uid) =>{
        return {...val,uid}
    })
    const {user} = state.auth
    return { comments,favorites, user };
};
export default connect(mapStateToProps,{
    addFav,deleteFav,fecthFav,setComentarios,fetchComentarios,setPuntuacion,setPuntos
})(showReceta);
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white",
    },
    vistaEntrada:{
        backgroundColor:"white",
        flex:1,
        padding: 15
    },
    vistaEntradaFinal:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: heightPercentageToDP(2),
        marginTop:heightPercentageToDP(2)
    },
    textofinal:{
        fontWeight:"bold",
        fontSize:16,
        marginBottom: 10
    },
    imagenStyle:{
        height:heightPercentageToDP("20%"),
        width:widthPercentageToDP("92%"),
    },
    buttonContainer1:{
        marginTop: heightPercentageToDP('2%'),
        backgroundColor: 'rgb(255,216,0)',
        paddingVertical: 10,
        borderRadius:7
    },
    avStyle:{
        borderWidth:2,
        borderColor:'rgb(255,216,0)',
        position: "absolute",
        alignSelf: "center",
    },
    buttonText: {
        textAlign: 'center',
        color:'black',
        fontSize:20,
        fontWeight: '700'
    },
    textSections:{
        fontFamily:'Allura-Regular',
        fontSize:32
    },
    pasoStyle:{
        alignSelf: "center",
        marginRight: 10,
        fontSize:heightPercentageToDP(5),
        color:'rgb(255,216,0)',
    }
});
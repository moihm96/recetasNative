import React,{PureComponent} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
export default class ItemList extends PureComponent{
    _onPress = () => {
        this.props.onPressItem(this.props.key);
    };

    render() {
        const textColor = this.props.selected ? 'red' : 'black';
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View>
                    <Text style={{color: textColor}}>{this.props.titulo}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
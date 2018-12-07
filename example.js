/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image,Text, View } from 'react-native';
/**export default class HelloWorldApp extends Component {
    render() {
        return (
            <View>
                <Text>Hello world!</Text>
            </View>
        );
    }
}*/

/**export default class Bananas extends Component {
    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <Image source={pic} style={{width: 193, height: 110}}/>
        );
    }
}*/

class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = { isShowingText: true };

        // Toggle the state every second
        setInterval(() => (
            this.setState(previousState => (
                { isShowingText: !previousState.isShowingText }
            ))
        ), 1000);
    }

    render() {
        if (!this.state.isShowingText) {
            return null;
        }

        return (
            <Text>{this.props.text}</Text>

        );
    }
}

export default class BlinkApp extends Component {
    render() {
        return (
            <View>
                <Blink text='I love to blink' />
                <Blink text='Yes blinking is so great' />
                <Blink text='Why did they ever take this out of HTML' />
                <Blink text='Look at me look at me look at me' />
            </View>
        );
    }
}

// skip this line if using Create React Native App
//AppRegistry.registerComponent('AwesomeProject', () => Bananas);

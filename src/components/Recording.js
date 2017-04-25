import React, { Component } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    Easing
} from 'react-native';

import { 
    AudioPlayer, 
} from 'react-native-audio-player-recorder'

import Icon from 'react-native-vector-icons/Ionicons';

export default class Recording extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: true,
            isPaused: false,
            currentTime: 0
        }
    }

    componentWillMount() {
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        this.animation.setValue(0);
        Animated.timing(this.animation, {
            duration: 400,
            toValue: 3,
            ease: Easing.bounce
        }).start();
    }

    _onPlay = () => {
        AudioPlayer.play(this.props.path, { output: 'Phone' });
    }

    render() {
        let icon = null;
        
        if (this.props.type === "Book") {
            icon = <Icon name="md-book" size={40} color="#1976D2" />;
        } else if ( this.props.type === "Song") {
            icon = <Icon name="md-musical-notes" size={40} color="#1976D2" />;
        } else {
            icon = <Icon name="md-mic" size={40} color="#1976D2" />;
        }

        const interpolated = this.animation.interpolate({
            inputRange: [0, .5, 1, 1.5, 2, 2.5, 3],
            outputRange: [0, -15, 0, -15, 0, -15, 0]
        });

        const animatedStyle = {
            transform: [
                { translateX: interpolated }
            ]
        };
        
        return (
            <TouchableWithoutFeedback onPress={this._onPlay}>
                <Animated.View style={[animatedStyle, styles.recording]}>
                    {icon}
                    <Text style={styles.recordingText}>{this.props.name}</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    recording: {
        alignItems: 'center',
        backgroundColor: '#EEE',
        borderRadius: 7,
        height: 100,
        marginBottom: 10,
        padding: 15,
        position: 'relative',
        width: '48%',
    },
    recordingText: {
        textAlign: 'center'
    },
    closeIconWrapper: {
        backgroundColor: '#333333',
        borderRadius: 10,
        height: 20,
        position: 'absolute',
        top: -3,
        right: -3,
        width: 20
    },
    closeIcon: {
        
    }
});
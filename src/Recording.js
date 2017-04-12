import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import { 
    AudioPlayer, 
} from 'react-native-audio-player-recorder'

export default class Recording extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: true,
            isPaused: false,
            currentTime: 0
        }
    }

    _onPlay = () => {
        AudioPlayer.play(this.props.path, { output: 'Phone' });
    }

    render() {
        return (
            <TouchableHighlight  style={styles.recording} onPress={this._onPlay}>
                <Text>{this.props.type} - {this.props.name}</Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    recording: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        height: 100,
        marginBottom: 10,
        padding: 15,
        width: '48%',
    },
});
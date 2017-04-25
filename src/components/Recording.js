import React, { Component } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
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
            currentTime: 0,
            isSelected: false
        }
    }

    _onSelect = () => {
        if ( this.props.isEditing ) {
            this.setState({
                isSelected: !this.state.isSelected
            });
        } else {
            AudioPlayer.play(this.props.path, { output: 'Phone' });
        }
    }

    render() {
        let icon = null;
        console.log(this.state.isSelected)
        
        if (this.props.type === "Book") {
            icon = <Icon name="md-book" size={25} color="#FFFFFF" style={styles.recordingIcon} />;
        } else if ( this.props.type === "Song") {
            icon = <Icon name="md-musical-notes" size={25} color="#FFFFFF" style={styles.recordingIcon} />;
        } else {
            icon = <Icon name="md-mic" size={25} color="#FFFFFF" style={styles.recordingIcon} />;
        }
        
        return (
            <View style={styles.recordingWrap}>
                <TouchableOpacity onPress={this._onSelect} style={[styles.recording, this.state.isSelected && styles.isSelected]}>
                    {icon}
                </TouchableOpacity>
                <Text style={styles.recordingText}>{this.props.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    recordingWrap: {
        width: '48%',
    },
    recording: {
        backgroundColor: '#EEE',
        borderRadius: 7,
        padding: 10,
        height: 125
    },
    recordingText: {
        marginBottom: 15,
        marginTop: 3,
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
    isSelected: {
        borderWidth: 4,
        borderColor: '#333333'
    }
});
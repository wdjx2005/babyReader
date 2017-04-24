import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
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

    _onPlay = () => {
        AudioPlayer.play(this.props.path, { output: 'Phone' });
    }

    render() {
        const isEditing = this.props.isEditing;
        let icon = null;
        let deleteIcon = null;
        
        if (this.props.type === "Book") {
            icon = <Icon name="md-book" size={40} color="#1976D2" />;
        } else if ( this.props.type === "Song") {
            icon = <Icon name="md-musical-notes" size={40} color="#1976D2" />;
        } else {
            icon = <Icon name="md-mic" size={40} color="#1976D2" />;
        }

        if (isEditing) {
            deleteIcon = (
                <TouchableOpacity style={styles.closeIconWrapper}>
                    <Icon name="md-close" size={20} color="#FFFFFF" style={styles.closeIcon}/>
                </TouchableOpacity>
            );

        }
        
        return (
            <TouchableOpacity  style={styles.recording} onPress={this._onPlay}>
                {deleteIcon}
                {icon}
                <Text style={styles.recordingText}>{this.props.name}</Text>
            </TouchableOpacity>
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
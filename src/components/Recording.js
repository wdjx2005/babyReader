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
import LinearGradient from 'react-native-linear-gradient';
import DeleteRecording from './DeleteRecording';
import realm from '../realm';

export default class Recording extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: true,
            isPaused: false,
            currentTime: 0,
            isSelected: false,
            isDeleted: false
        }
    }

    _deleteRecording = (e) => {
        let recordingObj = realm.objects('Recording').find(row => {
            return row.name == this.props.name;
        });
        
        realm.write(() => {
            realm.delete(recordingObj);
        });

        this.props.onDeleteUpdated();
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
        let deleteRecording = null;

        if (this.props.isEditing) {
            deleteRecording = <DeleteRecording onDeleteClick={this._deleteRecording}/>;
        }
        
        if (this.props.type === "Book") {
            icon = <Icon name="md-book" size={25} color="#FFFFFF" style={styles.recordingIcon} />;
        } else if ( this.props.type === "Song") {
            icon = <Icon name="md-musical-notes" size={25} color="#FFFFFF" style={styles.recordingIcon} />;
        } else {
            icon = <Icon name="md-mic" size={25} color="#FFFFFF" style={styles.recordingIcon} />;
        }
        
        return (
            <View style={[styles.recordingWrap, this.state.isDeleted && styles.isDeleted]}>
                <TouchableOpacity onPress={this._onSelect}>
                    <LinearGradient colors={['#FF512F', '#F09819']} style={[styles.recording, this.state.isSelected && styles.isSelected]}>
                        {icon}
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.recordingText}>{this.props.name}</Text>
                {deleteRecording}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    recordingWrap: {
        width: '48%',
    },
    recording: {
        borderRadius: 7,
        padding: 10,
        height: 150,
        shadowColor: '#222222',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 0.2
    },
    recordingText: {
        backgroundColor: 'transparent',
        marginBottom: 15,
        marginTop: 10,
        textAlign: 'center'
    },
    isSelected: {
        shadowColor: '#222222',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowRadius: 5,
        shadowOpacity: 0.7
    }
});
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
            isPlaying: false,
            isPaused: false,
            currentTime: 0,
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
        if ( this.props.isEditing )
            return;
        
        AudioPlayer.play(this.props.path, { output: 'Phone' });

        this.setState({
            isPlaying: !this.state.isPlaying
        });
    }

    render() {
        let icon = null;
        let deleteRecording = null;
        let colors = null;

        if (this.props.isEditing) {
            deleteRecording = <DeleteRecording onDeleteClick={this._deleteRecording}/>;
        }

        if (this.state.isPlaying) {
            icon = <Icon name="ios-pause" size={75} color="#fff" />
        } else {
            icon = <Icon name="ios-play" size={75} color="#fff" />
        }

        if (this.props.type == 'book') {
            colors = ['#36D1DC', '#5B86E5'];
        } else if (this.props.type == 'song') {
            colors = ['#FF512F', '#F09819'];
        } else {
            colors = ['#FF00CC', '#333399'];
        }
        
        return (
            <View style={[styles.recordingWrap, this.state.isDeleted && styles.isDeleted]}>
                <TouchableOpacity onPress={this._onSelect}>
                    <LinearGradient colors={colors} style={styles.recording}>
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
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        borderRadius: 7,
        justifyContent: 'center',
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
    }
});
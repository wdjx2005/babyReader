import React, { Component } from 'react';
import {
    AsyncStorage,
    Button,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';

import { 
    AudioUtils,
    AudioPlayer, 
    AudioRecorder, 
} from 'react-native-audio-player-recorder'

import realm from './realm';

export default class CreateRecording extends Component {  
    constructor(props) {
        super(props);

        this.state = {
            isRecording: false,
            isFinishedRecording: false,
            currentTime: 0,
            audioLength: 0,
            name: 'Title',
        };

        this.audioPath = AudioUtils.DocumentDirectoryPath;
    }

    prepareRecordingPath() {
        let formattedName = this.state.name.replace(/\s+/g, '-').toLowerCase();
        let fullAudioPath = this.audioPath + '/' + formattedName + '.acc';
        AudioRecorder.prepareRecordingAtPath(fullAudioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
        });
    }

    _onRecord = () => {
        if (this.state.isRecording) {
            console.warn('Already recording.');
            return;
        }

        this.prepareRecordingPath();
        AudioRecorder.startRecording();
        this.setState({isRecording: true});

        this.timer = setInterval(() => {
            const time = this.state.currentTime + 1
            this.setState({currentTime: time})
            if (time === 60) {
                this.stopRecording()
            }
        }, 1000)
    }

    _onStop = () => {
        if (!this.state.isRecording) {
            console.warn("Can't stop, not recording.");
            return;
        }

        AudioRecorder.stopRecording();
        this.setState({isRecording: false, isFinishedRecording: true, currentTime: 0, audioLength: this.state.currentTime + 1});
        clearInterval(this.timer);

    }

    _saveRecording = () => {
        let name = this.state.name;
        let type = this.props.type.title;
        let formattedName = this.state.name.replace(/\s+/g, '-').toLowerCase();
        let fullAudioPath = this.audioPath + '/' + formattedName + '.acc';
        
        if (name && type && fullAudioPath) {
            realm.write(() => {
                realm.create('Recording', {
                    id: 1,
                    name: name,
                    formattedName: formattedName,
                    type: type,
                    path: fullAudioPath
                });
            })
        }

        this.props.navigator.pop();
    }

    _renderButton(title, method) {
        return (
            <TouchableHighlight onPress={method}>
                <Text>
                    {title}
                </Text>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.create}>
                <TextInput 
                    style={styles.input}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                />
                {this._renderButton("RECORD", this._onRecord)}
                {this._renderButton("STOP", this._onStop)}
                <Text>{this.state.currentTime}s</Text>
                <Button
                    onPress={this._saveRecording}
                    title="Save"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#CECECE',
        borderWidth: 1,
        height: 40,
        padding: 10,
    },
    create: {
        padding: 20,
        paddingTop: 84,
    },
});
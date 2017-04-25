import React, { Component } from 'react';
import {
    AsyncStorage,
    Button,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    View
} from 'react-native';
import { 
    AudioUtils,
    AudioPlayer, 
    AudioRecorder, 
} from 'react-native-audio-player-recorder'
import NavigationBar from 'react-native-navbar';
import realm from './realm';
import PlayButton from './components/PlayButton.js';

export default class AddScreen extends Component {  
    constructor(props) {
        super(props);

        this.state = {
            isRecording: false,
            isFinishedRecording: false,
            currentTime: 0,
            audioLength: 0,
            name: '',
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
            this.setState({currentTime: time});
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
        
        if (name && type) {
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
        const {
            isRecording,
            isFinishedRecording,
            currentTime
        } = this.state;

        const titleConfig = {
            title: 'Add',
            tintColor: '#FFFFFF'
        };

        const leftButtonConfig = {
            title: 'Cancel',
            tintColor: '#FFFFFF',
            handler: () => this.props.navigator.pop()
        };

        const rightButtonConfig = {
            title: 'Save',
            tintColor: '#FFFFFF'
        };

        const statusBarStyle = {
            style: 'light-content'
        };

        return (
            <View style={styles.create}>
                <NavigationBar
                    leftButton={leftButtonConfig}
                    rightButton={rightButtonConfig}
                    title={titleConfig}
                    tintColor="#1976D2"
                    statusBar={statusBarStyle} />
                <TextInput 
                    style={styles.input}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    placeholder="Enter a title..."
                    placeholderTextColor="#fff"
                />
                <PlayButton 
                    iconText={isRecording ? 'Stop Recording' : 'Start Recording'}
                    iconColor={isRecording ? 'white' : 'red'}
                    iconName={isRecording ? 'stop' : 'circle'}
                    onPressHandler={isRecording ? this._onStop : this._onRecord}
                />
                {currentTime > 0 &&
                    <Text style={styles.time}>{this.state.currentTime}s</Text>
                }
                
                {isFinishedRecording &&
                    <TouchableOpacity 
                        onPress={this._saveRecording}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Save Recording</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#455A64',
        borderColor: '#78909C',
        borderRadius: 4,
        borderWidth: 1,
        color: '#FFFFFF',
        height: 40,
        marginBottom: 15,
        padding: 10,
    },
    create: {
        backgroundColor: '#263238',
        flex: 1,
        height: '100%',
    },
    button: {
        backgroundColor: '#1976D2',
        borderRadius: 4,
        marginTop: 15,
        padding: 15
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center'
    },
    time: {
        color: '#FFFFFF',
        fontSize: 32,
        marginBottom: 30,
        textAlign: 'center'
    }
});
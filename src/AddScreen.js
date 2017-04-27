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
import PlayButton from './components/PlayButton';
import TypeButton from './components/TypeButton';
import ErrorMessage from './components/ErrorMessage';

export default class AddScreen extends Component {  
    constructor(props) {
        super(props);

        this.state = {
            isRecording: false,
            isFinishedRecording: false,
            currentTime: 0,
            audioLength: 0,
            name: '',
            type: null,
            hasErrors: false
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

    _selectType = (title) => {
        let formattedTitle = title.toLowerCase();
        this.setState({
            type: formattedTitle
        })
    }

    _saveRecording = () => {
        let formattedName = this.state.name.replace(/\s+/g, '-').toLowerCase();
        let fullAudioPath = this.audioPath + '/' + formattedName + '.acc';
        let type = this.state.type;

        if (type == null) {
            type = 'bespoke';
        }
        
        if (this.state.name) {
            realm.write(() => {
                realm.create('Recording', {
                    id: 1,
                    name: this.state.name,
                    formattedName: formattedName,
                    path: fullAudioPath,
                    type: type
                });
            })

            this.props.navigator.pop();
        } else {
            this.setState({
                hasErrors: true
            })

            if (!this.state.name) {
                this.setState({
                    errorMessage: 'A name must be provided to save the recording.'
                })
            }
        }
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
            title: 'Record',
            tintColor: '#FFFFFF'
        };

        const leftButtonConfig = {
            title: 'Cancel',
            tintColor: '#FFFFFF',
            handler: () => this.props.navigator.pop()
        };

        const rightButtonConfig = {
            title: 'Save',
            tintColor: '#FFFFFF',
            handler: this._saveRecording
        };

        const statusBarStyle = {
            style: 'light-content'
        };

        let errorMessage = null;
        if (this.state.hasErrors) {
            errorMessage = <ErrorMessage show={this.state.hasErrors} message={this.state.errorMessage} />;
        }

        return (
            <View style={styles.container}>
                <NavigationBar
                    leftButton={leftButtonConfig}
                    rightButton={rightButtonConfig}
                    title={titleConfig}
                    tintColor="#333333"
                    statusBar={statusBarStyle} />
                <View style={styles.contentContainer}>
                    {errorMessage}
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            onChangeText={(name) => this.setState({name})}
                            value={this.state.name}
                            placeholder="Enter a name..."
                            placeholderTextColor="#555555"
                        />
                    </View>
                    <View>
                        <Text>Select a type of recording...</Text>
                        <View style={styles.typeButtonWrapper}>
                            <TypeButton color={['#36D1DC', '#5B86E5']} title="Book" icon="ios-book" selectedType={this.state.type} onSelect={this._selectType} />
                            <TypeButton color={['#FF512F', '#F09819']} title="Song" icon="ios-musical-notes" selectedType={this.state.type} onSelect={this._selectType} />
                        </View>
                    </View>
                    {/*<View style={styles.recordingContaienr}>
                        <PlayButton 
                            iconText={isRecording ? 'Stop Recording' : 'Start Recording'}
                            iconColor={isRecording ? 'white' : 'red'}
                            iconName={isRecording ? 'stop' : 'circle'}
                            onPressHandler={isRecording ? this._onStop : this._onRecord}
                        />
                        {currentTime > 0 &&
                            <Text style={styles.time}>{this.state.currentTime}s</Text>
                        }
                    </View>*/}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    contentContainer: {
        padding: 15
    },
    typeButtonWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10
    },
    inputContainer: {
        borderBottomColor: '#232323',
        borderBottomWidth: 2,
        marginBottom: 30
    },
    input: {
        color: '#333',
        height: 40,
        padding: 5,
    },
    recordingContainer: {
        marginTop: 120
    },
    time: {
        color: '#FFFFFF',
        fontSize: 32,
        marginBottom: 30,
        textAlign: 'center'
    }
});
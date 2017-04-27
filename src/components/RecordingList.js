import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View
} from 'react-native';
import Recording from './Recording.js';
import realm from '../realm';

export default class RecordingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordings: null
        }
    }

    componentWillMount() {
        let recordingQuery = realm.objects('Recording');
        this.setState({
            recordings: recordingQuery
        });
    }

    _onRecordingDeleted = () => {
        console.log('updating recordings');
        let updatedRecordingQuery = realm.objects('Recording');
        this.setState({
            recordings: updatedRecordingQuery
        });
    }

    render() {
        const recordings = this.state.recordings.map((recording) =>
            <Recording key={recording.formattedName} name={recording.name} type={recording.type} path={recording.path} isEditing={this.props.isEditing} onDeleteUpdated={this._onRecordingDeleted} />
        );
        return (
            <ScrollView>
                <View style={styles.recordingList}>
                    {recordings}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    recordingList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 15
    },
});
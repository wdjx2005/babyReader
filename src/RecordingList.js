import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View
} from 'react-native';

import Recording from './Recording.js';

import realm from './realm';

export default class RecordingList extends Component {
    render() {
        const recordingQuery = realm.objects('Recording');
        const recordings = recordingQuery.map((recording) => 
            <Recording name={recording.name} type={recording.type} path={recording.path} />
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
    },
});
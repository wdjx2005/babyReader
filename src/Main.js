import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import RecordingList from './RecordingList.js';
import CreateRecording from './CreateRecording.js';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this._onForward = this._onForward.bind(this);
  }

  _onForward = (type) => {
    this.props.navigator.push({
      component: CreateRecording,
      title: 'Add ' + type.title,
      passProps: {
        type: type,
      }
    });
  }

  render() {
    const generalType = {
      title: 'General'
    };

    const bookType = {
      title: 'Book'
    };

    const songType = {
      title: 'Song'
    };

    return (
      <View style={styles.container}>
        <RecordingList />
        <ActionButton buttonColor="#1976D2">
          <ActionButton.Item buttonColor='#42A5F5' title="Speaking" onPress={() => this._onForward(generalType)}>
            <Icon name="md-mic" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#42A5F5' title="Book" onPress={() => this._onForward(bookType)}>
            <Icon name="md-book" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#42A5F5' title="Song" onPress={() => this._onForward(songType)}>
            <Icon name="md-musical-notes" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 30,
    paddingTop: 30,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  modal: {
    height: 100,
    width: 100
  }
});


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import NavigationBar from 'react-native-navbar';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import RecordingList from './RecordingList.js';
import CreateRecording from './CreateRecording.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

const titleConfig = {
  title: 'Recordings',
  tintColor: '#FFFFFF'
};

const statusBarStyle = {
  style: 'light-content'
};

const navBarStyle = {
  paddingLeft: 10,
  paddingRight: 10
};

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };
  }

  render() {
    const leftButtonConfig = {
      title: 'Edit',
      tintColor: '#FFFFFF',
      handler: () => {
        if (!this.state.isEditing) {
          this.setState({
            isEditing: true
          });
        } else {
          this.setState({
            isEditing: false
          });
        }
      }
    };

    const rightButtonConfig = {
      title: 'Add',
      tintColor: '#FFFFFF',
      handler: () => alert('add')
    };

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
        <NavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig}
          rightButton={rightButtonConfig}
          tintColor="#1976D2"
          statusBar={statusBarStyle}
          style={navBarStyle}
        />
        <RecordingList isEditing={this.state.isEditing} />
      </View>
    );
  }
}


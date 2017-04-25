import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';

import RecordingList from './components/RecordingList.js';
import EditScreen from './EditScreen.js';
import AddScreen from './AddScreen.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

const statusBarStyle = {
  style: 'light-content'
};

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const titleConfig = {
      title: 'Recordings',
      tintColor: '#FFFFFF'
    };

    const leftButtonConfig = {
      title: 'Edit',
      tintColor: '#FFFFFF',
      handler: () => this.props.navigator.push({
        component: EditScreen
      })
    };

    const rightButtonConfig = {
      title: 'Add',
      tintColor: '#FFFFFF',
      handler: () => this.props.navigator.push({
        component: AddScreen
      })
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
        />
        <RecordingList />
      </View>
    );
  }
}


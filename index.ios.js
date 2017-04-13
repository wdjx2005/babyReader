/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { 
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

import Main from './src/Main.js';

export default class babyReader extends Component {
  _editRecordings() {

  }

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Main,
          title: 'Recordings',
          rightButtonTitle: 'Edit',
        }}
        style={{flex: 1}}
      />
    )
  }
}

AppRegistry.registerComponent('babyReader', () => babyReader);


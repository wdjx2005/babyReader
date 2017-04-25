import React, { 
  Component
} from 'react';
import {
  AppRegistry,
  View,
  Text,
  Navigator
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import RecordingList from './components/RecordingList';

export default class EditScreen extends Component {
  render() {
    const titleConfig = {
        title: 'Edit',
        tintColor: '#FFFFFF'
    };

    const leftButtonConfig = {
        title: 'Done',
        tintColor: '#FFFFFF',
        handler: () => this.props.navigator.pop()
    };

    const rightButtonConfig = {
        title: 'Delete',
        tintColor: '#FFF'
    };

    const statusBarStyle = {
      style: 'light-content'
    };
    
    return (
      <View style={{flex: 1,}}>
        <NavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig}
          rightButton={rightButtonConfig}
          tintColor="#1976D2" 
          statusBar={statusBarStyle} />
        <RecordingList />
      </View>
    )
  }
}

AppRegistry.registerComponent('babyReader', () => babyReader);


import React, {
  Component
} from 'react';
import {
  AppRegistry,
  View,
  Text,
  TouchableOpacity,
  Navigator
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import RecordingList from './components/RecordingList';
import realm from './realm';

const styles = {
  navIcon: {
    paddingTop: 10,
    paddingRight: 10
  }
}

export default class EditScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRecordings: []
    };
  }


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

    const statusBarStyle = {
      style: 'light-content'
    };

    return (
      <View style={{ flex: 1, }}>
        <NavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig}
          tintColor="#333333"
          statusBar={statusBarStyle} />
        <RecordingList isEditing="true" onDelete={this._deleteRecordings} />
      </View>
    )
  }
}

AppRegistry.registerComponent('babyReader', () => babyReader);


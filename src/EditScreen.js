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

const styles = {
    navIcon: {
        paddingTop: 10,
        paddingRight: 10
    }
}

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

    const rightButtonConfig = (
        <TouchableOpacity onPress={() => console.log('delete')}>
            <Icon name="ios-trash-outline" size={20} color="#FFFFFF" style={styles.navIcon}/>
        </TouchableOpacity>
    );

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
        <RecordingList isEditing="true" />
      </View>
    )
  }
}

AppRegistry.registerComponent('babyReader', () => babyReader);


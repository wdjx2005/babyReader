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
  View,
  Navigator
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import CustomTransitions from './src/shims/CustomTransitions';
import HomeScreen from './src/HomeScreen.js';

function renderScene(route, navigator) {
  return <route.component route={route} navigator={navigator} />
}

export default class babyReader extends Component {
  render() {
    const initialRoute = {
      component: HomeScreen
    };

    return (
      <View style={{flex: 1,}}>
        <Navigator
          configureScene={(route, routeStack) => CustomTransitions.NONE}
          initialRoute={initialRoute}
          renderScene={renderScene} />
      </View>
    )
  }
}

AppRegistry.registerComponent('babyReader', () => babyReader);


import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

import WelcomeScreen from './screens/WelcomeScreen'
import AuthScreen from './screens/AuthScreen'
import MapScreen from './screens/MapScreen'
import SwipeScreen from './screens/SwipeScreen'
import LikesScreen from './screens/LikesScreen'
import SettingsScreen from './screens/SettingsScreen'

const MainNavigator = createBottomTabNavigator({
  welcome: {
    screen: WelcomeScreen,
    navigationOptions: { tabBarVisible: false },
    lazy: true
  },
  auth: {
    screen: AuthScreen,
    navigationOptions: { tabBarVisible: false },
    lazy: true
  },
  main: {
    navigationOptions: { tabBarVisible: false },
    screen: createBottomTabNavigator({
      map: MapScreen,
      swipe: SwipeScreen,
      review: {
        screen: createStackNavigator({
          likes: LikesScreen,
          settings: SettingsScreen
        })
      }
    })
  }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: 'false',
  tabBarOptions: { labelStyle: { fontSize: 12 } }
})
const AppContainer = createAppContainer(MainNavigator)

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App

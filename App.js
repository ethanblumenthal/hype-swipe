import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import WelcomeScreen from './screens/WelcomeScreen'
import AuthScreen from './screens/AuthScreen'
import MapScreen from './screens/MapScreen'
import SwipeScreen from './screens/SwipeScreen'
import LikesScreen from './screens/LikesScreen'
import SettingsScreen from './screens/SettingsScreen'

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default App

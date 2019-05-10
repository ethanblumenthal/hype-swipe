import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { Button } from 'react-native-elements'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux'

import WelcomeScreen from './screens/WelcomeScreen'
import AuthScreen from './screens/AuthScreen'
import SettingsScreen from './screens/SettingsScreen'
import MapScreen from './screens/MapScreen'
import PlacesScreen from './screens/PlacesScreen'
import FavoritesScreen from './screens/FavoritesScreen'
import configureStore from './store'

const { persistor, store } = configureStore()

const navOptions = {
  initialRouteName: 'main',
  defaultNavigationOptions: ({ navigation }) => ({
    headerTitle: 'Hype Swipe',
    headerRight: (
      <Button
        title='Settings'
        onPress={() => navigation.navigate('settings')}
        buttonStyle={{ backgroundColor: 'white', marginRight: 10 }}
        titleStyle={{ color: '#0389F4' }}
      />
    ),
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    },
    tabBarPosition: 'bottom',
    swipeEnabled: 'false',
    tabBarOptions: { labelStyle: { fontSize: 12 } }
  })
}

const MainNavigator = createStackNavigator({
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
  settings: {
    screen: SettingsScreen,
    navigationOptions: { tabBarVisible: false },
    lazy: true
  },
  main: {
    navigationOptions: { tabBarVisible: false },
    screen: createBottomTabNavigator({
      Map: MapScreen,
      Places: PlacesScreen,
      Favorites: FavoritesScreen
    })
  }
}, navOptions)
const AppContainer = createAppContainer(MainNavigator)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <AppContainer />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App

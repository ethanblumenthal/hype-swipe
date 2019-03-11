import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { MapView, Permissions, Location } from 'expo'
import { Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { fetchVenues } from '../actions'

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='my-location' size={30} color={tintColor} />
    }
  }

  state = {
    mapLoaded: false,
    region: {
      latitude: 37.7749,
      longitude: -122.4194,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  }

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      let { coords: { longitude, latitude }} = await Location.getCurrentPositionAsync({})
      this.setState({ region: { longitude, latitude, longitudeDelta: 0.0421, latitudeDelta: 0.0922 } })
    }
    this.setState({ mapLoaded: true })
  }

  onRegionChangeComplete = region => {
    this.setState({ region })
  }

  onButtonPress = () => {
    this.props.fetchVenues(this.state.region, () => {
      this.props.navigation.navigate('swipe')
    })
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            raised
            title='Search This Area'
            buttonStyle={{ backgroundColor: '#2ecc71' }}
            icon={{ name: 'search', color: 'white' }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 60,
    right: 60
  }
}

export default connect(null, {fetchVenues})(MapScreen)

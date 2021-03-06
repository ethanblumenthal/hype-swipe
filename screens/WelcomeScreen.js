import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { AppLoading } from 'expo'
import _ from 'lodash'
import Slides from '../components/Slides'

const SLIDE_DATA = [
  { text: 'Welcome to HypeSwipe', color: '#03A9F4' },
  { text: 'Discover cool places near you', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
]

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    // UNCOMMENT TO CLEAR AUTH TOKEN
    // await AsyncStorage.clear()

    let token = await AsyncStorage.getItem('token')
    if (token) {
      this.props.navigation.navigate('Map')
      this.setState({ token })
    } else {
      this.setState({ token: false })
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('Auth')
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />
    }

    return (
      <Slides slides={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    )
  }
}

export default WelcomeScreen

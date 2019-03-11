import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { AppLoading } from 'expo'
import _ from 'lodash'
import Slides from '../components/Slides'

const SLIDE_DATA = [
  { text: 'Welcome to HypeSwipe!', color: '#3498db' },
  { text: 'Find sweet things to do!', color: '#2ecc71' },
  { text: 'Set your location, then swipe away!', color: '#3498db' }
]

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('token')
    
    if (token) {
      this.props.navigation.navigate('map')
      this.setState({ token })
    } else {
      this.setState({ token: false })
    }
  }

  onComplete = () => {
    this.props.navigation.navigate('map')
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />
    }

    return (
      <Slides slides={SLIDE_DATA} onComplete={this.onComplete} />
    )
  }
}

export default WelcomeScreen

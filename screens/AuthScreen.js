import React, { Component } from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native'
import firebase from 'firebase'
import SignUpForm from '../components/SignUpForm'
import SignInForm from '../components/SignInForm'

class Auth extends Component {
  state = { token: null, signup: false }

  async componentDidMount() {
    const config = {
      apiKey: "AIzaSyBOBWi1mo2H13HhWTMRgVpfclAMrLSxkMQ",
      authDomain: "one-time-password-21595.firebaseapp.com",
      databaseURL: "https://one-time-password-21595.firebaseio.com",
      projectId: "one-time-password-21595",
      storageBucket: "one-time-password-21595.appspot.com",
      messagingSenderId: "914742074935"
    }
    firebase.initializeApp(config)

    // await AsyncStorage.clear()

    let token = await AsyncStorage.getItem('token')
    if (token) {
      this.props.navigation.navigate('map')
      this.setState({ token })
    } else {
      this.setState({ token: false })
    }
  }

  onSignUp = () => {
    this.setState({ signup: true })
  }

  onSignIn = async (token) => {
    this.setState({ token })
    await AsyncStorage.setItem('token', this.state.token)
    this.props.navigation.navigate('map')
  }

  render() {
    if (!this.state.signup) {
      return (
        <View style={styles.container}>
          <SignUpForm onSignUp={this.onSignUp} />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <SignInForm onSignIn={this.onSignIn} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
})

export default Auth

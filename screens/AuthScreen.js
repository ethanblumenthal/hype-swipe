import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import firebase from 'firebase'
import SignUpForm from '../components/SignUpForm'
import SignInForm from '../components/SignInForm'

class App extends Component {
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyBOBWi1mo2H13HhWTMRgVpfclAMrLSxkMQ",
      authDomain: "one-time-password-21595.firebaseapp.com",
      databaseURL: "https://one-time-password-21595.firebaseio.com",
      projectId: "one-time-password-21595",
      storageBucket: "one-time-password-21595.appspot.com",
      messagingSenderId: "914742074935"
    }
    firebase.initializeApp(config)
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
})

export default App

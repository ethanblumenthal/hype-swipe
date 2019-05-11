import React, { Component } from 'react'
import { View } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import axios from 'axios'
import firebase from 'firebase'

const ROOT_URL = 'https://us-central1-one-time-password-21595.cloudfunctions.net'

class SignInForm extends Component {
  state = { phone: '', code: '' }

  componentDidMount() {
    this.setState({ phone: this.props.phone })
  }

  handleSubmit = async () => {
    try {
      const { phone, code } = this.state
      let { data } = await axios.post(`${ROOT_URL}/verifyPassword`, { phone, code })
      firebase.auth().signInWithCustomToken(data.token)
      this.props.onSignIn(data.token)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View>
        <Text h1={true} h1Style={{ color: 'white', marginBottom: 30 }}>Sign In!</Text>
        <View style={{ marginBottom: 10 }}>
          <Input
            placeholder='Secret Code'
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
            leftIcon={{ name: 'code', color: 'white' }}
            leftIconContainerStyle={{ marginRight: 5 }}
            keyboardType="phone-pad"
            inputStyle={{ color: 'white' }}
          />
        </View>
        <Button
          raised
          title='Submit'
          buttonStyle={{ backgroundColor: '#2ecc71' }}
          containerStyle={{ marginTop: 15 }}
          onPress={this.handleSubmit}
        />
      </View>
    )
  }
}

export default SignInForm

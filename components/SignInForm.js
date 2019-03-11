import React, { Component } from 'react'
import { View } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import axios from 'axios'
import firebase from 'firebase'

const ROOT_URL = 'https://us-central1-one-time-password-21595.cloudfunctions.net'

class SignInForm extends Component {
  state = { phone: '', code: '' }

  handleSubmit = async () => {
    try {
      const { phone, code } = this.state
      let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, { phone, code })
      firebase.auth().signInWithCustomToken(data.token)
      this.props.onSignIn(data.token)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View>
        <Text h1={true} h1Style={{color: 'white', marginBottom: 30 }}>HypeSwipe</Text>
        <View style={{ marginBottom: 10 }}>
          <Input
            placeholder=' Phone Number'
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
            leftIcon={{name: 'phone', color: 'white'}}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Input
            placeholder=' Code'
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
            leftIcon={{name: 'code', color: 'white'}}
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

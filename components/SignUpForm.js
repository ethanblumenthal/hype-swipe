import React, { Component } from 'react'
import { View } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import axios from 'axios'

const ROOT_URL = 'https://us-central1-one-time-password-21595.cloudfunctions.net'

class SignUpForm extends Component {
  state = { phone: '' }

  handleSubmit = async () => {
    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
      await axios.post(`${ROOT_URL}/requestPassword`, { phone: this.state.phone })
      this.props.onSignUp(this.state.phone)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View>
        <Text h1={true} h1Style={{ color: 'white', marginBottom: 30 }}>Sign Up!</Text>
        <View style={{ marginBottom: 10 }}>
          <Input
            placeholder='Phone Number'
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
            leftIcon={{ name: 'phone', color: 'white' }}
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

export default SignUpForm

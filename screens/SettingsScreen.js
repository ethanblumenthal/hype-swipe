import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { clearVenues } from '../actions'

class SettingsScreen extends Component {
  render() {
    return (
      <View>
        <Button
          title='Reset Favorite Places'
          large
          icon={{ name: 'delete-forever', color: 'white' }}
          buttonStyle={{ backgroundColor: '#F44336', marginTop: 10, marginHorizontal: 50 }}
          onPress={this.props.clearVenues}
        />
      </View>
    )
  }
}

export default connect(null, { clearVenues })(SettingsScreen)

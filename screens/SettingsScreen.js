import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { deleteFavorites } from '../actions'

class SettingsScreen extends Component {
  onButtonPress = () => {
    this.props.deleteFavorites()
    this.props.navigation.navigate('Favorites')
  }

  render() {
    return (
      <View>
        <Button
          title='Reset Favorite Places'
          large
          icon={{ name: 'delete-forever', color: 'white' }}
          buttonStyle={{ backgroundColor: '#F44336', marginTop: 10, marginHorizontal: 50 }}
          onPress={this.onButtonPress}
        />
      </View>
    )
  }
}

export default connect(null, { deleteFavorites })(SettingsScreen)

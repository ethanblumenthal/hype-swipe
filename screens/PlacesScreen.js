import React, { Component } from 'react'
import { View, Text, Platform } from 'react-native'
import { connect } from 'react-redux'
import { MapView } from 'expo'
import { Card, Button, Icon, Linking } from 'react-native-elements'
import Swipe from '../components/Swipe'
import { createFavorite } from '../actions'

class PlacesScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='description' size={30} color={tintColor} />
    }
  }

  renderCard(item) {
    const { id, name, rating, categories, coordinates, url } = item
    const initialRegion = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    }
    return (
      <Card title={name}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          >
          <MapView.Marker
            coordinate={coordinates}
          />
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text style={styles.italics}>{categories[0].title}</Text>
          <Text style={styles.italics}>{rating} stars</Text>
        </View>
        <Button
          raised
          title='Check It Out!'
          buttonStyle={{ backgroundColor: '#2ecc71' }}
          onPress={() => Linking.openURL(url)}
        />
      </Card>
    )
  }

  renderNoMoreCards = () => {
    return (
      <Card title='No More Places'>
        <Button
          raised
          title='Back To Map'
          icon={{ name: 'my-location', color: 'white' }}
          buttonStyle={{ backgroundColor: '#2ecc71' }}
          onPress={() => this.props.navigation.navigate('Map')}
        />
      </Card>
    )
  }

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Swipe
          data={this.props.places}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={item => this.props.createFavorite(item)}
          keyProp='id'
        />
      </View>
    )
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  italics: {
    fontStyle: 'italic'
  }
}

const mapStateToProps = ({ places }) => ({
  places
})

export default connect(mapStateToProps, { createFavorite })(PlacesScreen)

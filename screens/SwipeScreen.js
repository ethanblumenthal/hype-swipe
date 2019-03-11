import React, { Component } from 'react'
import { View, Text, Platform } from 'react-native'
import { connect } from 'react-redux'
import { MapView } from 'expo'
import { Card, Button, Icon } from 'react-native-elements'
import Swipe from '../components/Swipe'
import { likeVenue } from '../actions'

class SwipeScreen extends Component {
  static navigationOptions = {
    title: 'Places',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='description' size={30} color={tintColor} />
    }
  }

  renderCard(item) {
    const initialRegion = {
      latitude: item.venue.location.lat,
      longitude: item.venue.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }

    return (
      <Card title={item.venue.name}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{item.venue.location.address}</Text>
          <Text>{`${item.venue.location.city}, ${item.venue.location.state}`}</Text>
        </View>
        {/* <Text>{venue.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Text> */}
      </Card>
    )
  }

  renderNoMoreCards = () => {
    return (
      <Card title='No More Venues'>
        <Button
          title='Back To Map'
          large
          icon={{ name: 'my-location', color: 'white' }}
          buttonStyle={{ backgroundColor: '#2ecc71' }}
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    )
  }

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Swipe
          data={this.props.venues}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={venue => this.props.likeVenue(venue)}
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
  }
}

const mapStateToProps = ({ venue }) => ({
  venues: venue
})

export default connect(mapStateToProps, { likeVenue })(SwipeScreen)

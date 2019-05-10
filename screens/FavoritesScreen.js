import React, { Component } from 'react'
import { View, Text, Platform, ScrollView, Linking } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { MapView } from 'expo'

class LikesScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='favorite' size={30} color={tintColor} />
    }
  }

  renderLikedVenues() {
    return this.props.likes.map(like => {
      const { id, name, rating, categories, coordinates, url } = like
      const initialRegion = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
      
      return (
        <Card title={name} key={id}>
          <View style={{ height: 200 }}>
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
          </View>
        </Card>
      )
    })
  }

  render() {
    return (
      <ScrollView style={{marginTop: 20}}>
        {this.renderLikedVenues()}
      </ScrollView>
    )
  }
}

const styles = {
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
}

const mapStateToProps = ({ likes }) => ({
  likes
})

export default connect(mapStateToProps)(LikesScreen)

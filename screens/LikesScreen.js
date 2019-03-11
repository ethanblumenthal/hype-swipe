import React, { Component } from 'react'
import { View, Text, Platform, ScrollView, Linking, Icon } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { MapView } from 'expo'

class LikesScreen extends Component {
  static navigationOptions = {
    title: 'Likes',
    tabBarIcon: ({ tintColor }) => {
      // return <Icon name='favorite' size={30} color={tintColor} />
    }
  }

  renderLikedVenues() {
    return this.props.likes.map(venue => {
      const { name, date, url, longitude, latitude, title, id } = venue
      const initialRegion = {
        longitude,
        latitude,
        longitudeDelta: 0.02,
        latitudeDelta: 0.045
      }
      
      return (
        <Card title={title} key={id}>
          <View style={{ height: 200 }}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              initialRegion={initialRegion}
            ></MapView>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{name}</Text>
              <Text style={styles.italics}>{date}</Text>
            </View>
            <Button
              title='Apply Now!'
              backgroundColor='#03A9FA'
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      )
    })
  }

  render() {
    return (
      <ScrollView>
        {/* {this.renderLikedVenues()} */}
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

const mapStateToProps = state => ({
  likes: state.likes
})

export default connect(mapStateToProps)(LikesScreen)

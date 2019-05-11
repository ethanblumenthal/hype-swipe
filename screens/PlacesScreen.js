import React, { Component } from 'react'
import { View, Text, Linking, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Card, Image, Button, Icon, Rating } from 'react-native-elements'
import Swipe from '../components/Swipe'
import { createFavorite } from '../actions'

class PlacesScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='description' size={30} color={tintColor} />
    }
  }

  renderCard(item) {
    let { name, categories, rating, price, url, image_url } = item
    categories = categories.map(category => category.title).join(', ')

    if (!image_url) image_url = '??'
    if (!price) price = '??'

    return (
      <Card title={name}>
        <Text style={styles.categories}>{categories}</Text>
        <View style={{ alignContent: 'center' }}>
          <Image
            style={{ width: 350, height: 300 }}
            source={{ uri: image_url }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Rating
            imageSize={25}
            readonly
            startingValue={rating}
          />
          <Text style={styles.price}>{price}</Text>
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
    alignItems: 'center',
  },
  price: {
    fontSize: 25,
    marginTop: 5,
    marginBottom: 5
  },
  categories: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 12,
    marginBottom: 5
  }
}

const mapStateToProps = ({ places }) => ({
  places
})

export default connect(mapStateToProps, { createFavorite })(PlacesScreen)

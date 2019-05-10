import React, { Component } from 'react'
import { View, Text, Linking, ActivityIndicator, ScrollView } from 'react-native'
import { Card, Image, Button, Icon, Rating } from 'react-native-elements'
import { connect } from 'react-redux'

class FavoriteScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='favorite' size={30} color={tintColor} />
    }
  }

  renderFavorites() {
    return this.props.favorites.map(item => {
      let { id, name, categories, rating, price, url, image_url } = item
      categories = categories.map(category => category.title).join(', ')

      if (!image_url) image_url = '??'
      if (!price) price = '??'

      return (
        <Card key={id} title={name}>
          <Text style={styles.categories}>{categories}</Text>
          <View style={{ alignContent: 'center' }}>
            <Image
              style={{ width: 350, height: 200 }}
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
    })
  }

  render() {
    return (
      <ScrollView style={{ marginTop: 20 }}>
        {this.renderFavorites()}
      </ScrollView>
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
    fontSize: 10,
    marginBottom: 5
  }
}

const mapStateToProps = ({ favorites }) => ({
  favorites
})

export default connect(mapStateToProps)(FavoriteScreen)

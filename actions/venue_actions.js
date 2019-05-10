import axios from 'axios'
import qs from 'qs'
import keys from '../config/keys'

const YELP_API = 'https://api.yelp.com/v3/businesses/search?'
const QUERY_PARAMS = {
  limit: '10',
  radius: '500'
}

const buildApiUrl = (latitude, longitude) => {
  const query = qs.stringify({ ...QUERY_PARAMS, latitude, longitude })
  return `${YELP_API}${query}`
}

export const FETCH_VENUES = 'FETCH_VENUES'
export const LIKE_VENUE = 'LIKE_VENUE'
export const CLEAR_VENUES = 'CLEAR_VENUES'

export const fetchVenues = ({ latitude, longitude }, callback) => async dispatch => {
  try {
    const url = buildApiUrl(latitude, longitude)
    let { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${keys.yelpApiKey}`
      }
    })
    let venues = data.businesses
    dispatch({ type: FETCH_VENUES, venues })
    callback()
  } catch (err) {
    console.error(err)
  }
}

export const likeVenue = venue => ({
  type: LIKE_VENUE,
  venue
})

export const clearVenues = () => ({
  type: CLEAR_VENUES
})

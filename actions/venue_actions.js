import axios from 'axios'
import qs from 'qs'

const SQUARESPACE_API = 'https://api.foursquare.com/v2/venues/explore?'
const QUERY_PARAMS = {
  ll: '',
  client_id: '5IX4GSF1JNESHQJRKZ4BLMRHLNRJP4ZXRM0AR0QWKLTEWKWT',
  client_secret: 'NRLX55HNUBO4IJ02AIDIEQQKSGJU0LFKYEZEZXBK5CAWMWI5',
  v: '20190310',
  limit: '10',
  radius: '250'
}

const buildApiUrl = ll => {
  const query = qs.stringify({ ...QUERY_PARAMS, ll })
  return `${SQUARESPACE_API}${query}`
}

export const FETCH_VENUES = 'FETCH_VENUES'
export const LIKE_VENUE = 'LIKE_VENUE'
export const CLEAR_VENUES = 'CLEAR_VENUES'

export const fetchVenues = ({ latitude, longitude }, callback) => async dispatch => {
  try {
    const ll = `${latitude},${longitude}`
    const url = buildApiUrl(ll)
    let { data } = await axios.get(url)
    let venues = data.response.groups['items']
    console.log(venues)
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

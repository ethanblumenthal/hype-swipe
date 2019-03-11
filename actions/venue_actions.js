import axios from 'axios'
import qs from 'qs'

const SQUARESPACE_API = 'https://api.foursquare.com/v2/venues/explore?'
const QUERY_PARAMS = {
  ll: '',
  client_id: process.env.FOURSQUARE_CLIENT_ID,
  client_secret: process.env.FOURSQUARE_SECRET,
  v: '20190310'
}

const buildJobsUrl = zip => {
  const query = qs.stringify({ ...QUERY_PARAMS, ll })
  return `${SQUARESPACE_API}${query}`
}

const FETCH_VENUES = 'FETCH_VENUES'
const LIKE_VENUES = 'LIKED_VENUES'
const CLEAR_VENUES = 'CLEAR_VENUES'

export const fetchVenues = ({longitude, latitude}, callback) => async dispatch => {
  try {
    const ll = `${longitude},${latitude}`
    const url = buildJobsUrl(ll)
    console.log(url)
    let { data } = await axios.get(url)
    console.log(data)
    // dispatch({ type: FETCH_VENUES, venues: data })
    callback()
  } catch (err) {
    console.error(err)
  }
}

export const likeVenue = venue => ({
  type: LIKE_VENUES,
  venue
})

export const clearVenues = () => ({
  type: CLEAR_VENUES
})

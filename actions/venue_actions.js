import axios from 'axios'
import qs from 'qs'

const SQUARESPACE_API = 'https://api.foursquare.com/v2/venues/explore?'
const QUERY_PARAMS = {
  ll: '',
  client_id: process.env.FOURSQUARE_CLIENT_ID,
  client_secret: process.env.FOURSQUARE_SECRET,
  v: '20190310'
}

const buildJobsUrl = ll => {
  const query = qs.stringify({ ...QUERY_PARAMS, ll })
  return `${SQUARESPACE_API}${query}`
}

export const FETCH_VENUES = 'FETCH_VENUES'
export const LIKE_VENUE = 'LIKE_VENUE'
export const CLEAR_VENUES = 'CLEAR_VENUES'

export const fetchVenues = ({longitude, latitude}, callback) => async dispatch => {
  try {
    const ll = `${latitude},${longitude}`
    const url = buildJobsUrl(ll)
    console.log(url)
    // let { data } = await axios.get(url)
    // console.log(data)
    // dispatch({ type: FETCH_VENUES, venues: data })
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

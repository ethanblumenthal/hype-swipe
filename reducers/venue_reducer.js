import _ from 'lodash'
import { PERSIST_REHYDRATE } from 'redux-persist/lib/constants'
import { FETCH_VENUES, LIKE_VENUE, CLEAR_VENUES } from '../actions/venue_actions'

export default (state = [], action) => {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.likes || []
    case FETCH_VENUES:
      return action.venues
    // case LIKE_VENUE: 
    //   return _.uniqBy([action.venue, ...state], 'id')
    case CLEAR_VENUES:
      return []
    default:
      return state
  }
}

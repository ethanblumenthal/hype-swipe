import { PERSIST_REHYDRATE } from 'redux-persist/lib/constants'
import { LIKE_VENUE, CLEAR_VENUES } from '../actions'
import _ from 'lodash'

export default function(state = [], action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.likes || []
    case LIKE_VENUE: 
      return _.uniqBy([action.venue, ...state], 'id')
    case CLEAR_VENUES:
      return []
    default:
      return state
  }
}

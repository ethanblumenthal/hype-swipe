import { PERSIST_REHYDRATE } from 'redux-persist/lib/constants'
import { CREATE_FAVORITE, DELETE_FAVORITES } from '../actions'
import _ from 'lodash'

export default function(state = [], action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.FAVORITEs || []
    case CREATE_FAVORITE: 
      return _.uniqBy([action.favorite, ...state], 'id')
    case DELETE_FAVORITES:
      return []
    default:
      return state
  }
}

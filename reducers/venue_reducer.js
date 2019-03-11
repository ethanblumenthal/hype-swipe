import { FETCH_VENUES } from '../actions'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_VENUES:
      return action.venues
    default:
      return state
  }
}

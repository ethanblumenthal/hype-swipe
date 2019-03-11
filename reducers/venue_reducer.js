import { FETCH_VENUES } from '../actions'

const INITIAL_STATE = {
  items: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_VENUES:
      return action.venues
    default:
      return state
  }
}

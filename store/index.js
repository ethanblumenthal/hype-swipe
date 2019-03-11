import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['likes']
 }

const reducer = persistCombineReducers(config, reducers)

export default function configurationStore(initialState = {}) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
  )
  const persistor = persistStore(store)
  return { persistor, store }
}

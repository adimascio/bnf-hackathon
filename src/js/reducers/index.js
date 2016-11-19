//If there is more in the state, we should use `enhanceReducer`
import { enhanceReducer } from '../sparql/configure-sparql'
import { combineReducers } from 'redux'
import gallica from './gallica'

const mainReducer = combineReducers({
  gallica
})
export default enhanceReducer(mainReducer)


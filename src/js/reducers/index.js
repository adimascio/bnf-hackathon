//If there is more in the state, we should use `enhanceReducer`
import { enhanceReducer } from '../sparql/configure-sparql'
import { combineReducers } from 'redux'
import gallica from './gallica'
import tei from './tei'

const mainReducer = combineReducers({
  gallica,
  tei
})
export default enhanceReducer(mainReducer)



import {
  LOAD_GALLICA, LOAD_GALLICA_SUCCESS, LOAD_GALLICA_FAILURE
} from '../actions/gallica'

import { LOADING, LOADED, FAILED } from '../constants'

export default (state={}, action) => {
  const { type, payload } = action
  switch (type) {
    case LOAD_GALLICA:
      return {
        ...state,
        [payload.url]: {
          status: LOADING
        }
      }
    case LOAD_GALLICA_SUCCESS:
      return {
        ...state,
        [payload.url]: {
          status: LOADED,
          metaInfo: payload.metaInfo
        }
      }
    case LOAD_GALLICA_FAILURE:
      return {
        ...state,
        [payload.url]: {
          status: FAILED
        }
      }
  }
  return state
}
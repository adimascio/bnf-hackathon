
import {
  LOAD_TEI, LOAD_TEI_SUCCESS, LOAD_TEI_FAILURE
} from '../actions/tei'

import { LOADING, LOADED, FAILED } from '../constants'

export default (state={}, action) => {
  const { type, payload } = action
  switch (type) {
    case LOAD_TEI:
      return {
        ...state,
        [payload.corpusId]: {
          status: LOADING
        }
      }
    case LOAD_TEI_SUCCESS:
      return {
        ...state,
        [payload.corpusId]: {
          status: LOADED,
          data: payload.data
        }
      }
    case LOAD_TEI_FAILURE:
      return {
        ...state,
        [payload.corpusId]: {
          status: FAILED
        }
      }
  }
  return state
}
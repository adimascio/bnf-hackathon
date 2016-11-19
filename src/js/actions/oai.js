import { getOAIInfo } from '../remote/oai'

export const OAI = 'OAI'
export const OAI_SUCCESS = 'OAI_SUCCESS'
export const OAI_FAILURE = 'OAI'

export const loadOAI = url => 
  dispatch => {
    dispatch({
      type: OAI,
      payload: {
        url
      }
    })
    return getOAIInfo(url)
      .then(metaInfo => dispatch(loadOAISuccess(url, metaInfo)))
      .catch(err => loadOAIFailure(url, err))
  }
  
export const loadOAISuccess = (url, metaInfo) => ({
  type: OAI_SUCCESS,
  payload: {
    url,
    metaInfo
  }
})

export const loadOAIFailure = (url, err) => ({
  type: OAI_FAILURE,
  paylaod: {
    url,
    err
  }
})
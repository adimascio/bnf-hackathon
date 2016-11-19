import { getGallicaInfo } from '../remote/gallica'

export const LOAD_GALLICA = 'LOAD_GALLICA'
export const LOAD_GALLICA_SUCCESS = 'LOAD_GALLICA_SUCCESS'
export const LOAD_GALLICA_FAILURE = 'LOAD_GALLICA'

export const loadGallica = url => 
  dispatch => {
    dispatch({
      type: LOAD_GALLICA,
      payload: {
        url
      }
    })
    return getGallicaInfo(url)
      .then(metaInfo => dispatch(loadGallicaSuccess(url, metaInfo)))
      .catch(err => loadGallicaFailure(url, err))
  }
  
export const loadGallicaSuccess = (url, metaInfo) => ({
  type: LOAD_GALLICA_SUCCESS,
  payload: {
    url,
    metaInfo
  }
})

export const loadGallicaFailure = (url, err) => ({
  type: LOAD_GALLICA_FAILURE,
  paylaod: {
    url,
    err
  }
})
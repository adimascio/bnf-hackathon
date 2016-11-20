import { getTEIFile } from '../remote/redden' 
 
export const LOAD_TEI = 'LOAD_TEI' 
export const LOAD_TEI_SUCCESS = 'LOAD_TEI_SUCCESS' 
export const LOAD_TEI_FAILURE = 'LOAD_TEI' 
 
export const loadTEI = corpusId =>  
  dispatch => { 
    dispatch({ 
      type: LOAD_TEI, 
      payload: { 
        corpusId 
      } 
    }) 
    return getTEIFile(corpusId) 
      .then(data => dispatch(loadTEISuccess(corpusId, data))) 
      .catch(err => loadTEIFailure(corpusId, err)) 
  } 
   
export const loadTEISuccess = (corpusId, data) => ({ 
  type: LOAD_TEI_SUCCESS, 
  payload: { 
    corpusId, 
    data 
  } 
}) 
 
export const loadTEIFailure = (corpusId, err) => ({ 
  type: LOAD_TEI_FAILURE, 
  paylaod: { 
    corpusId, 
    err 
  } 
})
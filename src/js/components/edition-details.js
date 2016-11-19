import React from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import GallicaDetails from './gallica-details'
import { LOADED } from 'sparql-connect'

//edition with gallica reference: 12148/cb35001280b
function EditionDetails({ loaded, edition, gallicaRef }) {
  if (loaded !== LOADED) return <span>loading...</span>
  return (
    <div>
      edition details: { edition } <br/>
      gallica: <a href={gallicaRef}>{gallicaRef}</a>
      <GallicaDetails url={gallicaRef}/>
    </div>
  )
}

export default connectFromRoute(
  sparqlConnect.editionDetails(EditionDetails)
)
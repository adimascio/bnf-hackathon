import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import {
  List, ListItem, ListSubHeader, ListDivider, ListCheckbox
} from 'react-toolbox/lib/list'

function AuthorItem({ 
    author, name,
    dateOfBirth, dateOfDeath,
    placeOfBirth, placeOfDeath,
    thumbnail, count }) {
  
  const yearOfBirth = dateOfBirth.match(/(\d{4})\/$/).pop()
  const yearOfDeath = dateOfDeath.match(/(\d{4})\/$/).pop()
  const legend = `${yearOfBirth} (${placeOfBirth}) - ${yearOfDeath} (${placeOfDeath})`
  return (
    <ListItem
      key={author}
      avatar={thumbnail}
      caption={`${name} (${count})`}
      legend={legend} />
  )
}

export default sparqlConnect.authorDetails(AuthorItem)
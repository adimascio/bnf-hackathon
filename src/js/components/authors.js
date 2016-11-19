import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { Link } from 'react-router'
import { uriToLink } from '../routes'
import { LOADED } from 'sparql-connect'
import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import {
  List, ListItem, ListSubHeader, ListDivider, ListCheckbox
} from 'react-toolbox/lib/list'

function Authors({ loaded, authors }) {
  if (loaded !== LOADED) return <span>authors are loading</span>
  return (
    <section style={{ padding: 40 }}>
      <List selectable ripple>
        <ListSubHeader caption="Explore authors" />
        { authors.map(({ author, name, placeOfBirth, thumbnail }) =>
        <ListItem key={author}
          avatar={thumbnail}
          rightIcon="star"
          caption={name}
          legend={placeOfBirth} />
      )}
    </List>
    </section>
  )
}

export default sparqlConnect.authors(Authors)
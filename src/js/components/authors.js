import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { Link } from 'react-router'
import { uriToLink } from '../routes'
import { LOADED } from 'sparql-connect'
import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import {
  List, ListItem, ListSubHeader, ListDivider, ListCheckbox
} from 'react-toolbox/lib/list'
import AuthorItem from './author-item'

function Authors({ authors }) {
  return (
    <section style={{ padding: 40 }}>
      <List selectable ripple>
        <ListSubHeader caption="Explore authors" />
        { authors.map(({ count, uri }) => 
            <AuthorItem author={uri} count={count} />) }
    </List>
    </section>
  )
}

export default Authors
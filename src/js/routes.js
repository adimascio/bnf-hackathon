import { buildRouterMapping } from './utils/router-mapping'

/*
In order to show nice URLs, we can define some mappgins between route paremeters
and unique identifiers (most of the time URI).
*/

const bnfPrefix = 'http://data.bnf.fr/ark:/'

const routes = {
  editionDetails: {
    pattern: 'edition/:authority/:name',
    paramsToProps: (state, { authority, name }) => ({
      edition: `http://data.bnf.fr/ark:/${authority}/${name}`
    }),
    uriToLink: uri => {
      //const [_, authority, name] = ['', 'authority', 'name']
      return `/edition/${authority}/${name}`
    }
  }
}

export const {
  connectFromRoute,
  uriToLink,
  path,
  paramsToProps
} = buildRouterMapping(routes)
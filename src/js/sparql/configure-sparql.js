import queries from './documented-queries'
import { buildSparqlConnector } from 'sparql-connect'
import config from '../config'
import buildFetch from '../utils/virtuoso-remote-call'


const queryURL = config.queryURL

export const {
  sparqlConnect,
  enhanceReducer
} = buildSparqlConnector(queries, buildFetch(queryURL), 'bnf')

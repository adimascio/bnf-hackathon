import queries from './documented-queries'
import { buildSparqlConnector } from 'sparql-connect'
import credentials from '../credentials'
import config from '../config'
import buildFetch from '../utils/virtuoso-remote-call'

//We need a `fetchQuery` function that will send queries to the server and
//return the results.
const queryURL = config.queryURL
const fetchQuery = buildFetch(queryURL)

export const {
  sparqlConnect,
  mainReducer
} = buildSparqlConnector(queries, fetchQuery)

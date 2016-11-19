import fetch from 'isomorphic-fetch'

const bodyFromSparql = query =>
  encodeURIComponent('query') + '=' +
  encodeURIComponent(query)

const fetchWithPost = queryURL => query =>
  fetch(queryURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/sparql-results+json',
      // We need to pass some `x-www-form-urlencoded` data. `multipart/form-data`
      // created with `new FormData()` does not work.
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: bodyFromSparql(query)
  })
  .then(res => res.json())

// We can also use a 'GET' verb if the query is not too long
const fetchWithGet = queryURL => query =>
  fetch(queryURL + '?' + bodyFromSparql(query), {
    method: 'GET',
    headers: {
      'Accept': 'application/sparql-results+json',
    },
  })
  .then(res => res.json())
  
  //TODO investigate why `fetchWithPost` returns a CORS error with the bnf
  //sparql endpoint
  export default fetchWithGet
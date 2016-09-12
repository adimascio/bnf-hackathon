# sparql-starter-kit

A minimal project to provide setup for future sparql clients developed for the Implementing ModernStats Standards project. This kit might be well suited for projects where navigating through sparql queries results is an important part of the application logic.

## Install

`git clone https://github.com/noknot/sparql-starter-kit.git`
`npm install`
`npm run dev`

Open a browser and navigate to http://localhost:8080/

## Introduction

The user interface is mainly made of `react` components that are populated with the results of `sparql` queries.

In order to bind the components to the queries, we use the library `sparql-connect` on top of `redux` and `react-redux`. This library:
- creates reducers to store the sparql queries status and results;
- creates actions to send queries to the server and inform the store when the results are received;
- populates the components with the results.

More information about it: [sparql-connect](https://github.com/noknot/sparql-connect)

## Application state and router

 If the application state consists only of the results of the queries (and some information about the ui that can be handled by routing, see below), this reducer can be created directly with `buildSparqlConnector`. If the state is more complex, this utility function returns `enhanceReducer` that allows to add sparql query handling to an existing reducer.
 
This kit uses `react-router` to provide routing. Since the application is mainly intended at navigating through the results of sparql queries, route parameters will be most of the time URIs. To avoid embedding URIs directly into the browser navigation bar (for the sake of readability) some mappings can be defined in `routes`. `buildRouterMapping` will be called on the route mappings to provide utility functions:
- to use a component within a route by extracting params from the URL, with `connectFromRoute`;
- to extract resources identifiers from route params, with `paramsToProps`;
- to build the `to` property for `react-router` `Link` components;
- to export the paths to use for `react-router` routes creation.

## Add a component connected to a sparql query

### Add a new query builder

A query builder is a `function` which takes zero, one or multiple arguments and returns a string representing the query to send to the server. For instance, in  `src/js/sparql/queries.js`:

```javascript
const levelItems = level => `
const classificationDetails = uri => `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label WHERE {
    <${uri}> skos:prefLabel ?label
  }
`
`
(...)
export default {
  ...,
  levelItems
}
```
### Document this query

In `src/js/sparql/documented-queries`:

```javascript
export default {
  ...
  levelItems: {
    descr: 'Retrieve items with their details (code and label) for a given level',
    params: [{
      name: 'level',
      descr: 'level (uri)'
    }],
    whatWeGet: 'items',
    results: {
      item: 'item (uri)', 
      code: 'code of the item (string)',
      label: 'label of the item (string)'
    },
    queryBuilder: levelItems
  }
```

### Build a component to visualize the query results

```javascript
function Items({ loaded, items }) {
  if (loaded !== LOADED) return <span>loading items</span>
  return (
    <ul>
      { items.map(({ item, code, label}) => 
        <li key={item}>{item}</li>) }
    </ul>
  )
}
```

### Connect this component to the sparql query:
```javascript
import { sparqlConnect } from '../sparql/configure-sparql'
(...)
//we use the name of the
export default sparqlConnect.levelItems(Items)
```


### Extract component props from the route

To make this component work as a main component for a route, you can expend the previous `export` to:

```javascript
import { connectFromRoute } from '../routes'

export default connectFromRoute(
  sparqlConnect.levelItems(Items)))
```

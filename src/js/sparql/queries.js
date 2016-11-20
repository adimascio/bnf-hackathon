/**
 * Builds the query that retrieve the list of all authors.
 */
const authors = () => `
  PREFIX bio: <http://vocab.org/bio/0.1/>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  PREFIX rdgroup2elements: <http://rdvocab.info/ElementsGr2/>
  
  # SELECT DISTINCT ?author ?name ?placeOfBirth ?placeOfDeath sample(?thumbnail) as ?thumbnail
  SELECT DISTINCT ?author ?name ?placeOfBirth ?placeOfDeath ?thumbnail
  WHERE {
    ?author
      foaf:name ?name ;
      rdagroup2elements:dateOfBirth ?jour ;
      rdagroup2elements:placeOfBirth ?placeOfBirth ;
      rdagroup2elements:placeOfDeath ?placeOfDeath ;
      foaf:depiction ?thumbnail .
    ?name bif:contains '"hugo"'
    FILTER (regex(str(?thumbnail), "wikimedia.org.*width"))
  }
  # GROUP BY ?author ?name ?placeOfBirth ?placeOfDeath
  LIMIT 10
 `
 
/** 
 * Builds the query that retrieve an author details 
 */ 
const authorDetails = author => ` 
  PREFIX bio: <http://vocab.org/bio/0.1/> 
  PREFIX foaf: <http://xmlns.com/foaf/0.1/> 
  PREFIX rdgroup2elements: <http://rdvocab.info/ElementsGr2/> 
   
  SELECT ?name ?placeOfBirth ?placeOfDeath ?dateOfBirth ?dateOfDeath ?thumbnail 
  WHERE { 
    <${author}> 
      foaf:name ?name ; 
      rdagroup2elements:dateOfBirth ?dateOfBirth ; 
      rdagroup2elements:dateOfDeath ?dateOfDeath ; 
      rdagroup2elements:placeOfBirth ?placeOfBirth ; 
      rdagroup2elements:placeOfDeath ?placeOfDeath ; 
      foaf:depiction ?thumbnail . 
      FILTER (regex(str(?thumbnail), "wikimedia.org.*width"))
  } 
  LIMIT 1
 ` 
   
//edition: http://data.bnf.fr/ark:/12148/cb35768505j
//gallicaRef: http://gallica.bnf.fr/ark:/12148/bpt6k1647421
const editionDetails = edition => `
PREFIX rdarelationships: <http://rdvocab.info/RDARelationshipsWEMI/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX bnf-onto: <http://data.bnf.fr/ontology/bnf-onto/>
PREFIX rdarelationships: <http://rdvocab.info/RDARelationshipsWEMI/>

select ?title ?date ?description ?publisher ?isbn ?gallicaRef {
	<${edition}>
      dcterms:title ?title ;
      dcterms:date ?date ;
      dcterms:description ?description ;
      dcterms:publisher ?publisher ;
      bnf-onto:isbn ?isbn
      OPTIONAL {
        <${edition}> rdarelationships:electronicReproduction ?gallicaRef
      }
}
`
//Retrieve references to:
//bnf general catalog: http://catalogue.bnf.fr/ark:/12148/cb30011903b
//bnf archives: ???
//I choose to load all the relationships and process them on the client
//I think that the URI pattern that will help us to decide between these two
//options
const editionOtherReferences = edition => `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?ref {
  <${edition}> rdfs:seeAlso ?ref
}
`
 
export default {
  authors,
  authorDetails,
  editionDetails,
  editionOtherReferences
}
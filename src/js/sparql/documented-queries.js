import queries from './queries'

const {
  authors,
  editionDetails,
  authorDetails
} = queries

export default {
  authors: {
    descr: 'Retrieve a list of authors',
    whatWeGet: 'authors',
    params: [],
    results: {
      author: 'author (uri)',
      name: 'name of the author',
      dateOfBirth: 'date of birth',
      dateOfDeath: 'date of death',
      placeOfBirth: 'author place of birth',
      placeOfDeath: 'author place of death',
      thumbnail: 'url of thumbnail'
    },
    queryBuilder: authors
  },
  authorDetails: { 
  descr: 'Retrieve details for an author', 
  singleResult: true, 
  params: [{ 
    name: 'author' 
  }], 
  results: { 
    name: 'name of the author', 
    dateOfBirth: 'date of birth',
    dateOfDeath: 'date of death',
    placeOfBirth: 'author place of birth', 
    placeOfDeath: 'author place of death', 
    thumbnail: 'url of thumbnail' 
  }, 
  queryBuilder: authorDetails 
}, 
  editionDetails: {
    descr: 'details about an edition (manifestation)',
    singleResult: true,
    params: [{
      name: 'edition',
      descr: 'edition'
    }],
    results: {
      title: 'dcterms:title',
      date: 'dcterms:date',
      description: 'dcterms:description',
      publisher: 'dcterms:publisher',
      isbn: 'bnf-onto:isbn',
      gallicaRef: 'link to gallica web page (optional)'
    },
    queryBuilder: editionDetails
  }
}


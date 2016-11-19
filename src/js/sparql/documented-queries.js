import queries from './queries'

const {
  authors,
  editionDetails
} = queries

export default {
  authors: {
    descr: 'Retrieve a list of authors',
    whatWeGet: 'authors',
    params: [],
    results: {
      author: 'author (uri)',
      name: 'name of the author',
      placeOfBirth: 'author place of birth',
      placeOfDeath: 'author place of death',
      thumbnail: 'url of thumbnail'
    },
    queryBuilder: authors
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


import fetch from 'isomorphic-fetch'

const parser = new DOMParser()

// const extractMeta = (_, meta) => {
// 	const content = meta.getAttribute('content')
// 	if (!content) return _
// 	let name = meta.getAttribute('name')
// 	if (!name) name = meta.getAttribute('property')
// 	//TODO meta info may have multiple values and should be stored as an array
//   if (name !== undefined) _[name] = content
// 	return _
// }


function refinedPeople(persRefs) {
  //keep only URI like 'http://data.bnf.fr'
  const people = persRefs.map(({ value, uris }) => {
    return {
      value,
      uri: uris.reduce((_, u) => _ || (u.startsWith('http://data.bnf.fr') && u), null)
    }
  })
  const peopleDict = people.reduce((_, { value, uri }) => {
    //no valid uri for this person
    if (!uri) return _
    if (!_[uri]) _[uri] = {
      uri,
      value,
      count: 1
    }
    else {
      const person = _[uri]
      ++person.count
    } 
    return _   
  }, {})
  
  return Object.keys(peopleDict)
    .map(uri => peopleDict[uri])
    .sort((p1, p2) => p1.count < p2.count ? 1 : p1.count === p2.count ? 0 : -1)
    .slice(0, 10)
}

//http://localhost:9000/tei-sample.xml
//const fakeURL = 'http://localhost:3000/tei/corpus_1.xml'

export const getTEIFile = corpusId =>
  fetch(`http://localhost:3000/tei/tei-${corpusId}.xml`)
  	.then(res => res.text())
  	.then(text => parser.parseFromString(text, 'text/html'))
		.then(doc => {
      const body = document.querySelector('body').textContent
      const persRefs = [].reduce.call(
        doc.querySelectorAll('persName'),
        (_, el) => {
          const refAttr = el.getAttribute('ref_auto')
          if (!refAttr) return _
          _.push({
            uris: refAttr.split(' '),
            value: el.textContent
          })
          return _
        }, [])
      const placeRefs = [].reduce.call(
        doc.querySelectorAll('placeName'),
        (_, el) => {
          const refAttr = el.getAttribute('ref')
          if (!refAttr) return _
          _.push({
            uris: refAttr.split(' '),
            value: el.textContent
          })
          return _
        }, [])        
      return {
        body,
        persRefs,
        placeRefs,
        people: refinedPeople(persRefs)
      }
    })
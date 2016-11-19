import fetch from 'isomorphic-fetch'

const parser = new DOMParser()

const extractMeta = (_, meta) => {
	const content = meta.getAttribute('content')
	if (!content) return _
	let name = meta.getAttribute('name')
	if (!name) name = meta.getAttribute('property')
	//TODO meta info may have multiple values and should be stored as an array
  if (name !== undefined) _[name] = content
	return _
}
//http://localhost:3000/gallica/ark:/12148/btv1b55005208r
export const getGallicaInfo = url => {
	
	const urlHack = url.replace(
		'http://gallica.bnf.fr/',
		'http://localhost:3000/gallica/')
  return fetch(urlHack)
  	.then(res => res.text())
  	.then(text => parser.parseFromString(text, 'text/html'))
  	.then(doc => doc.getElementsByTagName('meta'))
  	.then(arr => [].reduce.call(arr, extractMeta, {}))

}

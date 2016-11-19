import fetch from 'isomorphic-fetch'
import { parseString } from 'xml2js'

const parseStringPromise = text =>
	new Promise((accept, reject) => {
		parseString(text, (err, result) => err ? reject(err) : accept(result))
	})
	
//http://localhost:3000/oai2/OAIHandler?verb=GetRecord&metadataPrefix=oai_dc&identifier=oai:bnf.fr:catalogue/ark:/12148/cb41026403m
export const getOaiInfo = url =>
	fetch(url)
	  .then(res => res.text())
	  .then(text => parseStringPromise(text))
	  .then(json => console.log(json))
	
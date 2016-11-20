var express = require('express');
var proxy = require('http-proxy-middleware');
 
var app = express();

var optionsGallica = {
  target: 'http://gallica.bnf.fr', //'http://localhost:9000'
  //pathRewrite: (path, req) => 'gallica.html', 
  pathRewrite: (path, req) => path.replace('gallica/', ''),
  changeOrigin: true,
  onProxyRes: res => res.headers['Access-Control-Allow-Origin'] = '*'
}

var optionsOAI = {
  target: 'http://catoai.bnf.fr', //'http://localhost:9000',
  //pathRewrite: () => 'oai.xml',
  changeOrigin: true,
  onProxyRes: res => res.headers['Access-Control-Allow-Origin'] = '*'
}

var optionsTEI = {
  target: 'http://localhost:9000',
  //pathRewrite: () => 'oai.xml',
  changeOrigin: true,
  onProxyRes: res => res.headers['Access-Control-Allow-Origin'] = '*'
}

app.use('/gallica', proxy(optionsGallica))
app.use('/oai', proxy(optionsOAI))
app.use('/tei', proxy(optionsTEI))

app.listen(3000);
 

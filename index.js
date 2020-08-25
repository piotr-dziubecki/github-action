const GhostAdminAPI = require('@tryghost/admin-api');
const showdown  = require('showdown');
const fetch = require("node-fetch");

const converter = new showdown.Converter()
let htmlValue = null

// Configure the client
const api = new GhostAdminAPI({
  url: 'http://localhost:2368',
  // Admin API key goes here
  key: '5f3e801b7d2ab73c67113ec2:f9a4c5835daacfb432ce34c62efd5baec5d009819c2d5badc5ab3962715fb5f4',
  version: 'v2'
});

fetch('https://github.com/self-coding-crab/codesandbox-onmessage/blob/master/README.md') 
    .then(response => response.text())
    .then(result => {
      console.log('result', result)
      api.posts.add({
        title: 'Hello world', 
        html: result
      }, {source: 'html'})
      // .then(response => console.log(response))
      // .catch(error => console.error(error))
    });

console.log(htmlValue)
// Make an authenticated request

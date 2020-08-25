const GhostAdminAPI = require('@tryghost/admin-api');
const showdown  = require('showdown');
const fetch = require("node-fetch");
const core = require("@actions/core")
const github = require("@actions/github")

const converter = new showdown.Converter()
let htmlValue = null

// console.log(htmlValue)
// // Make an authenticated request

try {
  const api = new GhostAdminAPI({
    url: 'http://localhost:2368',
    // Admin API key goes here
    key: '5f3e801b7d2ab73c67113ec2:f9a4c5835daacfb432ce34c62efd5baec5d009819c2d5badc5ab3962715fb5f4',
    version: 'v2'
  });

  fetch(github.context.payload.pull_request.url+'/files')
    .then(response => response.json())
    .then(files => {
      files.map(file => {
        // Configure the client
        fetch(file.raw_url) 
            .then(response => response.text())
            .then(result => {
              console.log('result', result)
              api.posts.add({
                title: 'Hello world', 
                html: converter.makeHtml(result)
              }, {source: 'html'})
              // .then(response => console.log(response))
              // .catch(error => console.error(error))
            });
      })
    })
} catch (err) {
  console.error(err);
  process.exit(1);
}
// - name: get list of files in PR
// if: github.event.pull_request.merged
// run: |
//     URL="https://api.github.com/repos/${{ github.repository }}/pulls/${{ github.event.pull_request.number }}/files"
//     FILES=$(curl -s -X GET -G $URL | jq -r '.[] | .filename')
//     if echo $FILES | grep -q ".json"; then
//       echo "json file changed!!"
//     else
//       echo "no json file changed!!"
//     fi
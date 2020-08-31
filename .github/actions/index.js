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
    url: 'https://blog-pr.casperlabs.io',
    // Admin API key goes here
    key: '5f492151f94320000142e86f:3a504ff9996824e0e5311113afe686541380e20290b9b4acad61f1de7403a771',
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
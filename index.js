const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const yelp = require('yelp-fusion');
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.REACT_APP_API_KEY;
const client = yelp.client(apiKey);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/world', (req, res) => {
	client.search({
  "term":`${req.body.post}`,
  "location" : "new york, ny"
}).then(response => {
  const result = response.jsonBody.businesses;
  res.send(result);
	}).catch(e => {
	  console.log(e);
	});
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
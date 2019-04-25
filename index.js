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

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/search', (req, res) => {
	client.search({
  "term":`${req.body.post[0]}`,
  "location" : `${req.body.post[1]}`
}).then(response => {
  const result = response.jsonBody.businesses;
  res.send(result);
	}).catch(e => {
	  console.log(e);
	});
});

app.post('/api/detail', (req, res) => {
	client.business(`${req.body.post}`)
	.then(response => {
	  console.log(response.jsonBody);
	  const result = response.jsonBody;
	  res.send(result);
	}).catch(e => {
	  console.log(e);
	});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);
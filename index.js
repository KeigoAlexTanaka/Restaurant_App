const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const yelp = require('yelp-fusion');
// const dotenv = require('dotenv');
// dotenv.config();
const apiKey = 'E8q8hY5_3_HPDf76AUSIpb_uIRB7wz4r_SQ8k56Qm4F6I9azKt1e7pxOScJB9_Y9ymO02V9Vajq8SuX30PCehg5cq6zbLvwebHqSq2NASlWHGskH7HziYKYn2hy_XHYx';
const client = yelp.client(apiKey);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

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

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/public/index.html'));
// });
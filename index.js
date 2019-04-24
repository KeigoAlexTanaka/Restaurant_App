// major thanks to freecodecamp for their express tutorial:
// https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const yelp = require('yelp-fusion');
// const apiKey = process.env.REACT_APP_API_KEY;
const apiKey = 'E8q8hY5_3_HPDf76AUSIpb_uIRB7wz4r_SQ8k56Qm4F6I9azKt1e7pxOScJB9_Y9ymO02V9Vajq8SuX30PCehg5cq6zbLvwebHqSq2NASlWHGskH7HziYKYn2hy_XHYx';
const client = yelp.client(apiKey);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
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
	
app.listen(port, () => console.log(`Listening on port ${port}`));


// {
// "id": "OFfZUS-nu6NDnsWe1B2bUQ",
// "alias": "tonchin-new-york-new-york",
// "name": "TONCHIN NEW YORK",
// "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/EA5igkg5gxqHxDcM4YA6hA/o.jpg",
// "is_closed": false,
// "url": "https://www.yelp.com/biz/tonchin-new-york-new-york?adjust_creative=4cdDosm0y1uIUc9jQcTEbQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=4cdDosm0y1uIUc9jQcTEbQ",
// "review_count": 732,
// "categories": [
//   {
//     "alias": "ramen", "title": "Ramen"
//   },
//   {
//     "alias": "izakaya", "title": "Izakaya"
//   }
// ],
// "rating": 4.5,
// "coordinates": {
//   "latitude": 40.7502727,
//   "longitude": -73.9844951
// },
// "transactions": [
//   "restaurant_reservation"
// ],
// "price": "$$",
// "location": {
//   "address1": "13 W 36th St",
//   "address2": null,
//   "address3": "",
//   "city": "New York",
//   "zip_code": "10018",
//   "country": "US",
//   "state": "NY",
//   "display_address": [
//     "13 W 36th St", "New York, NY 10018"
//     ]
//   },
// "phone": "+16466929912",
// "display_phone": "(646) 692-9912",
// "distance": 5052.538311265594
// }
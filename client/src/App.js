// test
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { createBrowserHistory } from 'history';
import history from './history.js'
// import Template from './components/Template/';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    	search:undefined,
    	location:undefined,
    	searchQuery:undefined,
    	locationQuery:undefined,
    	restaurants:undefined,
    	current:undefined,
    	index:undefined,
    	state:undefined,
    	response: '',
	    post: '',
	    responseToPost:{}
    };
  }

	onChange=(e)=>{
		this.setState({
		 [e.target.name]: e.target.value
		});
	};

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.json();
    this.setState({ restaurants: body },()=>history.replace(`/search/${this.state.post}`));
	};

  convertToMiles(n){
    return (n*0.000621371).toFixed(2);
  }

  renderResults(){
   if(this.state.restaurants){return this.state.restaurants.map((res,index)=>{return <button data-id={index} onClick={(e)=>{e.preventDefault();e.stopPropagation();console.log(e.currentTarget.dataset['id']);this.setState({index:e.currentTarget.dataset['id']})}}><Link to={`/detail/${res.alias}`}>
       <div className="search">
         <img src={res.image_url ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKZ3Fo6lvvr9t9hi1hs_dG6MnQRmaNh5qO-jdPeWAj8eiGW6mO"} height='300' width='300'/>
         <p>{res.name}</p>
         <p>Rating: {res.rating}</p>
         <p>Price: {res.price}</p>
         <p>{res.location.display_address[0]}</p>
         <p>{res.location.display_address[1]}</p>
         <p>distance: {this.convertToMiles(res.distance)} miles</p>
       </div>
     </Link>
     </button>
   })}
  }

  renderDetails(){
 if(this.state.index){
   let res=this.state.restaurants[this.state.index];
   return <div className="details">
         <img src={res.image_url ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKZ3Fo6lvvr9t9hi1hs_dG6MnQRmaNh5qO-jdPeWAj8eiGW6mO"} width='300'/>
         <p>ID: {res.id}</p>
         <p>Alias: {res.alias}</p>
         <p>Name: {res.name}</p>
         <p>is_closed: {res.is_closed}</p>
         <p>url: {res.url}</p>
         <p>review_count: {res.review_count}</p>
         <p>rating: {res.rating}</p>
         <p>coordinates.latitude: {res.coordinates.latitude}</p>
         <p>coordinates.longitude: {res.coordinates.longitude}</p>
         <p>price: {res.price}</p>
         <p>{res.location.display_address[0]}</p>
         <p>{res.location.display_address[1]}</p>
         <p>phone: {res.phone}</p>
         <p>display_phone: {res.display_phone}</p>
         <p>distance: {res.distance}</p>
         <button onClick={e=>{e.stopPropagation();e.preventDefault()}}>Call</button>
         </div>
   }
  }

  render() {
  	let home=
	  	<div>
        <div className="home">
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Yɘlp</strong>
          </p>
          <input
            className="is-size-1"
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button className="button is-danger is-large" type="submit">
            Search
          </button>
        </form>
        </div>
        <p>This app is powered by <a href="https://www.yelp.com/fusion">Yelp Fusion API</a></p>
	    </div>
      console.log(this.state.restaurants);
    return (
      <div className="App">
	      <Route exact path="/" render={()=>home}/>
		    <Route path="/search" render={()=>
          <div>
            <nav>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/detail">Detail</Link></li>
            </nav>
            <h1>Showing results for {this.state.post}</h1>
            {this.renderResults()}
          </div>}/>
		    <Route path="/detail" render={()=><div>{this.renderDetails()}</div>}/>
      </div>
    );
  }
}

export default App;

// <nav>
// <li><Link to="/">Home</Link></li>
// <li><Link to="/search">Search</Link></li>
// <li><Link to="/detail">Detail</Link></li>
// </nav>


// 	fetchAPI(){
// 		// const url = "https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318";
// 		const url = `https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=${this.state.searchQuery}`;
// 		const API_KEY=process.env.REACT_APP_API_KEY;
// 		const config = { headers: {'user-key': API_KEY} };
// 		axios.get(url,config)
// 	  .then(data=>{
// 	  	let restaurants=data.data.restaurants.map(res=>res.restaurant);
// 	  	this.setState({restaurants},()=>console.log(this.state.restaurants));
// 	  })
//   }

//   renderResults(){
//   	if(this.state.restaurants){return this.state.restaurants.map((res,index)=>{return <button data-id={index} onClick={(e)=>{e.preventDefault();e.stopPropagation();console.log(e.currentTarget.dataset['id']);this.setState({index:e.currentTarget.dataset['id']})}}><Link to="/detail">
// 	  		<div>
// 		    	<img src={res.thumb ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKZ3Fo6lvvr9t9hi1hs_dG6MnQRmaNh5qO-jdPeWAj8eiGW6mO"} width='300'/>
// 			    <p>{res.name}</p>
// 			    <p>{res.location.locality}</p>
// 			    <p>{res.location.address}</p>
// 			    <p>Cuisines: {res.cuisines}</p>
// 			    <p>Cost for Two: ${res.average_cost_for_two}</p>
// 			    <button onClick={e=>{e.stopPropagation();e.preventDefault()}}>Call</button>
// 			    <p>{res.user_rating.aggregate_rating}</p>
// 			    <p>{res.user_rating.votes} votes</p>
// 		    </div>
// 	    </Link>
// 	    </button>
// 		})}
//   }

// renderResults(){
//    if(this.state.restaurants){return this.state.restaurants.map((res,index)=>{return <button data-id={index} onClick={(e)=>{e.preventDefault();e.stopPropagation();console.log(e.currentTarget.dataset['id']);this.setState({index:e.currentTarget.dataset['id']})}}><Link to="/detail">
/*<div>
 <img src={res.image_url ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKZ3Fo6lvvr9t9hi1hs_dG6MnQRmaNh5qO-jdPeWAj8eiGW6mO"} width='300'/>
 <p>ID: {res.id}</p>
 <p>Alias: {res.alias}</p>
 <p>Name: {res.name}</p>
 <p>is_closed: {res.is_closed}</p>
 <p>url: {res.url}</p>
 <p>review_count: {res.review_count}</p>
 <p>rating: {res.rating}</p>
 <p>coordinates: {res.coordinates}</p>
 <p>price: {res.price}</p>
 <p>{res.location.display_address[0]}</p>
 <p>{res.location.display_address[1]}</p>
 <p>phone: {res.phone}</p>
 <p>display_phone: {res.display_phone}</p>
 <p>distance: {res.distance}</p>
 <button onClick={e=>{e.stopPropagation();e.preventDefault()}}>Call</button>
</div>*/
//      </Link>
//      </button>
//    })}
//   }

// renderDetails(){
// 	if(this.state.index){
// 		let res=this.state.restaurants[this.state.index];
// 		return <div>
// 			    	<img src={res.featured_image||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKZ3Fo6lvvr9t9hi1hs_dG6MnQRmaNh5qO-jdPeWAj8eiGW6mO'} width='500'/>
// 				    <p>{res.name}</p>
// 				    <p>{res.location.locality}</p>
// 				    <p>{res.user_rating.aggregate_rating}</p>
// 				    <p>{res.user_rating.votes} votes</p>
// 						<p>Cuisines: {res.cuisines}</p>
// 						<p>Average Cost: ${res.average_cost_for_two} for two people (approx.)</p>
// 				    <p>Address: {res.location.address}</p>
// 			    </div>
// 		}
// }


// <form onSubmit={(e)=>{e.preventDefault();}}>
//               <label>Find </label>
//               <input name="searchQuery" onChange={this.onChange} />
//               <br/>
//               <label>Near </label>
//               <input name="locationQuery" onChange={this.onChange} />
//               <br/>
//               <Link to={`/search/${this.state.searchQuery}`}><button onClick={()=>this.fetchAPI()}>Click me</button></Link>
//             </form>
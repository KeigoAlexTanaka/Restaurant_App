import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import { createBrowserHistory } from 'history';
import history from './history.js';
// import Template from './components/Template/';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      restaurants:undefined,
      index:undefined,
      search: '',
      location:'',
      loading:false
    };
  }

  onChange=(e)=>{
    this.setState({
     [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    this.setState({loading: true})
    e.preventDefault();
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: [this.state.search,this.state.location] }),
    });
    const body = await response.json();
    this.setState({restaurants: body, loading:false },()=>history.replace(`/search/${this.state.search}`));
  };

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/search', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.search }),
  //   });
  //   const body = await response.json();
  //   this.setState({ restaurants: body },()=>history.replace(`/search/${this.state.search}`));
  // };

  convertToMiles(n){
    return (n*0.000621371).toFixed(2);
  }

  renderResults(){
   if(this.state.restaurants){return this.state.restaurants.map((res,index)=>{return <button data-id={index} onClick={(e)=>{e.preventDefault();e.stopPropagation();console.log(e.currentTarget.dataset['id']);this.setState({index:e.currentTarget.dataset['id']})}}><Link to={`/detail/${res.alias}`}>
       <div className="search">
         <img src={res.image_url ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKZ3Fo6lvvr9t9hi1hs_dG6MnQRmaNh5qO-jdPeWAj8eiGW6mO"} className='center-cropped'/>
         <p>{res.name}</p>
         <p>Rating: {res.rating}</p>
         <p>Price: {res.price}</p>
         <p>Distance: {this.convertToMiles(res.distance)} miles</p>
       </div>
     </Link>
     </button>
   })}
  }

  renderDetails(){
   if(this.state.index){
     let res=this.state.restaurants[this.state.index];
     return <div className="details">
             <div>
               <img src={res.image_url ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKZ3Fo6lvvr9t9hi1hs_dG6MnQRmaNh5qO-jdPeWAj8eiGW6mO"} className='details-image'/>
               <p>{res.name}</p>
               <p>Rating: {res.rating}/5</p>
               <p>{res.review_count} Reviews</p>
               <p>{res.price}</p>
               <p>{res.location.display_address[0]}</p>
               <p>{res.location.display_address[1]}</p>
               <p>{res.display_phone}</p>
               <p>{this.convertToMiles(res.distance)} miles</p>
             </div>
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
          <div>
          <label className="is-size-2">Search </label>
            <input
              className="is-size-2"
              type="text"
              placeholder="search"
              value={this.state.search}
              onChange={e => this.setState({ search: e.target.value })}
            />
          </div>
          <div>
          <label className="is-size-2">Location </label>
            <input
              className="is-size-2"
              type="text"
              placeholder="location"
              value={this.state.location}
              onChange={e => this.setState({ location: e.target.value })}
            />
          </div>
            <br />
            <button className={this.state.loading ? 'button is-danger is-large is-loading': 'button is-danger is-large'} type="submit">
              Search
            </button>
        </form>
        </div>
        <footer>
          <p>This app is powered by <a href="https://www.yelp.com/fusion">Yelp Fusion API</a></p>
        </footer>
      </div>
    return (
      <div className="App">
        <Route exact path="/" render={()=>home}/>
        <Route path="/search" render={()=>
          <div>
          <nav className="is-size-2">
            <Link to="/" className="link">Home </Link>
          </nav>
          <h1 className="is-primary is-size-2">Showing results for {this.state.search}</h1>
            {this.renderResults()}
          </div>}/>
        <Route path="/detail" render={()=><div>
          <nav className="is-size-2">
            <Link to="/" className="link">Home </Link>
            <Link to="/search" className="link">Back </Link>
          </nav>
          {this.renderDetails()}
          </div>}/>
      </div>
    );
  }
}

export default App;
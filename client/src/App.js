import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import history from './history.js';
import ResultList from './components/ResultList/';
import Home from './components/Home/';
import Details from './components/Details/';

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
    this.onChange=this.onChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.convertToMiles=this.convertToMiles.bind(this);
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

  handleClick=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    this.setState({index:e.currentTarget.dataset['id']});
  }

  convertToMiles(n){
    return (n*0.000621371).toFixed(2);
  }

  render() {
    if(!this.state.restaurants){
      history.replace(`/`);
    }
    return (
      <div className="App">
        <Route exact path="/" render={()=>
          <Home
          handleSubmit={this.handleSubmit}
          search={this.state.search}
          loading={this.state.loading}
          onChange={this.onChange}
          />
        }
        />
        <Route path="/search" render={()=>
          <ResultList
          search={this.state.search}
          restaurants={this.state.restaurants}
          handleClick={this.handleClick}
          convertToMiles={this.convertToMiles}
          />
        }
        />
        <Route path="/detail" render={()=>
          <Details
          convertToMiles={this.convertToMiles}
          restaurants={this.state.restaurants}
          index={this.state.index}
          />
        }
        />
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
// import Template from './components/Template/';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    	foo:null,
    	bar:null
    };
  }

  // code snippet from: https://medium.freecodecamp.org/what-i-wish-i-knew-when-i-started-to-work-with-react-js-3ba36107fd13
	onChange = e => {
		const {
		 target: { value, name },
		} = e;
		this.setState({
		 [name]: value
		});
	};

	// fetchAPI(temp){
	// const API_KEY=process.env.REACT_APP_API_KEY;
 //    console.log(temp);
 //    const url = `url goes here`;
 //  	fetch(url)
 //  	.then(response => {
	// 	  return response.json();
	// 	})
	// 	.then(state => {
	// 	    console.log(state);
	// 	    this.setState({state});
	//   })
 //  }

  render() {
    return (
      <div className="App">
	      <input name="foo" onChange={this.onChange} />
		    <input name="bar" onChange={this.onChange} />
      </div>
    );
  }
}

export default App;
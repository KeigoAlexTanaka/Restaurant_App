import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { BrowserRouter as Router } from "react-router-dom";

// ReactDOM.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById("root")
// );

import { createBrowserHistory } from 'history';
import { Router, Route, Link } from "react-router-dom";
import history from './history';

ReactDOM.render(
    <Router history={history}>
	    <App />
    </Router>,
  document.getElementById('root'),
);
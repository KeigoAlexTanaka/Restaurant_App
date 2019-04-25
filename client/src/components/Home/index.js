import React, { Component } from 'react';
import './style.css';
	
class Home extends Component {
  render() {
    return (
      <div>
        <div className="home">
          <form onSubmit={this.props.handleSubmit}>
            <p>
              <strong>Yɘlp</strong>
            </p>
            <div>
              <label className="is-size-2">Search </label>
              <input
                name="search"
                className="is-size-2"
                type="text"
                placeholder="search"
                value={this.props.search}
                onChange={(e)=>this.props.onChange(e)}
              />
            </div>
            <div>
              <label className="is-size-2">Location </label>
              <input
                name="location"
                className="is-size-2"
                type="text"
                placeholder="location"
                value={this.props.location}
                onChange={(e)=>this.props.onChange(e)}
              />
            </div>
            <br />
            <button className={this.props.loading ? 'button is-danger is-large is-loading': 'button is-danger is-large'} type="submit">
              Search
            </button>
          </form>
        </div>
        <footer>
          <p>This app is powered by <a href="https://www.yelp.com/fusion">Yelp Fusion API</a></p>
        </footer>
      </div>
    );
  }
}

export default Home;
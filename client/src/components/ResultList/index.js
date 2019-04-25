import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
	
class ResultList extends Component {
  
  renderResults(){
    if(this.props.restaurants){
      return this.props.restaurants.map((res,index)=>{
        return <button data-id={index} onClick={(e)=>this.props.handleClick(e)}>
        <Link to={`/detail/${res.alias}`}>
         <div className="search">
           <img alt="" src={res.image_url ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKZ3Fo6lvvr9t9hi1hs_dG6MnQRmaNh5qO-jdPeWAj8eiGW6mO"} className='center-cropped'/>
           <p>{res.name}</p>
           <p>Rating: {res.rating}</p>
           <p>Price: {res.price}</p>
           <p>Distance: {this.props.convertToMiles(res.distance)} miles</p>
         </div>
       </Link>
       </button>
      })
    }
  }

  render() {
    return (
        <div>
          <nav className="is-size-2">
            <Link to="/" className="link">Home </Link>
          </nav>
          <h1 className="is-primary is-size-2">Showing results for {this.props.search}</h1>
          {this.renderResults()}
        </div>
    );
  }
}

export default ResultList;
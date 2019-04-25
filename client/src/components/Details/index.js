import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
	
class Details extends Component {

  renderDetails(){
   if(this.props.index){
     let res=this.props.restaurants[this.props.index];
     return <div className="details">
       <div>
         <img alt="" src={res.image_url ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKZ3Fo6lvvr9t9hi1hs_dG6MnQRmaNh5qO-jdPeWAj8eiGW6mO"} className='details-image'/>
         <p>{res.name}</p>
         <p>Rating: {res.rating}/5</p>
         <p>{res.review_count} Reviews</p>
         <p>{res.price}</p>
         <p>{res.location.display_address[0]}</p>
         <p>{res.location.display_address[1]}</p>
         <p>{res.display_phone}</p>
         <p>{this.props.convertToMiles(res.distance)} miles</p>
       </div>
     </div>
     }
  }

  render() {
    return (
      <div>
        <nav className="is-size-2">
          <Link to="/" className="link">Home </Link>
          <Link to="/search" className="link">Back </Link>
        </nav>
        {this.renderDetails()}
      </div>
    );
  }
}

export default Details;
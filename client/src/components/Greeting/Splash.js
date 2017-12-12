import React, { Component } from "react";
import { connect } from "react-redux";

class Splash extends Component {
  render() {
    return (
      <div className="splash">
        <img
          className="main-splash-img"
          src="http://res.cloudinary.com/annaoh/image/upload/v1513098207/DSC03901_vcdzpy.jpg"/>
        <h2>Deliver and Ship Packages</h2>

        <button className="login-button"
                onClick={()=> '/auth/google'}>
          Login with Google
        </button>

        <h4>Have you ever went on a road trip and had some free space in your car?</h4>
        <h4>Have you ever wanted a cheaper, faster and more eco-friendly way to ship your packages?</h4>

        <h2>WaySide</h2>
        <h4>WaySide matches drivers with preplanned routes, with packages that need to be delivered in that direction.</h4>
        <h4>Prices are calculated based on the extra distance the driver had to go out of his way to pick up and drop off the packages.</h4>

        <h2>A More Human Approach</h2>
        <h4>Customers can see and pick their drivers based on their delivery date, price and rating.</h4>

        <h4>Easy, Hassle Free Shipping</h4>
        <h4>Why wait?</h4>
        <h4>Sign up is easy with your Google account!</h4>
        <button className="login-button-2"
                onClick={()=> '/auth/google'}>
          Login with Google
        </button>

      </div>);
  }
}

export default connect()(Splash);

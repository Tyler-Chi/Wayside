import React, { Component } from "react";
import { connect } from "react-redux";

const style = {
  mainSplashImg: {
    width: "100%",
    minWidth: "1020px",
    height: "570px",
    background: "rgba(0,0,0, 0.5) url(//res.cloudinary.com/annaoh/image/upload/v1513098207/DSC03901_vcdzpy.jpg)",
    backgroundPosition: "50%",
    backgroundSize: "cover",
  },
  mainSplashCover: {
    background: "rgba(0,0,0,0.3)",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainSplashHeader: {
    fontSize: "80px",
    color: "white",
    textAlign: "center",
    marginBottom: "40px",
  },
  loginButton: {
    padding: "8px 20px",
    width: "250px",
    borderRadius: "5px",
    border: "1px solid #FF0000",
    boxShadow: "5px #000000" ,
    background: "#FF0000",
    fontSize: "20px",
    fontWeight: "500",
    color: "white",
    marginBottom: "15px",
  }
};


class Splash extends Component {
  render() {
    return (
      <div className="splash" style={style}>
        <div
          className="mainSplashImg"
          style={style.mainSplashImg}>
          <div className="mainSplashCover" style={style.mainSplashCover}>
            <h2 className="mainSplashHeader pacifico" style={style.mainSplashHeader}>Deliver and Ship Packages</h2>

            <button className="loginButton" style={style.loginButton}
              onClick={()=> '/auth/google'}>
              Login with Google
            </button>
          </div>
        </div>
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
        <button className="login-button"
                onClick={()=> '/auth/google'}>
          Login with Google
        </button>
      </div>);
  }
}

export default connect()(Splash);

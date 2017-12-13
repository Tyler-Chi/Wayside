import React, { Component } from "react";
import { connect } from "react-redux";
import './Splash.css';

const style = {
  splash: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
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
    marginBottom: "50px",
  },
  loginButton: {
    padding: "8px 20px",
    width: "275px",
    borderRadius: "5px",
    border: "1px solid #FF0000",
    boxShadow: "5px #000000" ,
    background: "#FF0000",
    fontSize: "20px",
    fontWeight: "600",
    color: "white",
    marginBottom: "15px",
    textAlign: "center",
  },
  bottom: {
    width: "1000px",
  },
  questions: {
    marginTop: "40px",
    textAlign: "center",
  },
  questionsTitle: {
    textAlign: "center",
    fontSize: "100px",
    borderBottom: "1px solid gray",
    width: "400px",
    margin: "0 auto 35px auto",
    paddingBottom: "2px",
  },
};


class Splash extends Component {
  render() {
    return (
      <div className="splash" style={style.splash}>
        <div
          className="mainSplashImg"
          style={style.mainSplashImg}>
          <div className="mainSplashCover" style={style.mainSplashCover}>
            <h1 className="mainSplashHeader pacifico" style={style.mainSplashHeader}>Deliver and Ship Packages</h1>

            <button className="loginButton" style={style.loginButton}
              onClick={()=> '/auth/google'}>
              Log in with Google
            </button>
          </div>
        </div>

        <div className="bottom" style={style.bottom}>
          <div className="questions" style={style.questions}>
            <h1 className="questionsTitle pacifico" style={style.questionsTitle}>WaySide</h1>
            <h5>Have you ever went on a road trip and had some free space in your car?</h5>
            <h5>Have you ever wanted a cheaper, faster way to ship your packages?</h5>
          </div>

          <div className="about first" style={style.about}>
            <h2>How It Works</h2>
            <h4>WaySide matches drivers with preplanned routes, with packages that need to be delivered in that direction.</h4>
            <h4>Prices are calculated based on the extra distance the driver had to go out of his way to pick up and drop off the packages.</h4>
          </div>

          <div className="about human" style={style.human}>
            <h2>A More Human Approach</h2>
            <h4>Your stuff is important,</h4>
            <h4>Which is why customers can choose their drivers and know exactly who's handling their packages.</h4>
          </div>

          <div className="about signUp" style={style.signUp}>
            <h2>Why Wait?</h2>
            <h4>Sign up now with your Google account!</h4>
            <button className="bottom-login-button"
              onClick={()=> '/auth/google'}>
              Log in with Google
            </button>
          </div>
        </div>

      </div>);
  }
}

export default connect()(Splash);

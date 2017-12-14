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
    background: "url(//res.cloudinary.com/annaoh/image/upload/v1513098207/DSC03901_vcdzpy.jpg)",
    backgroundPosition: "50%",
    backgroundSize: "cover",
  },
  mainSplashCover: {
    background: "rgba(0,0,0,0.45)",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainSplashHeader: {
    fontSize: "90px",
    color: "white",
    textAlign: "center",
    marginBottom: "50px",
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
    paddingBottom: "6px",
  },
};

let lastScrollPos = 0;
let ticking  = false;
let left = -1200;

let moveCarLeft = function(car, scrollPos){
  // console.log(scrollPos);
  car.style.left = `${left + scrollPos*1.1}px`;
};

class Splash extends Component {

  componentDidMount(){
    var car = document.querySelector(".car");
    window.addEventListener("scroll", function(e){
      lastScrollPos = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function(){
          moveCarLeft(car, lastScrollPos);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  render() {
    return (
      <div className="splash" style={style.splash}>
        <div
          className="mainSplashImg"
          style={style.mainSplashImg}>
          <div className="mainSplashCover" style={style.mainSplashCover}>
            <h1 className="mainSplashHeader barlow" style={style.mainSplashHeader}>
              DELIVER & SHIP PACKAGES</h1>

            <button className="loginButton"
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
            <h2>HOW IT WORKS</h2>
            <h4>WaySide matches drivers going in a certain direction with packages that need to be delivered in the same way.</h4>
            <h4>Prices are calculated based on the extra distance the driver had to go out of his way to pick up and drop off the package.</h4>
            <img className="car" alt="car" src="http://res.cloudinary.com/annaoh/image/upload/v1513148713/car-2386838_960_720_vddt3q.png"/>
        </div>

          <div className="row human" style={style.human}>
            <div className="center">
              <div className="about human2">
                <h2>A MORE HUMAN APPROACH</h2>
                <h4 className="midsentence">Your stuff is <strong>IMPORTANT</strong>,</h4>
                <h4 className="midsentence2">which is why you can choose your driver and know exactly who's handling your stuff.</h4>
              </div>
              <div className="human-photos">
                <img alt="human-photos" src="http://res.cloudinary.com/annaoh/image/upload/c_crop,h_400,w_400,x_140,y_230/v1513143276/photo-1505503693641-1926193e8d57_iytfqb.jpg" />
                <img alt="human-photos" src="http://res.cloudinary.com/annaoh/image/upload/c_scale,h_900/c_crop,h_400,w_400,x_120,y_200/v1513143277/charles-etoroma-390119_unevbl.jpg"/>
                <img alt="human-photos" src="http://res.cloudinary.com/annaoh/image/upload/c_scale,h_600/c_crop,h_400,w_400/v1513143277/eduardo-dutra-461056_rcgcmz.jpg"/>
                <img alt="human-photos" src="http://res.cloudinary.com/annaoh/image/upload/c_scale,w_600/c_crop,h_400,w_400/v1513143277/edward-cisneros-411013_wizbjz.jpg"/>
                <img alt="human-photos" src="http://res.cloudinary.com/annaoh/image/upload/c_scale,w_700/c_crop,h_400,w_400,x_130,y_0/v1513143278/marius-ciocirlan-398931_z1lbhr.jpg"/>
              </div>

            </div>
        </div>

        <div className="nav-extender">
          <h2 className="slogan">Going the distance</h2>
          <h4 className="description">Request pickup. Ship. Repeat.</h4>
          <div className="ratings barlow">
            <h4>Reviews</h4>
            <h5>Cheap.   <p>-Christine</p></h5>
            <h5>Super quick and easy   <p>-Tyler</p></h5>
            <h5>5/5 would use again   <p>-Anna</p></h5>
            <h5>Weekend shipping is the best   <p>-Trung</p></h5>
            <h5>Great service!!!   <p>-Edan</p></h5>
          </div>
        </div>

          <div className="about signUp" style={style.signUp}>
            <h2>WHY WAIT?</h2>
            <h4>Sign up now with your Google account!</h4>
            <button className="bottom-login-button"
              onClick={()=> '/auth/google'}>
              Sign up with Google
            </button>
          </div>
        </div>

      </div>);
  }
}

export default connect()(Splash);

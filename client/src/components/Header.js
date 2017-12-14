import React, { Component } from "react";
import { connect } from "react-redux";
import "./Overall_CSS/Header.css";

//here, have access to this.props.auth
//if it is false, the user is not logged in
//otherwise, there is a user and you can access the username and other data
class Header extends Component {
  constructor(props) {
    super(props);
    this.loginLogout = this.loginLogout.bind(this);
  }


  customerDriver(){
    if (this.props.driver){
      return (
        <div className="nav-right">
          <button>Upcoming Deliveries</button>
          <button>Past Deliveries</button>
          <button>Send a Package</button>

          <a href="/api/logout">Logout</a>

        </div>
      );
    } else {
      return (
        <div className="nav-right">
          <button>Pending Requests</button>
          <button>Past Packages</button>
          <button>Become a Driver</button>

          <a href="/api/logout">Logout</a>
        </div>

      );
    }
  }


  loginLogout(){
    if (this.props.auth){
      return (
        this.customerDriver()
      );
    } else {
      return (
        <div className="login">
          <a className="login-demo" href="">Demo Login</a>
          <a className="login-google" href="/auth/google">Log in with Google</a>
        </div>

      );
    }
  }




  render() {
    console.log(this.props);

    //the a href thing makes the get request to /auth/google
    //this get request executes the google Login
    //i still need to have this redirect to normal

    //this anchor to logout makes a get request to the api/logout. in authRoutes, this handles logout logic, as well as redirection.
    return (
      <div className="nav">
        <div className="left">
          <a className="title pacifico" href="/">
          WaySide
          </a>
        </div>
        <div>
          {this.loginLogout()}

        </div>
      </div>
    );
  }
}

//this is essentially our container.
//connect gives mapStateToProps and mapDispatchToProps access to the store's state
//here, we are just passing in the auth portion of state into this component Header.
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);

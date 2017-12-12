import React, { Component } from "react";
import { connect } from "react-redux";

//here, have access to this.props.auth
//if it is false, the user is not logged in
//otherwise, there is a user and you can access the username and other data
class Header extends Component {
  render() {
    console.log(this.props);

    //the a href thing makes the get request to /auth/google
    //this get request executes the google Login
    //i still need to have this redirect to normal

    //this anchor to logout makes a get request to the api/logout. in authRoutes, this handles logout logic, as well as redirection.
    return (
      <div>
        Header
        <a href="/auth/google">Login with Google</a>
        <a href="/api/logout">Logout</a>
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

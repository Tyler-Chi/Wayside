import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
const Dashboard = () => <h2> Dashboard </h2>;
const TripNew = () => <h2> TripNew </h2>;
const Landing = () => <h2> Landing </h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/trips" component={Dashboard} />
            <Route path="/trips/new" component={TripNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

//passes in all the actions we want to wire up.
//because of this, App now has access to actions that live inside props.
//this is essentially a container! mapStateToProps and mapDispatchToProps is right here!!!
export default connect(null, actions)(App);

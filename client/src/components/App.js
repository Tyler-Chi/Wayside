import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import "./Overall_CSS/Reset.css";
import "./Overall_CSS/Fonts.css";

import Header from "./Header";
import Splash from "./Greeting/Splash";

import CustomersOrdersNew from "./Customers/CustomersOrdersNew";
import CustomersOrdersUpcoming from "./Customers/CustomersOrdersUpcoming";
import CustomersOrdersHistory from "./Customers/CustomersOrdersHistory";

import DriversTripsNew from "./Drivers/DriversTripsNew";
import DriversTripsHistory from "./Drivers/DriversTripsHistory";
import DriversNew from "./Drivers/DriversNew";
import DriversTripsUpcoming from "./Drivers/DriversTripsUpcoming";
import Test from "./test";

import { AuthRoute, ProtectedRoute } from './Route';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="body">

            <Route path = "/" component={Header} />

            <Route exact path="/test" component={Test} />

            <Route exact path="/" component={Splash} />
            <ProtectedRoute
              exact
              path="/customers/orders/new"
              component={CustomersOrdersNew}
            />

          <ProtectedRoute
              exact
              path="/customers/orders/upcoming"
              component={CustomersOrdersUpcoming}
            />

          <ProtectedRoute
              exact
              path="/customers/orders/history"
              component={CustomersOrdersHistory}
            />

          <ProtectedRoute
              exact
              path="/drivers/trips/new"
              component={DriversTripsNew}
            />

          <ProtectedRoute
              exact
              path="/drivers/trips/upcoming"
              component={DriversTripsUpcoming}
            />

          <ProtectedRoute
              exact
              path="/drivers/trips/history"
              component={DriversTripsHistory}
            />

          <ProtectedRoute exact path="/drivers/new" component={DriversNew} />
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

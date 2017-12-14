import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import "./Overall_CSS/Reset.css";
import "./Overall_CSS/Fonts.css";

import Header from "./Header";
import Splash from "./Greeting/Splash";
import CustomersOrdersNew from "./Customers/CustomersOrdersNew";
import CustomersOrdersHistory from "./Customers/CustomersOrdersHistory";
import DriversTripsNew from "./Drivers/DriversTripsNew";
import DriversTripsHistory from "./Drivers/DriversTripsHistory";
import DriversNew from "./Drivers/DriversNew";
import DriversTripsUpcoming from "./Drivers/DriversTripsUpcoming";
import Test from "./test";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="body">
            <Header className="nav" />

            <Route exact path="/test" component={Test} />

            <Route exact path="/" component={Splash} />
            <Route
              exact
              path="/customers/orders/new"
              component={CustomersOrdersNew}
            />

            <Route
              exact
              path="/drivers/trips/upcoming"
              component={DriversTripsUpcoming}
            />

            <Route
              exact
              path="/customers/orders/history"
              component={CustomersOrdersHistory}
            />

            <Route
              exact
              path="/drivers/trips/new"
              component={DriversTripsNew}
            />

            <Route
              exact
              path="/drivers/trips/history"
              component={DriversTripsHistory}
            />

            <Route exact path="/drivers/new" component={DriversNew} />
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

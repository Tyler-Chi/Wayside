import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Test extends Component {
  render() {
    return (
      <div>
        <br />
        Hello world i am test
        <br />
        <button onClick={() => this.props.fetchAllTrips()}>
          fetchAllTrips
        </button>
        <br />
        <button onClick={() => this.props.fetchCompletedTrips()}>
          fetchCompletedTrips
        </button>
        <br />
        <button onClick={() => this.props.fetchUpcomingTrips()}>
          fetchUpcoming
        </button>
      </div>
    );
  }
}

export default connect(null, actions)(Test);

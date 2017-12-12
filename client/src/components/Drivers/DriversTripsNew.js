import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class DriversTripsNew extends Component {
  render() {
    return (
      <div>
        <h1>I am drivers trips new</h1>
        <button
          onClick={() =>
            this.props.submitTrip({
              origin: "bob",
              destination: "bob",
              tripStartDate: Date.now(),
              tripEndDate: Date.now(),
              completed: true
            })
          }
        >
          CLICK ME
        </button>
      </div>
    );
  }
}

export default connect(null, actions)(DriversTripsNew);

//actions contains submitTrip.

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
        <br />
        <button
          onClick={() => this.props.fetchTrip("5a3030ced24d259ce4928ed2")}
        >
          fetchTrip
        </button>
        <br />
        <button
          onClick={() =>
            this.props.submitOrder({
              _driverId: "5a2f15ca75745dceb3a90157",
              accepted: true,
              deliveredBy: Date.now(),
              startLoc: "bob",
              endLoc: "bob",
              deliveredStatus: true,
              rating: 5,
              price: 100,
              comments: [],
              requestPending: true,
              _tripId: "5a30382eae36e9aa3ca08279"
            })
          }
        >
          SUBMIT ORDER
        </button>
      </div>
    );
  }
}

export default connect(null, actions)(Test);

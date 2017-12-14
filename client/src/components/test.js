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
              accepted: true,
              deliveredBy: Date.now(),
              startLoc: "bob",
              endLoc: "bob",
              deliveredStatus: true,
              rating: 5,
              price: 100,
              comments: [],
              requestPending: true
            })
          }
        >
          SUBMIT ORDER
        </button>
        <br />
        <button onClick={() => this.props.fetchAllUpcoming()}>
          fetchAllUpcoming
        </button>
        <br />
        <button onClick={() => this.props.fetchOrders()}>fetchOrders</button>
        <br />
        <button
          onClick={() => this.props.updateTrip("5a323b7a55691727ee7c9f2a")}
        >
          UpdateTrip (this takes an id, turns it to true.)
        </button>
      </div>
    );
  }
}

export default connect(null, actions)(Test);

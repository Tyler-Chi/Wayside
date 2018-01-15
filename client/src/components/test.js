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
              startLoc: "San Jose",
              endLoc: "Tijuana",
              deliveredStatus: true,
              rating: 5,
              price: 100,
              comments: [],
              requestPending: true,
              _tripId: "5a340804540b4f1619c75a5f"
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
        <br />
        <br />
        <button
          onClick={() =>
            this.props.updateTrip("5a341d43a68c5aeb861f1ad8", {
              completed: true
            })
          }
        >
          update trip: first argument is the trip id. the second argument is an
          object with the new values of that trip. the completed key needs to be
          specified, even if it is staying the same. kind of weird on the
          backend
        </button>
        <br />
        <br />
        <br />
        <button
          onClick={() =>
            this.props.updateOrder("5a31d3f784f23ab19f0013a2", { rating: 3 })
          }
        >
          update order, works very similar to the update trip. first argument is
          the order id, the second argument is an object with the keys and
          values of the stuff you wanna change :D
        </button>

        <br />

        <button
          onClick = {()=>
            this.props.submitTrip({
              origin: "San Diego",
              destination: "San Francisco",
              latD: 37.7749295,
              latO: 32.715738,
              lngD: -122.41941550000001,
              lngO: -117.16108380000003,
              price: 0,
              completed: false,
              tripDistance: 507,
              tripStartDate: "2018-01-15T00:00:00.000Z",
              tripEndDate: "2018-01-17T00:00:00.000Z"


            })
          }  
          
        >
          POPULATE
        </button>


      </div>
    );
  }
}

export default connect(null, actions)(Test);

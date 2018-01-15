import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Test extends Component {

  constructor(props){
    super(props);
    this.populate = this.populate.bind(this);
  }

  populate(){
    console.log("hello world");

    let months = ["01","02","03","04","05","06","07","08","09","10","11","12"];

    let days = [];
    for (var i = 1; i < 31; i++) {

      if (i < 10) {
        days.push("0" + i)
      } else {
        days.push(i.toString())
      }
    }

    for (var month = 0; month < months.length; month++) {
      for (var day = 0; day < days.length; day++) {
        let first = "2018-";
        let last = "T00:00:00.000Z";

        let startDate = first + months[month] + "-" + days[day] + last;
        let endDate = first + months[month] + "-" + days[day] + last;
        

        this.props.submitTrip({
          origin: "6628 Lavandula Court, San Diego California 92130",
          destination: "825 Battery Street, San Francisco California 94111",
          latD: 37.7749295,
          latO: 32.715738,
          lngD: -122.41941550000001,
          lngO: -117.16108380000003,
          price: 0,
          completed: false,
          tripDistance: 507,
          tripStartDate: startDate,
          tripEndDate: endDate
        });

      }
    }
    




  }

  
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
            this.populate()
          }  
          
        >
          POPULATE
        </button>


      </div>
    );
  }
}

export default connect(null, actions)(Test);

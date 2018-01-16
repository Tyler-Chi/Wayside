import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Test extends Component {

  constructor(props){
    super(props);
    this.populate = this.populate.bind(this);
  }

  populate() {
    console.log("hello world");

    let addresses = [
      "7 W. Adams Lane San Jose, CA 95116",
      "7246 Windsor Ln Citrus Heights, CA 95610",
      "241 Indian Spring St. Pittsburg, CA 94565",
      "9267 S Grand Ave Los Angeles, CA 90003",
      "904 W Main St, El Cajon, CA 92020",
      "90942 Kelso Cima Rd, Kelso, CA 92309",
      "400 S China Lake Blvd, Ridgecrest, CA 93555",
      "6628 Lavandula Ct, San Diego, CA 92130",
      "4656 Tarantella Ln, San Diego, CA 92130",
      "Angeles National Forest",
      "Bakersfield, California",
      "Tuolumne, California 95379",
      "Santa Rosa",
      "Plumas National Forest",
      "Modoc National Forest, 225 West 8th Street, Alturas, CA 96101",
      "Montague, California 96064",
      "Eureka, CA",
      "Crescent City, CA",
      "1600 US-199, Crescent City, CA 95531",
      "Fresno, CA",
      "Death Valley National Park",
      "90942 Kelso Cima Rd, Kelso, CA 92309",
      "Kofa National Wildlife Refuge",
      "Joshua Tree National Park",
      "Stanislaus National Forest",
      "Yosemite National Park",
      "Sacramento, CA",
      "Garberville, CA",
      "King Range National Conservation Area",
      "Hayfork, CA"
    ]

    let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

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


        for (var j = 0; j < 30; j++) {
          let startLoc = Math.floor(Math.random() * addresses.length);
          let endLoc = Math.floor(Math.random() * addresses.length);


          this.props.submitTrip({
            origin: addresses[startLoc],
            destination: addresses[endLoc],
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

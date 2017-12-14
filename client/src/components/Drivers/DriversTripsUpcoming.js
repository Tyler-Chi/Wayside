import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class DriversTripsUpcoming extends Component {
  componentDidMount() {
    //this fills the trips slice of state with this users
    //trips that they will go on in the future.
    this.props.fetchAllTrips();
  }

  render() {
    if (this.props.entities.trips === null) {
      return <div> Loading</div>;
    }

    const { trips } = this.props.entities;
    console.log("drivers trips all", trips);

    const upcomingTrips = trips.filter(trip => trip.completed === false);

    console.log("drivers upcoming trips", upcomingTrips);

    return <div>soy eldriverstripsupcoming si si si </div>;
  }
}

function mapStateToProps({ auth, entities }) {
  return {
    auth,
    entities
  };
}

export default connect(mapStateToProps, actions)(DriversTripsUpcoming);

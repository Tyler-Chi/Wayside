import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import DriversTripItem from "./DriversTripItem";
import './DriversTripItem.css';

class DriversTripsUpcoming extends Component {

  componentDidMount() {
    //this fills the trips slice of state with this users
    //trips that they will go on in the future.
    this.props.fetchAllTrips();
  }

  render() {
    if (this.props.entities.trips === null) {
      return <div> Loading </div>;
    }

    const { trips } = this.props.entities;
    const tripsArray = Object.values(trips);
    const upcomingTrips = tripsArray
                        .filter(trip => trip.completed === false)
                        .sort(function(a, b) { return a.tripStartDate > b.tripStartDate; });

    return(
      <div className="driver-upcoming-all">
        <h2 className="driver-upcoming-title barlow">UPCOMING TRIPS</h2>

        <ul className="driver-upcoming-list">
          {upcomingTrips.map(trip => (
            <DriversTripItem
              key={trip._id}
              trip={trip}
            />
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ auth, entities }) {
  return {
    auth,
    entities
  };
}

export default connect(mapStateToProps, actions)(DriversTripsUpcoming);
